import React from 'react';
import PropTypes from 'prop-types';

import CarouselItem from 'js/components/CarouselItem';

const Carousel = props => {
  const { topTracks } = props;

  return (
    <ul className="spfy-carousel spfy-container">
      {topTracks.map((item, i) => (
        <CarouselItem key={i} {...props} {...item} />
      ))}
    </ul>
  );
};

Carousel.propTypes = {
  topTracks: PropTypes.array.isRequired
};

Carousel.defaultProps = {
  topTracks: []
};

export default Carousel;
