import PropTypes from 'prop-types';

export const NavigationPropTypes = PropTypes.shape({
  navigate: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  addListener: PropTypes.func.isRequired,
  isFocused: PropTypes.func.isRequired,
  setParams: PropTypes.func.isRequired,
  getParam: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  dangerouslyGetParent: PropTypes.func.isRequired,
});

export default NavigationPropTypes;
