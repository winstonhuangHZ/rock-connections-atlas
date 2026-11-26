const $ = id => document.getElementById(id);
const entries = Object.values(artists).sort((a,b) => a.name.localeCompare(b.name,'en'));
const byArtist = Object.fromEntries(entries.map(person => [person.id,[]]));
relations.forEach((edge,index) => {
  edge.index = index;
  byArtist[edge.a].push(edge);
  byArtist[edge.b].push(edge);
});

const other = (edge,id) => edge.a === id ? edge.b : edge.a;
const isBand = person => person.scene.endsWith('乐队');
const mapLink = id => '#map/' + id;
const initialType = 'all';
let selected = null;
let filter = initialType;
let category = 'all';
const typeEntries = Object.entries(types);
let language = 'en';
try { if (localStorage.getItem('rock-atlas.language') === 'zh') language = 'zh'; } catch {}
const t = key => strings[language][key];

function displayName(person) {
  return language === 'en' ? englishNames[person.id] ?? person.name : person.name;
}
function displayScene(person) {
  if (language === 'zh') return person.scene;
  return person.scene.split(' · ').map(part => sceneWords[part.replace('场景','')] ?? part).join(' · ');
}
function displayBio(person) {
  if (language === 'zh') return person.bio;
  if (englishBios[person.id]) return englishBios[person.id];
  const bands = byArtist[person.id].map(edge => artists[other(edge,person.id)])
    .filter(p => isBand(p) && byArtist[person.id].some(edge => other(edge,person.id) === p.id && edge.type === 'member'));
  if (isBand(person)) {
    const genre = sceneWords[person.genre];
    return genre ? `A ${genre.toLowerCase()} band. Selected members and other documented relationships are listed below.`
      : 'Selected members and other documented relationships are listed below.';
  }
  const roster = [...new Set(bands.map(displayName))];
  return roster.length ? 'Recorded band affiliations include '+roster.join(', ')+'.' : '';
}
function displayStory(edge) {
  if (language === 'zh') return edge;
  const story = edge.en ?? englishStoryMap.get(edge.a+'|'+edge.b);
  if (story) return {...edge,...story};
  const band = [artists[edge.a],artists[edge.b]].find(isBand);
  if (edge.type === 'member' && band) {
    const member = artists[other(edge,band.id)];
    return {...edge,title:displayName(band)+' membership',
      detail:`${displayName(member)} appears in the documented lineup of ${displayName(band)}. See the source for roles and tenure.`};
  }
  return edge;
}
const displayYear = year => (language === 'en' ? englishYearWords[year] : null) ?? year;
function displaySource(source) {
  if (language === 'zh') return source[0];
  const url = new URL(source[1]);
  const labels = {'www.youtube.com':'Video or recording credits','en.wikipedia.org':'Wikipedia · band history and lineup',
    'musicbrainz.org':'MusicBrainz · release credits','www.loc.gov':'Library of Congress','rockhall.com':'Rock & Roll Hall of Fame',
    'www.nobelprize.org':'The Nobel Prize','www.cna.com.tw':'Central News Agency','www.georgeharrison.com':'George Harrison archives'};
  return labels[url.hostname] ?? url.hostname.replace(/^www\./,'');
}
function count(value,unit) {
  const singular = {nodes:'node',edges:'relationship',personUnit:'person',bandUnit:'band'};
  return `${value} ${language === 'en' && value === 1 ? singular[unit] : t(unit)}`;
}


function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function avatar(person, label = '') {
  const img = portraits[person.id];
  const initials = displayName(person).replace(/^The /,'').split(/\s+/).slice(0,3).map(word => word[0]).join('');
  const alt = label ? ` role="img" aria-label="${escapeHTML(label)}"` : ' aria-hidden="true"';
  return `<span class="avatar${isBand(person) ? ' group' : ''}"${alt}>${escapeHTML(initials)}${img ? `<img src="${escapeHTML(img.path)}" alt="" loading="lazy" draggable="false">` : ''}</span>`;
}

const counts = {
  people: entries.filter(person => !isBand(person)).length,
  bands: entries.filter(isBand).length
};


