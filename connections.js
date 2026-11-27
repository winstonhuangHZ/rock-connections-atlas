const preferred = new Set([
  'dylan','brian-may','buddy','chuck-berry','creedence-clearwater-revival','bowie','deep-purple','eagles',
  'electric-light-orchestra','elton-john','george','guns-n-roses','jimi-hendrix','page','john','joy-division',
  'zeppelin','lou','nirvana','no-party-for-cao-dong','oasis','paul','pink-floyd','queen','radiohead',
  'rammstein','the-beach-boys','beatles','the-clash','doors','the-police','the-rolling-stones','vu','wings','yoko'
]);
addArtist('Chuck Berry','美国 · 早期摇滚','摇滚吉他与歌曲写作的先驱。《Johnny B. Goode》和《Roll Over Beethoven》的作者。','查克贝里');
addArtist('Elton John','英国 · 钢琴摇滚','以钢琴为创作核心的歌手与作曲家，长期与词作者 Bernie Taupin 合作。','埃尔顿约翰');
const additionalOasis = [
  ['Paul Arthurs~Paul Arthurs','Bonehead','吉他手，参与首张专辑及《Morning Glory》时期。'],
  ['Paul McGuigan~Paul McGuigan (musician)','Guigsy','贝斯手，参与乐队最早的三张录音室专辑。'],
  ['Tony McCarroll','','早期鼓手，参与首张专辑《Definitely Maybe》。'],
  ['Alan White~Alan White (Oasis drummer)','','接替 Tony McCarroll，并在《Morning Glory》时期录音和巡演。']
];
sources.oasisEarly = ['AllMusic · Oasis 乐队传记','https://www.allmusic.com/artist/oasis-mn0000393345/biography'];
for (const [label,aliases,detail] of additionalOasis) {
  const person = addArtist(label,'英国 · 英伦摇滚',detail,aliases);
  relations.push({a:person.id,b:'oasis',type:'member',year:'1990年代',title:'Oasis 阵容',detail,ref:'oasisEarly'});
}

