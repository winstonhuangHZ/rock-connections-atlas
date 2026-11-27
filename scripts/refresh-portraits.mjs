import {parseArgs} from 'node:util';
import {mkdir,readFile,rename,writeFile} from 'node:fs/promises';
import {data} from './data.mjs';

const {values:options} = parseArgs({options:{
  apply:{type:'boolean',default:false},
  limit:{type:'string',default:'120'}
}});
const limit = Number(options.limit);
if (!Number.isInteger(limit) || limit < 1) throw Error('--limit must be a positive integer');

const root = new URL('../',import.meta.url);
const cache = new URL('.cache/',root);
const manifest = new URL('portrait-candidates.json',cache);
const agent = 'RockConnectionsAtlasPortraits/1.0 (https://github.com/winstonhuangHZ/rock-connections-atlas)';
const delay = ms => new Promise(resolve => setTimeout(resolve,ms));
const normalize = title => title.replaceAll('_',' ').trim().toLowerCase();
const identity = title => normalize(title).normalize('NFKD')
  .replace(/\s*\([^)]*\)$/,'').replace(/^the /,'')
  .replace(/[^\p{L}\p{N}]/gu,'');
const decorative = /(?:^|[ _.-])(?:logo|logotype|icon|flag|signature|autograph|wordmark|symbol|map|poster|seal|album[ _-]cover)(?=[ _.-]|$)/i;
const approvedLicense = /^(?:CC BY(?:-SA)? [1-4]\.\d|CC0(?: 1\.0)?|Public domain)$/i;
const fileKey = value => normalize(value.replace(/^File:/i,''));
const rejectedLeadImages = new Map([
  ['dean-fertita',fileKey('14-06-07_RiP_Queens_of_the_Stone_Age_Troy_van_Leeuwen_1.JPG')],
  ['the-beat',fileKey('The English Beat, Truckee, California.jpg')],
  ['john-mayall-the-bluesbreakers',fileKey('John Mayall (1970).png')]
]);
const mimeExtensions = {'image/jpeg':'jpg','image/png':'png','image/webp':'webp'};

function commonsMedia(value) {
  const url = new URL(value);
  return url.protocol === 'https:' && ['upload.wikimedia.org','thumb.wikimedia.org'].includes(url.hostname) &&
    url.pathname.startsWith('/wikipedia/commons/');
}

async function request(url) {
  for (let attempt = 0; ; attempt++) {
    const response = await fetch(url,{
      headers:{'User-Agent':agent},
      redirect:'error',
      signal:AbortSignal.timeout(25000)
    });
    if (response.ok) return response;
    await response.body?.cancel();
    const retry = Number(response.headers.get('retry-after'));
    if ((response.status !== 429 && response.status !== 503) || attempt >= 1 || retry > 30) {
      const error = Error(`HTTP ${response.status}: ${url}`);
      error.throttled = response.status === 429 || response.status === 503;
      throw error;
    }
    await delay(Math.max(retry || 0,3)*1000);
  }
}

async function query(host,params) {
  const url = new URL('/w/api.php',`https://${host}`);
  url.search = new URLSearchParams({action:'query',format:'json',formatversion:2,maxlag:5,...params});
  const result = await (await request(url)).json();
  if (result.error) throw Error(`${host}: ${result.error.code}: ${result.error.info}`);
  return result.query;
}

function plain(value = '') {
  const entities = {amp:'&',lt:'<',gt:'>',quot:'"',nbsp:' ',apos:"'"};
  return value.replace(/<[^>]+>/g,' ').replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi,(entity,code) => {
    if (code[0] !== '#') return entities[code] ?? entity;
    const point = code[1]?.toLowerCase() === 'x' ? Number.parseInt(code.slice(2),16) : Number(code.slice(1));
    return point > 0x10ffff ? entity : String.fromCodePoint(point);
  }).replace(/\s+/g,' ').trim();
}

function batches(items,size) {
  return Array.from({length:Math.ceil(items.length/size)},(_,i)=>items.slice(i*size,(i+1)*size));
}

const usedFiles = new Set(Object.values(data.portraits).map(item =>
  fileKey(decodeURIComponent(new URL(item.url).pathname.split('/wiki/').at(-1)))));
await mkdir(cache,{recursive:true});

