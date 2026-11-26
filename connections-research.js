// Reviewed subagent research merged on 2026-11-26.
// These records are limited to existing graph entities and documented relationships.
const researchStories = [
  {
    "a": "brian-wilson",
    "b": "carl-wilson",
    "type": "family",
    "year": "日期未记录",
    "title": "Brian 与 Carl Wilson 的兄弟关系",
    "detail": "Brian Wilson 与 Carl Wilson 有 MusicBrainz 记录的关系：sibling；时间：日期未记录。",
    "en": {
      "title": "Brian and Carl Wilson",
      "detail": "MusicBrainz records sibling between Brian Wilson and Carl Wilson."
    },
    "ref": "research-0",
    "confidence": "structured-database",
    "evidence": "MusicBrainz · 艺人关系记录"
  },
  {
    "a": "brian-wilson",
    "b": "dennis-wilson",
    "type": "family",
    "year": "日期未记录",
    "title": "Brian 与 Dennis Wilson 的兄弟关系",
    "detail": "Brian Wilson 与 Dennis Wilson 有 MusicBrainz 记录的关系：sibling；时间：日期未记录。",
    "en": {
      "title": "Brian and Dennis Wilson",
      "detail": "MusicBrainz records sibling between Brian Wilson and Dennis Wilson."
    },
    "ref": "research-1",
    "confidence": "structured-database",
    "evidence": "MusicBrainz · 艺人关系记录"
  },
  {
    "a": "carl-wilson",
    "b": "dennis-wilson",
    "type": "family",
    "year": "日期未记录",
    "title": "Carl 与 Dennis Wilson 的兄弟关系",
    "detail": "Carl Wilson 与 Dennis Wilson 有 MusicBrainz 记录的关系：sibling；时间：日期未记录。",
    "en": {
      "title": "Carl and Dennis Wilson",
      "detail": "MusicBrainz records sibling between Carl Wilson and Dennis Wilson."
    },
    "ref": "research-2",
    "confidence": "structured-database",
    "evidence": "MusicBrainz · 艺人关系记录"
  },
  {
    "a": "eddie-van-halen",
    "b": "alex-van-halen",
    "type": "family",
    "year": "日期未记录",
    "title": "Eddie Van Halen 与 Alex Van Halen 的家庭关系",
    "detail": "Eddie Van Halen 与 Alex Van Halen 有 MusicBrainz 记录的关系：sibling；时间：日期未记录。",
    "en": {
      "title": "Eddie Van Halen and Alex Van Halen: family relationship",
      "detail": "MusicBrainz records sibling between Eddie Van Halen and Alex Van Halen."
    },
    "ref": "research-3",
    "confidence": "structured-database",
    "evidence": "MusicBrainz · 艺人关系记录"
  },
  {
    "a": "eddie-van-halen",
    "b": "wolfgang-van-halen",
    "type": "family",
    "year": "日期未记录",
    "title": "Eddie 与 Wolfgang Van Halen 的父子关系",
    "detail": "Eddie Van Halen 与 Wolfgang Van Halen 有 MusicBrainz 记录的关系：parent；时间：日期未记录。",
    "en": {
      "title": "Eddie and Wolfgang Van Halen",
      "detail": "MusicBrainz records parent between Eddie Van Halen and Wolfgang Van Halen."
    },
    "ref": "research-4",
    "confidence": "structured-database",
    "evidence": "MusicBrainz · 艺人关系记录"
  },
  {
    "a": "jack-white",
    "b": "meg-white",
    "type": "family",
    "year": "1996-09-21–2000-03-24",
    "title": "Jack White 与 Meg White 的婚姻关系",
    "detail": "MusicBrainz 的人物关系档案将其记录为婚姻关系，日期为 1996-09-21–2000-03-24。",
    "en": {
      "title": "Jack White and Meg White: marriage",
      "detail": "MusicBrainz records the pair as marriage (1996-09-21–2000-03-24)."
    },
    "ref": "research-5",
    "confidence": "structured-database",
    "evidence": "MusicBrainz · 艺术家人际关系"
  },
  {
    "a": "jim-reid",
    "b": "william-reid",
    "type": "family",
    "year": "日期未注明",
    "title": "Jim Reid 与 William Reid 的兄弟姐妹",
    "detail": "MusicBrainz 的人物关系档案将其记录为兄弟姐妹。",
    "en": {
      "title": "Jim Reid and William Reid: siblings",
      "detail": "MusicBrainz records the pair as siblings."
    },
    "ref": "research-6",
    "confidence": "structured-database",
    "evidence": "MusicBrainz · 艺术家人际关系"
  },
  {
    "a": "john-mcvie",
    "b": "christine-mcvie",
    "type": "family",
    "year": "1968-08–1976",
    "title": "John McVie 与 Christine McVie 的家庭关系",
    "detail": "John McVie 与 Christine McVie 有 MusicBrainz 记录的关系：married；时间：1968-08–1976。",
    "en": {
      "title": "John McVie and Christine McVie: family relationship",
      "detail": "MusicBrainz records married between John McVie and Christine McVie (1968-08–1976)."
    },
    "ref": "research-7",
    "confidence": "structured-database",
    "evidence": "MusicBrainz · 艺人关系记录"
  },
  {
    "a": "ray-davies",
    "b": "dave-davies",
    "type": "family",
    "year": "日期未记录",
    "title": "Ray Davies 与 Dave Davies 的家庭关系",
    "detail": "Ray Davies 与 Dave Davies 有 MusicBrainz 记录的关系：sibling；时间：日期未记录。",
    "en": {
      "title": "Ray Davies and Dave Davies: family relationship",
      "detail": "MusicBrainz records sibling between Ray Davies and Dave Davies."
    },
    "ref": "research-8",
    "confidence": "structured-database",
    "evidence": "MusicBrainz · 艺人关系记录"
  },
  {
    "a": "bowie",
    "b": "the-cure",
    "type": "influence",
    "year": "1970年代",
    "title": "David Bowie 对 The Cure 的明确影响",
    "detail": "摇滚名人堂的“Influences”栏目把该艺人或乐队列为 The Cure 的明确影响来源。",
    "en": {
      "title": "David Bowie’s documented influence on The Cure",
      "detail": "The Rock & Roll Hall of Fame lists this act among the Cure’s influences."
    },
    "ref": "research-9",
    "confidence": "official-archive",
    "evidence": "摇滚名人堂 · The Cure 入选页"
  },
  {
    "a": "jimi-hendrix-experience",
    "b": "queen",
    "type": "influence",
    "year": "1960年代",
    "title": "Jimi Hendrix Experience 对 Queen 的明确影响",
    "detail": "摇滚名人堂的“Influences”栏目把该乐队列为 Queen 的明确影响来源。",
    "en": {
      "title": "Jimi Hendrix Experience’s documented influence on Queen",
      "detail": "The Rock & Roll Hall of Fame lists this act among Queen’s influences."
    },
    "ref": "research-10",
    "confidence": "official-archive",
    "evidence": "摇滚名人堂 · Queen 入选页"
  },
  {
    "a": "zeppelin",
    "b": "queen",
    "type": "influence",
    "year": "1970年代",
    "title": "Led Zeppelin 对 Queen 的明确影响",
    "detail": "摇滚名人堂的“Influences”栏目把该乐队列为 Queen 的明确影响来源。",
    "en": {
      "title": "Led Zeppelin’s documented influence on Queen",
      "detail": "The Rock & Roll Hall of Fame lists this act among Queen’s influences."
    },
    "ref": "research-11",
    "confidence": "official-archive",
    "evidence": "摇滚名人堂 · Queen 入选页"
  },
  {
    "a": "mick-jones",
    "b": "new-york-dolls",
    "type": "influence",
    "year": "1976 年前",
    "title": "Mick Jones 组建 London SS 时明确引用 New York Dolls",
    "detail": "The Clash 的摇滚名人堂入选档案记载，Mick Jones 在组建 London SS 时明确引用 New York Dolls。",
    "en": {
      "title": "Mick Jones cited New York Dolls before forming London SS",
      "detail": "The Clash’s Hall of Fame essay records that Mick Jones cited New York Dolls when forming London SS."
    },
    "ref": "research-12",
    "confidence": "official-archive",
    "evidence": "摇滚名人堂 · The Clash 2003 入选档案"
  },
  {
    "a": "mick-jones",
    "b": "stooges",
    "type": "influence",
    "year": "1976 年前",
    "title": "Mick Jones 组建 London SS 时明确引用 The Stooges",
    "detail": "The Clash 的摇滚名人堂入选档案记载，Mick Jones 在组建 London SS 时明确引用 The Stooges。",
    "en": {
      "title": "Mick Jones cited The Stooges before forming London SS",
      "detail": "The Clash’s Hall of Fame essay records that Mick Jones cited The Stooges when forming London SS."
    },
    "ref": "research-13",
    "confidence": "official-archive",
    "evidence": "摇滚名人堂 · The Clash 2003 入选档案"
  },
  {
    "a": "patti",
    "b": "r-e-m",
    "type": "influence",
    "year": "1970年代",
    "title": "Patti Smith 对 R.E.M. 的明确影响",
    "detail": "摇滚名人堂的“Influences”栏目把该艺人或乐队列为 R.E.M. 的明确影响来源。",
    "en": {
      "title": "Patti Smith’s documented influence on R.E.M.",
      "detail": "The Rock & Roll Hall of Fame lists this act among R.E.M.’s influences."
    },
    "ref": "research-14",
    "confidence": "official-archive",
    "evidence": "摇滚名人堂 · R.E.M. 入选页"
  },
  {
    "a": "pink-floyd",
    "b": "radiohead",
    "type": "influence",
    "year": "1960年代",
    "title": "Pink Floyd 对 Radiohead 的明确影响",
    "detail": "摇滚名人堂入选文章明确写到 Radiohead 吸收了从 Pink Floyd 到 R.E.M. 的多种音乐影响。",
    "en": {
      "title": "Pink Floyd’s documented influence on Radiohead",
      "detail": "The Rock & Roll Hall of Fame essay says Radiohead incorporated influences ranging from Pink Floyd to R.E.M."
    },
    "ref": "research-15",
    "confidence": "official-archive",
    "evidence": "摇滚名人堂 · Radiohead 入选页"
  },
  {
    "a": "pink-floyd",
    "b": "the-cure",
    "type": "influence",
    "year": "1960年代",
    "title": "Pink Floyd 对 The Cure 的明确影响",
    "detail": "摇滚名人堂的“Influences”栏目把该艺人或乐队列为 The Cure 的明确影响来源。",
    "en": {
      "title": "Pink Floyd’s documented influence on The Cure",
      "detail": "The Rock & Roll Hall of Fame lists this act among the Cure’s influences."
    },
    "ref": "research-16",
    "confidence": "official-archive",
    "evidence": "摇滚名人堂 · The Cure 入选页"
  },
  {
    "a": "pixies",
    "b": "nirvana",
    "type": "influence",
    "year": "1980年代",
    "title": "Pixies 对 Nirvana 的明确影响",
    "detail": "摇滚名人堂的“Influences”栏目把该乐队列为 Nirvana 的明确影响来源；入选文章还引用 Cobain 关于《Smells Like Teen Spirit》借鉴 Pixies 的说法。",
    "en": {
      "title": "Pixies’s documented influence on Nirvana",
      "detail": "The Rock & Roll Hall of Fame lists this act among Nirvana’s influences; its essay also quotes Cobain on borrowing from the Pixies for “Smells Like Teen Spirit.”"
    },
    "ref": "research-17",
    "confidence": "official-archive",
    "evidence": "摇滚名人堂 · Nirvana 入选页"
  },
  {
    "a": "r-e-m",
    "b": "nirvana",
    "type": "influence",
    "year": "1980年代",
    "title": "R.E.M. 对 Nirvana 的明确影响",
    "detail": "摇滚名人堂的“Influences”栏目把该乐队列为 Nirvana 的明确影响来源；入选文章还引用 Cobain 关于《Smells Like Teen Spirit》借鉴 Pixies 的说法。",
    "en": {
      "title": "R.E.M.’s documented influence on Nirvana",
      "detail": "The Rock & Roll Hall of Fame lists this act among Nirvana’s influences; its essay also quotes Cobain on borrowing from the Pixies for “Smells Like Teen Spirit.”"
    },
    "ref": "research-18",
    "confidence": "official-archive",
    "evidence": "摇滚名人堂 · Nirvana 入选页"
  },
  {
    "a": "r-e-m",
    "b": "radiohead",
    "type": "influence",
    "year": "1980年代",
    "title": "R.E.M. 对 Radiohead 的明确影响",
    "detail": "摇滚名人堂入选文章明确写到 Radiohead 吸收了从 Pink Floyd 到 R.E.M. 的多种音乐影响。",
    "en": {
      "title": "R.E.M.’s documented influence on Radiohead",
      "detail": "The Rock & Roll Hall of Fame essay says Radiohead incorporated influences ranging from Pink Floyd to R.E.M."
    },
    "ref": "research-19",
    "confidence": "official-archive",
    "evidence": "摇滚名人堂 · Radiohead 入选页"
  },
  {
    "a": "ramones",
    "b": "new-york-dolls",
    "type": "influence",
    "year": "1970年代初",
    "title": "Johnny Ramone 受 New York Dolls 现场启发",
    "detail": "Ramones 的摇滚名人堂入选档案记载，Johnny Ramone 看到 New York Dolls 演出后说“Hey, I can do that!”，并成为乐队形成叙事的一部分。",
    "en": {
      "title": "Johnny Ramone was moved by seeing the New York Dolls live",
      "detail": "The Ramones’ Hall of Fame essay records that, after seeing the New York Dolls, Johnny Ramone said, “Hey, I can do that!”"
    },
    "ref": "research-20",
    "confidence": "official-archive",
    "evidence": "摇滚名人堂 · Ramones 2002 入选档案"
  },
  {
    "a": "siouxsie-and-the-banshees",
    "b": "the-cure",
    "type": "influence",
    "year": "1970年代",
    "title": "Siouxsie and the Banshees 对 The Cure 的明确影响",
    "detail": "摇滚名人堂的“Influences”栏目把该艺人或乐队列为 The Cure 的明确影响来源。",
    "en": {
      "title": "Siouxsie and the Banshees’s documented influence on The Cure",
      "detail": "The Rock & Roll Hall of Fame lists this act among the Cure’s influences."
    },
    "ref": "research-21",
    "confidence": "official-archive",
    "evidence": "摇滚名人堂 · The Cure 入选页"
  },
  {
    "a": "sonic-youth",
    "b": "nirvana",
    "type": "influence",
    "year": "1980年代",
    "title": "Sonic Youth 对 Nirvana 的明确影响",
    "detail": "摇滚名人堂的“Influences”栏目把该乐队列为 Nirvana 的明确影响来源；入选文章还引用 Cobain 关于《Smells Like Teen Spirit》借鉴 Pixies 的说法。",
    "en": {
      "title": "Sonic Youth’s documented influence on Nirvana",
      "detail": "The Rock & Roll Hall of Fame lists this act among Nirvana’s influences; its essay also quotes Cobain on borrowing from the Pixies for “Smells Like Teen Spirit.”"
    },
    "ref": "research-22",
    "confidence": "official-archive",
    "evidence": "摇滚名人堂 · Nirvana 入选页"
  },
  {
    "a": "television",
    "b": "r-e-m",
    "type": "influence",
    "year": "1970年代",
    "title": "Television 对 R.E.M. 的明确影响",
    "detail": "摇滚名人堂的“Influences”栏目把该艺人或乐队列为 R.E.M. 的明确影响来源。",
    "en": {
      "title": "Television’s documented influence on R.E.M.",
      "detail": "The Rock & Roll Hall of Fame lists this act among R.E.M.’s influences."
    },
    "ref": "research-23",
    "confidence": "official-archive",
    "evidence": "摇滚名人堂 · R.E.M. 入选页"
  },
  {
    "a": "beatles",
    "b": "queen",
    "type": "influence",
    "year": "1960年代",
    "title": "The Beatles 对 Queen 的明确影响",
    "detail": "摇滚名人堂的“Influences”栏目把该乐队列为 Queen 的明确影响来源。",
    "en": {
      "title": "The Beatles’s documented influence on Queen",
      "detail": "The Rock & Roll Hall of Fame lists this act among Queen’s influences."
    },
    "ref": "research-24",
    "confidence": "official-archive",
    "evidence": "摇滚名人堂 · Queen 入选页"
  },
  {
    "a": "beatles",
    "b": "the-cure",
    "type": "influence",
    "year": "1960年代",
    "title": "The Beatles 对 The Cure 的明确影响",
    "detail": "摇滚名人堂的“Influences”栏目把该艺人或乐队列为 The Cure 的明确影响来源。",
    "en": {
      "title": "The Beatles’s documented influence on The Cure",
      "detail": "The Rock & Roll Hall of Fame lists this act among the Cure’s influences."
    },
    "ref": "research-25",
    "confidence": "official-archive",
    "evidence": "摇滚名人堂 · The Cure 入选页"
  },
  {
    "a": "the-clash",
    "b": "dylan",
    "type": "influence",
    "year": "1960年代",
    "title": "The Clash 对 Bob Dylan 的明确借鉴",
    "detail": "入选档案把 Bob Dylan 的“清晰而具有摧毁力的表达”列为 The Clash 的灵感来源。",
    "en": {
      "title": "The Clash’s documented debt to Bob Dylan",
      "detail": "The Hall of Fame essay cites Bob Dylan’s articulate devastation among the Clash’s inspirations."
    },
    "ref": "research-26",
    "confidence": "official-archive",
    "evidence": "摇滚名人堂 · The Clash 2003 入选档案"
  },
  {
    "a": "the-clash",
    "b": "chuck-berry",
    "type": "influence",
    "year": "1950年代",
    "title": "The Clash 对 Chuck Berry 的明确借鉴",
    "detail": "入选档案把 Chuck Berry 的青少年精神列为 The Clash 的灵感来源。",
    "en": {
      "title": "The Clash’s documented debt to Chuck Berry",
      "detail": "The Hall of Fame essay cites Chuck Berry’s teen spirit among the Clash’s inspirations."
    },
    "ref": "research-27",
    "confidence": "official-archive",
    "evidence": "摇滚名人堂 · The Clash 2003 入选档案"
  },
  {
    "a": "the-clash",
    "b": "sex-pistols",
    "type": "influence",
    "year": "1976",
    "title": "The Clash 对 Sex Pistols 的明确借鉴",
    "detail": "Sex Pistols 曾为 Strummer 当时的乐队暖场；Strummer 随后表示“未来已经到来”，并加入了 Jones 与 Simonon 的乐队。",
    "en": {
      "title": "The Clash’s documented debt to Sex Pistols",
      "detail": "The Sex Pistols opened for Strummer’s then-band. Strummer said “the future was here” and joined Jones and Simonon’s group."
    },
    "ref": "research-28",
    "confidence": "official-archive",
    "evidence": "摇滚名人堂 · The Clash 2003 入选档案"
  },
  {
    "a": "the-clash",
    "b": "stooges",
    "type": "influence",
    "year": "1970年代",
    "title": "The Clash 对 The Stooges 的明确借鉴",
    "detail": "入选档案写道 The Clash 从 The Stooges 的“威胁感”中汲取灵感。",
    "en": {
      "title": "The Clash’s documented debt to The Stooges",
      "detail": "The Hall of Fame essay says the Clash drew on the Stooges’ menace."
    },
    "ref": "research-29",
    "confidence": "official-archive",
    "evidence": "摇滚名人堂 · The Clash 2003 入选档案"
  },
  {
    "a": "the-clash",
    "b": "the-who",
    "type": "influence",
    "year": "1960年代",
    "title": "The Clash 对 The Who 的明确借鉴",
    "detail": "入选档案把 Pete Townshend 的艺术学校式嘲讽列为 The Clash 的灵感来源。",
    "en": {
      "title": "The Clash’s documented debt to The Who",
      "detail": "The Hall of Fame essay cites Pete Townshend’s art-school scorn among the Clash’s inspirations."
    },
    "ref": "research-30",
    "confidence": "official-archive",
    "evidence": "摇滚名人堂 · The Clash 2003 入选档案"
  },
  {
    "a": "the-jam",
    "b": "oasis",
    "type": "influence",
    "year": "1970年代",
    "title": "The Jam 对 Oasis 的明确影响",
    "detail": "摇滚名人堂的“Influences”栏目把 The Jam 列为 Oasis 的明确影响来源。",
    "en": {
      "title": "The Jam’s documented influence on Oasis",
      "detail": "The Rock & Roll Hall of Fame lists the Jam among Oasis’s influences."
    },
    "ref": "research-31",
    "confidence": "official-archive",
    "evidence": "摇滚名人堂 · Oasis 入选页"
  },
  {
    "a": "vu",
    "b": "r-e-m",
    "type": "influence",
    "year": "1960年代",
    "title": "The Velvet Underground 对 R.E.M. 的明确影响",
    "detail": "摇滚名人堂的“Influences”栏目把该艺人或乐队列为 R.E.M. 的明确影响来源。",
    "en": {
      "title": "The Velvet Underground’s documented influence on R.E.M.",
      "detail": "The Rock & Roll Hall of Fame lists this act among R.E.M.’s influences."
    },
    "ref": "research-32",
    "confidence": "official-archive",
    "evidence": "摇滚名人堂 · R.E.M. 入选页"
  },
  {
    "a": "vu",
    "b": "the-cure",
    "type": "influence",
    "year": "1960年代",
    "title": "The Velvet Underground 对 The Cure 的明确影响",
    "detail": "摇滚名人堂的“Influences”栏目把该艺人或乐队列为 The Cure 的明确影响来源。",
    "en": {
      "title": "The Velvet Underground’s documented influence on The Cure",
      "detail": "The Rock & Roll Hall of Fame lists this act among the Cure’s influences."
    },
    "ref": "research-33",
    "confidence": "official-archive",
    "evidence": "摇滚名人堂 · The Cure 入选页"
  },
  {
    "a": "the-who",
    "b": "queen",
    "type": "influence",
    "year": "1960年代",
    "title": "The Who 对 Queen 的明确影响",
    "detail": "摇滚名人堂的“Influences”栏目把该乐队列为 Queen 的明确影响来源。",
    "en": {
      "title": "The Who’s documented influence on Queen",
      "detail": "The Rock & Roll Hall of Fame lists this act among Queen’s influences."
    },
    "ref": "research-34",
    "confidence": "official-archive",
    "evidence": "摇滚名人堂 · Queen 入选页"
  },
  {
    "a": "black-sabbath",
    "b": "bev-bevan",
    "type": "member",
    "year": "1983–1984–1987",
    "title": "Black Sabbath 与 Bev Bevan 的成员关系",
    "detail": "Black Sabbath 与 Bev Bevan 有 MusicBrainz 记录的关系：member of band（drums (drum set)、percussion）；时间：1983–1984–1987。",
    "en": {
      "title": "Black Sabbath and Bev Bevan: membership",
      "detail": "MusicBrainz records member of band (drums (drum set)、percussion) between Black Sabbath and Bev Bevan (1983–1984–1987)."
    },
    "ref": "research-35",
    "confidence": "structured-database",
    "evidence": "MusicBrainz · 艺人关系记录"
  },
  {
    "a": "black-sabbath",
    "b": "neil-murray",
    "type": "member",
    "year": "1989–1991–1994–1995",
    "title": "Neil Murray 担任 Black Sabbath 贝斯手",
    "detail": "Black Sabbath 与 Neil Murray 有 MusicBrainz 记录的关系：member of band（bass guitar）；时间：1989–1991–1994–1995。",
    "en": {
      "title": "Neil Murray plays bass with Black Sabbath",
      "detail": "MusicBrainz records member of band (bass guitar) between Black Sabbath and Neil Murray (1989–1991–1994–1995)."
    },
    "ref": "research-36",
    "confidence": "structured-database",
    "evidence": "MusicBrainz · 艺人关系记录"
  },
  {
    "a": "deep-purple",
    "b": "joe-lynn-turner",
    "type": "member",
    "year": "1989-12–1992-08",
    "title": "Joe Lynn Turner 担任 Deep Purple 主唱",
    "detail": "Deep Purple 与 Joe Lynn Turner 有 MusicBrainz 记录的关系：member of band（lead vocals）；时间：1989-12–1992-08。",
    "en": {
      "title": "Joe Lynn Turner sings with Deep Purple",
      "detail": "MusicBrainz records member of band (lead vocals) between Deep Purple and Joe Lynn Turner (1989-12–1992-08)."
    },
    "ref": "research-37",
    "confidence": "structured-database",
    "evidence": "MusicBrainz · 艺人关系记录"
  },
  {
    "a": "jimi-hendrix-experience",
    "b": "billy-cox",
    "type": "member",
    "year": "1970",
    "title": "Jimi Hendrix Experience 与 Billy Cox 的成员关系",
    "detail": "Jimi Hendrix Experience 与 Billy Cox 有 MusicBrainz 记录的关系：member of band；时间：1970。",
    "en": {
      "title": "Jimi Hendrix Experience and Billy Cox: membership",
      "detail": "MusicBrainz records member of band between Jimi Hendrix Experience and Billy Cox (1970)."
    },
    "ref": "research-38",
    "confidence": "structured-database",
    "evidence": "MusicBrainz · 艺人关系记录"
  },
  {
    "a": "black-sabbath",
    "b": "don-airey",
    "type": "record",
    "year": "1978–1979",
    "title": "Don Airey 为 Black Sabbath 演奏键盘",
    "detail": "Black Sabbath 与 Don Airey 有 MusicBrainz 记录的关系：instrumental supporting musician（keyboard）；时间：1978–1979。",
    "en": {
      "title": "Don Airey plays keyboards with Black Sabbath",
      "detail": "MusicBrainz records instrumental supporting musician (keyboard) between Black Sabbath and Don Airey (1978–1979)."
    },
    "ref": "research-39",
    "confidence": "structured-database",
    "evidence": "MusicBrainz · 艺人关系记录"
  },
  {
    "a": "dylan",
    "b": "ringo",
    "type": "record",
    "year": "1971",
    "title": "Concert for Bangladesh",
    "detail": "Dylan 与 Starr 均为音乐会参演者。",
    "en": {
      "title": "Concert for Bangladesh",
      "detail": "Dylan and Starr both performed at the concert."
    },
    "ref": "research-40",
    "confidence": "event or credit page",
    "evidence": "George Harrison 官网 · Concert for Bangladesh"
  },
  {
    "a": "brian-may",
    "b": "neil-murray",
    "type": "record",
    "year": "1992–1993",
    "title": "Brian May Band 的巡演贝斯手",
    "detail": "Brian May 与 Neil Murray 有 MusicBrainz 记录的关系：supporting musician；时间：1992–1993。",
    "en": {
      "title": "Neil Murray in the Brian May Band",
      "detail": "MusicBrainz records supporting musician between Brian May and Neil Murray (1992–1993)."
    },
    "ref": "research-41",
    "confidence": "structured-database",
    "evidence": "MusicBrainz · 艺人关系记录"
  },
  {
    "a": "david-lee-roth",
    "b": "steve-vai",
    "type": "record",
    "year": "1986–1989",
    "title": "Steve Vai 加入 David Lee Roth 乐队",
    "detail": "David Lee Roth 与 Steve Vai 有 MusicBrainz 记录的关系：supporting musician；时间：1986–1989。",
    "en": {
      "title": "Steve Vai joins David Lee Roth’s band",
      "detail": "MusicBrainz records supporting musician between David Lee Roth and Steve Vai (1986–1989)."
    },
    "ref": "research-42",
    "confidence": "structured-database",
    "evidence": "MusicBrainz · 艺人关系记录"
  },
  {
    "a": "genesis",
    "b": "bill-bruford",
    "type": "record",
    "year": "1976",
    "title": "Genesis 与 Bill Bruford 的录音或演出合作",
    "detail": "Genesis 与 Bill Bruford 有 MusicBrainz 记录的关系：instrumental supporting musician（drums (drum set)、percussion）；时间：1976。",
    "en": {
      "title": "Genesis and Bill Bruford: recording or performance collaboration",
      "detail": "MusicBrainz records instrumental supporting musician (drums (drum set)、percussion) between Genesis and Bill Bruford (1976)."
    },
    "ref": "research-43",
    "confidence": "structured-database",
    "evidence": "MusicBrainz · 艺人关系记录"
  },
  {
    "a": "ian-paice",
    "b": "gary-moore",
    "type": "record",
    "year": "1982–1983",
    "title": "Ian Paice 与 Gary Moore 的录音或演出合作",
    "detail": "Ian Paice 与 Gary Moore 有 MusicBrainz 记录的关系：supporting musician；时间：1982–1983。",
    "en": {
      "title": "Ian Paice and Gary Moore: recording or performance collaboration",
      "detail": "MusicBrainz records supporting musician between Ian Paice and Gary Moore (1982–1983)."
    },
    "ref": "research-44",
    "confidence": "structured-database",
    "evidence": "MusicBrainz · 艺人关系记录"
  },
  {
    "a": "lynne",
    "b": "ringo",
    "type": "record",
    "year": "2002",
    "title": "Concert for George",
    "detail": "Lynne 与 Starr 均参与伦敦纪念演出。",
    "en": {
      "title": "Concert for George",
      "detail": "Lynne and Starr both performed at the London tribute concert."
    },
    "ref": "research-45",
    "confidence": "event or credit page",
    "evidence": "George Harrison 官网 · Concert for George"
  },
  {
    "a": "john-entwistle",
    "b": "ringo",
    "type": "record",
    "year": "1995",
    "title": "Ringo Starr & His All-Starr Band",
    "detail": "Entwistle 与 Starr 同属 1995 年巡演阵容。",
    "en": {
      "title": "Ringo Starr & His All-Starr Band",
      "detail": "Entwistle and Starr shared the 1995 touring lineup."
    },
    "ref": "research-46",
    "confidence": "event or credit page",
    "evidence": "Ringo Starr 官网 · All-Starr Band"
  },
  {
    "a": "jones",
    "b": "paul",
    "type": "record",
    "year": "1979",
    "title": "Rockestra 录音",
    "detail": "John Paul Jones 参与 McCartney 的 Rockestra 曲目。",
    "en": {
      "title": "The Rockestra sessions",
      "detail": "John Paul Jones contributed to McCartney’s Rockestra tracks."
    },
    "ref": "research-47",
    "confidence": "event or credit page",
    "evidence": "Paul McCartney 官网 · Back to the Egg"
  },
  {
    "a": "ozzy-osbourne",
    "b": "jason-newsted",
    "type": "record",
    "year": "2003",
    "title": "Ozzy Osbourne 与 Jason Newsted 的录音或演出合作",
    "detail": "Ozzy Osbourne 与 Jason Newsted 有 MusicBrainz 记录的关系：instrumental supporting musician（electric bass guitar）；时间：2003。",
    "en": {
      "title": "Ozzy Osbourne and Jason Newsted: recording or performance collaboration",
      "detail": "MusicBrainz records instrumental supporting musician (electric bass guitar) between Ozzy Osbourne and Jason Newsted (2003)."
    },
    "ref": "research-48",
    "confidence": "structured-database",
    "evidence": "MusicBrainz · 艺人关系记录"
  },
  {
    "a": "ozzy-osbourne",
    "b": "robert-trujillo",
    "type": "record",
    "year": "1996–2003",
    "title": "Robert Trujillo 加入 Ozzy 乐队",
    "detail": "Ozzy Osbourne 与 Robert Trujillo 有 MusicBrainz 记录的关系：instrumental supporting musician（bass guitar）；时间：1996–2003。",
    "en": {
      "title": "Robert Trujillo plays with Ozzy Osbourne",
      "detail": "MusicBrainz records instrumental supporting musician (bass guitar) between Ozzy Osbourne and Robert Trujillo (1996–2003)."
    },
    "ref": "research-49",
    "confidence": "structured-database",
    "evidence": "MusicBrainz · 艺人关系记录"
  },
  {
    "a": "paul",
    "b": "bonham",
    "type": "record",
    "year": "1979",
    "title": "Rockestra 录音",
    "detail": "Bonham 为 McCartney 的 Rockestra 曲目录鼓。",
    "en": {
      "title": "The Rockestra sessions",
      "detail": "Bonham played drums on McCartney’s Rockestra tracks."
    },
    "ref": "research-50",
    "confidence": "event or credit page",
    "evidence": "Paul McCartney 官网 · Back to the Egg"
  },
  {
    "a": "paul",
    "b": "pete-townshend",
    "type": "record",
    "year": "1979",
    "title": "Rockestra 录音",
    "detail": "Townshend 作为客席乐手参与 McCartney 的 Rockestra 曲目。",
    "en": {
      "title": "The Rockestra sessions",
      "detail": "Townshend was a guest musician on McCartney’s Rockestra tracks."
    },
    "ref": "research-51",
    "confidence": "event or credit page",
    "evidence": "Paul McCartney 官网 · Back to the Egg"
  },
  {
    "a": "pink-floyd",
    "b": "snowy-white",
    "type": "record",
    "year": "1977",
    "title": "Snowy White 随 Pink Floyd 演出",
    "detail": "Pink Floyd 与 Snowy White 有 MusicBrainz 记录的关系：instrumental supporting musician（bass guitar、guitar）；时间：1977。",
    "en": {
      "title": "Snowy White tours with Pink Floyd",
      "detail": "MusicBrainz records instrumental supporting musician (bass guitar、guitar) between Pink Floyd and Snowy White (1977)."
    },
    "ref": "research-52",
    "confidence": "structured-database",
    "evidence": "MusicBrainz · 艺人关系记录"
  },
  {
    "a": "the-kinks",
    "b": "nicky-hopkins",
    "type": "record",
    "year": "1964–1969",
    "title": "The Kinks 与 Nicky Hopkins 的录音或演出合作",
    "detail": "The Kinks 与 Nicky Hopkins 有 MusicBrainz 记录的关系：member of band（additional）；时间：1964–1969。",
    "en": {
      "title": "The Kinks and Nicky Hopkins: recording or performance collaboration",
      "detail": "MusicBrainz records member of band (additional) between The Kinks and Nicky Hopkins (1964–1969)."
    },
    "ref": "research-53",
    "confidence": "structured-database",
    "evidence": "MusicBrainz · 艺人关系记录"
  }
];
const researchSources = [
  "https://musicbrainz.org/artist/634fe78e-fc6b-4b2a-ba83-c8c66e13a8aa/relationships",
  "https://musicbrainz.org/artist/634fe78e-fc6b-4b2a-ba83-c8c66e13a8aa/relationships",
  "https://musicbrainz.org/artist/aecfaa2c-d042-40b5-b4c4-05534acafd3a/relationships",
  "https://musicbrainz.org/artist/2a66baa5-9832-4fbc-8365-c9f607a89e47/relationships",
  "https://musicbrainz.org/artist/2a66baa5-9832-4fbc-8365-c9f607a89e47/relationships",
  "https://musicbrainz.org/artist/3ae2fb37-8a23-429d-9920-bac811c4fc22/relationships",
  "https://musicbrainz.org/artist/59e8742f-8011-4aa5-84ce-65db3ca1fef1/relationships",
  "https://musicbrainz.org/artist/c78f0746-ea5d-44c0-92ee-f32745951345/relationships",
  "https://musicbrainz.org/artist/afac07f5-d4aa-43f4-bad3-6bc2bb474cba/relationships",
  "https://rockhall.com/inductees/cure/",
  "https://rockhall.com/inductees/queen/",
  "https://rockhall.com/inductees/queen/",
  "https://rockhall25.wpenginepowered.com/wp-content/uploads/2025/10/The_Clash_2003.pdf",
  "https://rockhall25.wpenginepowered.com/wp-content/uploads/2025/10/The_Clash_2003.pdf",
  "https://rockhall.com/inductees/rem/",
  "https://rockhall.com/inductees/radiohead/",
  "https://rockhall.com/inductees/cure/",
  "https://rockhall.com/inductees/nirvana/",
  "https://rockhall.com/inductees/nirvana/",
  "https://rockhall.com/inductees/radiohead/",
  "https://rockhall25.wpenginepowered.com/wp-content/uploads/2025/10/Ramones_2002.pdf",
  "https://rockhall.com/inductees/cure/",
  "https://rockhall.com/inductees/nirvana/",
  "https://rockhall.com/inductees/rem/",
  "https://rockhall.com/inductees/queen/",
  "https://rockhall.com/inductees/cure/",
  "https://rockhall25.wpenginepowered.com/wp-content/uploads/2025/10/The_Clash_2003.pdf",
  "https://rockhall25.wpenginepowered.com/wp-content/uploads/2025/10/The_Clash_2003.pdf",
  "https://rockhall25.wpenginepowered.com/wp-content/uploads/2025/10/The_Clash_2003.pdf",
  "https://rockhall25.wpenginepowered.com/wp-content/uploads/2025/10/The_Clash_2003.pdf",
  "https://rockhall25.wpenginepowered.com/wp-content/uploads/2025/10/The_Clash_2003.pdf",
  "https://rockhall.com/inductees/oasis/",
  "https://rockhall.com/inductees/rem/",
  "https://rockhall.com/inductees/cure/",
  "https://rockhall.com/inductees/queen/",
  "https://musicbrainz.org/artist/5182c1d9-c7d2-4dad-afa0-ccfeada921a8/relationships",
  "https://musicbrainz.org/artist/5182c1d9-c7d2-4dad-afa0-ccfeada921a8/relationships",
  "https://musicbrainz.org/artist/79491354-3d83-40e3-9d8e-7592d58d790a/relationships",
  "https://musicbrainz.org/artist/33b3c323-77c2-417c-a5b4-af7e6a111cc9/relationships",
  "https://musicbrainz.org/artist/5182c1d9-c7d2-4dad-afa0-ccfeada921a8/relationships",
  "https://www.georgeharrison.com/concert-for-bangladesh-at-the-smithsonian/",
  "https://musicbrainz.org/artist/6d24f102-5c43-453a-8664-4ee092f441cf/relationships",
  "https://musicbrainz.org/artist/802d37d5-0aaa-492e-b366-99f75e5a196f/relationships",
  "https://musicbrainz.org/artist/8e3fcd7d-bda1-4ca0-b987-b8528d2ee74e/relationships",
  "https://musicbrainz.org/artist/29c11f6b-df9f-454f-964e-75eedadb4a1e/relationships",
  "https://www.georgeharrison.com/concert-for-george-film-makes-digital-debut/",
  "https://www.ringostarr.com/all-starr-band/",
  "https://www.paulmccartney.com/discography/albums/back-to-the-egg",
  "https://musicbrainz.org/artist/8aa5b65a-5b3c-4029-92bf-47a544356934/relationships",
  "https://musicbrainz.org/artist/8aa5b65a-5b3c-4029-92bf-47a544356934/relationships",
  "https://www.paulmccartney.com/discography/albums/back-to-the-egg",
  "https://www.paulmccartney.com/discography/albums/back-to-the-egg",
  "https://musicbrainz.org/artist/83d91898-7763-47d7-b03b-b92132375c47/relationships",
  "https://musicbrainz.org/artist/17b53d9f-5c63-4a09-a593-dde4608e0db9/relationships"
];
researchStories.forEach((edge,index) => {
  sources[edge.ref] = ['研究核查纪录',researchSources[index]];
  relations.push(edge);
});
