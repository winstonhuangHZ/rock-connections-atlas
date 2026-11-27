# Rock Connections Atlas connectivity audit

**Audit date:** 2026-11-27. **Baseline:** commit `a7885e3`, including the previous research pass. The baseline's 842 relationship records were preserved. This pass reviewed 512 candidates and retained 442, alongside ten profiles chosen for their historical importance or connections to existing performers.

## Before and after

| Measure | Baseline | Expanded |
|---|---:|---:|
| Entities | 642 | 652 |
| People and associated figures | 523 | 532 |
| Bands | 119 | 120 |
| Relationship records | 842 | 1,284 |
| Unique connected pairs | 834 | 1,231 |
| Mean degree | 2.60 | 3.78 |
| Median degree | 1 | 2 |
| Isolated entities | 0 | 0 |
| Entities with exactly one neighbor | 337 | 262 |
| Connected components | 1 | 1 |
| Largest component | 642 | 652 |
| Mean shortest-path length in largest component | 7.17 | 5.06 |
| Diameter of largest component | 19 | 12 |
| Non-leaf bridges | 40 | 16 |

Degree, distance, bridges, and betweenness use the simple undirected projection, with each entity pair counted once. The mean path length and diameter use the largest component. Betweenness is unnormalized and counts each unordered pair once. A non-leaf bridge is a single pair whose removal separates two groups that each contain at least two nodes.

| Relationship category | Baseline | Expanded | Added |
|---|---:|---:|---:|
| Band membership | 622 | 631 | 9 |
| Recording and performance | 137 | 444 | 307 |
| Tours and support acts | 0 | 11 | 11 |
| Personal or documented professional contact | 11 | 21 | 10 |
| Family | 18 | 23 | 5 |
| Influence, covers, and references | 54 | 154 | 100 |

Degree distribution by bin:

| Distinct neighbors | Baseline | Expanded |
|---|---:|---:|
| 0 | 0 | 0 |
| 1 | 337 | 262 |
| 2 | 117 | 105 |
| 3–5 | 109 | 143 |
| 6–9 | 56 | 83 |
| 10+ | 23 | 59 |

The initial highest-degree entities were Paul McCartney (17), Oasis (15), and Deep Purple (15). The expanded leaders are David Bowie (38), Bob Dylan (28), Eric Clapton (27), the Rolling Stones (25), and Warren Zevon (21). Bowie, Zevon, and the Rolling Stones received additional review for repeated sessions and attribution.

The baseline betweenness leaders were Queen (40,215.5), David Bowie (37,384.1), and the Clash (36,220.1). The expanded leaders are David Bowie (46,465.6), the Ramones (21,692.3), Metallica (21,656.3), the Rolling Stones (19,372.5), and Bob Dylan (18,147.8). These figures describe coverage in the atlas.

## Diagnostic paths

| Pair | Baseline → Expanded | Example expanded result |
|---|---:|---|
| Joe Strummer → Nico | 3 → 2 | Bob Dylan performed Strummer's co-written “London Calling.” Nico recorded Dylan's “I'll Keep It With Mine.” |
| Joe Strummer → Paul McCartney | 2 → 2 | Via Roger Daltrey. |
| Brian May → Rivers Cuomo | 2 → 2 | Via Foo Fighters. |
| Brian May → Ringo Starr | 3 → 3 | Via Queen and the Beatles. |
| Brian May → Weezer | 3 → 3 | Via Foo Fighters and Rivers Cuomo. |
| John Bonham → Oasis | 3 → 2 | Bonham was a Led Zeppelin member. Noel Gallagher cited Led Zeppelin as a reference point for “Gas Panic!” |
| Jim Morrison → Chester Bennington | 11 → 3 | The Doors → Scott Weiland, who later performed “Wonderful” with Bennington. |
| Kurt Cobain → Pete Shelley | 9 → 3 | Nirvana → Buzzcocks. The middle edge records tour support. |
| Bob Dylan → Clem Burke | 3 → 1 | Burke played drums on “Under Your Spell.” |

The Strummer and Bonham shortcuts combine different kinds of evidence. Neither establishes a meeting or a recording together. The tour filter separates documented opening slots and tours from recording and performance credits. A directional record preserves the contributor or source in its details, while the path finder supports traversal in both directions. Multiple independent credits between the same people are retained and displayed individually.

## Historical highlights and coverage

- Mike Shinoda was credited for the lead reinterpretation on Depeche Mode's 2004 “Enjoy the Silence” reissue. [Depeche Mode archive](https://archives.depechemode.com/audio/releases/enjoythesilence04.html)
- Angus and Malcolm Young joined the Rolling Stones for “Rock Me Baby” on four 2003 dates. The AC/DC opening slots are recorded separately. [AC/DC archive](https://www.acdc.com/on-this-day-2003-4/)
- The punk and new-wave sessions include Steve Jones and Paul Simonon on Dylan's “Sally Sue Brown,” and Clem Burke on “Under Your Spell.” [Down in the Groove](https://www.bobdylan.com/albums/down-in-the-groove/) · [Knocked Out Loaded](https://www.bobdylan.com/albums/knocked-out-loaded/)
- The expansion adds Alice in Chains and its original lineup plus Mike Inez, along with Elvis Presley, Little Richard, Neil Young, and David Crosby. It prioritizes existing entities, without generating band-member cliques or connecting everyone at the same event.

The 442 new records cite 290 distinct URLs from 126 domains. They include 171 explicit direction annotations. Research drew on original credits, artist and label archives, first-person interviews, performance footage, and selected specialist catalogs. A separate reviewer sampled 36 candidate rows in two passes. Editorial review eliminated semantic repeats, corrected an ambiguous Heartbreakers identifier, replaced dead citations, clarified the provenance of reissue credits, and separated covers and tour support from joint recordings. The HTTP probe reached most references, but some source hosts restricted automated requests. Those statuses do not verify or disprove a credit.

## Reproduction and remaining gaps

- `connections-enrichment.js` contains the new profiles and bilingual cited relationships. The shared loader and dataset validator check direction and relationship type.
- `node scripts/data.mjs --check` passed. `node scripts/check-paths.mjs` passed 24 path checks and four type-filter checks. The checks use ordinary graph search with no preferred routes.
- `node scripts/graph-stats.mjs` reproduces the degree histogram, component metrics, centralities, and non-leaf bridges. `node scripts/build-layout.cjs` regenerated the network layout with the documented optional dependencies.
- Browser checks covered full graph rendering, new profile search and citation details, path comboboxes and swapping, the tour filter, direction, switching to Chinese, and mobile overflow.

The 5,000-record research target remains open. The atlas has 262 single-neighbor entities, concentrated among historical band lineups. No Party for Cao Dong still depends on one cross-scene bridge to Nirvana in the graph, and Pixies and the Breeders remain sensitive to removal of their Kim Deal membership edges. Better-documented non-Western collaborations, personnel for less connected bands, and independent verification of specialist-database records are priorities for future work.
