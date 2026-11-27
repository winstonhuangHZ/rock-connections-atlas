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
let sortMode = 'featured';
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
  for (const role of ['from', 'to']) {
    const picker = document.querySelector(`[data-picker="${role}"]`);
    if (picker && !picker.contains(event.target)) closePathPicker(role);
  }
});
document.addEventListener('keydown',event => {
  if (event.key === 'Escape') searchResults.hidden = true;
  if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.target.closest('input, textarea, select, [contenteditable]') && !$('intro').hidden && !$('relation-dialog').open) {
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
// Native Cytoscape label styles from the original atlas (8faf9da).
const classicLabels = [
  {selector:'node.classic-label',style:{
    label:'data(name)','font-family':'Spectral, Georgia, Songti SC, serif','font-size':13.5,color:color('white'),
    'text-margin-y':-6,'text-background-color':color('dark'),'text-background-opacity':.9,
    'text-background-padding':2.5,'min-zoomed-font-size':11.5
  }},
  {selector:'node.classic-label.leaf',style:{'font-size':12.5,'min-zoomed-font-size':14.5}},
  {selector:'node.classic-label.band',style:{'font-size':15,'font-weight':600,'min-zoomed-font-size':8.5}},
  {selector:'node.classic-label.hub',style:{'font-size':18,'font-weight':600,'min-zoomed-font-size':7}},
  {selector:'node.classic-label.band.hub',style:{'font-size':19,'font-weight':600,'min-zoomed-font-size':6.8}},
  {selector:'node.classic-label.landmark',style:{'font-size':32,'font-weight':700,'min-zoomed-font-size':4.8}},
  {selector:'node.classic-label.related',style:{'min-zoomed-font-size':0,'font-size':17,'font-weight':600}},
  {selector:'node.classic-label.active-node',style:{'min-zoomed-font-size':0,'font-size':24,'font-weight':700}},
  {selector:'node.classic-label.hovered',style:{'min-zoomed-font-size':0,'font-size':22,'font-weight':700}}
];
const landmarks = new Set(['nico','dylan','the-rolling-stones','the-clash','beatles','oasis','zeppelin','nirvana',
  'queen','radiohead','metallica','pink-floyd']);
const wideGraph = matchMedia('(min-width: 1000px)');
const graphPositions = spreadGraphPositions(atlasPositions, wideGraph.matches);
const cy = cytoscape({
  container: graph,
  elements: [
    ...entries.map(person => ({
      data: {id:person.id,name:displayName(person)},
      position: graphPositions[person.id],
      classes: [isBand(person) ? 'band' : 'artist', landmarks.has(person.id) ? 'landmark' : byArtist[person.id].length >= 6 ? 'hub' : byArtist[person.id].length === 1 ? 'leaf' : ''].filter(Boolean).join(' ')
    })),
    ...relations.map(edge => ({
      data: {id:'edge-'+edge.index,source:edge.a,target:edge.b,index:edge.index},
      classes: edge.type
    }))
  ],
  layout: {name:'preset',fit:false},
  style: [
    {selector:'node',style:{
      width:13,height:13,'background-color':color('node'),'overlay-opacity':0
    }},
    {selector:'.leaf',style:{width:11,height:11}},
    {selector:'.band',style:{shape:'diamond',width:24,height:24,'background-color':color('accent')}},
    {selector:'.hub',style:{width:20,height:20}},
    {selector:'.band.hub',style:{width:28,height:28}},
    {selector:'.landmark',style:{width:30,height:30,'border-width':2,'border-color':color('dark')}},
    {selector:'edge',style:{width:1.45,'curve-style':'straight',opacity:.52,'overlay-opacity':0,'line-color':color('record')}},
    ...typeEntries.map(([type]) => ({selector:'edge.'+type,style:{'line-color':color(type)}})),
    {selector:'edge.parallel',style:{'curve-style':'bezier'}},
    {selector:'edge.filtered',style:{display:'none'}},
    {selector:'.muted',style:{opacity:.18}},
    {selector:'edge.related',style:{opacity:1,width:2.8}},
    {selector:'node.related',style:{'border-width':2,'border-color':color('accent')}},
    {selector:'node.active-node',style:{'border-width':4,'border-color':color('white'),'background-color':color('accent')}},
    {selector:'node.hovered',style:{'z-index':10,
      'border-width':2.5,'border-color':color('white')}},
    {selector:'edge.hovered',style:{opacity:1,width:3.6}},
    ...classicLabels
  ],
  minZoom:.025,maxZoom:3.4,
  autoungrabify:true,autounselectify:true,boxSelectionEnabled:false
});
cy.edges().forEach(edge => { if (edge.parallelEdges().length > 1) edge.addClass('parallel'); });
const updateGraphLabels = createGraphLabels(cy);
const labelModeControl = $('label-mode');
const labelModePreference = 'rock-atlas.label-mode';
function applyLabelMode() {
  const classic = labelModeControl.value === 'classic';
  graph.classList.toggle('classic-labels',classic);
  cy.batch(() => cy.nodes().toggleClass('classic-label',classic));
  if (!classic) updateGraphLabels();
}
try {
  if (localStorage.getItem(labelModePreference) === 'classic') labelModeControl.value = 'classic';
} catch {}
applyLabelMode();
labelModeControl.addEventListener('change', () => {
  applyLabelMode();
  try { localStorage.setItem(labelModePreference,labelModeControl.value); } catch {}
});

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
wideGraph.addEventListener('change', event => {
  const positions = spreadGraphPositions(atlasPositions, event.matches);
  cy.batch(() => cy.nodes().positions(node => positions[node.id()]));
  if ($('map').hidden) return;
  if (selected) centerArtist(selected);
  else fitNetwork();
  updateGraphLabels();
});
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
  updateGraphLabels();
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
  if (event.target.isNode()) updateGraphLabels();
});
cy.on('mouseout','node,edge',event => {
  event.target.removeClass('hovered');
  graph.style.cursor = '';
  if (event.target.isNode()) updateGraphLabels();
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
    <div class="dialog-people${edge.direction ? ' directed' : ''}">${[edge.a,edge.b].map(id => `<a href="${mapLink(id)}">${avatar(artists[id])}${escapeHTML(displayName(artists[id]))}</a>`).join(edge.direction ? `<span role="img" aria-label="${t('direction')}">→</span>` : '')}</div>`;
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
    .sort((a,b) => {
      if (sortMode === 'degree') {
        return byArtist[b.id].length - byArtist[a.id].length || displayName(a).localeCompare(displayName(b), language === 'en' ? 'en' : 'zh-CN');
      }
      if (sortMode === 'alpha') {
        return displayName(a).localeCompare(displayName(b), language === 'en' ? 'en' : 'zh-CN');
      }
      return Number(preferred.has(b.id)) - Number(preferred.has(a.id))
        || Number(Boolean(portraits[b.id])) - Number(Boolean(portraits[a.id]))
        || byArtist[b.id].length - byArtist[a.id].length
        || displayName(a).localeCompare(displayName(b), language === 'en' ? 'en' : 'zh-CN');
    });
  const meta = $('directory-count');
  if (meta) {
    const unit = category === 'band' ? 'bandUnit' : category === 'artist' ? 'personUnit' : 'nodes';
    meta.textContent = count(shown.length, unit);
  }
  $('directory-grid').innerHTML = shown.map(person => {
    const hasPhoto = Boolean(portraits[person.id]);
    const badge = isBand(person) ? t('bands') : t('artists');
    const bio = displayBio(person);
    return `<a class="artist-card${hasPhoto ? ' has-photo' : ''}" href="${mapLink(person.id)}">
      <div class="card-media">${avatar(person)}<span class="card-badge">${escapeHTML(badge)}</span><span class="card-degree">${count(byArtist[person.id].length,'edges')}</span></div>
      <div class="card-body"><strong>${escapeHTML(displayName(person))}</strong><small>${escapeHTML(displayScene(person))}</small>${bio ? `<p class="card-bio">${escapeHTML(bio)}</p>` : ''}</div></a>`;
  }).join('');
}
$('directory').addEventListener('click',event => {
  const kindBtn = event.target.closest('[data-kind]');
  if (kindBtn) {
    category = kindBtn.dataset.kind;
    $('directory').querySelectorAll('[data-kind]').forEach(item => item.setAttribute('aria-pressed',item === kindBtn));
    renderDirectory();
    return;
  }
  const sortBtn = event.target.closest('[data-sort]');
  if (sortBtn) {
    sortMode = sortBtn.dataset.sort;
    $('directory').querySelectorAll('[data-sort]').forEach(item => item.setAttribute('aria-pressed',item === sortBtn));
    renderDirectory();
  }
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
const defaultPathSuggestions = [
  ...['lou','rivers','dylan','beatles','bowie','queen','nirvana','oasis','the-clash','zeppelin','pink-floyd','metallica','radiohead','chuck-berry']
    .filter(id => artists[id]).map(id => artists[id]),
  ...entries
].filter((person, index, list) => list.indexOf(person) === index);

function setPathEndpoint(role, id) {
  const hidden = $('path-' + role);
  const input = $('path-' + role + '-query');
  const dropdown = $('path-' + role + '-results');
  const badge = $('path-' + role + '-avatar');
  if (!artists[id]) return;
  hidden.value = id;
  input.value = displayName(artists[id]);
  if (badge) badge.innerHTML = avatar(artists[id]);
  dropdown.hidden = true;
  input.setAttribute('aria-expanded', 'false');
}

function renderPathPicker(role, filterText = '') {
  const hidden = $('path-' + role);
  const input = $('path-' + role + '-query');
  const dropdown = $('path-' + role + '-results');
  const term = filterText.trim();
  const matches = (term ? searchMatches(term) : defaultPathSuggestions).slice(0, 24);
  dropdown.innerHTML = matches.length
    ? matches.map((person, idx) => `<button type="button" role="option" class="path-option${person.id === hidden.value ? ' is-selected' : ''}${idx === 0 ? ' is-active' : ''}" data-role="${role}" data-id="${person.id}">${avatar(person)}<span><strong>${escapeHTML(displayName(person))}</strong><small>${escapeHTML(displayScene(person))} · ${count(byArtist[person.id].length,'edges')}</small></span></button>`).join('')
    : `<p class="path-empty">${t('noResults')}</p>`;
  dropdown.hidden = false;
  input.setAttribute('aria-expanded', 'true');
  return matches;
}

function closePathPicker(role) {
  const hidden = $('path-' + role);
  const input = $('path-' + role + '-query');
  const dropdown = $('path-' + role + '-results');
  if (!dropdown) return;
  dropdown.hidden = true;
  input.setAttribute('aria-expanded', 'false');
  if (artists[hidden.value]) input.value = displayName(artists[hidden.value]);
}

for (const role of ['from', 'to']) {
  const input = $('path-' + role + '-query');
  const dropdown = $('path-' + role + '-results');
  input.addEventListener('focus', () => {
    closePathPicker(role === 'from' ? 'to' : 'from');
    input.select();
    renderPathPicker(role, '');
  });
  input.addEventListener('input', () => {
    renderPathPicker(role, input.value);
  });
  input.addEventListener('keydown', event => {
    const options = [...dropdown.querySelectorAll('.path-option')];
    const currentIdx = options.findIndex(el => el.classList.contains('is-active'));
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (dropdown.hidden) { renderPathPicker(role, ''); return; }
      if (!options.length) return;
      const nextIdx = (currentIdx + 1) % options.length;
      options.forEach((el, i) => el.classList.toggle('is-active', i === nextIdx));
      options[nextIdx].scrollIntoView({ block: 'nearest' });
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (dropdown.hidden || !options.length) return;
      const nextIdx = (currentIdx - 1 + options.length) % options.length;
      options.forEach((el, i) => el.classList.toggle('is-active', i === nextIdx));
      options[nextIdx].scrollIntoView({ block: 'nearest' });
    } else if (event.key === 'Enter') {
      if (!dropdown.hidden) {
        event.preventDefault();
        const active = dropdown.querySelector('.path-option.is-active') || options[0];
        if (active) {
          setPathEndpoint(role, active.dataset.id);
          renderPath();
        }
      }
    } else if (event.key === 'Escape') {
      closePathPicker(role);
      input.blur();
    }
  });
  dropdown.addEventListener('pointerdown', event => {
    const btn = event.target.closest('.path-option');
    if (!btn) return;
    event.preventDefault();
    setPathEndpoint(role, btn.dataset.id);
    renderPath();
  });
}

$('path-swap').addEventListener('click', () => {
  const fromId = $('path-from').value;
  const toId = $('path-to').value;
  setPathEndpoint('from', toId);
  setPathEndpoint('to', fromId);
  renderPath();
});

function updatePathOptions() {
  for (const [role, fallback] of [['from', 'lou'], ['to', 'rivers']]) {
    const hidden = $('path-' + role);
    const input = $('path-' + role + '-query');
    const badge = $('path-' + role + '-avatar');
    const id = artists[hidden.value] ? hidden.value : fallback;
    hidden.value = id;
    input.value = displayName(artists[id]);
    input.placeholder = t('pathSearchPlaceholder');
    if (badge) badge.innerHTML = avatar(artists[id]);
  }
  const swap = $('path-swap');
  if (swap) {
    swap.setAttribute('aria-label', t('swapEndpoints'));
    swap.title = t('swapEndpoints');
  }
}
function renderPath() {
  const from = $('path-from').value;
  const to = $('path-to').value;
  const result = $('path-results');
  const path = shortestPath(from,to,$('path-type').value);
  if (!path) { result.innerHTML = `<p class="path-summary">${t('noPath')}</p>`; return; }
  if (!path.length) { result.innerHTML = `<p class="path-summary">${t('samePath')}</p>`; return; }
  const stepNode = (id, stepNum) => {
    const p = artists[id];
    return `<a class="path-node" href="${mapLink(id)}"><span class="path-index">${String(stepNum).padStart(2,'0')}</span>${avatar(p)}<span class="path-node-text"><strong>${escapeHTML(displayName(p))}</strong><small>${escapeHTML(displayScene(p))}</small></span></a>`;
  };
  result.innerHTML = `<div class="path-summary-bar"><span>${t('shortest')}</span><b>${count(path.length,'edges')}</b></div>
    <ol class="path-list"><li class="path-step is-origin">${stepNode(from, 1)}<span class="path-origin-tag">${escapeHTML(t('from'))}</span></li>${path.map(([id,edge], idx) => {
      const story = displayStory(edge);
      return `<li class="path-step">${stepNode(id, idx + 2)}<button class="path-edge-btn" type="button" data-edge="${edge.index}"><i class="signal ${edge.type}" aria-hidden="true"></i><span class="path-edge-copy"><strong>${escapeHTML(story.title)}</strong><small>${escapeHTML(t(edge.type))} · ${escapeHTML(displayYear(edge.year))}</small></span></button></li>`;
    }).join('')}</ol>`;
}
$('path-form').addEventListener('submit',event => {
  event.preventDefault();
  for (const role of ['from', 'to']) {
    const input = $('path-' + role + '-query');
    const hidden = $('path-' + role);
    const typed = input.value.trim();
    if (typed && typed !== displayName(artists[hidden.value])) {
      const [match] = searchMatches(typed);
      if (match) setPathEndpoint(role, match.id);
    }
    closePathPicker(role);
  }
  renderPath();
});
$('path-type').addEventListener('change', renderPath);

function route() {
  const [name,id] = location.hash.slice(1).split('/');
  const tabs = ['map','directory','paths','attribution'];
  const tab = tabs.includes(name) ? name : 'map';
  for (const candidate of tabs) $(candidate).hidden = candidate !== tab;
  $('intro').hidden = tab === 'attribution';
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
    '#directory [data-role="kind"]':'indexFilter','#directory [data-role="sort"]':'indexSort','#relation-dialog .close':'close','#map':'map','.network':'network'
  };
  for (const [selector,key] of Object.entries(labels)) document.querySelector(selector).setAttribute('aria-label',t(key));
  query.placeholder = t('placeholder');
  $('language').lang = language === 'en' ? 'zh-CN' : 'en';
  $('language').textContent = language === 'en' ? '中文' : 'English';
  $('language').setAttribute('aria-label',language === 'en' ? '切换到中文' : 'Switch to English');
  $('counts').textContent = `${count(counts.people,'personUnit')} · ${count(counts.bands,'bandUnit')} · ${count(relations.length,'edges')}`;
  renderFilters();
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
