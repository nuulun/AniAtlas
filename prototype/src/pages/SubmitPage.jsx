import { useState } from "react";

// UC-8 Submit title by playlist URL (FR-13, FR-15). Real app: POST /api/submissions
const PLAYLIST_RE = /list=[\w-]+/;

export default function SubmitPage() {
  const [url, setUrl] = useState("https://www.youtube.com/playlist?list=PLexample123");
  const [error, setError] = useState(false);
  const [imported, setImported] = useState(false);
  const [sent, setSent] = useState(false);
  const [genre, setGenre] = useState("Fantasy");
  const [tags, setTags] = useState("2D, retro, arcade");

  const onSubmit = (e) => {
    e.preventDefault();
    const ok = PLAYLIST_RE.test(url);
    setError(!ok);
    setImported(ok);
    setSent(false);
  };

  return (
    <section>
      <h1>Submit a series</h1>
      <p className="sub">Paste a public YouTube playlist. AniAtlas imports the title, description and episodes, and a moderator reviews them before publishing.</p>
      <form className="form" onSubmit={onSubmit} noValidate>
        <div>
          <label className="lbl" htmlFor="purl">YouTube playlist URL</label>
          <div className="row">
            <input id="purl" type="url" value={url} onChange={(e) => setUrl(e.target.value)} />
            <button className="primary" type="submit">Import</button>
          </div>
          {error && <div className="err">Paste a playlist link that contains “list=”, for example youtube.com/playlist?list=…</div>}
        </div>
        {imported && (
          <div className="panel preview">
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
              <h2>Imported: Moonlit Arcade</h2>
              <span className="status">PENDING MODERATION</span>
            </div>
            <dl className="kv">
              <dt>Channel</dt><dd>Moonlit Studio (sample)</dd>
              <dt>Videos found</dt><dd>6 → 6 episodes, season 1</dd>
              <dt>Quota used</dt><dd>3 units (playlists, playlistItems, videos)</dd>
            </dl>
            <div>
              <label className="lbl" htmlFor="sg">Genres</label>
              <select id="sg" value={genre} onChange={(e) => setGenre(e.target.value)}>
                <option>Fantasy</option><option>Comedy</option><option>Horror</option>
              </select>
            </div>
            <div>
              <label className="lbl" htmlFor="stg">Tags</label>
              <input id="stg" type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
            </div>
            <div>
              <button className="primary" type="button" onClick={() => setSent(true)}>Send to moderator</button>{" "}
              {sent && <span className="sub">Sent. A moderator will review it before it appears in the catalogue.</span>}
            </div>
          </div>
        )}
      </form>
    </section>
  );
}