if (!options.apply) {
  const counts = Object.fromEntries(Object.keys(data.artists).map(id=>[id,0]));
  for (const {a,b} of data.relations) { counts[a]++; counts[b]++; }
  const missing = Object.values(data.artists)
    .filter(artist=>!Object.hasOwn(data.portraits,artist.id))
    .sort((a,b)=>counts[b.id]-counts[a.id] || a.id.localeCompare(b.id)).slice(0,limit);
  const candidates = [];
  const rejected = {};
  let requestFailed = false;
  const skip = reason => { rejected[reason] = (rejected[reason] ?? 0)+1; };

  for (const artists of batches(missing,30)) {
    try {
      const articleData = await query('en.wikipedia.org',{
        prop:'pageimages|pageprops',ppprop:'disambiguation',redirects:1,
        pilicense:'free',piprop:'thumbnail|name',pithumbsize:330,
        titles:[...new Set(artists.map(artist=>artist.wiki))].join('|')
      });
      const aliases = new Map([...(articleData.normalized ?? []),...(articleData.redirects ?? [])]
        .map(item=>[normalize(item.from),normalize(item.to)]));
      const pages = new Map(articleData.pages.map(page=>[normalize(page.title),page]));
      const subjects = [];
      for (const artist of artists) {
        let title = normalize(artist.wiki);
        const visited = new Set();
        while (aliases.has(title) && !visited.has(title)) {
          visited.add(title);
          title = aliases.get(title);
        }
        const page = pages.get(title);
        if (!page || page.missing || page.pageprops?.disambiguation !== undefined ||
            ![artist.name,...artist.aliases.split('|')].some(name=>identity(name)===identity(page.title))) {
          skip('article identity');continue;
        }
        if (!page.pageimage || !page.thumbnail?.source || !commonsMedia(page.thumbnail.source) ||
            decorative.test(page.pageimage) || page.thumbnail.width < 120 || page.thumbnail.height < 80) {
          skip('no suitable Commons thumbnail');continue;
        }
        subjects.push({artist,page});
      }
      if (!subjects.length) continue;
      const files = await query('commons.wikimedia.org',{
        prop:'imageinfo',iiprop:'url|extmetadata|mime',
        iiextmetadatafilter:'Artist|Attribution|LicenseShortName|LicenseUrl',
        redirects:1,
        titles:[...new Set(subjects.map(({page})=>'File:'+page.pageimage))].join('|')
      });
      const info = new Map(files.pages.map(file=>[fileKey(file.title),file.imageinfo?.[0]]));
      for (const {artist,page} of subjects) {
        const key = fileKey(page.pageimage);
        if (rejectedLeadImages.get(artist.id) === key) {skip('reviewed subject mismatch');continue;}
        if (usedFiles.has(key)) {skip('image already used');continue;}
        const image = info.get(key);
        const tag = name => image?.extmetadata?.[name]?.value;
        const license = tag('LicenseShortName') ?? '';
        const author = plain(tag('Attribution') || tag('Artist'));
        if (!approvedLicense.test(license) || !author || !mimeExtensions[image?.mime] ||
            !image.descriptionurl?.startsWith('https://commons.wikimedia.org/wiki/File:')) {
          skip('unsupported license or missing credit');continue;
        }
        const src = new URL(page.thumbnail.source);
        src.search = '';
        const licenseUrl = tag('LicenseUrl');
        candidates.push({
          id:artist.id,name:artist.name,article:page.title,
          url:image.descriptionurl,thumbnail:src.href,author,license,
          ...(licenseUrl && /^https?:\/\/creativecommons\.org\//i.test(licenseUrl)
            ? {licenseUrl:licenseUrl.replace(/^http:/,'https:')} : {})
        });
        usedFiles.add(key);
      }
    } catch (error) {
      requestFailed = true;
      console.warn(error.cause?.code ?? error.message);
      if (error.throttled) break;
      for (const _ of artists) skip('request failed');
    } finally {
      await delay(700);
    }
  }
  if (requestFailed && !candidates.length) {
    console.error('Discovery could not complete. Retry before applying a new batch.');
    process.exitCode = 1;
  } else {
    await writeFile(manifest,JSON.stringify(candidates,null,2)+'\n');
    console.log({eligible:candidates.length,rejected,manifest:manifest.pathname});
  }
} else {
  const candidates = JSON.parse(await readFile(manifest,'utf8'));
  const portraits = {...data.portraits};
  let added = 0;
  let consecutiveFailures = 0;
  for (const {id,thumbnail,url,author,license,licenseUrl} of candidates) {
    if (!Object.hasOwn(data.artists,id) || Object.hasOwn(portraits,id) || !/^[a-z0-9-]+$/.test(id) ||
        !commonsMedia(thumbnail) || !url.startsWith('https://commons.wikimedia.org/wiki/File:') ||
        !approvedLicense.test(license) || !author || usedFiles.has(fileKey(decodeURIComponent(url.split('/wiki/').at(-1))))) continue;
    try {
      const image = await request(thumbnail);
      consecutiveFailures = 0;
      const mime = image.headers.get('content-type')?.split(';')[0];
      const extension = mimeExtensions[mime];
      const bytes = Buffer.from(await image.arrayBuffer());
      const valid = extension === 'jpg' ? bytes.subarray(0,3).equals(Buffer.from([255,216,255]))
        : extension === 'png' ? bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))
        : extension === 'webp' && bytes.toString('ascii',8,12) === 'WEBP';
      if (!valid || bytes.length > 350000) {
        console.warn(`Skipping ${id}: unsupported image data or above size limit`);
        continue;
      }
      const path = `images/${id}.${extension}`;
      await writeFile(new URL(path,root),bytes);
      portraits[id] = {path,author,license,url,...(licenseUrl && {licenseUrl})};
      usedFiles.add(fileKey(decodeURIComponent(url.split('/wiki/').at(-1))));
      added++;
    } catch (error) {
      console.warn(`${id}: ${error.cause?.code ?? error.message}`);
      consecutiveFailures++;
      if (error.throttled || consecutiveFailures >= 5) break;
    } finally {
      await delay(350);
    }
  }
  const temporary = new URL('portraits.js.tmp',cache);
  await writeFile(temporary,'const portraits = '+JSON.stringify(portraits,null,2)+';\n');
  await rename(temporary,new URL('portraits.js',root));
  console.log({added,total:Object.keys(portraits).length});
}
