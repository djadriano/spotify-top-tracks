import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from 'js/components/Header';
import Carousel from 'js/components/Carousel';
import Recommendations from 'js/components/Recommendations';
import IcoSpotify from 'js/components/Icons/IcoSpotify';
import IcoDisk from 'js/components/Icons/IcoDisk';

import { saveUserData } from 'js/actions/user';
import { fetchTopTracks } from 'js/actions/carousel';

class Logged extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    topTracks: PropTypes.array,
    recommendationsTracks: PropTypes.array
  };

  // ----------------------------------------------------------

  async componentDidMount() {
    const { match, dispatch } = this.props;

    this.registerScrollEvents();

    if (match.params.code) {
      try {
        await dispatch(saveUserData(match.params.code));
        dispatch(fetchTopTracks());
      } catch (error) {
        console.log(error);
      }
    }
  }

  // ----------------------------------------------------------

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  // ----------------------------------------------------------

  registerScrollEvents() {
    window.addEventListener('scroll', this.handleScroll);
  }

  // ----------------------------------------------------------

  handleScroll = () => {
    const logoSpotify = document.querySelector('.spfy-spotify-logo');

    logoSpotify.style.opacity = 0.5 - window.scrollY / 600;
  };

  // ----------------------------------------------------------

  render() {
    const { topTracks, recommendationsTracks } = this.props;

    return (
      <section className="spfy-logged">
        {topTracks.length > 0 && (
          <Fragment>
            <Header />
            <IcoSpotify className="spfy-spotify-logo" />
            <div className="spfy-logged__content">
              <h1 className="spfy-logged__title spfy-container">
                Your
                <br />
                Top Tracks
              </h1>
              <Carousel topTracks={topTracks} />
            </div>
            {recommendationsTracks.length == 0 ? (
              <p className="spfy-logged__message">
                <IcoDisk className="spfy-logged__disk" />
                <span>Select track(s) to see recommendations</span>
              </p>
            ) : (
              <Recommendations tracks={recommendationsTracks} />
            )}
          </Fragment>
        )}

        {!topTracks.length && <p className="spfy-logged__loading">Loading...</p>}
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    topTracks: state.carousel.topTracks,
    recommendationsTracks: state.carousel.recommendationsTracks
  };
};

export default connect(mapStateToProps)(Logged);
