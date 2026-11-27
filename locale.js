const strings = {
  en: {
    brand:'Rock Atlas',eyebrow:'ARCHIVAL CARTOGRAPHY · 1955–2026',title:'Rock Connections Atlas',subtitle:'Trace relationships through bands, recordings, and musical influence.',
    map:'Network',directory:'Index',paths:'Find a path',network:'Relationship network',
    labelMode:'Labels',labelAdaptive:'Adaptive',labelClassic:'Classic',
    attribution:'Attribution',creditAuthor:'Author',creditDesign:'Website visual design',
    creditDevelopment:'Website development and project coordination',creditData:'Data collection and batch operations',creditConjunction:' and ',
    creditReferences:'Relationship references',creditPortraits:'Image sources and licenses',creditProfiles:'Artist and band reference pages',
    all:'All',artists:'People',bands:'Bands',indexTitle:'Artist and band index',pathTitle:'Find a connection',from:'From',to:'To',
    foot:'Sources are linked from each relationship. Image credits appear on profiles.',legend:'● Person   ◆ Band',
    relationType:'Relationship type',any:'Any relationship',zoomOut:'Zoom out',zoomIn:'Zoom in',fit:'Fit',search:'Search people or bands',placeholder:'Search Nico, Oasis, The Clash…',
    noResults:'No match in the atlas. Try another name or alternate spelling.',noEdges:'No direct relationships in this category.',
    credit:'Image credit',archive:'Reference',direct:'Direct relationships',close:'Close',profile:'Profile',
    source:'Source',noPath:'No path was found in the current dataset.',samePath:'Choose two different people or bands.',
    shortest:'Shortest path',nodes:'nodes',edges:'relationships',personUnit:'people',bandUnit:'bands',
    member:'Band membership',record:'Recording & performance',tour:'Tours & support acts',direction:'to',personal:'Personal contact',family:'Family',influence:'Influence & references',
    searchRegion:'Search',graphRegion:'Interactive relationship graph. Every entry is also available through search and the index.',
    filters:'Filter by relationship',zoom:'Graph zoom',indexFilter:'Index filter',navigation:'Main navigation',photo:'Photograph of',
    shape:'● Person   ◆ Band',sortFeatured:'Curated',sortConnections:'Most connected',sortAlpha:'A–Z',indexSort:'Sort index',pathSearchPlaceholder:'Type name or band…',swapEndpoints:'Swap From and To'
  },
  zh: {
    brand:'摇滚图谱',eyebrow:'摇滚史关系档案与图谱 · 1955–2026',title:'摇滚关系图谱',subtitle:'循着乐队、录音与音乐影响，探索摇滚史上的人物关系。',
    map:'关系图谱',directory:'人物索引',paths:'查找路径',network:'关系网络',
    labelMode:'标签',labelAdaptive:'智能避让',labelClassic:'原版',
    attribution:'署名',creditAuthor:'作者',creditDesign:'网站美化',
    creditDevelopment:'网站搭建与项目统筹',creditData:'数据收集与批量操作',creditConjunction:' 和 ',
    creditReferences:'关系参考资料',creditPortraits:'图片来源与许可',creditProfiles:'艺人与乐队参考页面',
    all:'全部',artists:'人物',bands:'乐队',indexTitle:'人物与乐队索引',pathTitle:'查找两者之间的路径',from:'起点',to:'终点',
    foot:'关系附有出处。肖像署名见人物页。',legend:'● 人物   ◆ 乐队',
    relationType:'关系类型',any:'不限关系',zoomOut:'缩小',zoomIn:'放大',fit:'全图',search:'搜索人物或乐队',placeholder:'搜索 Nico、Oasis、披头士…',
    noResults:'图谱暂未收录这个名字。试试英文名或乐队名。',noEdges:'这个类别暂无直接关系。',
    credit:'图像署名',archive:'档案',direct:'直接关系',close:'关闭',profile:'人物详情',
    source:'来源',noPath:'当前资料中暂时找不到这两者的路径。',samePath:'请选择不同的人物或乐队。',
    shortest:'最短路径',nodes:'个节点',edges:'条关系',personUnit:'位人物',bandUnit:'支乐队',
    member:'乐队与成员',record:'录音与演出',tour:'巡演与暖场',direction:'指向',personal:'交往与相识',family:'亲属关系',influence:'影响与致敬',
    searchRegion:'搜索',graphRegion:'交互式关系图。所有条目也可以通过搜索和人物索引访问。',
    filters:'按关系筛选',zoom:'图谱缩放',indexFilter:'索引类型',navigation:'主导航',photo:'照片',
    shape:'● 人物   ◆ 乐队',sortFeatured:'精选导览',sortConnections:'关联最多',sortAlpha:'姓名 A–Z',indexSort:'索引排序',pathSearchPlaceholder:'输入姓名、中文名或乐队搜索…',swapEndpoints:'交换起点与终点'
  }
};

