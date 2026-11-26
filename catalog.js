const artists = Object.fromEntries(`
nico|Nico|德国 · 实验摇滚|嗓音塑造了地下丝绒首专的气质，后来以簧风琴和低沉的歌声创作了一系列个人专辑。|Nico|尼可 妮可
lou|Lou Reed|美国 · 艺术摇滚|地下丝绒的共同创办人，《Transformer》与《Berlin》的创作者。|Lou Reed|卢·里德 卢里德
cale|John Cale|威尔士 · 艺术摇滚|从先锋音乐进入地下丝绒，后来为 Nico、The Stooges 和 Patti Smith 制作唱片。|John Cale|约翰凯尔
sterling|Sterling Morrison|美国 · 艺术摇滚|地下丝绒的创始吉他手，与 Lou Reed 共同塑造了乐队的双吉他编配。|Sterling Morrison
moe|Moe Tucker|美国 · 艺术摇滚|地下丝绒鼓手，以站着演奏和极少使用镲片的方式形成独特节奏。|Moe Tucker|Maureen Tucker
vu|The Velvet Underground|美国 · 乐队|纽约的实验摇滚乐队，首张专辑由 Andy Warhol 参与制作，Nico 为其中三首歌担任主唱。|The Velvet Underground|地下丝绒
warhol|Andy Warhol|美国 · 艺术家|波普艺术家，曾担任地下丝绒的经纪人，并把 Nico 引入乐队的演出和录音。|Andy Warhol|安迪沃霍尔
jim|Jim Morrison|美国 · 迷幻摇滚|The Doors 主唱与词作者，也写作和录制诗歌。|Jim Morrison|吉姆莫里森
doors|The Doors|美国 · 乐队|洛杉矶迷幻摇滚乐队，《Light My Fire》和《Riders on the Storm》的演唱者。|The Doors|大门乐队
manzarek|Ray Manzarek|美国 · 迷幻摇滚|The Doors 键盘手，以电风琴与键盘低音塑造乐队标志性声响。|Ray Manzarek
krieger|Robby Krieger|美国 · 迷幻摇滚|The Doors 吉他手，《Light My Fire》的主要创作者。|Robby Krieger
densmore|John Densmore|美国 · 迷幻摇滚|The Doors 鼓手，将爵士乐的律动带入乐队。|John Densmore
page|Jimmy Page|英国 · 蓝调摇滚|从录音室吉他手到 Yardbirds 与 Led Zeppelin，参与了英国蓝调摇滚向重型摇滚的演变。|Jimmy Page|吉米佩奇
beck|Jeff Beck|英国 · 蓝调摇滚|Yardbirds 前吉他手，后来组建 Jeff Beck Group，并将蓝调、摇滚和爵士融合。|Jeff Beck|杰夫贝克
clapton|Eric Clapton|英国 · 蓝调摇滚|先后加入 Yardbirds、John Mayall 的 Bluesbreakers 与 Cream，也长期为其他音乐人担任客席吉他手。|Eric Clapton|埃里克克莱普顿
yardbirds|The Yardbirds|英国 · 乐队|英国蓝调摇滚乐队。Clapton、Beck 和 Page 先后加入，后两人曾共同担任吉他手。|The Yardbirds|庭院鸟
zeppelin|Led Zeppelin|英国 · 乐队|1968 年成团，把蓝调、民谣与重型摇滚带进同一套声音。|Led Zeppelin|齐柏林飞艇
plant|Robert Plant|英国 · 硬摇滚|Led Zeppelin 主唱，后来也与美国蓝草歌手 Alison Krauss 合作。|Robert Plant
jones|John Paul Jones|英国 · 硬摇滚|Led Zeppelin 贝斯手与键盘手，成团前已经活跃于伦敦录音室。|John Paul Jones (musician)
bonham|John Bonham|英国 · 硬摇滚|Led Zeppelin 鼓手，以强劲的击打和鲜明的律动闻名。|John Bonham
dylan|Bob Dylan|美国 · 民谣摇滚|从格林威治村民谣场景走向电声摇滚，2016 年获诺贝尔文学奖。|Bob Dylan|鲍勃迪伦
george|George Harrison|英国 · 摇滚|Beatles 吉他手，《Something》的作者，也是孟加拉国慈善音乐会的组织者之一。|George Harrison|乔治哈里森
buddy|Buddy Holly|美国 · 早期摇滚|来自得克萨斯州的摇滚先驱，作为歌手、吉他手与创作者影响了 Dylan 和早期 Beatles。|Buddy Holly|巴迪霍利
weezer|Weezer|美国 · 乐队|洛杉矶另类摇滚乐队，1994 年首张同名专辑收录《Buddy Holly》。|Weezer|维泽
rivers|Rivers Cuomo|美国 · 另类摇滚|Weezer 主唱、吉他手和主要作者，《Buddy Holly》的创作者。|Rivers Cuomo
oasis|Oasis|英国 · 乐队|来自曼彻斯特的英伦摇滚乐队，由 Gallagher 兄弟的创作和演唱推动。|Oasis (band)|绿洲
liam|Liam Gallagher|英国 · 英伦摇滚|Oasis 主唱，为《Live Forever》《Wonderwall》等歌曲献声。|Liam Gallagher|利亚姆
noel|Noel Gallagher|英国 · 英伦摇滚|Oasis 吉他手及主要词曲作者，写下《Wonderwall》与《Don’t Look Back in Anger》。|Noel Gallagher|诺尔
beatles|The Beatles|英国 · 乐队|来自利物浦的四人乐队，从早期摇滚走向录音室实验。|The Beatles|披头士 甲壳虫
john|John Lennon|英国 · 摇滚|Beatles 创始成员，后来与 Yoko Ono 共同创作与演出。|John Lennon|约翰列侬
paul|Paul McCartney|英国 · 摇滚|Beatles 贝斯手、歌手及作者，后来组建 Wings。|Paul McCartney|保罗麦卡特尼
ringo|Ringo Starr|英国 · 摇滚|Beatles 鼓手，曾为《Yellow Submarine》等歌曲演唱。|Ringo Starr|林戈
yoko|Yoko Ono|日本 · 先锋艺术|先锋艺术家、音乐人，与 John Lennon 共同发起 Plastic Ono Band 项目。|Yoko Ono|小野洋子
wilburys|Traveling Wilburys|英美 · 乐队|五位音乐人聚在录音室录制一首 B 面歌曲，由此组成乐队。|Traveling Wilburys
petty|Tom Petty|美国 · 摇滚|Tom Petty and the Heartbreakers 主唱，也是 Traveling Wilburys 成员。|Tom Petty
lynne|Jeff Lynne|英国 · 摇滚|Electric Light Orchestra 的创作核心之一，后来同时以制作人与乐队成员身份参与 Traveling Wilburys。|Jeff Lynne
orbison|Roy Orbison|美国 · 早期摇滚|以跨越宽广音域的抒情唱腔闻名，曾录制《Oh, Pretty Woman》。|Roy Orbison
bowie|David Bowie|英国 · 艺术摇滚|在华丽摇滚、灵魂乐与电子音乐之间多次变换创作方向，也参与制作 Lou Reed 和 Iggy Pop 的唱片。|David Bowie|大卫鲍伊
ronson|Mick Ronson|英国 · 华丽摇滚|Bowie 的吉他手与编曲伙伴，也与 Bowie 联合制作了《Transformer》。|Mick Ronson
iggy|Iggy Pop|美国 · 原型朋克|The Stooges 主唱，后来与 Bowie 合作个人专辑《The Idiot》和《Lust for Life》。|Iggy Pop
stooges|The Stooges|美国 · 乐队|底特律地区的原型朋克乐队，首专由 John Cale 制作。|The Stooges
patti|Patti Smith|美国 · 朋克摇滚|纽约音乐人与诗人，首专《Horses》由 John Cale 制作。|Patti Smith|帕蒂史密斯
browne|Jackson Browne|美国 · 民谣摇滚|美国创作歌手，早期作品《These Days》由 Nico 收录在《Chelsea Girl》。|Jackson Browne
cream|Cream|英国 · 乐队|Eric Clapton、Jack Bruce 与 Ginger Baker 组成的蓝调摇滚三人乐队。|Cream (band)|奶油乐队
bruce|Jack Bruce|苏格兰 · 蓝调摇滚|Cream 贝斯手、歌手与词曲作者。|Jack Bruce
baker|Ginger Baker|英国 · 蓝调摇滚|Cream 鼓手，也活跃于爵士和受非洲音乐影响的合作项目。|Ginger Baker
nirvana|Nirvana|美国 · 乐队|来自华盛顿州的另类摇滚乐队，《Nevermind》的演唱者。|Nirvana (band)|涅槃
kurt|Kurt Cobain|美国 · 另类摇滚|Nirvana 主唱、吉他手与主要创作者。|Kurt Cobain|科特柯本
grohl|Dave Grohl|美国 · 另类摇滚|Nirvana 鼓手，后来创立 Foo Fighters。|Dave Grohl|戴夫格罗尔
krist|Krist Novoselic|美国 · 另类摇滚|Nirvana 联合创始人与贝斯手。|Krist Novoselic
foo|Foo Fighters|美国 · 乐队|由 Dave Grohl 的个人录音项目发展而来，后来成为长期巡演的摇滚乐队。|Foo Fighters|喷火战机
qotsa|Queens of the Stone Age|美国 · 乐队|由 Josh Homme 创立的摇滚乐队，《Songs for the Deaf》录音阵容包括 Dave Grohl。|Queens of the Stone Age|石器时代女王
homme|Josh Homme|美国 · 沙漠摇滚|Queens of the Stone Age 创始人，也与 Dave Grohl、John Paul Jones 组成 Them Crooked Vultures。|Josh Homme
vultures|Them Crooked Vultures|英美 · 乐队|Josh Homme、Dave Grohl 与 John Paul Jones 在 2009 年组建的三人乐队。|Them Crooked Vultures
`.trim().split('\n').map(row => {
  const [id,name,scene,bio,wiki,aliases=''] = row.split('|');
  return [id,{id,name,scene,bio,wiki,aliases}];
}));