const verifiedStories = `
lou|nico|personal|1960年代|地下丝绒时期的交往|据 MOJO 对这段时期的回顾，Nico 与 Lou Reed 曾短暂交往。|MOJO · Lou Reed 访谈回顾|https://www.mojo4music.com/articles/stories/lou-reed-interviewed/
john|keith-richards|record|1968|The Dirty Mac 合奏|Lennon 与 Keith Richards 在《The Rolling Stones Rock and Roll Circus》中同台演奏《Yer Blues》，同组还有 Clapton 与 Mitch Mitchell。|ABKCO 唱片演出署名|https://musicbrainz.org/release/0a9a5c89-3163-4f4a-a891-5c419da8d321
clapton|mitch-mitchell|record|1968|The Dirty Mac 合奏|Clapton 担任主音吉他手，Mitch Mitchell 打鼓，两人在《Yer Blues》中合作。|ABKCO 唱片演出署名|https://musicbrainz.org/release/0a9a5c89-3163-4f4a-a891-5c419da8d321
jimi-hendrix|chas-chandler|personal|1966|从纽约到伦敦|Animals 贝斯手 Chas Chandler 成为 Hendrix 的经纪人，带他前往英国组建 Jimi Hendrix Experience。|Jimi Hendrix 官网|https://www.jimihendrix.com/news/dagger-records-released-curtis-knight-featuring-jimi-hendrix-live-georges-club-20-1965-1966/
bowie|queen|record|1981|《Under Pressure》|Queen 与 David Bowie 在蒙特勒的 Mountain Studios 录制歌曲，Bowie 与 Freddie Mercury 共同演唱。|Queen 官网|https://www.queenonline.com/news/watch-queen-the-greatest-live-under-pressure-episode-16
bowie|david-gilmour|record|2006|皇家阿尔伯特音乐厅|Bowie 加入 David Gilmour 的演出，演唱《Arnold Layne》和《Comfortably Numb》。|David Bowie 官网|https://www.davidbowie.com/about/
bowie|reeves-gabrels|record|1989|Tin Machine|两人在 Tin Machine 共同作曲和演奏。Bowie 官网的巴黎现场档案保留了编制与作者署名。|David Bowie 官网|https://www.davidbowie.com/blog/2019/8/30/tin-machine-at-la-cigale-in-paris-1989
page|david-coverdale|record|1993|《Coverdale Page》|Led Zeppelin 吉他手和 Whitesnake 主唱合作发行同名专辑。|Jimmy Page 官方唱片目录|https://jimmypage.com/discography/
nirvana|sonic-youth|record|1991|欧洲联合巡演|David Markey 的纪录片《1991: The Year Punk Broke》记录了两支乐队在欧洲巡演的演出和后台。|美国电影学会 · 影片档案|https://catalog.afi.com/Film/59620-1991--THE-YEAR-PUNK-BROKE
kurt|pixies|influence|1994 年访谈|《Smells Like Teen Spirit》的参考|Cobain 说，写歌时曾有意模仿 Pixies，并提到它们使用的安静段落与大音量段落的切换。|David Fricke 访谈原文转录|https://hibarr.beehiiv.com/p/kurt-cobain-1994//
weezer|ric-ocasek|record|1994|《Blue Album》|The Cars 的 Ric Ocasek 为 Weezer 制作首张同名专辑。|Weezer 官方视频 · 制作回顾|https://www.youtube.com/watch?v=CowQzSVKr8c
lou|u2|record|1992|《Satellite of Love》|Lou Reed 在 Zoo TV 巡演的 Giants Stadium 演出登台，与 U2 合唱。|U2 官网|https://www.u2.com/blogs/news/magic-and-loss
u2|peter-gabriel|record|1986|Conspiracy of Hope 巡演|两者参与了为国际特赦组织举办的巡回演出。|U2 官网|https://www.u2.com/blogs/news/magic-and-loss
peter-gabriel|tony-levin|record|多次合作|《What Lies Ahead》|King Crimson 贝斯手 Tony Levin 为 Peter Gabriel 的这首曲目演奏贝斯。|Peter Gabriel 官网 · 唱片署名|https://petergabriel.com/release/what-lies-ahead/
lemmy|metallica|influence|1980年代起|Lars Ulrich 的音乐偶像|Ulrich 在悼念 Lemmy 的文章中回忆早年追随 Motörhead，并将 Lemmy 的影响与 Metallica 的成立联系起来。|Metallica 官网 · Lars Ulrich|https://www.metallica.com/news/2015-12-30-his-spirit-will-always-live-in-us.html
mick-jones|gorillaz|record|2010|《Plastic Beach》|The Clash 前吉他手 Mick Jones 参与 Gorillaz 专辑的同名曲。|Parlophone · 录音与署名|https://www.youtube.com/watch?v=sn3S1LbR5FY
paul-simonon|gorillaz|record|2010|《Plastic Beach》|The Clash 贝斯手 Paul Simonon 也参与这首录音。|Parlophone · 录音与署名|https://www.youtube.com/watch?v=sn3S1LbR5FY
joe-strummer|roger-daltrey|record|2001|《Global a Go-Go》|The Who 主唱 Roger Daltrey 为 Joe Strummer and the Mescaleros 的专辑演唱和声。|Joe Strummer 官网 · 音乐档案|https://www.joestrummer.com/music
joe-strummer|jack-irons|record|1989|《Earthquake Weather》|曾加入红辣椒、后加入 Pearl Jam 的鼓手 Jack Irons 参与了 Strummer 的个人专辑。|Joe Strummer 官网 · 音乐档案|https://www.joestrummer.com/music
the-clash|ranking-roger|record|1981|两首《Combat Rock》时期的客席录音|Ranking Roger 为《Rock the Casbah》和《Red Angel Dragnet》录制人声，其版本于 2022 年发行。|The Clash 官网|https://2026.theclash.com/news/combat-rock-the-peoples-hall-out-now
the-clash|ramones|influence|1976|伦敦的 Ramones 演出|摇滚名人堂的入选文章记载，The Clash 的成员看过 Ramones 1976 年在伦敦的演出。|摇滚名人堂 · 地下丝绒入选文章|https://rockhall.com/wp-content/uploads/2024/03/The_Velvet_Underground_1996.pdf
oasis|paul-weller|record|1995|《Champagne Supernova》录音|制作人 Owen Morris 回忆，Paul Weller 在录音室版本中演奏主音吉他并唱和声。|Sound On Sound · 制作人访谈|https://www.soundonsound.com/techniques/classic-tracks-oasis-wonderwall
oasis|john-squire|record|1996|Knebworth 的《Champagne Supernova》|Stone Roses 吉他手 John Squire 在 8 月 11 日的演出中客席演奏。|Oasis 官方现场影像|https://www.youtube.com/watch?v=gMM4lZxyevg
liam|john-squire|record|2024|合作专辑《Liam Gallagher John Squire》|两人以各自名字共同发行专辑。|Warner Records · 唱片发行公告|https://press.warnerrecords.com/sites/g/files/g2000014901/files/2024-03/Liam%20Gallagher%20John%20Squire%20Album%20Release.pdf
oasis|beatles|influence|1996|《I Am the Walrus》|Oasis 在 Knebworth 现场翻唱披头士的歌曲。|Oasis 官方现场影像|https://www.youtube.com/watch?v=Ram8JeA3khI
bobby-gillespie|oasis|personal|1990年代|Creation 厂牌时期|Primal Scream 主唱回忆两支乐队同属 Creation，也是朋友。|MusicRadar · Bobby Gillespie 访谈|https://www.musicradar.com/artists/i-said-hey-guys-weve-got-a-visitor-they-looked-at-me-as-if-to-say-so-what-and-then-joey-ramone-walked-in-and-went-hows-it-going-guys-everyones-jaws-hit-the-floor-we-speak-to-primal-scream-legend-bobby-gillespie
the-beach-boys|beatles|influence|1966–67|从《Pet Sounds》到《Sgt. Pepper》|披头士官方的周年资料将《Pet Sounds》列为创作《Sgt. Pepper》的灵感来源之一。|The Beatles 官网|https://www.thebeatles.com/beatles-celebrate-anniversary-sgt-peppers-lonely-hearts-club-band-special-edition-release
chuck-berry|the-beach-boys|influence|1963|《Surfin’ U.S.A.》与《Sweet Little Sixteen》|摇滚名人堂的入选文章指出，两首歌使用相同的曲调，《Surfin’ U.S.A.》改用了冲浪主题的歌词。|摇滚名人堂 · 海滩男孩入选文章|https://rockhall.com/wp-content/uploads/2024/03/The_Beach_Boys_1988.pdf
chuck-berry|beatles|influence|1963|翻唱《Roll Over Beethoven》|披头士把 Chuck Berry 的这首歌收进《With the Beatles》，由 George Harrison 主唱。|The Beatles 官网 · 歌曲档案|https://www.thebeatles.com/roll-over-beethoven
elton-john|john|record|1974|麦迪逊广场花园同台|Lennon 参加 Elton John 的纽约演出，合唱《Whatever Gets You Thru the Night》等曲目。|Elton John 官网 · 年表|https://www.eltonjohn.com/timelines/1970s
elton-john|the-beach-boys|personal|1988|摇滚名人堂引荐|Elton John 担任 The Beach Boys 入选摇滚名人堂的引荐人。|摇滚名人堂 · The Beach Boys|https://rockhall.com/inductees/beach-boys/
john-fogerty|foo|record|2013|《Fortunate Son》重新录音|Fogerty 与 Foo Fighters 合作重录了这首 Creedence Clearwater Revival 歌曲。|唱片发行 · 曲目署名|https://music.apple.com/us/song/1491072528
brian-may|eddie-van-halen|record|1983|《Star Fleet Project》|Brian May 与 Eddie Van Halen 在洛杉矶同场录制吉他，录音随后以 Brian May + Friends 名义发行。|Brian May 官网|https://brianmay.com/brian-news/2023/06/announcing-release-star-fleet-sessions/
joe-walsh|ringo|record|1989|首届 All Starr Band|Eagles 吉他手 Joe Walsh 加入 Ringo Starr 第一届 All Starr Band 并参与巡演。|Joe Walsh 官网 · 传记|https://joewalsh.com/pages/about
andy-summers|eric-burdon|record|1968|Eric Burdon and the Animals 时期|Andy Summers 在加入 The Police 前曾演奏于 Eric Burdon 的乐队，并参与其录音。|Andy Summers 官网 · 唱片目录|https://andysummers.com/music/discography/
axl-rose|ac-dc|member|2016|《Rock or Bust》巡演客席主唱|AC/DC 宣布由 Axl Rose 接替 Brian Johnson 完成巡演余下场次。|AC/DC 官网 · 巡演公告|https://www.acdc.com/rock-or-bust-world-tour-continues-with-axl-rose/
axl-rose|queen|record|1992|Freddie Mercury 纪念音乐会|Axl Rose 在 Queen 成员参与的温布利纪念音乐会中演唱，包括与 Elton John 合作的《Bohemian Rhapsody》。|Queen 官网 · 现场档案|https://www.queenonline.com/live/1992-present
joy-division|vu|influence|1980|《Sister Ray》现场翻唱|Joy Division 在伦敦 Moonlight Club 演奏地下丝绒的《Sister Ray》，录音收录于《Still》。|Warner · 现场录音|https://www.youtube.com/watch?v=Iudk8Zf9nsA
morrissey|new-york-dolls|record|2004|Meltdown 音乐节重聚|担任当年音乐节策划人的 Morrissey 邀请 New York Dolls 重组并在伦敦演出。|The Guardian · 当年报道|https://www.theguardian.com/music/2004/jun/20/1
van-halen|the-kinks|influence|1978|《You Really Got Me》翻唱|Van Halen 的首专录制了由 Ray Davies 写给 The Kinks 的这首歌。|Warner · 发行录音|https://www.youtube.com/watch?v=-Oh6hNFZ2KA
debbie-harry|iggy|record|1990|《Well, Did You Evah!》|Debbie Harry 与 Iggy Pop 为慈善专辑《Red Hot + Blue》合唱 Cole Porter 的作品。|唱片发行 · 录音|https://www.youtube.com/watch?v=dmOjIyRciQg
depeche-mode|bowie|influence|2017|Highline Sessions 的《Heroes》|Depeche Mode 录制了 Bowie 的《Heroes》，并通过官方频道发布现场录音。|Depeche Mode · 官方视频|https://www.youtube.com/watch?v=q6yzrZfgQvI
page|jack-white|record|2008|《It Might Get Loud》合奏|纪录片邀请 Jimmy Page、Jack White 和 The Edge 见面、演奏并讨论各自的吉他风格。|Sony Pictures · 影片档案|https://www.sonypictures.com/movies/itmightgetloud
r-e-m|patti|record|1996|《E-Bow the Letter》|Patti Smith 在 R.E.M. 的《New Adventures in Hi-Fi》先行单曲里献声。|R.E.M. 官网 · 专辑档案|https://remhq.com/music/new-adventures-in-hi-fi/
grohl|rush|record|2013|《2112: Overture》现场|Dave Grohl 和 Taylor Hawkins 在摇滚名人堂典礼与 Rush 同台演奏。|摇滚名人堂 · 现场录像|https://www.youtube.com/watch?v=pKR5Ac5memY
the-damned|stooges|influence|1977|首专里的《I Feel Alright》|The Damned 在《Damned Damned Damned》中翻唱 The Stooges 的《1970》，使用《I Feel Alright》作为曲名。|唱片曲目与署名|https://musicbrainz.org/release/0f2162f3-c7a2-4ac0-acde-4496f6fb4e8a
justine-frischmann|suede|member|早期阵容|Elastica 之前的 Suede|Justine Frischmann 在组建 Elastica 前参与了 Suede 的早期阵容。|The Guardian · Frischmann 访谈|https://www.theguardian.com/artanddesign/2016/mar/14/justine-frischmann-elastica-interview-volta-art-fair
justine-frischmann|damon-albarn|personal|1990年代|英伦摇滚时期的伴侣|Frischmann 的采访回顾了她与 Blur 主唱 Damon Albarn 的交往。|The Guardian · Frischmann 访谈|https://www.theguardian.com/artanddesign/2016/mar/14/justine-frischmann-elastica-interview-volta-art-fair
jarvis-cocker|jonny-greenwood|record|2005|《哈利·波特与火焰杯》的舞会乐队|Pulp 主唱与 Radiohead 吉他手共同参与影片中的虚构乐队 The Weird Sisters。|The Independent · Jarvis Cocker 访谈|https://www.independent.co.uk/arts-entertainment/music/news/jarvis-cocker-harry-potter-goblet-of-fire-weird-sisters-yule-ball-a9609736.html
the-j-geils-band|the-rolling-stones|record|1981|北美巡演开场|J. Geils Band 为 Rolling Stones 的部分场次暖场。|Getty · 当年演出照片档案|https://www.gettyimages.no/detail/news-photo/opening-for-the-rolling-stones-peter-wolf-the-j-geils-band-news-photo/879671594
rammstein|depeche-mode|influence|1998|《Stripped》翻唱|Rammstein 为 Depeche Mode 致敬专辑《For the Masses》录制了这首歌的翻唱。|Rammstein 官网 · 年表|https://www.rammstein.de/en/history/
`.trim();
for (const [index,row] of verifiedStories.split('\n').entries()) {
  const [a,b,type,year,title,detail,source,url] = row.split('|');
  if (!artists[a] || !artists[b]) throw new Error('Unknown connection endpoint: '+a+' / '+b);
  const ref = 'story-'+index;
  sources[ref] = [source,url];
  relations.push({a,b,type,year,title,detail,ref});
}

