# Rock Connections Atlas: connectivity audit

Audit date: 2026-11-26

## Scope

This pass adds documented relationships between entities already present in the atlas. It does not create new person or band nodes, so stable identifiers and the precomputed graph positions remain valid. The primary sources for expansion are official artist archives, Rock & Roll Hall of Fame induction essays, contemporary reporting, and MusicBrainz artist-relationship records.

## Before and after

| Measure | Before | After |
|---|---:|---:|
| Nodes | 642 | 642 |
| People | 523 | 523 |
| Bands | 119 | 119 |
| Relationship records | 742 | 842 |
| Unique connected entity pairs | 740 | 834 |
| Mean degree | 2.305 | 2.598 |
| Median degree | 1 | 1 |
| Nodes with one connection | 380 | 337 |
| Isolated nodes | 0 | 0 |
| Connected components | 1 | 1 |
| Average shortest path | 9.292 | 7.166 |
| Diameter | 24 | 19 |

The 100 added records comprise 21 membership, 37 recording/performance, one personal-contact, 15 family, and 26 influence/reference relationships. Because some pairs have more than one independently meaningful relationship, the number of unique connected pairs increases by 94.

## Distribution and centrality

After the expansion, the highest-degree entities are Paul McCartney (17), Oasis (15), Deep Purple (15), The Rolling Stones (14), and a group at 13 comprising The Beatles, The Clash, The Cure, Black Sabbath, Queen, and Wings.

The highest-betweenness entities are Queen, David Bowie, The Clash, The Beatles, Nirvana, Oasis, Paul McCartney, and The Cure. This remains a useful indication of where the graph exposes historical bridges, not a measure of artistic importance.

## Diagnostic paths

The checked paths are regression bounds, not preferred-path fixtures. The browser and `scripts/check-paths.mjs` use the same general shortest-path logic.

| From | To | Edges | Evidence-based route |
|---|---|---:|---|
| Joe Strummer | Nico | 3 | The Clash → Bob Dylan → Nico |
| Joe Strummer | Paul McCartney | 2 | Roger Daltrey → McCartney |
| Brian May | Rivers Cuomo | 2 | Foo Fighters → Rivers Cuomo |
| Brian May | Ringo Starr | 3 | Queen → The Beatles → Ringo Starr |
| Brian May | Weezer | 3 | Foo Fighters → Rivers Cuomo → Weezer |
| John Bonham | Oasis | 3 | Paul McCartney → The Beatles → Oasis |

The path suite also covers older rock and roll, punk, art rock, alternative rock, and metal across several decades and countries.

## Source coverage

Of the 100 added records, 57 cite MusicBrainz artist/release relationship pages. The remaining records draw mainly on 26 Rock & Roll Hall of Fame pages, official Paul McCartney, George Harrison, Ringo Starr, and Queen archives, and selected reporting. MusicBrainz is treated as a specialist structured database rather than an unquestioned source; ambiguous entity matches are skipped.

The refresh utility is deliberately separate from production data:

```sh
node scripts/refresh-musicbrainz.mjs
```

It writes candidate JSON for review and does not edit the graph. Cached API responses stay under `.cache/`.

## Validation

- `node scripts/data.mjs --check` checks identifiers, endpoints, duplicate records, citations, translations, layout coordinates, and portrait files.
- `node scripts/check-paths.mjs` checks the named diagnostic paths and relationship-type filtering.
- `node scripts/graph-stats.mjs` reproduces the connectivity measurements.
- The local page was loaded in a browser; search, the path form, language switching, relationship counts, and graph rendering were checked manually.

## Remaining gaps

- The stated research target of roughly 5,000 relationships has not been reached. This pass adds 100 records with traceable sources rather than filling a quota.
- There are still 337 nodes with only one recorded connection. Many are historical band members whose only available link in this atlas is their band.
- The graph remains strongly oriented toward British and American rock. Non-Western scenes and session musicians outside the existing inventory remain underrepresented.
- MusicBrainz records can be community-maintained and vary in specificity. Ambiguous redirect pages and identity collisions are now rejected by the refresh script, but individual claims still benefit from a second source before promotion into heavily curated prose.
