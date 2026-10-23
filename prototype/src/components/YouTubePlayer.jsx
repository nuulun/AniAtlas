import Poster from "./Poster.jsx";

// Prototype placeholder. In frontend/ this component wraps the YouTube IFrame Player API:
// <iframe src={`https://www.youtube.com/embed/${videoId}`} allow="autoplay; encrypted-media" allowFullScreen />
export default function YouTubePlayer({ title, episode, number }) {
  return (
    <div className="player" role="img" aria-label={`Video player for ${title.name}, episode ${number}`}>
      <div className="player-art" aria-hidden="true"><Poster title={title} className="fill" /></div>
      <div className="player-inner">
        {episode.unavailable ? (
          <>
            <b>This video was removed from YouTube</b>
            <small>AniAtlas checks every episode daily and marks removed ones.</small>
          </>
        ) : (
          <>
            <span className="play" />
            <b>Episode {number}: {episode.name}</b>
            <small>Plays in the official YouTube player. Views go to the author's channel.</small>
          </>
        )}
      </div>
    </div>
  );
}