const sources = {
  vu: ['美国国会图书馆 · 地下丝绒首专','https://www.loc.gov/static/programs/national-recording-preservation-board/documents/Velvet-Underground-and-Nico_Levy.pdf'],
  page: ['Classic Rock · Jimmy Page 专访','https://www.loudersound.com/features/jimmy-page-the-classic-rock-interview'],
  nico: ['AllMusic · Nico 传记','https://www.allmusic.com/artist/nico-mn0000868306/biography'],
  chelsea: ['Verve / UMG · Nico 录音与署名','https://www.youtube.com/watch?v=FyMguiibEYo'],
  browne: ['Verve / UMG · 《These Days》录音与署名','https://www.youtube.com/watch?v=sXsZiLZjeQ4'],
  yard: ['The Yardbirds 官网 · 乐队成员访谈','https://www.theyardbirds.com/news.html'],
  zeppelin: ['摇滚名人堂 · Led Zeppelin','https://rockhall.com/inductees/led-zeppelin/'],
  doors: ['The Doors 官网 · 乐队成员','https://thedoors.com/the-band'],
  nobel: ['Bob Dylan 诺贝尔文学奖演讲','https://www.nobelprize.org/prizes/literature/2016/dylan/lecture/'],
  weezer: ['Weezer · 官方 MV','https://www.youtube.com/watch?v=kemivUKb4f4'],
  oasis: ['Oasis 官网 · 乐队年表','https://oasisinet.com/'],
  liam: ['Chart Communications · Liam Gallagher 访谈','https://riskyfuel.com/2017/04/10/oasis-say-rivers-cuomo-like-yoda-wish-they-couldve-played-live-8-to-humiliate-robbie-williams/'],
  noel: ['Rob Brydon · Noel Gallagher 访谈','https://www.youtube.com/watch?v=0YhZQhT2lTE'],
  wonder: ['Rolling Stone Italia · Noel 回忆《Wonderwall》','https://www.rollingstone.it/musica/liam-e-noel-raccontano-whats-the-story-morning-glory-canzone-per-canzone/529966/'],
  beatles: ['摇滚名人堂 · The Beatles','https://rockhall.com/inductees/beatles/'],
  quarry: ['The Beatles 官网 · 《That’ll Be the Day》','https://www.thebeatles.com/thatll-be-day'],
  yoko: ['John Lennon 官网 · Plastic Ono Band','https://www.johnlennon.com/music/albums/john-lennon-plastic-ono-band/'],
  wilburys: ['George Harrison 官网 · Traveling Wilburys','https://www.georgeharrison.com/the-traveling-wilburys-site-2/'],
  bangla: ['George Harrison 官网 · 孟加拉国音乐会','https://www.georgeharrison.com/films/the-concert-for-bangladesh/'],
  banglaperformers: ['George Harrison 官网 · 音乐会参演名单','https://www.georgeharrison.com/concert-for-bangladesh-at-the-smithsonian/'],
  friend: ['George Harrison 官网 · Concert for George','https://www.georgeharrison.com/concert-for-george-film-makes-digital-debut/'],
  transformer: ['摇滚名人堂 · Lou Reed','https://rockhall.com/inductees/lou-reed/'],
  ronson: ['摇滚名人堂 · Mick Ronson','https://rockhall.com/inductees/mick-ronson/'],
  bowie: ['摇滚名人堂 · David Bowie','https://rockhall.com/inductees/david-bowie/'],
  stooges: ['摇滚名人堂 · The Stooges','https://rockhall.com/inductees/stooges/'],
  horses: ['美国国会图书馆 · Patti Smith《Horses》','https://www.loc.gov/static/programs/national-recording-preservation-board/documents/Horses.pdf'],
  cream: ['摇滚名人堂 · Cream','https://rockhall.com/inductees/cream/'],
  nirvana: ['摇滚名人堂 · Nirvana','https://rockhall.com/inductees/nirvana/'],
  foo: ['摇滚名人堂 · Foo Fighters','https://rockhall.com/inductees/foo-fighters/'],
  qotsa: ['Queens of the Stone Age 官网','https://qotsa.com/'],
  deaf: ['《Songs for the Deaf》原版唱片署名','https://www.discogs.com/master/3626-Queens-Of-The-Stone-Age-Songs-For-The-Deaf'],
  vultures: ['Jimmy Page 官网 · Them Crooked Vultures 现场回忆','https://jimmypage.com/'],
  vcredit: ['John Paul Jones 官网 · Them Crooked Vultures','https://www.johnpauljones.com/timeline/2009-3/']
};

