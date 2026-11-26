// Selected historical members. These records do not imply simultaneous tenure.
const lineups = `
The Rolling Stones|英国|蓝调摇滚|滚石乐队 滚石|Mick Jagger;Keith Richards;Brian Jones;Charlie Watts;Bill Wyman;Mick Taylor;Ronnie Wood;Ian Stewart~Ian Stewart (musician)
The Clash|英国|朋克摇滚|冲撞乐队 冲突乐队|Joe Strummer;Mick Jones~Mick Jones (The Clash guitarist);Paul Simonon;Topper Headon;Terry Chimes;Keith Levene
Sex Pistols|英国|朋克摇滚|性手枪|Johnny Rotten~John Lydon;Steve Jones~Steve Jones (musician);Paul Cook;Glen Matlock;Sid Vicious
Public Image Ltd|英国|后朋克|公共形象有限公司|Johnny Rotten~John Lydon;Keith Levene;Jah Wobble;Martin Atkins;Lu Edmonds
Ramones|美国|朋克摇滚|雷蒙斯 雷蒙斯乐队|Joey Ramone;Johnny Ramone;Dee Dee Ramone;Tommy Ramone;Marky Ramone;C. J. Ramone;Richie Ramone
Blondie|美国|新浪潮|金发女郎|Debbie Harry;Chris Stein;Clem Burke;Jimmy Destri;Nigel Harrison;Frank Infante;Gary Valentine~Gary Valentine (musician)
Talking Heads|美国|新浪潮|传声头像|David Byrne;Tina Weymouth;Chris Frantz;Jerry Harrison
Tom Tom Club|美国|新浪潮||Tina Weymouth;Chris Frantz
Television~Television (band)|美国|后朋克|电视乐队|Tom Verlaine;Richard Lloyd~Richard Lloyd (guitarist);Fred Smith~Fred Smith (bassist);Billy Ficca;Richard Hell
The Heartbreakers|美国|朋克摇滚||Johnny Thunders;Jerry Nolan;Richard Hell;Walter Lure
New York Dolls|美国|华丽摇滚|纽约妞|David Johansen;Johnny Thunders;Jerry Nolan;Sylvain Sylvain;Arthur Kane;Billy Murcia
The Damned~The Damned (band)|英国|朋克摇滚||Dave Vanian;Captain Sensible;Rat Scabies;Brian James~Brian James (guitarist);Algy Ward
Buzzcocks|英国|朋克摇滚||Pete Shelley;Steve Diggle;Howard Devoto;John Maher~John Maher (Buzzcocks drummer);Steve Garvey~Steve Garvey (musician)
Magazine~Magazine (band)|英国|后朋克||Howard Devoto;John McGeoch;Barry Adamson;Dave Formula;John Doyle~John Doyle (drummer)
Siouxsie and the Banshees|英国|后朋克||Siouxsie Sioux;Steven Severin;Budgie~Budgie (musician);John McGeoch;Robert Smith~Robert Smith (musician);John McKay~John McKay (musician)
The Cure|英国|后朋克|治疗乐队|Robert Smith~Robert Smith (musician);Simon Gallup;Lol Tolhurst;Porl Thompson~Pearl Thompson;Boris Williams;Roger O'Donnell;Reeves Gabrels;Jason Cooper
Joy Division|英国|后朋克|快乐分裂|Ian Curtis;Bernard Sumner;Peter Hook;Stephen Morris~Stephen Morris (musician)
New Order~New Order (band)|英国|后朋克|新秩序|Bernard Sumner;Peter Hook;Stephen Morris~Stephen Morris (musician);Gillian Gilbert;Phil Cunningham~Phil Cunningham (rock musician);Tom Chapman
The Smiths|英国|独立摇滚|史密斯乐队|Morrissey;Johnny Marr;Andy Rourke;Mike Joyce~Mike Joyce (musician);Craig Gannon
Electronic~Electronic (band)|英国|另类舞曲||Bernard Sumner;Johnny Marr
Modest Mouse|美国|独立摇滚|谦虚老鼠|Isaac Brock~Isaac Brock (musician);Jeremiah Green;Eric Judy;Johnny Marr;Tom Peloso
The Jam|英国|摩德复兴|果酱乐队|Paul Weller;Bruce Foxton;Rick Buckler
The Style Council|英国|流行摇滚||Paul Weller;Mick Talbot;Steve White~Steve White (drummer);Dee C. Lee
Blur~Blur (band)|英国|英伦摇滚|模糊乐队|Damon Albarn;Graham Coxon;Alex James~Alex James (musician);Dave Rowntree
Gorillaz|英国|另类摇滚|街头霸王 虚拟乐队|Damon Albarn;Jamie Hewlett
Pulp~Pulp (band)|英国|英伦摇滚|果浆乐队|Jarvis Cocker;Candida Doyle;Nick Banks;Steve Mackey;Russell Senior;Mark Webber~Mark Webber (guitarist)
Suede~Suede (band)|英国|英伦摇滚|山羊皮|Brett Anderson;Bernard Butler;Mat Osman;Simon Gilbert~Simon Gilbert (drummer);Richard Oakes~Richard Oakes (guitarist);Neil Codling
Elastica|英国|英伦摇滚||Justine Frischmann;Donna Matthews;Annie Holland;Justin Welch
The Stone Roses|英国|曼彻斯特摇滚|石玫瑰|Ian Brown;John Squire;Mani~Mani (musician);Reni~Reni (musician);Andy Couzens
Primal Scream|英国|另类摇滚|原始尖叫|Bobby Gillespie;Andrew Innes;Robert Young~Robert Young (musician);Mani~Mani (musician);Martin Duffy~Martin Duffy (musician)
The Jesus and Mary Chain|英国|噪音流行|耶稣与玛丽链|Jim Reid;William Reid~William Reid (musician);Douglas Hart;Bobby Gillespie;Ben Lurie
The Who|英国|摇滚|谁人乐队|Roger Daltrey;Pete Townshend;John Entwistle;Keith Moon;Kenney Jones
Small Faces|英国|摩德摇滚|小脸乐队|Steve Marriott;Ronnie Lane;Kenney Jones;Ian McLagan;Jimmy Winston
Faces~Faces (band)|英国|蓝调摇滚|脸乐队|Rod Stewart;Ronnie Wood;Ronnie Lane;Kenney Jones;Ian McLagan
Jeff Beck Group|英国|蓝调摇滚||@beck;Rod Stewart;Ronnie Wood;Nicky Hopkins;Micky Waller;Tony Newman~Tony Newman (drummer);Cozy Powell;Max Middleton;Bob Tench;Clive Chaman
Humble Pie~Humble Pie (band)|英国|蓝调摇滚||Steve Marriott;Peter Frampton;Greg Ridley;Jerry Shirley;Clem Clempson
The Kinks|英国|摇滚|奇想乐团|Ray Davies;Dave Davies;Pete Quaife;Mick Avory;John Dalton~John Dalton (musician);John Gosling~John Gosling (musician);Jim Rodford
The Animals|英国|蓝调摇滚|动物乐队|Eric Burdon;Alan Price;Chas Chandler;Hilton Valentine;John Steel~John Steel (drummer);Dave Rowberry;Barry Jenkins~Barry Jenkins (musician)
Jimi Hendrix Experience~The Jimi Hendrix Experience|英美|迷幻摇滚|吉米亨德里克斯体验|Jimi Hendrix;Noel Redding;Mitch Mitchell
Band of Gypsys|美国|蓝调摇滚||Jimi Hendrix;Billy Cox;Buddy Miles
Fleetwood Mac|英美|摇滚|佛利伍麦克|Mick Fleetwood;John McVie;Christine McVie;Stevie Nicks;Lindsey Buckingham;Peter Green~Peter Green (musician);Jeremy Spencer;Danny Kirwan;Bob Welch~Bob Welch (musician);Bob Weston~Bob Weston (guitarist)
John Mayall & the Bluesbreakers|英国|蓝调摇滚|布鲁斯破坏者|John Mayall;@clapton;Peter Green~Peter Green (musician);Mick Taylor;John McVie;Mick Fleetwood;@bruce;Hughie Flint;Aynsley Dunbar
The J. Geils Band|美国|蓝调摇滚||J. Geils;Peter Wolf;Seth Justman;Danny Klein;Magic Dick;Stephen Bladd
Black Sabbath|英国|重金属|黑色安息日|Ozzy Osbourne;Tony Iommi;Geezer Butler;Bill Ward~Bill Ward (musician);Ronnie James Dio;Vinny Appice;Ian Gillan;Glenn Hughes~Glenn Hughes (musician)
Deep Purple|英国|硬摇滚|深紫|Ritchie Blackmore;Jon Lord;Ian Paice;Ian Gillan;Roger Glover;David Coverdale;Glenn Hughes~Glenn Hughes (musician);Rod Evans;Nick Simper;Steve Morse;Don Airey
Rainbow~Rainbow (rock band)|英国|硬摇滚|彩虹乐队|Ritchie Blackmore;Ronnie James Dio;Cozy Powell;Roger Glover;Graham Bonnet;Joe Lynn Turner;Don Airey;Jimmy Bain
Whitesnake|英国|硬摇滚|白蛇|David Coverdale;Bernie Marsden;Micky Moody;Neil Murray~Neil Murray (British musician);Jon Lord;Ian Paice;Cozy Powell;John Sykes;Steve Vai
Dio~Dio (band)|美国|重金属|迪奥乐队|Ronnie James Dio;Vinny Appice;Jimmy Bain;Vivian Campbell;Claude Schnell
Def Leppard|英国|硬摇滚|威豹乐队|Joe Elliott;Rick Savage;Rick Allen~Rick Allen (drummer);Steve Clark;Phil Collen;Vivian Campbell;Pete Willis
Queen~Queen (band)|英国|摇滚|皇后乐队|Freddie Mercury;Brian May;Roger Taylor~Roger Taylor (Queen drummer);John Deacon
Guns N' Roses|美国|硬摇滚|枪炮与玫瑰 枪花|Axl Rose;Slash~Slash (musician);Duff McKagan;Izzy Stradlin;Steven Adler;Matt Sorum;Dizzy Reed
Velvet Revolver|美国|硬摇滚|丝绒左轮|Slash~Slash (musician);Duff McKagan;Matt Sorum;Scott Weiland;Dave Kushner
Stone Temple Pilots|美国|另类摇滚|石庙向导|Scott Weiland;Dean DeLeo;Robert DeLeo;Eric Kretz;Chester Bennington
Linkin Park|美国|另类摇滚|林肯公园|Chester Bennington;Mike Shinoda;Brad Delson;Dave Farrell;Joe Hahn;Rob Bourdon;Emily Armstrong
Soundgarden|美国|另类摇滚|声音花园|Chris Cornell;Kim Thayil;Ben Shepherd;Matt Cameron;Hiro Yamamoto
Pearl Jam|美国|另类摇滚|珍珠果酱|Eddie Vedder;Stone Gossard;Jeff Ament;Mike McCready;Matt Cameron;Dave Abbruzzese;Jack Irons;Dave Krusen
Temple of the Dog|美国|另类摇滚||Chris Cornell;Matt Cameron;Stone Gossard;Jeff Ament;Mike McCready;Eddie Vedder
Audioslave|美国|另类摇滚|音魔|Chris Cornell;Tom Morello;Tim Commerford;Brad Wilk
Rage Against the Machine|美国|另类摇滚|暴力反抗机器|Zack de la Rocha;Tom Morello;Tim Commerford;Brad Wilk
Red Hot Chili Peppers|美国|放克摇滚|红辣椒|Anthony Kiedis;Flea~Flea (musician);Chad Smith;John Frusciante;Hillel Slovak;Jack Irons;Dave Navarro;Josh Klinghoffer
Jane's Addiction|美国|另类摇滚||Perry Farrell;Dave Navarro;Eric Avery;Stephen Perkins
Pixies~Pixies (band)|美国|另类摇滚|小妖精|Black Francis;Kim Deal;Joey Santiago;David Lovering;Paz Lenchantin
The Breeders|美国|另类摇滚|繁殖者|Kim Deal;Kelley Deal;Josephine Wiggs;Jim Macpherson;Tanya Donelly
Throwing Muses|美国|另类摇滚||Kristin Hersh;Tanya Donelly;David Narcizo;Bernard Georges
Sonic Youth|美国|噪音摇滚|音速青年|Thurston Moore;Kim Gordon;Lee Ranaldo;Steve Shelley;Jim O'Rourke~Jim O'Rourke (musician)
The White Stripes|美国|车库摇滚|白色条纹|Jack White;Meg White
The Raconteurs|美国|车库摇滚||Jack White;Brendan Benson;Jack Lawrence~Jack Lawrence (musician);Patrick Keeler
The Dead Weather|美国|车库摇滚||Jack White;Alison Mosshart;Dean Fertita;Jack Lawrence~Jack Lawrence (musician)
The Kills|英美|车库摇滚||Alison Mosshart;Jamie Hince
AC/DC|澳大利亚|硬摇滚|交流直流|Angus Young;Malcolm Young;Bon Scott;Brian Johnson;Phil Rudd;Cliff Williams;Mark Evans~Mark Evans (musician);Stevie Young;Chris Slade
Metallica|美国|重金属|金属乐队|James Hetfield;Lars Ulrich;Kirk Hammett;Cliff Burton;Jason Newsted;Robert Trujillo;Dave Mustaine
Megadeth|美国|重金属|麦加帝斯|Dave Mustaine;David Ellefson;Marty Friedman~Marty Friedman (guitarist);Nick Menza;Chris Poland;Gar Samuelson;Kiko Loureiro
Slayer|美国|重金属|杀手乐队|Tom Araya;Kerry King;Jeff Hanneman;Dave Lombardo;Paul Bostaph;Gary Holt~Gary Holt (musician)
Exodus~Exodus (band)|美国|重金属||Kirk Hammett;Gary Holt~Gary Holt (musician);Tom Hunting;Paul Baloff;Steve Souza;Rob Dukes
U2|爱尔兰|摇滚||Bono;The Edge;Adam Clayton;Larry Mullen Jr.
R.E.M.|美国|另类摇滚||Michael Stipe;Peter Buck;Mike Mills;Bill Berry
Radiohead|英国|另类摇滚|电台司令|Thom Yorke;Jonny Greenwood;Colin Greenwood;Ed O'Brien;Philip Selway
The Smile~The Smile (band)|英国|艺术摇滚|微笑乐队|Thom Yorke;Jonny Greenwood;Tom Skinner~Tom Skinner (drummer)
Pink Floyd|英国|迷幻摇滚|平克弗洛伊德|Syd Barrett;Roger Waters;David Gilmour;Richard Wright~Richard Wright (musician);Nick Mason
Genesis~Genesis (band)|英国|前卫摇滚|创世纪乐队|Peter Gabriel;Phil Collins;Tony Banks~Tony Banks (musician);Mike Rutherford;Steve Hackett;Anthony Phillips
King Crimson|英国|前卫摇滚|深红之王|Robert Fripp;Greg Lake;Ian McDonald~Ian McDonald (musician);Michael Giles;John Wetton;Bill Bruford;Adrian Belew;Tony Levin;Mel Collins;Pat Mastelotto
Emerson, Lake & Palmer|英国|前卫摇滚||Keith Emerson;Greg Lake;Carl Palmer
Yes~Yes (band)|英国|前卫摇滚|是乐队|Jon Anderson;Chris Squire;Steve Howe;Rick Wakeman;Bill Bruford;Alan White~Alan White (Yes drummer);Tony Kaye~Tony Kaye (musician);Trevor Rabin
Rush~Rush (band)|加拿大|前卫摇滚||Geddy Lee;Alex Lifeson;Neil Peart;John Rutsey
Motörhead|英国|重金属|摩托头|Lemmy;Phil Taylor~Phil Taylor (musician);Eddie Clarke~Eddie Clarke (musician);Mikkey Dee;Phil Campbell~Phil Campbell (musician);Brian Robertson~Brian Robertson (guitarist)
Thin Lizzy|爱尔兰|硬摇滚||Phil Lynott;Brian Downey~Brian Downey (drummer);Eric Bell;Scott Gorham;Brian Robertson~Brian Robertson (guitarist);Gary Moore;John Sykes;Snowy White
The Cars|美国|新浪潮|汽车乐队|Ric Ocasek;Benjamin Orr;Elliot Easton;Greg Hawkes;David Robinson~David Robinson (drummer)
The Beach Boys|美国|阳光流行与摇滚|海滩男孩 沙滩男孩|Brian Wilson;Carl Wilson;Dennis Wilson;Mike Love;Al Jardine;Bruce Johnston;David Marks~David Marks (musician);Blondie Chaplin;Ricky Fataar
Creedence Clearwater Revival|美国|根源摇滚|清水复兴 CCR|John Fogerty;Tom Fogerty;Stu Cook;Doug Clifford
Electric Light Orchestra|英国|交响摇滚|电光乐团 ELO|@lynne;Roy Wood;Bev Bevan;Richard Tandy;Kelly Groucutt;Mik Kaminski
Eagles~Eagles (band)|美国|乡村摇滚|老鹰乐队|Glenn Frey;Don Henley;Bernie Leadon;Randy Meisner;Don Felder;Joe Walsh;Timothy B. Schmit
Wings~Paul McCartney and Wings|英美|摇滚|羽翼乐队|@paul;Linda McCartney;Denny Laine;Henry McCullough;Denny Seiwell;Jimmy McCulloch;Joe English~Joe English (musician);Laurence Juber;Steve Holley
The Police|英国|新浪潮|警察乐队|Sting~Sting (musician);Andy Summers;Stewart Copeland;Henry Padovani
Rammstein|德国|工业金属|德国战车|Till Lindemann;Richard Kruspe;Paul Landers;Oliver Riedel;Christoph Schneider;Christian Lorenz
Depeche Mode|英国|合成器流行与电子摇滚|赶时髦乐队|Dave Gahan;Martin Gore;Andy Fletcher~Andy Fletcher (musician);Alan Wilder;Vince Clarke
Van Halen|美国|硬摇滚|范海伦|Eddie Van Halen;Alex Van Halen;David Lee Roth;Michael Anthony~Michael Anthony (musician);Sammy Hagar;Gary Cherone;Wolfgang Van Halen
The Beat~The Beat (British band)|英国|斯卡复兴与新浪潮|English Beat|Dave Wakeling;Ranking Roger;Andy Cox;David Steele~David Steele (musician);Everett Morton;Saxa~Saxa (musician)
No Party for Cao Dong|台湾|独立摇滚|草东没有派对 草東沒有派對 草东|巫堵~No Party for Cao Dong;筑筑~No Party for Cao Dong;世暄~No Party for Cao Dong;凡凡~No Party for Cao Dong;Sam Yang~No Party for Cao Dong;鳥人~No Party for Cao Dong
`.trim();

