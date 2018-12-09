import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Header = ({ avatar }) => (
  <header className="spfy-header spfy-container">
    {avatar && (
      <figure className="spfy-header__photo">
        <img src={avatar} />
      </figure>
    )}
  </header>
);

Header.propTypes = {
  avatar: PropTypes.string
};

Header.defaultProps = {
  avatar: ''
};

const mapStateToProps = state => {
  return {
    avatar: state.user.data.image
  };
};

export default connect(mapStateToProps)(Header);
