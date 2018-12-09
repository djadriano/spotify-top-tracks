import React from 'react';
import PropTypes from 'prop-types';

const ArtistMusic = ({ className, artist, music }) => {
  return (
    <div className={`spfy-artist-music ${className}`}>
      <h3 className="spfy-artist-music__music">{music}</h3>
      <h2 className="spfy-artist-music__artist">{artist.map(item => item.name).join(' & ')}</h2>
    </div>
  );
};

ArtistMusic.propTypes = {
  className: PropTypes.string,
  artist: PropTypes.array.isRequired,
  music: PropTypes.string.isRequired
};

ArtistMusic.defaultProps = {
  artists: '',
  music: ''
};

export default ArtistMusic;
