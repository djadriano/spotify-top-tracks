import React from 'react';
import PropTypes from 'prop-types';

import ArtistMusic from 'js/components/ArtistMusic';

const Recommendations = ({ tracks }) => {
  return (
    <section className="spfy-recommendations spfy-container">
      <h1 className="spfy-recommendations__title">Recommendations Tracks:</h1>
      <ul className="spfy-recommendations-list">
        {tracks.map(({ name, artists, album }, i) => {
          return (
            <li key={i} className="spfy-recommendations-list__item">
              {album.images
                .filter(item => item.width >= 600)
                .map(({ url }, key) => (
                  <figure key={key} className="spfy-recommendations-list__image">
                    <img src={url} />
                  </figure>
                ))}
              <ArtistMusic artist={artists} music={name} className="spfy-recommendations-list__info" />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

Recommendations.propTypes = {
  tracks: PropTypes.array.isRequired
};

Recommendations.defaultProps = {
  tracks: []
};

export default Recommendations;