const idsByName = new Map(Object.values(artists).map(person => [person.name,person.id]));
const splitIdentity = label => {
  const [name,wiki = name] = label.split('~');
  return {name,wiki};
};
function addArtist(label,scene,bio,aliases='') {
  if (label.startsWith('@')) return artists[label.slice(1)];
  const {name,wiki} = splitIdentity(label);
  const found = idsByName.get(name);
  if (found) return artists[found];
  const id = {'巫堵':'wudu','筑筑':'zhuzhu','世暄':'shih-hsuan','凡凡':'fanfan','鳥人':'birdy'}[name] ?? name.normalize('NFKD').toLowerCase().replace(/\p{M}/gu,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  if (!id || Object.hasOwn(artists,id)) throw new Error('Conflicting identifier: '+name);
  const person = {id,name,scene,bio,wiki,aliases};
  artists[id] = person;
  idsByName.set(name,id);
  return person;
}

for (const row of lineups.split('\n')) {
  const [label,country,genre,aliases,names] = row.split('|');
  const bandName = splitIdentity(label).name;
  const band = addArtist(label,country+' · 乐队',country+'的'+genre+'乐队。图谱收录其部分历年成员。',aliases);
  band.genre = genre;
  const bandURL = 'https://en.wikipedia.org/wiki/'+encodeURIComponent(band.wiki.replaceAll(' ','_'));
  const ref = 'lineup-'+band.id;
  sources[ref] = ['乐队条目 · 历史与阵容',bandURL];
  if (band.id === 'no-party-for-cao-dong') {
    sources[ref] = ['Blow 吹音樂 · 草東樂團訪談','https://blow.streetvoice.com/16090/'];
    sources.clod = ['草東沒有派對 · 《瓦合》唱片署名','https://nopartyforcaodong.bandcamp.com/album/the-clod'];
  }
  for (const personLabel of names.split(';')) {
    const person = addArtist(personLabel,country+'场景 · '+genre,'曾在 '+bandName+' 的阵容中演出或参与录音。');
    relations.push({a:person.id,b:band.id,type:'member',year:'见阵容记录',title:bandName+' 成员',
      detail:person.name+' 曾是 '+bandName+' 的成员。阵容跨越多个时期，具体任期见来源。',
      ref:band.id === 'no-party-for-cao-dong' && ['wudu','zhuzhu','sam-yang','birdy','fanfan'].includes(person.id) ? 'clod' : ref});
  }
}
