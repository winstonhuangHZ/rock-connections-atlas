# Rock Connections Atlas 后续工作计划

这份计划承接 2026 年 11 月 27 日的抽样审计。先补有出处的历史关系，再增加按证据类型找路径、分享路径和按录音或演出浏览的功能。各阶段可以独立验收和发布。

状态说明

- 勾选表示该项已完成。关系查证和数据入库分别记录。
- 模拟结果用于排定研究顺序。发布后的指标以实际数据重跑为准。
- [上一轮扩充报告](AUDIT.md) 对应更早的数据版本。本计划采用下列单独记录的基线。

## 基线和模拟结果

| 指标 | 抽样审计基线 `05c6233` |
| --- | ---: |
| 节点 | 645 |
| 关系记录 | 1,277 |
| 不同直连组合 | 1,224 |
| 仅有一个不同邻居的节点 | 256 |
| 连通分量 | 1 |
| 非叶桥接关系 | 15 |
| 巡演及暖场关系 | 11 |
| 平均最短路径长度 | 5.044 |
| 直径 | 12 |

距离按无向图、每对节点一条连线计算。同一对艺人的多条历史记录仍各自保留。将下表前五条新直连加进内存做模拟后，有 9,416 对节点的最短路径缩短，平均长度变为 4.990。The Beat 到 The Police 从 6 跳变为 3 跳，Kim Deal 到 U2 从 4 跳变为 2 跳。这些连线尚未写入图谱。

## 阶段 1　补录明确遗漏