function searchMatches(query) {
  const normalize = value => value.normalize('NFKD').toLowerCase().replace(/[\p{P}\p{M}\s]/gu,'');
  const term = normalize(query);
  if (!term) return [];
  return entries.map(person => {
    const name = normalize(person.name);
    const rank = name === term ? 0 : name.startsWith(term) ? 1 : name.includes(term) ? 2
      : (normalize(person.aliases).includes(term) || normalize(englishNames[person.id] ?? '').includes(term)) ? 3 : 4;
    return {person,rank};
  }).filter(result => result.rank < 4).sort((a,b) => a.rank-b.rank).map(result => result.person);
}

const query = $('query');
const searchResults = $('search-results');
function renderSearch() {
  const term = query.value.trim();
  searchResults.hidden = !term;
  const matches = searchMatches(term).slice(0,12);
  searchResults.innerHTML = matches.length ? matches.map(person =>
    `<a href="${mapLink(person.id)}">${avatar(person)}<span><strong>${escapeHTML(displayName(person))}</strong><small>${escapeHTML(displayScene(person))}</small></span></a>`
  ).join('') : `<p>${t('noResults')}</p>`;
  return matches;
}
query.addEventListener('input',renderSearch);
query.addEventListener('focus',renderSearch);
$('search').addEventListener('submit',event => {
  event.preventDefault();
  const [match] = renderSearch();
  if (match) {
    location.hash = mapLink(match.id);
    searchResults.hidden = true;
    query.blur();
  }
});
searchResults.addEventListener('click',event => {
  if (event.target.closest('a')) searchResults.hidden = true;
});
document.addEventListener('pointerdown',event => {
  if (!$('search').contains(event.target)) searchResults.hidden = true;
});
document.addEventListener('keydown',event => {
  if (event.key === 'Escape') searchResults.hidden = true;
  if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.target.closest('input, textarea, select, [contenteditable]') && !$('relation-dialog').open) {
    event.preventDefault();
    query.focus();
  }
  if (event.key === 'ArrowDown' && event.target === query && !searchResults.hidden) {
    const first = searchResults.querySelector('a');
    if (first) { event.preventDefault(); first.focus(); }
  }
});

function activeEdges() {
  return (byArtist[selected] ?? []).filter(edge => filter === 'all' || edge.type === filter);
}

function renderFilters() {
  const list = ['all',...Object.keys(types)].map(type => [type,t(type)]);
  $('filters').innerHTML = list.map(([type,name]) =>
    `<button type="button" data-filter="${type}" aria-pressed="${filter === type}">${type === 'all' ? '' : `<i class="${type}"></i>`}${name}</button>`
  ).join('');
}
$('filters').addEventListener('click',event => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  filter = button.dataset.filter;
  updateMap();
  $('filters').querySelector(`[data-filter="${filter}"]`).focus();
});

function renderProfile(edges) {
  const p = artists[selected];
  const image = portraits[selected];
  const wiki = 'https://en.wikipedia.org/wiki/' + encodeURIComponent(p.wiki.replaceAll(' ','_'));
  const credit = image ? `<a href="${escapeHTML(image.url)}" target="_blank" rel="noopener" title="${escapeHTML(image.author)} · ${escapeHTML(image.license)}">${t('credit')}</a>` : '';
  const connections = edges.map(edge => {
    const person = artists[other(edge,selected)];
    return `<button class="connection" data-edge="${edge.index}" type="button">${avatar(person)}
      <span><strong>${escapeHTML(displayName(person))}</strong><small>${escapeHTML(displayStory(edge).title)}</small></span>
      <i class="signal ${edge.type}" aria-hidden="true"></i></button>`;
  }).join('');
  $('profile').innerHTML = `
    <button class="profile-close" type="button" aria-label="${t('close')}">×</button>
    <div class="profile-cover"><figure class="profile-portrait">${avatar(p,image ? (language === 'en' ? t('photo')+' '+displayName(p) : displayName(p)+' '+t('photo')) : '')}${credit}</figure></div>
    <div class="profile-text"><span class="scene">${escapeHTML(displayScene(p))}</span><h2>${escapeHTML(displayName(p))}</h2>
      <p>${escapeHTML(displayBio(p))} <a href="${wiki}" target="_blank" rel="noopener">${t('archive')}</a></p></div>
    <div class="connection-head">${t('direct')} <span>${edges.length}</span></div>
    <div class="connections">${connections || `<p class="empty">${t('noEdges')}</p>`}</div>`;
}