addArtist('Barbara Bach','美国 · 演员','美国演员，出演《海底城》和《Caveman》，1981 年与 Ringo Starr 结婚。','芭芭拉巴赫');
addArtist('Marjorie Bach~Joe Walsh','美国 · 相关人物','Barbara Bach 的姐妹，2008 年与 Eagles 吉他手 Joe Walsh 结婚。','玛乔丽巴赫');
addArtist('Donovan','苏格兰 · 民谣摇滚','1960 年代创作歌手，《Sunshine Superman》的作者和演唱者。');

function addBilingualStories(stories) {
  for (const row of stories.trim().split('\n')) {
    const [a,b,type,year,title,detail,englishTitle,englishDetail,source,url,direction] = row.split('|');
    if (!artists[a] || !artists[b]) throw new Error('Unknown connection endpoint: '+a+' / '+b);
    const ref = 'documented-'+relations.length;
    sources[ref] = [source,url];
    if (direction && direction !== "forward") throw new Error("Invalid direction: "+direction);
    relations.push({a,b,type,year,title,detail,ref,en:{title:englishTitle,detail:englishDetail},...(direction && {direction})});
  }
}

addBilingualStories(`
ringo|barbara-bach|family|1981|Ringo Starr 与 Barbara Bach 结婚|Ringo Starr 和演员 Barbara Bach 于 1981 年结婚。|Ringo Starr and Barbara Bach marry|Ringo Starr married actor Barbara Bach in 1981.|ABC Audio · 婚姻与亲属关系|https://digital.abcaudio.com/news/day-december-13-2008-joe-walsh-becomes-laws-ringo-starr
barbara-bach|marjorie-bach|family|—|Bach 姐妹|Ringo Starr 在访谈中称 Marjorie 为 Barbara 的姐妹。|The Bach sisters|Marjorie Bach is the sister of actor Barbara Bach.|Howard Stern · Ringo Starr 访谈|https://www.howardstern.com/show/2018/11/26/ringo-starr-brings-beatles-stories-his-childhood-memories-and-his-brother-law-joe-walsh/
marjorie-bach|joe-walsh|family|2008|Marjorie Bach 与 Joe Walsh 结婚|两人于 2008 年 12 月 13 日在洛杉矶结婚。|Marjorie Bach and Joe Walsh marry|They married in Los Angeles on December 13, 2008.|ABC Audio · 婚姻与亲属关系|https://digital.abcaudio.com/news/day-december-13-2008-joe-walsh-becomes-laws-ringo-starr
beatles|the-rolling-stones|record|1963|《I Wanna Be Your Man》|John Lennon 和 Paul McCartney 写了这首歌，滚石和披头士各录了一个版本，均于 1963 年发行。|I Wanna Be Your Man|John Lennon and Paul McCartney wrote the song. The Rolling Stones and the Beatles recorded separate versions, both released in 1963.|Cambridge University Press · 录音史|https://assets.cambridge.org/97811070/30268/excerpt/9781107030268_excerpt.pdf
paul|the-rolling-stones|record|2023|《Bite My Head Off》里的贝斯|McCartney 为滚石专辑《Hackney Diamonds》的这首曲目演奏失真贝斯。|Bass on Bite My Head Off|McCartney plays fuzz bass on this Rolling Stones track from Hackney Diamonds.|Recording Academy · 专辑报道|https://www.grammy.com/news/5-takeaways-from-the-rolling-stones-new-album-hackney-diamonds-videos/
beatles|the-rolling-stones|record|1967|《We Love You》里的和声|滚石的录音由披头士成员 Lennon 和 McCartney 客串和声。|Backing vocals on We Love You|Beatles members John Lennon and Paul McCartney contributed backing vocals to the Rolling Stones recording.|ABKCO · 唱片录音与署名|https://www.youtube.com/watch?v=uXl3RpV-iOo
brian-jones|beatles|record|1967|《You Know My Name (Look Up the Number)》|滚石的 Brian Jones 为披头士这首录音演奏萨克斯。|You Know My Name (Look Up the Number)|Brian Jones of the Rolling Stones played saxophone on the Beatles recording.|Guitar World · 录音回顾|https://www.guitarworld.com/features/10-beatles-rolling-stones-collaborations
mick-jagger|bowie|record|1985|《Dancing in the Street》|David Bowie 和 Mick Jagger 为 Live Aid 合唱并录制了这首歌。|Dancing in the Street|David Bowie and Mick Jagger recorded the duet for Live Aid.|David Bowie 官网 · 录音与影像|https://www.davidbowie.com/blog/2020/7/13/bowie-and-jagger-and-that-video
elton-john|the-rolling-stones|record|2023|《Hackney Diamonds》里的钢琴|Elton John 为《Get Close》和《Live By the Sword》弹奏钢琴。|Piano on Hackney Diamonds|Elton John played piano on “Get Close” and “Live By the Sword.”|Recording Academy · 专辑报道|https://www.grammy.com/news/5-takeaways-from-the-rolling-stones-new-album-hackney-diamonds-videos/
john|bowie|record|1975|《Fame》|Lennon 与 David Bowie、Carlos Alomar 合写了《Fame》，并参与录音。|Fame|Lennon co-wrote “Fame” with David Bowie and Carlos Alomar and contributed to the recording.|John Lennon 官网 · 合作档案|https://www.johnlennon.com/music/collaborations/david-bowie-fame/
paul|grohl|record|2012|《Cut Me Some Slack》|McCartney 与 Dave Grohl、Krist Novoselic 和 Pat Smear 共同创作和录制《Sound City》原声中的这首歌。|Cut Me Some Slack|McCartney co-wrote and recorded this Sound City track with Dave Grohl, Krist Novoselic, and Pat Smear.|Paul McCartney 官网 · 唱片公告|https://www.paulmccartney.com/news/updated-dave-grohls-sound-city-soundtrack-feat-cut-me-some-slack-out-now
paul|krist|record|2012|《Cut Me Some Slack》|McCartney 和 Krist Novoselic 参加了这首《Sound City》原声录音。|Cut Me Some Slack|McCartney and Krist Novoselic recorded this track with Dave Grohl and Pat Smear for Sound City.|Paul McCartney 官网 · 唱片公告|https://www.paulmccartney.com/news/updated-dave-grohls-sound-city-soundtrack-feat-cut-me-some-slack-out-now
paul|joe-walsh|record|2019|Ringo 版《Grow Old With Me》|两人为 Ringo Starr 的录音分别演奏贝斯与吉他，原曲由 John Lennon 创作。|Grow Old With Me|McCartney played bass and Joe Walsh played guitar on Ringo Starr’s recording of John Lennon’s song.|Ringo Starr 官网 · 唱片公告|https://www.ringostarr.com/ringo-starr-announces-his-20th-studio-album-whats-my-name-be-released-october-25-2019/
george|lynne|record|1987|《Cloud Nine》|Jeff Lynne 与 George Harrison 共同制作了《Cloud Nine》，两人随后成为 Traveling Wilburys 队友。|Cloud Nine|Lynne and Harrison co-produced Cloud Nine and later played together in the Traveling Wilburys.|George Harrison 官网 · 唱片档案|https://www.georgeharrison.com/the-dark-horse-years-out-today/
clapton|paul|record|2002|Concert for George|两人在 George Harrison 纪念音乐会上演奏《While My Guitar Gently Weeps》，Clapton 弹吉他，McCartney 弹钢琴。|Concert for George|Clapton played guitar and McCartney played piano on “While My Guitar Gently Weeps” at the memorial concert.|George Harrison 官网 · 演出档案|https://www.georgeharrison.com/concert-for-george-film-makes-digital-debut/
bonham|wings|record|1979|Wings 的 Rockestra 录音|John Bonham 在 Wings 的《Rockestra Theme》和《So Glad To See You Here》中打鼓。|The Rockestra sessions|John Bonham played drums on Wings’ “Rockestra Theme” and “So Glad To See You Here.”|Paul McCartney 官网 · 专辑署名|https://www.paulmccartney.com/discography/albums/back-to-the-egg
jones|wings|record|1979|Wings 的 Rockestra 录音|John Paul Jones 为 Wings《Back to the Egg》的两首 Rockestra 曲目录制乐器。|The Rockestra sessions|John Paul Jones is credited on the two Rockestra tracks from Wings’ Back to the Egg.|Paul McCartney 官网 · 专辑署名|https://www.paulmccartney.com/discography/albums/back-to-the-egg
pete-townshend|wings|record|1979|Wings 的 Rockestra 录音|Pete Townshend 作为客席乐手参与 Wings《Back to the Egg》的两首 Rockestra 曲目。|The Rockestra sessions|Pete Townshend was a guest musician on the two Rockestra tracks from Wings’ Back to the Egg.|Paul McCartney 官网 · 专辑署名|https://www.paulmccartney.com/discography/albums/back-to-the-egg
david-gilmour|wings|record|1979|Wings 的 Rockestra 录音|David Gilmour 作为客席吉他手参与 Wings《Back to the Egg》的两首 Rockestra 曲目。|The Rockestra sessions|David Gilmour played guitar on the two Rockestra tracks from Wings’ Back to the Egg.|Paul McCartney 官网 · 专辑署名|https://www.paulmccartney.com/discography/albums/back-to-the-egg
page|donovan|record|1966 / 2011|《Sunshine Superman》|Page 参与原版录音，并在 2011 年与 Donovan 在皇家阿尔伯特音乐厅重演。|Sunshine Superman|Page played on the original recording and joined Donovan to perform it at the Royal Albert Hall in 2011.|Donovan 官网 · 演出档案|https://donovan.ie/donovan-royal-albert-hall-broadcast/
no-party-for-cao-dong|nirvana|influence|2015|草东早期的聆听背景|Blow 吹音乐的乐队专访将 Nirvana 列为成员成长时听的乐队之一。|Early listening influences|Blow’s interview with the band identifies Nirvana as one of the bands its members grew up listening to.|Blow 吹音樂 · 草東樂團訪談|https://blow.streetvoice.com/16090/
`);