const relations = `
nico|lou|record|1967|地下丝绒首张专辑｜Lou Reed 写下《Femme Fatale》等歌曲，Nico 在首张专辑担任这首及另外两首歌的主唱。|vu
nico|vu|member|1966–67|首张专辑与现场演出｜Warhol 把 Nico 引入乐队的演出，首张专辑以 The Velvet Underground & Nico 的名义发行。|vu
nico|warhol|record|1966–67|从 Factory 到唱片｜Warhol 推动 Nico 与地下丝绒合作；他的名字也出现在乐队首专的制作署名中。|vu
nico|jim|personal|1960年代|加州相识｜Nico 传记记载，两人在加州有过一段亲密关系，Morrison 鼓励她开始自己写歌。|nico
nico|page|record|1965|《The Last Mile》｜Page 回忆录制这首单曲，歌曲由他与 Andrew Loog Oldham 合写。|page
nico|dylan|influence|1967|《I’ll Keep It With Mine》｜Nico 在个人首专《Chelsea Girl》中演唱了 Bob Dylan 写的这首歌。|chelsea
nico|cale|record|1967–74|《Chelsea Girl》与后续合作｜Cale 为 Nico 的首张个人专辑供曲和演奏，之后继续参与她的实验性作品。|nico
nico|browne|record|1967|《These Days》｜Nico 在《Chelsea Girl》收录 Jackson Browne 创作的这首歌。|browne
lou|cale|record|1960年代|建立地下丝绒｜两人携手组建乐队，也在首专中共同创作《The Black Angel’s Death Song》。|vu
vu|warhol|record|1966–67|经纪与首张专辑｜Warhol 帮助乐队获得曝光，并以制作人的身份署名首张专辑。|vu
lou|page|influence|1960年代|Jimmy Page 耳中的地下丝绒｜Page 随 Yardbirds 经过纽约时看了地下丝绒的演出，后来特别赞赏 Reed 的写作。|page
page|beck|record|1966|《Happenings Ten Years Time Ago》｜两人曾在 Yardbirds 阵容中同时担任吉他手，也一起参与这首单曲。|page
beck|clapton|member|1965|Yardbirds 的先后任｜Clapton 离队后由 Beck 接任，Page 次年加入。|yard
page|clapton|member|1960年代|Yardbirds 的不同阵容｜Clapton 离开后乐队先邀请 Page；Page 当时推荐 Beck，直到 1966 年才加入。|yard
george|clapton|personal|多年|友谊与长期合作｜Harrison 去世后，Clapton 与 Olivia Harrison 筹办 Concert for George，并担任音乐总监。|friend
dylan|clapton|record|1971|孟加拉国慈善音乐会｜两人都受 George Harrison 邀请参加纽约麦迪逊广场花园的慈善音乐会。|banglaperformers
george|dylan|record|1971–88|从慈善音乐会到乐队｜Harrison 邀 Dylan 参加 1971 年的音乐会，两人后来又组建 Traveling Wilburys。|wilburys
dylan|buddy|influence|1959|台下的 Bob Dylan｜Dylan 在诺贝尔演讲中回忆自己去看 Buddy Holly 的演出，并记得对方朝自己看过来。|nobel
buddy|weezer|influence|1994|《Buddy Holly》｜Weezer 首张同名专辑的歌曲以 Buddy Holly 为标题，也在歌词中提到他。|weezer
buddy|beatles|influence|1958|《That’ll Be the Day》｜披头士前身 The Quarrymen 首次录制的试音唱片收录了 Buddy Holly 和 Jerry Allison 写的歌。|quarry
oasis|weezer|personal|2005 年前|两支乐队曾碰面｜Liam Gallagher 在 2005 年的访谈中回忆两支乐队见过面。|liam
liam|rivers|personal|2005 年前|Liam 眼中的 Rivers｜Liam 在采访中证实两支乐队见过面，称 Rivers 是自己新晋最爱的摇滚明星，还把他比作 Andy Warhol。|liam
liam|warhol|influence|2005|访谈里的 Warhol 比喻｜Liam 形容 Weezer 主唱 Rivers Cuomo 像音乐界的 Andy Warhol。这里记录的是文化引用。|liam
george|noel|personal|2001 年前|Noel 回忆见到 George｜Noel 在 Rob Brydon 的访谈里回忆自己见到 George Harrison 的经历。|noel
george|oasis|influence|1995|《Wonderwall》的题名｜Noel 说，Harrison 的专辑《Wonderwall Music》给了他为歌曲改名的灵感。|wonder
lou|bowie|record|1972|《Transformer》｜Bowie 与 Mick Ronson 共同参与制作 Lou Reed 的第二张个人专辑。|transformer
lou|ronson|record|1972|《Transformer》｜Ronson 与 David Bowie 联合制作了这张唱片。|transformer
bowie|ronson|record|1970年代|Ziggy Stardust 时期｜Ronson 担任 Bowie 的吉他手，是 Spiders from Mars 的成员。|ronson
bowie|iggy|record|1970年代|《The Idiot》｜Bowie 参与创作并制作 Iggy Pop 的首张个人专辑。|bowie
cale|stooges|record|1969|同名首张专辑｜John Cale 为 The Stooges 制作同名首专。|stooges
cale|patti|record|1975|《Horses》｜John Cale 制作了 Patti Smith 的首张专辑。|horses
john|yoko|record|1970|Plastic Ono Band｜John Lennon 和 Yoko Ono 共同开展这一音乐项目，分别发行各自署名的专辑。|yoko
grohl|qotsa|record|2002|《Songs for the Deaf》｜Dave Grohl 为这张专辑录制鼓轨。|deaf
`.trim().split('\n').map(row => {
  const [a,b,type,year,copy,ref]=row.split('|');
  const [title,detail]=copy.split('｜');
  return {a,b,type,year,title,detail,ref};
});