const graph = $('graph');
const rootStyle = getComputedStyle(document.documentElement);
const color = token => rootStyle.getPropertyValue('--'+token).trim();
const landmarks = new Set(['nico','dylan','the-rolling-stones','the-clash','beatles','oasis','zeppelin','nirvana',
  'queen','radiohead','metallica','pink-floyd','no-party-for-cao-dong']);
const cy = cytoscape({
  container: graph,
  elements: [
    ...entries.map(person => ({
      data: {id:person.id,name:displayName(person)},
      position: atlasPositions[person.id],
      classes: [isBand(person) ? 'band' : 'artist', landmarks.has(person.id) ? 'landmark' : ''].join(' ')
    })),
    ...relations.map(edge => ({
      data: {id:'edge-'+edge.index,source:edge.a,target:edge.b,index:edge.index},
      classes: edge.type
    }))
  ],
  layout: {name:'preset',fit:false},
  style: [
    {selector:'node',style:{
      width:14,height:14,'background-color':color('node'),label:'data(name)',
      'font-family':'Georgia, Songti SC, serif','font-size':14,color:color('white'),'text-margin-y':-5,
      'text-background-color':color('dark'),'text-background-opacity':.88,'text-background-padding':2,
      'min-zoomed-font-size':10,'overlay-opacity':0
    }},
    {selector:'.band',style:{shape:'diamond',width:25,height:25,'background-color':color('accent')}},
    {selector:'.landmark',style:{width:27,height:27,'font-size':39,'font-weight':700,'min-zoomed-font-size':6}},
    {selector:'edge',style:{width:1.65,'curve-style':'straight',opacity:.63,'overlay-opacity':0,'line-color':color('record')}},
    ...typeEntries.map(([type]) => ({selector:'edge.'+type,style:{'line-color':color(type)}})),
    {selector:'edge.parallel',style:{'curve-style':'bezier'}},
    {selector:'edge.filtered',style:{display:'none'}},
    {selector:'.muted',style:{opacity:.23}},
    {selector:'edge.related',style:{opacity:1,width:3}},
    {selector:'node.related',style:{'border-width':2,'border-color':color('accent')}},
    {selector:'node.active-node',style:{'border-width':4,'border-color':color('white'),'background-color':color('accent')}},
    {selector:'node.hovered',style:{'z-index':10,'min-zoomed-font-size':0,'font-size':24,'font-weight':700,
      'border-width':2,'border-color':color('white')}},
    {selector:'edge.hovered',style:{opacity:1,width:4}}
  ],
  minZoom:.025,maxZoom:3.4,
  autoungrabify:true,autounselectify:true,boxSelectionEnabled:false
});
cy.edges().forEach(edge => { if (edge.parallelEdges().length > 1) edge.addClass('parallel'); });

function fitNetwork() {
  cy.resize();
  cy.fit(cy.nodes(),30);
}
function centerArtist(id) {
  const node = cy.getElementById(id);
  cy.resize();
  cy.fit(node.closedNeighborhood().nodes(), Math.min(46,graph.clientWidth/8));
  if (cy.zoom() > 1.15) cy.zoom(1.15);
  cy.center(node);
}
function updateMap() {
  const edges = activeEdges();
  const total = filter === 'all' ? relations.length : relations.filter(edge => edge.type === filter).length;
  renderFilters();
  cy.batch(() => {
    cy.edges().forEach(edge => edge.toggleClass('filtered',filter !== 'all' && !edge.hasClass(filter)));
    cy.elements().removeClass('muted related active-node');
    if (!selected) return;
    const active = cy.getElementById(selected).addClass('active-node');
    const neighborhood = edges.reduce((items,edge) =>
      items.union(cy.getElementById(other(edge,selected))).union(cy.getElementById('edge-'+edge.index)),active);
    cy.elements().difference(neighborhood).addClass('muted');
    neighborhood.difference(active).addClass('related');
  });
  $('network-count').textContent = `${count(entries.length,'nodes')} · ${count(total,'edges')}`;
  $('profile').hidden = !selected;
  $('workspace').classList.toggle('inspecting',Boolean(selected));
  if (selected) renderProfile(edges);
}
let keepCamera = false;
cy.on('tap','node',event => {
  const id = event.target.id();
  if (id === selected) return;
  keepCamera = true;
  location.hash = mapLink(id);
});
cy.on('tap','edge',event => openRelation(event.target.data('index')));
cy.on('mouseover','node,edge',event => {
  event.target.addClass('hovered');
  graph.style.cursor = 'pointer';
});
cy.on('mouseout','node,edge',event => {
  event.target.removeClass('hovered');
  graph.style.cursor = '';
});
$('profile').addEventListener('click',event => {
  if (event.target.closest('.profile-close')) location.hash = '#map';
});
function changeZoom(multiplier) {
  cy.zoom({level:cy.zoom()*multiplier,renderedPosition:{x:cy.width()/2,y:cy.height()/2}});
}
$('zoom-in').addEventListener('click',() => changeZoom(1.35));
$('zoom-out').addEventListener('click',() => changeZoom(1/1.35));
$('zoom-reset').addEventListener('click',fitNetwork);