const additionalProfiles = [
  ['Mark Knopfler','英国 · 摇滚','Dire Straits 主唱与吉他手。'],
  ['Dire Straits','英国 · 乐队','由 Mark Knopfler 等人创立的英国摇滚乐队。','恐怖海峡'],
  ['Roy Harper~Roy Harper (singer)','英国 · 民谣摇滚','英国创作歌手，曾在《Have a Cigar》中担任主唱。'],
  ['Bryan Ferry','英国 · 艺术摇滚','Roxy Music 主唱，也长期发行个人专辑。'],
  ['Kate Bush','英国 · 艺术摇滚','英国音乐人，作品包括《Hounds of Love》。','凯特布什'],
  ['George Michael','英国 · 相关人物','英国歌手，在 1992 年 Freddie Mercury 纪念音乐会上与 Queen 同台。'],
  ['Meat Puppets','美国 · 乐队','亚利桑那州的另类摇滚乐队，Kirkwood 兄弟参与了 Nirvana 的不插电演出。'],
  ['The Vaselines','苏格兰 · 乐队','格拉斯哥独立摇滚乐队，多首作品由 Nirvana 翻唱。'],
  ['Linda Ronstadt','美国 · 乡村摇滚','歌手，早期 Eagles 成员曾在她的伴奏队演出。'],
  ['Warren Zevon','美国 · 摇滚','与 Jackson Browne、Don Henley 等加州音乐人有过合作的创作歌手。'],
  ['Marilyn Manson~Marilyn Manson (musician)','美国 · 工业金属','以同名乐队及其唱片作品闻名的主唱。'],
  ['Apocalyptica','芬兰 · 乐队','以大提琴编配著称的芬兰摇滚与金属乐队。','启示录乐团'],
  ['Faith No More','美国 · 乐队','来自旧金山的另类金属与摇滚乐队。'],
  ['Rob Zombie','美国 · 工业金属','前 White Zombie 主唱，后发行个人唱片。']
];
for (const profile of additionalProfiles) addArtist(...profile);