const sceneWords = {
  '芬兰':'Finland','德国':'Germany','美国':'US','英国':'UK','威尔士':'Wales','苏格兰':'Scotland','英美':'UK / US','日本':'Japan',
  '澳大利亚':'Australia','爱尔兰':'Ireland','加拿大':'Canada','台湾':'Taiwan','乐队':'Band','艺术家':'Visual artist','演员':'Actor','相关人物':'Associated figure',
  '实验摇滚':'Experimental rock','艺术摇滚':'Art rock','迷幻摇滚':'Psychedelic rock','蓝调摇滚':'Blues rock',
  '硬摇滚':'Hard rock','民谣摇滚':'Folk rock','摇滚':'Rock','早期摇滚':'Early rock and roll','另类摇滚':'Alternative rock',
  '英伦摇滚':'Britpop','先锋艺术':'Avant-garde','华丽摇滚':'Glam rock','原型朋克':'Proto-punk',
  '朋克摇滚':'Punk rock','沙漠摇滚':'Desert rock','后朋克':'Post-punk','新浪潮':'New wave',
  '独立摇滚':'Indie rock','另类舞曲':'Alternative dance','摩德复兴':'Mod revival','流行摇滚':'Pop rock',
  '曼彻斯特摇滚':'Madchester','噪音流行':'Noise pop','摩德摇滚':'Mod rock','重金属':'Heavy metal','放克摇滚':'Funk rock',
  '噪音摇滚':'Noise rock','车库摇滚':'Garage rock','前卫摇滚':'Progressive rock','阳光流行与摇滚':'Sunshine pop and rock',
  '根源摇滚':'Roots rock','交响摇滚':'Symphonic rock','乡村摇滚':'Country rock','工业金属':'Industrial metal',
  '合成器流行与电子摇滚':'Synth-pop and electronic rock','斯卡复兴与新浪潮':'Ska revival and new wave','钢琴摇滚':'Piano rock'
};
const englishNames = {};
const englishBios = {
  'barbara-bach':'An American actor whose films include The Spy Who Loved Me and Caveman. She married Ringo Starr in 1981.',
  'marjorie-bach':'Sister of actor Barbara Bach. She married Eagles guitarist Joe Walsh in 2008.',
  nico:'A vocalist on the Velvet Underground’s debut album, Nico later made a series of experimental records centered on her voice and harmonium.',
  lou:'Co-founder and principal songwriter of the Velvet Underground. His solo records include Transformer and Berlin.',
  dylan:'A songwriter who moved from the Greenwich Village folk scene into electric rock. He received the 2016 Nobel Prize in Literature.',
  jim:'Lead singer and lyricist of the Doors, whose work also included spoken-word poetry.',
  page:'A London session guitarist who went on to play in the Yardbirds and Led Zeppelin.',
  cale:'A founding member of the Velvet Underground who went on to produce Nico, the Stooges, and Patti Smith.',
  warhol:'Pop artist who managed the Velvet Underground, brought Nico into the project, and received a producer credit on the debut album.',
  buddy:'A Texas singer, songwriter, and guitarist whose recordings influenced Bob Dylan and the early Beatles.',
  'chuck-berry':'An early architect of rock guitar and songwriting. His songs include “Johnny B. Goode” and “Roll Over Beethoven.”',
  'brian-may':'Queen’s guitarist and a songwriter. His Star Fleet Project included a studio collaboration with Eddie Van Halen.',
  'elton-john':'A piano-led rock singer and songwriter whose longstanding writing partnership with Bernie Taupin began in the 1960s.',
  george:'Beatles guitarist and the writer of “Something.” He organized the Concert for Bangladesh and later co-founded the Traveling Wilburys.',
  john:'A founding Beatle and songwriter who later recorded and performed with Yoko Ono and the Plastic Ono Band.',
  paul:'Beatles bassist and songwriter. He later formed Wings with Linda McCartney and Denny Laine.',
  yoko:'An avant-garde artist and musician who made records and performed with John Lennon in the Plastic Ono Band.',
  vu:'The New York group combined rock songwriting with drones and improvisation. Nico sang lead on three tracks of its debut album.',
  zeppelin:'Formed in 1968, Led Zeppelin brought electric blues, acoustic folk, and heavy rock into the same repertoire.',
  oasis:'Manchester rock band built around the singing and songwriting of Liam and Noel Gallagher. Its early albums include Definitely Maybe and (What’s the Story) Morning Glory?',
  'the-clash':'London punk band that broadened its sound through reggae, dub, rockabilly, and other styles. Its core lineup recorded London Calling in 1979.',
  'the-rolling-stones':'A London band rooted in rhythm and blues. The atlas traces the classic lineup and later tenures of Mick Taylor and Ronnie Wood.',
  'the-beach-boys':'A California band whose close vocal harmonies and studio work helped shape 1960s pop and rock. Pet Sounds was released in 1966.'
};
const englishStories = `
nico|lou|The Velvet Underground’s debut|Reed wrote “Femme Fatale,” one of three songs Nico sang on the debut album.
nico|vu|The Velvet Underground & Nico|Andy Warhol brought Nico into the group’s performances. The debut was credited to the Velvet Underground & Nico.
nico|warhol|From the Factory to the studio|Warhol brought Nico into the Velvet Underground project and received a producer credit on the debut.
nico|jim|Meeting in California|Nico’s biographers describe a close relationship with Morrison, who encouraged her to write her own songs.
nico|page|The Last Mile|Page worked on the Nico single and co-wrote this track with Andrew Loog Oldham.
nico|dylan|I’ll Keep It With Mine|Nico recorded Dylan’s song for her solo debut, Chelsea Girl.
nico|cale|Chelsea Girl and later records|Cale contributed music and performances to Nico’s debut and worked on her later experimental recordings.
nico|browne|These Days|Nico recorded Jackson Browne’s song on Chelsea Girl, with Browne credited on electric guitar.
lou|cale|Founding the Velvet Underground|They founded the band and co-wrote “The Black Angel’s Death Song.”
vu|warhol|Management and the debut album|Warhol managed the band and received the producer credit on its debut.
lou|page|Page on the Velvet Underground|Page saw the band in New York while touring with the Yardbirds and later singled out Reed’s songwriting.
page|beck|Happenings Ten Years Time Ago|The two briefly played guitar together in the Yardbirds and both worked on the single.
beck|clapton|Successive Yardbirds guitarists|Beck took over after Clapton’s departure. Page joined the following year.
page|clapton|Different Yardbirds lineups|Page was approached after Clapton left, recommended Beck, and eventually joined the band in 1966.
george|clapton|A longstanding friendship|Clapton and Olivia Harrison organized the Concert for George, for which Clapton was musical director.
dylan|clapton|Concert for Bangladesh|Both performed at the benefit organized by George Harrison at Madison Square Garden.
george|dylan|From a benefit concert to a band|Dylan joined Harrison’s 1971 concert. They later played together in the Traveling Wilburys.
dylan|buddy|Dylan in the audience|Dylan recalled seeing Buddy Holly perform and catching his eye in his Nobel lecture.
buddy|weezer|Buddy Holly|Weezer named a song on its debut after the singer and mentioned him in the lyrics.
buddy|beatles|That’ll Be the Day|The Quarrymen, who later became the Beatles, recorded the song co-written by Buddy Holly and Jerry Allison.
oasis|weezer|The two bands met|Liam Gallagher recalled meeting Weezer in a 2005 interview.
liam|rivers|Liam on Rivers|Gallagher recalled their encounter and described Cuomo as his new favorite rock star.
liam|warhol|A comparison in an interview|Liam likened Rivers Cuomo to Andy Warhol in a 2005 interview.
george|noel|Noel recalls meeting George|Noel Gallagher describes meeting George Harrison in an interview with Rob Brydon.
george|oasis|The title of Wonderwall|Noel Gallagher recalled borrowing the title from Harrison’s Wonderwall Music.
lou|bowie|Transformer|Bowie and Mick Ronson co-produced Lou Reed’s second solo album.
lou|ronson|Transformer|Ronson and David Bowie co-produced Lou Reed’s second solo album.
bowie|ronson|The Ziggy Stardust period|Ronson played guitar for Bowie in the Spiders from Mars.
bowie|iggy|The Idiot|Bowie co-wrote and produced material for Iggy Pop’s debut solo album.
cale|stooges|The Stooges’ debut|John Cale produced the band’s self-titled first album.
cale|patti|Horses|John Cale produced Patti Smith’s first album.
john|yoko|Plastic Ono Band|John Lennon and Yoko Ono collaborated on the project and released separately credited albums.
grohl|qotsa|Songs for the Deaf|Dave Grohl recorded drums for the album.
lou|nico|A brief relationship|MOJO’s account of the Velvet Underground years describes Nico and Reed as briefly involved.
john|keith-richards|The Dirty Mac|Lennon and Richards performed “Yer Blues” at the Rolling Stones Rock and Roll Circus, with Eric Clapton and Mitch Mitchell.
clapton|mitch-mitchell|The Dirty Mac|Clapton played lead guitar and Mitchell played drums on the Rock and Roll Circus performance of “Yer Blues.”
jimi-hendrix|chas-chandler|From New York to London|The Animals bassist became Hendrix’s manager and brought him to England, where the Experience formed.
bowie|queen|Under Pressure|Queen and Bowie recorded the song at Mountain Studios in Montreux. Bowie shared lead vocals with Freddie Mercury.
bowie|david-gilmour|Royal Albert Hall|Bowie sang “Arnold Layne” and “Comfortably Numb” at Gilmour’s 2006 concert.
bowie|reeves-gabrels|Tin Machine|They wrote and played together in Tin Machine. Bowie’s Paris live archive credits both.
page|david-coverdale|Coverdale Page|The Led Zeppelin guitarist and Whitesnake singer released a collaborative album.
nirvana|sonic-youth|1991 European tour|David Markey’s documentary 1991: The Year Punk Broke documents both bands on the tour.
kurt|pixies|Writing Smells Like Teen Spirit|Cobain cited the Pixies as a model for the song’s shifts between quiet and loud passages.
weezer|ric-ocasek|The Blue Album|The Cars’ Ric Ocasek produced Weezer’s self-titled debut.
lou|u2|Satellite of Love|Lou Reed joined U2 for a live duet at Giants Stadium on the Zoo TV Tour.
u2|peter-gabriel|Conspiracy of Hope|Both performed on the Amnesty International benefit tour.
peter-gabriel|tony-levin|What Lies Ahead|King Crimson bassist Tony Levin played bass on this Peter Gabriel track.
lemmy|metallica|Lars Ulrich on Lemmy|Ulrich credited Lemmy’s example as an influence on his own career and on Metallica’s formation.
mick-jones|gorillaz|Plastic Beach|The Clash guitarist performed on the title track of Gorillaz’s album.
paul-simonon|gorillaz|Plastic Beach|The Clash bassist performed on the title track of Gorillaz’s album.
joe-strummer|roger-daltrey|Global a Go-Go|The Who’s singer contributed backing vocals to the Joe Strummer and the Mescaleros album.
joe-strummer|jack-irons|Earthquake Weather|Jack Irons, who played in the Red Hot Chili Peppers and Pearl Jam, contributed to Strummer’s solo album.
the-clash|ranking-roger|Combat Rock guest recordings|Ranking Roger recorded vocals on versions of “Rock the Casbah” and “Red Angel Dragnet,” released in 2022.
the-clash|ramones|The Ramones in London|A Rock Hall essay places members of the Clash at the Ramones’ 1976 London show.
oasis|paul-weller|Champagne Supernova in the studio|Producer Owen Morris recalls Weller contributing lead guitar and backing vocals.
oasis|john-squire|Champagne Supernova at Knebworth|The Stone Roses guitarist played with Oasis on 11 August 1996.
liam|john-squire|Liam Gallagher John Squire|They released a joint album under their own names in 2024.
oasis|beatles|I Am the Walrus|Oasis performed the Beatles song at Knebworth.
bobby-gillespie|oasis|Creation Records|The Primal Scream singer recalls their friendship and time as labelmates.
the-beach-boys|beatles|From Pet Sounds to Sgt. Pepper|The Beatles’ official anniversary account lists Pet Sounds among the album’s creative sources.
chuck-berry|the-beach-boys|Surfin’ U.S.A. and Sweet Little Sixteen|The Beach Boys used the tune of Berry’s song with different lyrics.
chuck-berry|beatles|Roll Over Beethoven|The Beatles covered Berry on With the Beatles, with George Harrison on lead vocals.
elton-john|john|Madison Square Garden|Lennon joined Elton John onstage in New York to perform “Whatever Gets You Thru the Night” and other songs.
elton-john|the-beach-boys|Rock Hall induction|Elton John inducted the Beach Boys into the Rock & Roll Hall of Fame.
john-fogerty|foo|Fortunate Son re-recording|Fogerty re-recorded the Creedence Clearwater Revival song with Foo Fighters.
brian-may|eddie-van-halen|Star Fleet Project|The two guitarists recorded together in Los Angeles. The sessions were released under Brian May + Friends.
joe-walsh|ringo|The first All Starr Band|The Eagles guitarist toured with the first edition of Ringo Starr’s All Starr Band.
andy-summers|eric-burdon|Eric Burdon and the Animals|Before the Police, Andy Summers played and recorded with Burdon’s band.
axl-rose|ac-dc|Rock or Bust tour|AC/DC announced that Axl Rose would sing on the remaining dates after Brian Johnson stepped away.
axl-rose|queen|Freddie Mercury Tribute Concert|Axl sang with members of Queen and joined Elton John on “Bohemian Rhapsody.”
joy-division|vu|Sister Ray live|Joy Division covered the Velvet Underground at London’s Moonlight Club. The recording appears on Still.
morrissey|new-york-dolls|Meltdown reunion|Morrissey, the festival curator, invited the New York Dolls to reunite and perform.
van-halen|the-kinks|You Really Got Me|Van Halen covered Ray Davies’s song on its debut.
debbie-harry|iggy|Well, Did You Evah!|The two recorded Cole Porter’s song for the benefit album Red Hot + Blue.
depeche-mode|bowie|Heroes at the Highline Sessions|Depeche Mode recorded and released a live cover of Bowie’s song.
page|jack-white|It Might Get Loud|Jimmy Page, Jack White, and the Edge played together and discussed their guitar approaches in the documentary.
r-e-m|patti|E-Bow the Letter|Patti Smith sang on the first single from R.E.M.’s New Adventures in Hi-Fi.
grohl|rush|2112: Overture live|Dave Grohl and Taylor Hawkins performed with Rush at its Rock Hall induction.
the-damned|stooges|I Feel Alright|The Damned covered the Stooges’ “1970” under this title on their first album.
justine-frischmann|suede|Suede before Elastica|Justine Frischmann played in the early Suede lineup before forming Elastica.
justine-frischmann|damon-albarn|A relationship during the Britpop years|Frischmann discussed her relationship with the Blur singer in an interview.
jarvis-cocker|jonny-greenwood|The Weird Sisters|The Pulp singer and Radiohead guitarist played in the fictional band in Harry Potter and the Goblet of Fire.
the-j-geils-band|the-rolling-stones|1981 North American tour|The J. Geils Band opened for the Rolling Stones on selected dates.
rammstein|depeche-mode|Stripped|Rammstein covered the Depeche Mode song for the tribute album For the Masses.
`.trim().split('\n').map(row => row.split('|'));
const englishStoryMap = new Map(englishStories.map(([a,b,title,detail]) => [a+'|'+b,{title,detail}]));