const dialog = $('relation-dialog');
function openRelation(index) {
  const edge = displayStory(relations[index]);
  const src = sources[edge.ref];
  $('dialog-content').innerHTML = `<span class="scene">${t(edge.type)} · ${escapeHTML(displayYear(edge.year))}</span>
    <h2 id="dialog-title">${escapeHTML(displayStory(edge).title)}</h2><p>${escapeHTML(edge.detail)}</p>
    <p><a href="${escapeHTML(src[1])}" target="_blank" rel="noopener">${t('source')} · ${escapeHTML(displaySource(src))}</a></p>
    <div class="dialog-people">${[edge.a,edge.b].map(id => `<a href="${mapLink(id)}">${avatar(artists[id])}${escapeHTML(displayName(artists[id]))}</a>`).join('')}</div>`;
  dialog.showModal();
}
document.addEventListener('click',event => {
  const button = event.target.closest('button[data-edge]');
  if (button) openRelation(Number(button.dataset.edge));
});
dialog.addEventListener('click',event => {
  if (event.target === dialog || event.target.closest('.close, a[href^="#map/"]')) dialog.close();
});

function renderDirectory() {
  const shown = entries.filter(person => category === 'all' || (category === 'band') === isBand(person))
    .sort((a,b) => Number(preferred.has(b.id))-Number(preferred.has(a.id)));
  $('directory-grid').innerHTML = shown.map(person => `<a class="artist-card" href="${mapLink(person.id)}">
    ${avatar(person)}<strong>${escapeHTML(displayName(person))}</strong><small>${escapeHTML(displayScene(person))} · ${count(byArtist[person.id].length,'edges')}</small></a>`).join('');
}
$('directory').addEventListener('click',event => {
  const button = event.target.closest('[data-kind]');
  if (!button) return;
  category = button.dataset.kind;
  $('directory').querySelectorAll('[data-kind]').forEach(item => item.setAttribute('aria-pressed',item === button));
  renderDirectory();
});

function shortestPath(from,to,type) {
  const queue = [from];
  const previous = new Map([[from,null]]);
  for (const id of queue) {
    if (id === to) break;
    for (const edge of byArtist[id]) {
      if (type !== 'all' && edge.type !== type) continue;
      const next = other(edge,id);
      if (previous.has(next)) continue;
      previous.set(next,edge);
      queue.push(next);
    }
  }
  if (!previous.has(to)) return null;
  const steps = [];
  for (let id = to; id !== from;) {
    const edge = previous.get(id);
    steps.unshift([id,edge]);
    id = other(edge,id);
  }
  return steps;
}
function updatePathOptions() {
  const options = entries.map(person => `<option value="${person.id}">${escapeHTML(displayName(person))}</option>`).join('');
  for (const [control,fallback] of [['path-from','lou'],['path-to','rivers']]) {
    const select = $(control);
    const previous = select.value || fallback;
    select.innerHTML = options;
    select.value = previous;
  }
}
function renderPath() {
  const from = $('path-from').value;
  const to = $('path-to').value;
  const result = $('path-results');
  const path = shortestPath(from,to,$('path-type').value);
  if (!path) { result.innerHTML = `<p>${t('noPath')}</p>`; return; }
  if (!path.length) { result.innerHTML = `<p>${t('samePath')}</p>`; return; }
  const stepLink = id => `<a href="${mapLink(id)}">${escapeHTML(displayName(artists[id]))}</a>`;
  result.innerHTML = `<p>${t('shortest')} · ${count(path.length,'edges')}</p>
    <ol class="path-list"><li>${stepLink(from)}</li>${path.map(([id,edge]) =>
      `<li>${stepLink(id)}<button type="button" data-edge="${edge.index}">${t(edge.type)} · ${escapeHTML(displayStory(edge).title)}</button></li>`
    ).join('')}</ol>`;
}
$('path-form').addEventListener('submit',event => { event.preventDefault(); renderPath(); });