addBilingualStories(`
mark-knopfler|dire-straits|member|1977–95|Dire Straits 吉他手与主唱|Mark Knopfler 是 Dire Straits 创始成员、主唱和吉他手。|Founding singer and guitarist|Mark Knopfler was a founding member, singer, and guitarist of Dire Straits.|摇滚名人堂 · Dire Straits|https://rockhall.com/inductees/dire-straits/
sting|dire-straits|record|1985|《Money for Nothing》|Sting 参与了 Dire Straits《Brothers in Arms》里这首曲目的录音。|Money for Nothing|Sting contributed vocals to the Dire Straits track from Brothers in Arms.|Sting 官网 · 唱片档案|https://sting.com/products/dire-straits-brothers-in-arms
sting|mark-knopfler|record|1997|Montserrat 慈善音乐会|两人在慈善音乐会上共同演唱《Money for Nothing》，Eric Clapton 与 Phil Collins 也参与。|Music for Montserrat|Sting and Knopfler performed “Money for Nothing” with Eric Clapton and Phil Collins at the benefit concert.|Sting 官网 · 现场档案|https://sting.com/products/music-music-for-montserrat
andy-summers|robert-fripp|record|1981–84|《I Advance Masked》与《Bewitched》|The Police 和 King Crimson 的两位吉他手共同录制了两张专辑。|I Advance Masked and Bewitched|The Police and King Crimson guitarists made two albums together.|Discipline Global Mobile · Fripp 档案|https://dgmlive.com/news/rf-at-80-25
sting|peter-gabriel|record|2016|Rock Paper Scissors 巡演|Sting 与 Peter Gabriel 在美国与加拿大举行联合巡演。|Rock Paper Scissors|Sting and Peter Gabriel toured the US and Canada together.|Peter Gabriel 官网 · 巡演档案|https://petergabriel.com/video/rock-paper-scissors/
pink-floyd|roy-harper|record|1975|《Have a Cigar》|Roy Harper 为 Pink Floyd 的《Wish You Were Here》中的这首歌担任主唱。|Have a Cigar|Roy Harper sang lead on the Pink Floyd track from Wish You Were Here.|Pink Floyd 官方唱片资料|https://shop.uk.pinkfloyd.com/products/wish-you-were-here-cd
paul|david-gilmour|record|1999|《Run Devil Run》|David Gilmour 在 McCartney 的个人专辑中参与吉他演奏与和声。|Run Devil Run|Gilmour is credited on guitar and backing vocals on McCartney’s solo album.|Paul McCartney 官网 · 专辑署名|https://www.paulmccartney.com/discography/albums/run-devil-run
bryan-ferry|david-gilmour|record|1985|《Boys and Girls》|David Gilmour 为 Bryan Ferry 的个人专辑演奏吉他，曲目包括《Windswept》。|Boys and Girls|Gilmour played guitar on Ferry’s solo album, including “Windswept.”|Bryan Ferry 官网 · 专辑档案|https://www.bryanferry.com/collections/boys-girls
kate-bush|david-gilmour|record|1987|《Running Up That Hill》现场|两人在 Secret Policeman’s Third Ball 的演出中合作。|Running Up That Hill live|Gilmour played with Kate Bush at the Secret Policeman’s Third Ball.|现场影像发行资料|https://www.pinkfloydarchives.com/DUKVHSDG.htm
elton-john|queen|record|1997|《The Show Must Go On》现场|Elton John 同 Queen 的 Brian May、Roger Taylor 和 John Deacon 在巴黎演出。|The Show Must Go On live|Elton John performed the song with Brian May, Roger Taylor, and John Deacon in Paris.|Queen 官网 · 演出档案|https://www.queenonline.com/news/queen-bejart-ballet-for-the-masses-episode-42
george-michael|queen|record|1992|《Somebody to Love》现场|George Michael 在 Freddie Mercury 纪念音乐会上与 Queen 同台。|Somebody to Love live|George Michael sang with Queen at the Freddie Mercury Tribute Concert.|Queen 官网 · 现场曲目|https://www.queenonline.com/news/press-release-the-freddie-mercury-tribute-concert-the-definitive-edition
tony-iommi|queen|record|1992|《I Want It All》现场|Black Sabbath 吉他手 Tony Iommi 在 Freddie Mercury 纪念音乐会上与 Queen 合作。|I Want It All live|Black Sabbath guitarist Tony Iommi played with Queen at the Freddie Mercury Tribute Concert.|Queen 官网 · 现场曲目|https://www.queenonline.com/news/press-release-the-freddie-mercury-tribute-concert-the-definitive-edition
def-leppard|brian-may|record|1992|《Now I’m Here》现场|Def Leppard 与 Brian May 在 Freddie Mercury 纪念音乐会上演奏这首歌。|Now I’m Here live|Def Leppard performed the song with Brian May at the Freddie Mercury Tribute Concert.|Queen 官网 · 现场曲目|https://www.queenonline.com/news/press-release-the-freddie-mercury-tribute-concert-the-definitive-edition
meat-puppets|nirvana|record|1993|MTV Unplugged|Cris 和 Curt Kirkwood 与 Nirvana 同台演奏三首 Meat Puppets 歌曲。|MTV Unplugged|Cris and Curt Kirkwood joined Nirvana for three Meat Puppets songs.|Recording Academy · 经纪人访谈|https://qa.grammy.com/news/nirvana-manager-danny-goldberg-talks-25-years-mtv-unplugged-new-york
bowie|nirvana|influence|1993|《The Man Who Sold the World》|Nirvana 在 MTV Unplugged 翻唱 David Bowie 的歌曲。|The Man Who Sold the World|Nirvana covered the Bowie song on MTV Unplugged.|David Bowie 官网 · 录音回顾|https://www.davidbowie.com/2009/2009/10/03/nirvanas-tmwstw-voted-best-cover-version-of-all-time
the-vaselines|nirvana|influence|1991|《Molly’s Lips》|Sub Pop 发行了 Nirvana 翻唱 The Vaselines 这首歌的现场录音。|Molly’s Lips|Sub Pop released Nirvana’s live cover of the Vaselines song.|Sub Pop · 唱片档案|https://www.subpop.com/releases/the_fluid_nirvana/candy
vu|nirvana|influence|1991|《Here She Comes Now》|Nirvana 为地下丝绒致敬专辑录制了这首歌，也将其作为与 Melvins 的分辑单曲发行。|Here She Comes Now|Nirvana recorded the cover for a Velvet Underground tribute and released it on a split single with the Melvins.|Rolling Stone · 歌曲档案|https://au.rollingstone.com/music/music-lists/no-apologies-all-102-nirvana-songs-ranked-26796/here-she-comes-now-26812/
r-e-m|kurt|influence|1994|《Let Me In》|R.E.M. 的这首歌向 Cobain 致意，Mike Mills 在录音中使用了 Cobain 的吉他。|Let Me In|R.E.M. wrote the song in tribute to Cobain. Mike Mills played Cobain’s guitar on the recording.|R.E.M. 官网 · 唱片公告|https://remhq.com/news/monster-25th-anniversary-reissue-set-for-release-november-1-2019-monster25/
linda-ronstadt|eagles|record|1970年代初|Eagles 成团前的伴奏队|Eagles 创始成员在成团前曾在 Linda Ronstadt 的伴奏队演出。|Before the Eagles formed|Founding Eagles members played in Ronstadt’s backing band before forming their own group.|摇滚名人堂 · Eagles 乐队史|https://rockhall.com/wp-content/uploads/2024/03/Eagles_1998.pdf
glenn-frey|browne|record|1972|《Take It Easy》|Jackson Browne 和 Glenn Frey 共同创作了 Eagles 发行的这首歌。|Take It Easy|Jackson Browne and Glenn Frey co-wrote the song recorded by the Eagles.|Jackson Browne 官网|https://www.jacksonbrowne.com/news/jackson-browne-2
stevie-nicks|don-henley|record|1981|《Leather and Lace》|Fleetwood Mac 的 Stevie Nicks 与 Eagles 的 Don Henley 在 Nicks 的个人专辑《Bella Donna》中合唱。|Leather and Lace|The Fleetwood Mac and Eagles singers duetted on Nicks’s solo album Bella Donna.|Rhino · 专辑档案|https://www.rhino.com/article/rhino-pairs-stevie-nicks-bella-donna-wilcos-am-in-latest-high-fidelity-release
warren-zevon|don-henley|record|1980 / 2003|Zevon 录音里的和声|Don Henley 在 Zevon 的《Wild Age》和《She’s Too Good for Me》等曲目中唱和声。|Backing vocals on Zevon recordings|Henley sang backing vocals on Warren Zevon’s recordings, including “Wild Age.”|Warren Zevon 官网 · 署名|https://www.warrenzevon.com/BadLuckStreakInDancingSchool/
elton-john|don-henley|record|1993|《Shakey Ground》|Elton John 和 Eagles 主唱 Don Henley 为《Duets》录制了这首歌。|Shakey Ground|Elton John and Don Henley recorded the track for Elton’s Duets album.|Elton John 官网 · 专辑档案|https://www.eltonjohn.com/discography/duets
marilyn-manson|paul-landers|record|2003|《mOBSCENE》混音|Rammstein 的 Paul Landers 与 Christoph Schneider 制作了这首歌的 Sauerkraut Remix。|mOBSCENE remix|Rammstein’s Paul Landers and Christoph Schneider made the Sauerkraut Remix.|Rammstein 官网 · 年表|https://www.rammstein.de/en/history/?article=93
apocalyptica|rammstein|record|2005|《Benzin》混音|Apocalyptica 制作了《Benzin》单曲中的 Kerosinii Remix。|Benzin remix|Apocalyptica contributed the Kerosinii Remix to Rammstein’s single.|Rammstein 官网 · 年表|https://www.rammstein.de/de/history/
lemmy|richard-kruspe|record|2014|Emigrate 的《Rock City》|Motörhead 的 Lemmy 为 Richard Kruspe 的 Emigrate 项目录制人声。|Rock City by Emigrate|Motörhead’s Lemmy contributed vocals to Richard Kruspe’s Emigrate project.|Universal Music · 唱片公告|https://www.universal-music.de/emigrate/news/emigrate-silent-so-long-2014-230380
ramones|rammstein|influence|2001|《Pet Sematary》翻唱|Rammstein 将这首 Ramones 歌曲的现场翻唱收录在《Ich Will》单曲中，由 Flake 演唱。|Pet Sematary live cover|Rammstein released a live cover of the Ramones song, sung by Flake, on the Ich Will single.|Rammstein 官网 · 唱片年表|https://www.rammstein.de/en/history/
faith-no-more|rammstein|record|1998|《Du Riechst So Gut》混音|Faith No More 参与制作了这首 Rammstein 单曲的混音版本。|Du Riechst So Gut remix|Faith No More contributed a remix of the Rammstein track for its 1998 single.|Rammstein 官网 · 唱片年表|https://www.rammstein.de/en/history/
rob-zombie|rammstein|record|1999|《Spookshow Baby》混音|Rammstein 为 Rob Zombie 的混音专辑贡献了 Black Leather Cat Suit Mix。|Spookshow Baby remix|Rammstein contributed the Black Leather Cat Suit Mix to Rob Zombie’s remix album.|Rammstein 官网 · 唱片年表|https://www.rammstein.de/de/history/
`);