| 状态 | 待补关系 | 建议记录 | 证据 |
| --- | --- | --- | --- |
| 已查证，待录入 | Pixies 与 U2 | **巡演**。Pixies 为 U2 的 Zoo TV 巡演暖场，可用 1992 年 4 月 13 日洛杉矶场作出处。 | [U2 演出档案](https://www.u2.com/blogs/zootv-leg-1-1992-north-america/4014) |
| 已查证，待录入 | The Breeders 与 Nirvana | **巡演**。1992 年 6 月 21 日，The Breeders 在都柏林为 Nirvana 暖场。 | [SPIN 同期现场报道](https://img1.wsimg.com/blobby/go/45d7517b-8fc7-454d-83f3-822b6e98f007/downloads/Spin%20Nirvana%2C%20Breeders%2C%20TFanclub%20live%201992.pdf?ver=1564660995598) · [Kim Deal 访谈](https://www.worldradiohistory.com/UK/New-Musical-Express/2018/NME-2018-03-09.pdf) |
| 已查证，待录入 | Damon Albarn 与 Elastica | **录音**。Albarn 用 Dan Abnormal 的名字为 1995 年同名专辑录制键盘。 | [Music & Media 同期报道](https://www.worldradiohistory.com/UK/Music-and-Media/90s/1995/MM-1995-04-01.pdf) |
| 已查证，待录入 | Noel Gallagher 与 Paul McCartney | **录音**。两人参加 Smokin’ Mojo Filters 为 War Child 录制的 1995 年版《Come Together》。 | [McCartney 官网录音说明](https://www.paulmccartney.com/news/war-child-celebrates-its-20th-anniversary-with-new-best-of-compilation) · [1995 年录音回顾](https://www.paulmccartney.com/news/paul-weller-covers-birthday-for-charity) |
| 已查证，待录入 | Ranking Roger 与 Sting | **录音**。Ranking Roger 参与 Sting 于 1996 年发行的《The Bed’s Too Big Without You》重录版。 | [Sting 官网发行档案](https://sting.com/products/let-your-soul-be-your-pilot-cd-digipak) |
| 已查证，待补事件 | John Lennon 与 Chuck Berry | **同台演出**。1972 年在 *The Mike Douglas Show* 合演《Memphis, Tennessee》。另保留现有翻唱记录。 | [Lennon 官方档案](https://www.johnlennon.com/news/daytime-revolution/) |
| 已查证，待补事件 | The Beatles 与 Elvis Presley | **见面**。1965 年 8 月 27 日，The Beatles 在洛杉矶拜访 Elvis。另保留现有 1964 年电报记录。 | [Graceland 档案](https://www.graceland.com/elvis-news/posts/elvis-radio-programs-august-18-27) |

### 数据验收清单

- [x] 从当前数据记录基线，并复现上述五条新增关系的路径模拟。
- [x] 核对七条遗漏的艺人身份、关系类别、日期和来源。
- [ ] 按现有双语格式补录七条关系，为每条保留可直接查证的来源。
- [ ] 对巡演记录写清暖场方、主演方及有出处的场次。保留同一对艺人有独立证据的不同事件。
- [ ] 复核七条记录的关系筛选、详情和来源链接。对新增直连加路径回归检查，对同一对节点的新增事件检查详情是否能分别打开。
- [ ] 重新生成统计并记录实际结果，至少列出关系记录数、不同直连组合数、叶节点数、非叶桥接关系数和代表性路径。
- [ ] 评估下一批巡演及暖场补录，优先排查只有一条桥接关系的乐队群。短路径仅作为发现线索，收录以历史证据为准。
- [ ] 单独评估是否新增 Johnny Cash 节点。已证实他与 Joe Strummer 合录《Redemption Song》，可作为首条候选关系。[发行方录音署名](https://www.youtube.com/watch?v=VNBJiy4JS3o)

## 阶段 2　增加路径模式和分享

保留现有最短路径，并加入只经过可直接追溯到音乐活动的路线。两个模式都能打开每一步的证据和关系详情。

- [ ] 添加「最短路径」，保留现有任意关系类型下按跳数找最短路线的含义。
- [ ] 添加「音乐合作路径」，第一版只用录音与演出、乐队成员、巡演与暖场。结果仍显示每一步的实际关系类型。
- [ ] 定义模式与既有分类筛选如何组合。「音乐合作路径」仅提供该模式允许的类型。
- [ ] 显示影响、翻唱等有方向的记录在来源中的方向。路径可双向探索时，结果仍保留原关系描述。
- [ ] 把起点、终点、模式和分类筛选写入可分享地址。现有 `#paths` 链接继续打开默认页面，未知参数有可用的回退。
- [ ] 验证从分享链接首次打开、刷新、交换起终点和浏览器前进或后退时恢复的状态。
- [ ] 用 Joe Strummer 到 Nico 验证两种模式能讲出不同的故事。当前全关系路线是 Strummer → Bob Dylan → Nico，音乐合作路线可以经过 Mick Jones、Gorillaz 和 Lou Reed。补录后允许真实路径变化，测试应断言模式规则。
- [ ] 增加无可用音乐合作路径、同一起终点、相同步数的多条路径以及手机和中英文交互的测试。

## 阶段 3　按录音或演出浏览

先以 Smokin’ Mojo Filters 的《Come Together》做一份作品档案，连接已有关系记录，再扩展到其他录音或演出。

- [ ] 为记录使用稳定标识，保存名称、日期或已知年份、参与者、角色和来源。
- [ ] 从相关人物页与关系详情打开档案。检查档案能反向跳回对应人物。
- [ ] 在演出档案区分暖场、共同演奏和各自出演。同一事件的参与名单不自动产生艺人之间的直接关系。
- [ ] 试点验证后，再评估 Concert for Bangladesh、Rock and Roll Circus、Concert for George 等档案的资料完整度。

## 阶段 4　按来源反查

- [ ] 署名页的关系参考资料显示引用该网址的关系记录数量，并允许展开查看。
- [ ] 以完整来源网址合并重复条目，保留原本的来源标题和外链。点击反查结果时打开已有关系详情。
- [ ] 验证同一网址支持多条关系、同一对艺人的多条记录，以及未被关系引用的资料条目。

## 每阶段发布前

- [ ] 运行 `node scripts/data.mjs --check`、`node scripts/check-paths.mjs` 和 `git diff --check`。
- [ ] 数据变化后运行 `node scripts/graph-stats.mjs`，分别记录关系总数和不同直连组合数。若新增节点，补齐布局坐标并检查图谱。
- [ ] 在桌面和手机宽度检查中英文、直接链接、关系详情和相关筛选。图谱改动需同时检查 Adaptive 和 Classic 标签模式。
- [ ] 记录实际变更、验证结果和仍待查证的资料。发布后核对 GitHub Pages 上部署的版本和功能。