const englishYearWords = {'1960年代':'1960s','1970年代':'1970s','1960–70年代':'1960s–70s','1990年代':'1990s',
  '1980年代起':'1980s onward','1960年代起':'1960s onward','1990年代起':'1990s onward','1994年起':'1994 onward',
  '多年':'Over several years','多次合作':'Multiple sessions','2005 年前':'By 2005','2001 年前':'Before 2001',
  '1994 年访谈':'1994 interview','1970年代初':'Early 1970s','见阵容记录':'See lineup source','早期阵容':'Early lineup'};

Object.assign(englishBios,{
  'joe-satriani':'A guitarist who toured with Deep Purple from 1993 to 1994 after Ritchie Blackmore departed.',
  donovan:'A Scottish singer-songwriter whose 1960s recordings include “Sunshine Superman.”',
  'mark-knopfler':'Guitarist, vocalist, and songwriter of Dire Straits.',
  'roy-harper':'British folk-rock singer-songwriter and the guest vocalist on Pink Floyd’s “Have a Cigar.”',
  'bryan-ferry':'Singer of Roxy Music and a solo recording artist.',
  'kate-bush':'British recording artist and songwriter. Her albums include Hounds of Love.',
  'george-michael':'British singer who performed with Queen at the Freddie Mercury Tribute Concert.',
  'linda-ronstadt':'A singer whose early backing group included musicians who went on to form the Eagles.',
  'warren-zevon':'California singer-songwriter whose recordings feature several members of the Eagles.',
  'marilyn-manson':'Vocalist and recording artist associated with the band of the same name.',
  'rob-zombie':'Former White Zombie singer and solo recording artist.'
});

englishBios['bruce-springsteen'] = 'New Jersey songwriter and performer whose longtime collaborators include the E Street Band.';
englishBios['grateful-dead'] = 'A San Francisco Bay Area rock band known for live improvisation and extensively documented concerts.';

Object.assign(englishBios,{
  'elvis-presley':'American rock and roll singer whose Sun and RCA recordings became touchstones for later performers.',
  'little-richard':'American singer, pianist, and rock and roll pioneer, whose 1950s recordings include “Long Tall Sally” and “Tutti Frutti.”',
  'alice-in-chains':'Seattle rock band that released Facelift, Sap, and Dirt in the early 1990s.',
  'neil-young':'Canadian songwriter and guitarist known for acoustic and electric recordings, including Mirror Ball with members of Pearl Jam.',
  'david-crosby':'American songwriter and singer, a founding member of the Byrds and Crosby, Stills & Nash.'
});