function route() {
  const [name,id] = location.hash.slice(1).split('/');
  const tab = ['directory','paths'].includes(name) ? name : 'map';
  for (const candidate of ['map','directory','paths']) $(candidate).hidden = candidate !== tab;
  document.querySelectorAll('nav a').forEach(link => {
    if (link.dataset.tab === tab) link.setAttribute('aria-current','page'); else link.removeAttribute('aria-current');
  });
  searchResults.hidden = true;
  if (tab === 'map') {
    selected = Object.hasOwn(artists,id) ? id : null;
    filter = initialType;
    const previousCenter = keepCamera ? {x:cy.width()/2,y:cy.height()/2} : null;
    keepCamera = false;
    updateMap();
    if (!selected) fitNetwork();
    else if (!previousCenter) centerArtist(selected);
    else {
      cy.resize();
      cy.panBy({x:cy.width()/2-previousCenter.x,y:cy.height()/2-previousCenter.y});
    }
    if (selected && matchMedia('(max-width:760px)').matches) $('profile').scrollIntoView({block:'start'});
  }
  if (tab === 'directory') renderDirectory();
  if (tab === 'paths') renderPath();
}
window.addEventListener('hashchange',route);
let lastSize = '';
new ResizeObserver(() => {
  const size = `${graph.clientWidth}x${graph.clientHeight}`;
  if (!graph.clientWidth || size === lastSize) return;
  lastSize = size;
  cy.resize();
  if (!selected && !$('map').hidden) fitNetwork();
}).observe(graph);
function updateLanguage() {
  document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN';
  document.title = t('title');
  document.querySelectorAll('[data-copy]').forEach(element => { element.textContent = t(element.dataset.copy); });
  const labels = {
    'nav':'navigation','#search':'searchRegion','#query':'search','#graph':'graphRegion','#filters':'filters',
    '.zoom':'zoom','#zoom-in':'zoomIn','#zoom-out':'zoomOut','#zoom-reset':'fit','#profile':'profile',
    '#directory .segments':'indexFilter','#relation-dialog .close':'close','#map':'map','.network':'network'
  };
  for (const [selector,key] of Object.entries(labels)) document.querySelector(selector).setAttribute('aria-label',t(key));
  query.placeholder = t('placeholder');
  $('language').lang = language === 'en' ? 'zh-CN' : 'en';
  $('language').textContent = language === 'en' ? '中文' : 'English';
  $('language').setAttribute('aria-label',language === 'en' ? '切换到中文' : 'Switch to English');
  $('counts').textContent = `${count(counts.people,'personUnit')} · ${count(counts.bands,'bandUnit')} · ${count(relations.length,'edges')}`;
  cy.batch(() => cy.nodes().forEach(node => node.data('name',displayName(artists[node.id()]))));
  updatePathOptions();
  const pathType = $('path-type');
  const lastType = pathType.value || 'all';
  pathType.innerHTML = ['all',...Object.keys(types)].map(type =>
    `<option value="${type}">${t(type === 'all' ? 'any' : type)}</option>`).join('');
  pathType.value = lastType;
  if (!$('map').hidden) updateMap();
  if (!$('directory').hidden) renderDirectory();
  if (!$('paths').hidden) renderPath();
}
$('language').addEventListener('click',() => {
  language = language === 'en' ? 'zh' : 'en';
  try { localStorage.setItem('rock-atlas.language',language); } catch {}
  updateLanguage();
});
updateLanguage();
route();
