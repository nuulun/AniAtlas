import { useState } from "react";
import { GENRES } from "../data/titles.js";

// UC-8 Submit title by playlist URL (FR-13, FR-15). Real app: POST /api/submissions
const PLAYLIST_RE = /[?&]list=[\w-]+/;

export default function SubmitPage() {
  const [url, setUrl] = useState("https://www.youtube.com/playlist?list=PLexample123");
  const [error, setError] = useState("");
  const [imported, setImported] = useState(false);
  const [sent, setSent] = useState(false);
  const [genre, setGenre] = useState("Fantasy");
  const [tags, setTags] = useState("2D, retro, arcade");

  const onImport = (e) => {
    e.preventDefault();
    if (!PLAYLIST_RE.test(url)) {
      setError("This is not a playlist link. Open the playlist on YouTube and copy the address that contains “list=”.");
      setImported(false);
      return;
    }
    setError("");
    setImported(true);
    setSent(false);
  };

  return (
    <>
      <section className="intro">
        <h1>Submit a series</h1>
        <p>Add your own series, or one you love, from a public YouTube playlist. A moderator checks every submission before it appears in the catalogue.</p>
      </section>

      <ol className="steps">
        <li>
          <form onSubmit={onImport} noValidate>
            <div>
              <div className="field">
                <label htmlFor="purl">YouTube playlist link</label>
                <div className="inline">
                  <input id="purl" type="url" value={url} onChange={(e) => setUrl(e.target.value)} aria-invalid={!!error} aria-describedby={error ? "purl-err" : undefined} />
                  <button className="btn btn-primary" type="submit">Import playlist</button>
                </div>
              </div>
              {error && <p id="purl-err" className="error">{error}</p>}
            </div>
          </form>
        </li>

        <li className={imported ? "" : "todo"}>
          <div>
            <h2>Check what was imported</h2>
            {imported ? (
              <div className="import">
                <dl>
                  <dt>Title</dt><dd>Moonlit Arcade (sample)</dd>
                  <dt>Channel</dt><dd>Moonlit Studio</dd>
                  <dt>Episodes</dt><dd>6 videos, added as season 1</dd>
                  <dt>API quota used</dt><dd>3 of 9,000 daily units</dd>
                </dl>
                <div className="field">
                  <label htmlFor="sg">Main genre</label>
                  <select id="sg" value={genre} onChange={(e) => setGenre(e.target.value)}>
                    {GENRES.map((g) => <option key={g}>{g}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="stg">Tags, separated by commas</label>
                  <input id="stg" type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
                </div>
              </div>
            ) : (
              <p className="muted">Import a playlist to see its title and episodes here.</p>
            )}
          </div>
        </li>

        <li className={imported ? "" : "todo"}>
          <div>
            <h2>Send for review</h2>
            {sent ? (
              <p><span className="status">Waiting for moderator</span> <span className="done">Sent.</span> You will see it in the catalogue once it is approved.</p>
            ) : (
              <div><button className="btn btn-primary" disabled={!imported} onClick={() => setSent(true)}>Send for review</button></div>
            )}
          </div>
        </li>
      </ol>
    </>
  );
}
