// Prototype placeholder. In frontend/ this component wraps the YouTube IFrame Player API:
// <iframe src={`https://www.youtube.com/embed/${videoId}`} allow="autoplay; encrypted-media" allowFullScreen />
export default function YouTubePlayer({ title, episode }) {
  return (
    <div className="player" role="img" aria-label="YouTube embedded player placeholder">
      {episode.unavailable ? (
        <>
          <b>Video unavailable</b>
          <small>The author removed this video from YouTube. AniAtlas marks it automatically (FR-8).</small>
        </>
      ) : (
        <>
          <div className="play" />
          <b>{title.name} — {episode.name}</b>
          <small>Official YouTube embed player loads here · youtube.com/embed/&lt;videoId&gt;</small>
        </>
      )}
    </div>
  );
}