addArtist('Joe Satriani','美国 · 硬摇滚','吉他手，1993 至 1994 年曾在 Deep Purple 的巡演中担任吉他手。','乔萨特里亚尼');
addArtist('The Move~The Move','英国 · 乐队','来自伯明翰的摇滚乐队，其成员后来参与组建 Electric Light Orchestra。');
addBilingualStories(`
talking-heads|radiohead|influence|1991|Radiohead 的名字|Radiohead 的乐队名取自 Talking Heads 的《Radio Head》。David Byrne 后来也在摇滚名人堂为 Radiohead 引荐。|The name Radiohead|Radiohead took its name from the Talking Heads song “Radio Head.” David Byrne later inducted the band into the Rock Hall.|摇滚名人堂 · David Byrne 引荐演讲|https://www.youtube.com/watch?v=5WvE9X9SFKg
`);
addBilingualStories(`
thom-yorke|r-e-m|record|2004|《E-Bow the Letter》现场|Thom Yorke 与 R.E.M. 在伦敦 St James’s Church 演出该曲，现场录音收录于《R.E.M. at the BBC》。|E-Bow the Letter live|Yorke joined R.E.M. for this song at St James’s Church in London. The performance appears on R.E.M. at the BBC.|Pitchfork · 发行录音|https://pitchfork.com/news/listen-to-rem-and-thom-yorkes-version-of-e-bow-the-letter/
deep-purple|whitesnake|influence|2015|Whitesnake 的《The Purple Album》|主唱 David Coverdale 带领 Whitesnake 重录了他曾在 Deep Purple 时期演唱的歌曲。|The Purple Album|With David Coverdale, Whitesnake re-recorded songs from his time as lead singer of Deep Purple.|Whitesnake 官网 · 专辑档案|https://whitesnake.com/album/the-purple-album/
joe-satriani|deep-purple|member|1993–94|巡演吉他手|Ritchie Blackmore 离队后，Joe Satriani 在 1993 至 1994 年间为 Deep Purple 担任巡演吉他手。|Touring guitarist|Satriani took over touring guitar after Ritchie Blackmore departed in 1993 and played into 1994.|Deep Purple 官网 · Roger Glover 访谈|https://deeppurple.com/blogs/news/the-rapture-of-deep-purple
jon-lord|andy-summers|record|1975|《Sarabande》|Andy Summers 为 Deep Purple 键盘手 Jon Lord 的个人专辑弹吉他。|Sarabande|Andy Summers played guitar on Deep Purple keyboardist Jon Lord’s solo album.|Jon Lord 官网 · 传记|https://jonlord.org/a-biography/
david-coverdale|steve-vai|record|1989|《Slip of the Tongue》|Steve Vai 在 Whitesnake 的这张专辑中录制吉他，David Coverdale 担任主唱。|Slip of the Tongue|Vai recorded guitar on the Whitesnake album with David Coverdale on vocals.|Whitesnake 官网 · 专辑档案|https://whitesnake.com/slip-of-the-tongue-2019/
lars-ulrich|deep-purple|influence|1973 / 2016|从台下乐迷到入选引荐人|Lars Ulrich 回忆自己 1973 年看 Deep Purple 的演出，并于 2016 年为乐队入选摇滚名人堂引荐。|From the audience to the Rock Hall|Ulrich recalled seeing Deep Purple in Copenhagen in 1973 and inducted the band into the Rock Hall in 2016.|Jon Lord 官网 · 入选记录|https://jonlord.org/2016/04/09/jon-lord-enter-the-rock-and-roll-hall-of-fame-with-deep-purple/
lynne|beatles|record|1995|《Free as a Bird》|Jeff Lynne 与 McCartney、Harrison 和 Starr 根据 Lennon 留下的样带制作了完整录音。|Free as a Bird|Lynne co-produced the completed recording with McCartney, Harrison, and Starr using Lennon’s earlier demo.|The Beatles 官网 · 歌曲档案|https://www.thebeatles.com/free-bird
lynne|paul|record|1997|《Flaming Pie》|Lynne 为 McCartney 的专辑担任联合制作人，并参与演奏与演唱。|Flaming Pie|Lynne co-produced the McCartney album and contributed instruments and vocals.|Paul McCartney 官网 · 专辑署名|https://www.paulmccartney.com/discography/albums/flaming-pie
lynne|orbison|record|1989|《You Got It》|Lynne 与 Orbison 及 Tom Petty 合写歌曲，并制作了 Orbison 的录音。|You Got It|Lynne co-wrote the song with Orbison and Tom Petty and produced Orbison’s recording.|Roy Orbison 官网 · Lynne 访谈|https://royorbison.com/rolling-stone-elos-jeff-lynne-my-life-in-15-songs/
lynne|petty|record|1989|《Full Moon Fever》|Lynne 与 Tom Petty 及 Mike Campbell 共同制作了 Petty 的这张个人专辑。|Full Moon Fever|Lynne co-produced Tom Petty’s solo album with Petty and Mike Campbell.|Universal Music · 艺人档案|https://www.udiscovermusic.com/artist/tom-petty/
lynne|the-move|member|1970年代初|从 The Move 到 ELO|Jeff Lynne、Roy Wood 和 Bev Bevan 曾同在 The Move，随后也参与 Electric Light Orchestra。|The Move and ELO|Jeff Lynne, Roy Wood, and Bev Bevan played together in the Move and went on to Electric Light Orchestra.|摇滚名人堂 · ELO 入选文章|https://rockhall.com/wp-content/uploads/2024/03/ELO_2017.pdf
`);

