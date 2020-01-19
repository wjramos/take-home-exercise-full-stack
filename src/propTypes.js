import PropTypes from 'prop-types';

export const memberShape = PropTypes.shape({
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  photoUrl: PropTypes.string,
  story: PropTypes.string,
  favoriteColor: PropTypes.string,
  id: PropTypes.number.isRequired,
});