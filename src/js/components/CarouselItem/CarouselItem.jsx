import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import IcoCheck from 'js/components/Icons/IcoCheck';
import ArtistMusic from 'js/components/ArtistMusic';

import { setSelectedTracks, deleteSelectedTracks, fetchRecommendationsTracks } from 'js/actions/carousel';

class CarouselItem extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    selectedTracks: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    artists: PropTypes.array.isRequired,
    album: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired
  };

  static defaultProps = {
    name: '',
    artists: [],
    album: {},
    id: ''
  };

  // ----------------------------------------------------------

  selectTrack = async (evt, trackId) => {
    evt.preventDefault();
    const { dispatch, selectedTracks } = this.props;
    const elTrackSelected = evt.target;
    const isTrackWasSelected = selectedTracks.find(item => item == trackId);

    if (!isTrackWasSelected) {
      elTrackSelected.classList.add('spfy-carousel-item__image--active');

      await dispatch(setSelectedTracks(trackId));
    } else {
      await dispatch(deleteSelectedTracks(trackId));
      elTrackSelected.classList.remove('spfy-carousel-item__image--active');
    }

    dispatch(fetchRecommendationsTracks());
  };

  // ----------------------------------------------------------

  render() {
    const { album, id, artists, name } = this.props;

    return (
      <li className="spfy-carousel-item">
        {album.images &&
          album.images
            .filter(item => item.width >= 600)
            .map(({ url }, key) => (
              <Fragment key={key}>
                <figure onClick={e => this.selectTrack(e, id)} className="spfy-carousel-item__image">
                  <img src={url} />
                  <figcaption>
                    <IcoCheck className="spfy-carousel-item__check" />
                  </figcaption>
                </figure>
                <ArtistMusic artist={artists} music={name} className="spfy-carousel-item__info" />
              </Fragment>
            ))}
      </li>
    );
  }
}

// ----------------------------------------------------------

const mapStateToProps = state => {
  return {
    selectedTracks: state.carousel.selectedTracks
  };
};

export default connect(mapStateToProps)(CarouselItem);