const memberships = [
  ['vu','vu','1960年代','地下丝绒的核心阵容',['lou','cale','sterling','moe']],
  ['doors','doors','1960–70年代','The Doors 的经典四人阵容',['jim','manzarek','krieger','densmore']],
  ['yardbirds','yard','1960年代','1960 年代的 Yardbirds 曾先后迎来三位吉他手',['clapton','beck','page']],
  ['zeppelin','zeppelin','1968–80','Led Zeppelin 自出道至 1980 年的四人阵容',['page','plant','jones','bonham']],
  ['beatles','beatles','1962–70','披头士录音与巡演时期的经典阵容',['john','paul','george','ringo']],
  ['wilburys','wilburys','1988','参与《Handle with Care》及首张专辑的五位成员',['george','dylan','lynne','petty','orbison']],
  ['cream','cream','1966–68','Cream 的三人阵容',['clapton','bruce','baker']],
  ['oasis','oasis','1990年代起','Oasis 的核心成员',['noel','liam']],
  ['weezer','weezer','1990年代起','Weezer 的主唱与吉他手',['rivers']],
  ['stooges','stooges','1960年代起','The Stooges 的主唱',['iggy']],
  ['nirvana','nirvana','1990–94','《Nevermind》时期的 Nirvana 阵容',['kurt','grohl','krist']],
  ['foo','foo','1994年起','从个人录音项目创立 Foo Fighters',['grohl']],
  ['qotsa','qotsa','1990年代起','创立 Queens of the Stone Age 并担任主唱与吉他手',['homme']],
  ['vultures','vcredit','2009','Them Crooked Vultures 的三人阵容',['jones','grohl','homme']]
];

for (const [band,ref,year,title,members] of memberships) {
  const names = members.map(id => artists[id].name).join('、');
  for (const id of members) relations.push({
    a: id,b: band,type:'member',year,title,detail:`${title}。涉及成员：${names}。`,ref
  });
}

const types = {
  member: '乐队与成员',
  record: '录音与演出',
  personal: '私人交往',
  family: '亲属关系',
  influence: '影响与致敬'
};
