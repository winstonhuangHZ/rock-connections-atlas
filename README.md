# Rock Connections Atlas

A bilingual, static graph of documented relationships in rock music. The initial view shows all nodes and edges. Select a node for its profile or an edge for the event and source. Search accepts English names and selected Chinese names and aliases. The path finder can restrict a search to one relationship type, including family.

The current connectivity audit and its limitations are recorded in [`AUDIT.md`](AUDIT.md).

## Open or publish

- Open `index.html` in a browser, or run `python3 -m http.server 8000` from this directory.
- To publish on GitHub Pages, put the contents of this directory at the publishing root. Under **Settings → Pages**, select **Deploy from a branch** and the branch and directory containing `index.html`. The site uses relative paths and serves from either a project subpath or a domain root.
- The graph and search work offline. Source links open the original pages when a network connection is available.

## Data and attribution

- `catalog.js` contains the initial profiles, typed relationships, and citations.
- `lineups.js` lists selected historical band members. The band's source gives the lineup history. Two people linked to the same band may have played in different periods.
- `connections.js` documents individual recordings, performances, influences and public family ties. Its bilingual entries store both descriptions beside the citation. Names in the English interface retain their original spelling where appropriate.
- `connections-musicbrainz.js` contains reviewed artist-to-artist records from MusicBrainz. These supplement the curated prose records and link back to the source artist's relationship page.
- `connections-research.js` contains reviewed candidates from the parallel historical research passes. Entries are kept separate so structured-database and curated sources remain auditable.
- `portraits.js` links image files to the Wikimedia Commons file pages with creator and license information. Portraits are included selectively. Entries without a local image use initials.
- `layout.js` contains the precomputed graph coordinates. The browser renderer is the vendored Cytoscape.js release. Its license is in `vendor/`. Font licenses are in `fonts/`.

## Maintain the atlas

Run `node scripts/data.mjs --check` with Node.js 22 or later. It checks identifiers, endpoints, duplicates, citations, translations, layout coordinates and portrait files. It does not reverify historical claims.

Run `node scripts/graph-stats.mjs` for a reproducible connectivity audit: degree distribution, connected components, shortest paths and betweenness. `node scripts/refresh-musicbrainz.mjs` performs the throttled MusicBrainz discovery pass and writes a candidate file for review; it does not modify production data automatically.

Run `node scripts/check-paths.mjs` to verify the historical path benchmark used during this audit. The refresh script caches API responses under `.cache/`, which is not committed.

`node scripts/audit-lineups.mjs` compares roster names with the corresponding reference pages and emits JSON for review. Name matches are leads. Check roles and years on the source pages before adding a relationship. The audit stops at an HTTP 429 response, preserving the completed results.

To regenerate positions after adding nodes or relationships, install the layout dependencies locally and run:

```sh
npm install --no-save --package-lock=false cytoscape@3.35.0 cytoscape-fcose@2.2.0
node scripts/build-layout.cjs
node scripts/data.mjs --check
```

The visual treatment draws on the typographic hierarchy and restrained chart palette of the [Square Packing Atlas](https://evand.github.io/square-packing/).