addArtist('Bruce Springsteen','美国 · 摇滚','新泽西摇滚歌手和词曲作者，与 E Street Band 长期合作。','布鲁斯斯普林斯汀');
addArtist('Grateful Dead','美国 · 乐队','旧金山湾区乐队，以即兴演奏与现场录音著称。','感恩而死 感恩死者');
addBilingualStories(`
john-fogerty|bruce-springsteen|record|2009|《When Will I Be Loved》|Fogerty 与 Bruce Springsteen 共同录制了这首 Everly Brothers 歌曲。|When Will I Be Loved|Fogerty recorded the Everly Brothers song with Bruce Springsteen.|John Fogerty · 官方录音|https://www.youtube.com/watch?v=ds8B-8fADqk
john-fogerty|grateful-dead|record|1991|Bill Graham 纪念演出|Fogerty 与 Grateful Dead 在纪念演出中演奏了《Born on the Bayou》。|Bill Graham memorial concert|Fogerty performed “Born on the Bayou” with the Grateful Dead at the memorial concert.|Grateful Dead 官网 · 歌曲档案|https://www.dead.net/song/born-bayou
john-fogerty|tom-morello|record|2013|《Wrote a Song for Everyone》|Rage Against the Machine 的 Tom Morello 参与 Fogerty 与 Miranda Lambert 重新录制的专辑同名曲。|Wrote a Song for Everyone|Tom Morello guested on the title track of Fogerty’s 2013 album, which also featured Miranda Lambert.|唱片发行 · 曲目署名|https://open.spotify.com/album/2G6chemqdiNHxEw1ucZ7pw
`);

// Cross-generational collaborations and well-documented professional ties added in the 2026-11 audit.
addBilingualStories(`
brian-may|foo|record|2000 / 2006|与 Foo Fighters 的录音及现场合作|2000 年 Foo Fighters 在 Brian May 的录音室重录 Pink Floyd 的《Have a Cigar》；2006 年 Brian May 与 Roger Taylor 又在 Hyde Park 客席加入 Foo Fighters 的演出。|Recording session and Hyde Park guest appearance|In 2000 Foo Fighters recorded a version of Pink Floyd’s “Have a Cigar” at Brian May’s studio. May and Roger Taylor also joined Foo Fighters onstage at Hyde Park in 2006.|Foo Fighters DB · Brian May 合作档案|https://foofightersdb.com/people/35/brian-may/stats
rivers|foo|record|2018|墨尔本共同演出《Detroit Rock City》|Weezer 在澳大利亚巡演期间为 Foo Fighters 暖场；在墨尔本收官场，Rivers Cuomo 被邀上台与 Foo Fighters 共同演唱 KISS 的《Detroit Rock City》。|Detroit Rock City in Melbourne|While Weezer supported Foo Fighters in Australia, Rivers Cuomo joined the headliners in Melbourne for a joint performance of KISS’s “Detroit Rock City.”|Louder · 现场报道|https://www.loudersound.com/news/watch-foo-fighters-and-weezers-rivers-cuomo-perform-kiss-classic
grohl|ringo|record|2020|《Here’s to the Nights》客席演唱|Dave Grohl 参与了 Ringo Starr 的《Zoom In》EP 首曲《Here’s to the Nights》，与 Paul McCartney 等多位歌手共同演唱。|Guest vocals on Here’s to the Nights|Dave Grohl contributed guest vocals to “Here’s to the Nights” on Ringo Starr’s Zoom In EP.|Ringo Starr 官网 · EP 公告|https://www.ringostarr.com/ringo-releases-ep-zoom-available-today-digitally-vinyl-and-cassette-worldwide/
paul|ringo|record|2020|《Here’s to the Nights》|Paul McCartney 也参加 Ringo Starr 这首歌的客席演唱，录音于 2020 年在家中工作室完成。|Here’s to the Nights|Paul McCartney was among the guest vocalists on Ringo Starr’s “Here’s to the Nights,” recorded at Starr’s home studio in 2020.|Ringo Starr 官网 · EP 公告|https://www.ringostarr.com/ringo-releases-ep-zoom-available-today-digitally-vinyl-and-cassette-worldwide/
paul|roger-daltrey|record|2012|皇家阿尔伯特音乐厅《Get Back》|Paul McCartney 在 Teenage Cancer Trust 演出中邀请 Roger Daltrey、Ronnie Wood 和 Paul Weller 上台共同演奏《Get Back》。|Get Back at the Royal Albert Hall|McCartney invited Roger Daltrey, Ronnie Wood and Paul Weller onstage for “Get Back” at the Royal Albert Hall.|Paul McCartney 官网 · 演出回顾|https://www.paulmccartney.com/news/a-night-of-tears-and-triumph-at-the-royal-albert-hall
paul|ronnie-wood|record|2012|皇家阿尔伯特音乐厅《Get Back》|Rolling Stones 吉他手 Ronnie Wood 参加 McCartney 这场慈善演出的《Get Back》。|Get Back at the Royal Albert Hall|Rolling Stones guitarist Ronnie Wood joined McCartney for “Get Back” at the charity concert.|Paul McCartney 官网 · 演出回顾|https://www.paulmccartney.com/news/a-night-of-tears-and-triumph-at-the-royal-albert-hall
paul|paul-weller|record|2012|皇家阿尔伯特音乐厅《Get Back》|The Jam 与 Style Council 的核心人物 Paul Weller 同 McCartney、Daltrey 和 Wood 同台演绎《Get Back》。|Get Back at the Royal Albert Hall|Paul Weller joined McCartney, Daltrey and Wood onstage for “Get Back.”|Paul McCartney 官网 · 演出回顾|https://www.paulmccartney.com/news/a-night-of-tears-and-triumph-at-the-royal-albert-hall
axl-rose|elton-john|record|1992|Freddie Mercury 纪念音乐会《Bohemian Rhapsody》|在 Queen 成员参加的温布利纪念音乐会上，Axl Rose 与 Elton John 共同演唱《Bohemian Rhapsody》。|Bohemian Rhapsody at the Freddie Mercury Tribute|Axl Rose and Elton John performed “Bohemian Rhapsody” together at the Freddie Mercury Tribute Concert with Queen members.|Queen 官网 · 纪念音乐会曲目|https://www.queenonline.com/news/press-release-the-freddie-mercury-tribute-concert-the-definitive-edition
clapton|paul|record|2002|Concert for George 的《While My Guitar Gently Weeps》|George Harrison 纪念音乐会上，Paul McCartney 与 Eric Clapton 同台演出，音乐总监 Clapton 主奏吉他。|While My Guitar Gently Weeps at Concert for George|McCartney and musical director Clapton performed the Harrison song together at the Concert for George.|George Harrison 官网 · 纪念音乐会|https://www.georgeharrison.com/concert-for-george-film-makes-digital-debut/
clapton|ringo|record|2002|Concert for George 同台演出|Eric Clapton 担任音乐总监并演奏吉他，Ringo Starr 也参加皇家阿尔伯特音乐厅的 George Harrison 纪念音乐会。|Concert for George|Clapton served as musical director and Ringo Starr also performed at the Royal Albert Hall tribute to George Harrison.|George Harrison 官网 · 纪念音乐会|https://www.georgeharrison.com/concert-for-george-film-makes-digital-debut/
blur|oasis|personal|1995|Britpop 排行榜之争|1995 年 8 月 Blur 的《Country House》与 Oasis 的《Roll With It》同日发行，围绕榜首形成的公开竞争成为“Britpop 之战”。|The Battle of Britpop|Blur’s “Country House” and Oasis’s “Roll With It” were released on the same day in August 1995, triggering the public chart contest known as the Battle of Britpop.|BBC · Britpop 专题|https://www.bbc.co.uk/programmes/articles/BsmTTGmhCY0jcJtFqtYgjQ/i-was-there-blur-v-oasis-1995
`);

