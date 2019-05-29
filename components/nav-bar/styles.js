import { responsiveSize } from '../../utils/dimensions';

export default {
  navBar: {
    width: '100%',
    height: responsiveSize(110),
    right: 0,
    bottom: 0,
    left: 0,
    position: 'absolute',
    flexDirection: 'row',
  },
  profile: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  action: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alert: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
};
