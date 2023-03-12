import { StyledTrackList } from "../styles";
import styled from "styled-components/macro";

const StyledButton = styled.button`
  font-size: 1em;
  margin-top: 1rem;
  border: 2px solid purple;
  border-radius: 3px;
`;

const Playlist = ({ artists }) => {
  const artistsList = [];

  artists.map((artist) => {
    if (artist.data.tracks.items.length === 0) {
      console.error("CANNOT FIND SONG!", artist);
    } else {
      artistsList.push(artist);
      console.log("FOUND ARTIST", artistsList);
    }
  });

  return (
    <>
      {artistsList ? (
        <StyledTrackList>
          {artistsList.map((artist, i) => (
            <li className="track__item" key={i}>
              <div className="track__item__num">{i + 1}</div>
              <div className="track__item__title-group">
                {artist.data.tracks.items[0].album.images.length &&
                  artist.data.tracks.items[0].album.images[2] && (
                    <div className="track__item__img">
                      <img
                        src={artist.data.tracks.items[0].album.images[2].url}
                        alt="track not available"
                      />
                    </div>
                  )}
                <div className="track__item__name-artist">
                  <div className="track__item__name track__item__artist">
                    {artist.data.tracks.items[0].name}
                  </div>
                  <div className="track__item__artist overflow-ellipsis">
                    <span key={i}>
                      {artist.data.tracks.items[0].artists[0].name}{" "}
                      {/*{i !== artist.data.tracks.items[0].artists.length - 1 && ','}*/}
                    </span>
                  </div>
                </div>
              </div>
              <div className="track__item__album overflow-ellipsis">
                {artist.data.tracks.items[0].name}
              </div>
            </li>
          ))}
          <a href="http://localhost:8889/login">
          <StyledButton className="dashboard_button">
            Go to Dashboard
          </StyledButton>
          </a>
        </StyledTrackList>
      ) : (
        <p className="empty-notice">No artists available</p>
      )}
    </>
  );
};

export default Playlist;