addBilingualStories(`
clapton|john|record|1968|The Dirty Mac 的《Yer Blues》|Eric Clapton、John Lennon、Keith Richards 与 Mitch Mitchell 在《The Rolling Stones Rock and Roll Circus》中以 The Dirty Mac 名义共同演奏《Yer Blues》。|Yer Blues by The Dirty Mac|Eric Clapton, John Lennon, Keith Richards and Mitch Mitchell performed “Yer Blues” together as The Dirty Mac for The Rolling Stones Rock and Roll Circus.|ABKCO · 演出录音署名|https://musicbrainz.org/release/0a9a5c89-3163-4f4a-a891-5c419da8d321
john|mitch-mitchell|record|1968|The Dirty Mac 的《Yer Blues》|John Lennon 担任主唱与吉他，Mitch Mitchell 担任鼓手，两人在 Rock and Roll Circus 的 The Dirty Mac 演出中合作。|Yer Blues by The Dirty Mac|John Lennon sang and played guitar while Mitch Mitchell played drums in the Dirty Mac performance for The Rolling Stones Rock and Roll Circus.|ABKCO · 演出录音署名|https://musicbrainz.org/release/0a9a5c89-3163-4f4a-a891-5c419da8d321
keith-richards|clapton|record|1968|The Dirty Mac 的《Yer Blues》|Keith Richards 担任贝斯，Eric Clapton 担任主音吉他，两人参与 John Lennon 领衔的这次一次性演出。|Yer Blues by The Dirty Mac|Keith Richards played bass and Eric Clapton played lead guitar in John Lennon’s one-off Dirty Mac performance.|ABKCO · 演出录音署名|https://musicbrainz.org/release/0a9a5c89-3163-4f4a-a891-5c419da8d321
keith-richards|mitch-mitchell|record|1968|The Dirty Mac 的《Yer Blues》|Keith Richards 与 Mitch Mitchell 分别负责贝斯和鼓，在 Rock and Roll Circus 的这次共同演出中合作。|Yer Blues by The Dirty Mac|Keith Richards played bass and Mitch Mitchell played drums in the Dirty Mac performance from The Rolling Stones Rock and Roll Circus.|ABKCO · 演出录音署名|https://musicbrainz.org/release/0a9a5c89-3163-4f4a-a891-5c419da8d321
baker|bob-tench|record|1971–72|Ginger Baker 乐队中的 Bobby Tench|MusicBrainz 将 Bobby Tench 记录为 Ginger Baker 的 supporting musician；对应 Ginger Baker’s Air Force 活跃时期。|Bobby Tench with Ginger Baker|MusicBrainz records Bobby Tench as a supporting musician for Ginger Baker during the Ginger Baker’s Air Force period.|MusicBrainz · Ginger Baker 关系记录|https://musicbrainz.org/artist/e01d1aff-9cc2-4606-83d7-56445515c6e6/relationships
topper-headon|bob-tench|record|1986|Topper Headon 乐队的客席乐手|MusicBrainz 将 Bobby Tench 记录为 Topper Headon 的 supporting musician，时间为 1986 年。|Bobby Tench with Topper Headon|MusicBrainz records Bobby Tench as a supporting musician for Topper Headon in 1986.|MusicBrainz · Topper Headon 关系记录|https://musicbrainz.org/artist/19237b9f-2457-4eec-99f5-3166fc73fb4d/relationships
bob-tench|humble-pie|member|1979–81|Bobby Tench 加入 Humble Pie|MusicBrainz 记录 Bobby Tench 在 1979 至 1981 年间为 Humble Pie 成员。|Bobby Tench in Humble Pie|MusicBrainz records Bobby Tench as a member of Humble Pie from 1979 to 1981.|MusicBrainz · Bobby Tench 关系记录|https://musicbrainz.org/artist/00e90ad4-9cde-4e86-af92-749e2475ad24/relationships
aynsley-dunbar|jeff-beck-group|member|1967|Aynsley Dunbar 加入 Jeff Beck Group|MusicBrainz 记录 Aynsley Dunbar 于 1967 年短暂担任 Jeff Beck Group 的鼓手。|Aynsley Dunbar in the Jeff Beck Group|MusicBrainz records Aynsley Dunbar as the Jeff Beck Group’s drummer for part of 1967.|MusicBrainz · Jeff Beck Group 关系记录|https://musicbrainz.org/artist/a6339659-c879-4f88-9908-206d47963e29/relationships
`);
