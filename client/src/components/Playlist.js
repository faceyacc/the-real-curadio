import { StyledGrid } from "../styles";
import { StyledTrackList } from '../styles';


const Playlist = ({ artists }) => {
  console.log(artists[0].data.tracks.items[0].name);
  return (
    <>
      {artists ? (
        <StyledTrackList>
        {artists.map((artist, i) => (
          <li className="track__item" key={i}>
            <div className="track__item__num">{i + 1}</div>
            <div className="track__item__title-group">
              {artist.data.tracks.items[0].album.images.length && artist.data.tracks.items[0].album.images[2] && (
                <div className="track__item__img">
                  <img src={artist.data.tracks.items[0].album.images[2].url} alt="track not available" />
                </div>
              )}
              <div className="track__item__name-artist">
                <div className="track__item__name track__item__artist">
                  {artist.data.tracks.items[0].name}
                </div>
                <div className="track__item__artist overflow-ellipsis">
                  {/* {artists.map((artist, i) => ( */}
                    <span key={i}>
                      {artist.data.tracks.items[0].artists[0].name} {/*{i !== artist.data.tracks.items[0].artists.length - 1 && ','}*/}
                    </span>
                  {/* ))} */}
                </div>
              </div>
            </div>
            <div className="track__item__album overflow-ellipsis">
							{artist.data.tracks.items[0].name}
            </div>
          </li>
        ))}
      </StyledTrackList>
      ) : (
        <p className="empty-notice">No artists available</p>
      )}
    </>
  );
};

export default Playlist;
