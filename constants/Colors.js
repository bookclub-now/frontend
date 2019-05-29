const tintColor = '#62d0cf';

export const randomColor = () =>
  Colors.pallete[Math.floor(Math.random() * Colors.pallete.length)];

export const getColorFromId = id => Colors.pallete[id % Colors.pallete.length];

const Colors = {
  global: {
    tintColor,
    tabIconDefault: '#d2d4d6',
    tabIconSelected: '#00D3A7',
    tabBar: '#242529',
    // errorBackground: '#F94B16',
    errorBackground: '#D82F59',
    errorText: '#fff',
    warningBackground: '#EAEB5E',
    warningText: '#666804',
    noticeBackground: tintColor,
    noticeText: '#fff',
    opacityBackground: 'rgba(74,74,74,0.78)',
    commentsBackgroubd: 'rgba(210, 212, 214, 0.4)',
    primary: '#FABC02',
    white: 'white',
    primaryButton: 'rgb(65,176,202)',
    inactive: '#b1b1b1',
    gradientGray: '#F7F9FB',
  },
  text: {
    white: 'white',
    primary: '#FABC02',
    secundary: '#8B8E90',
    search: '#494C4E',
    dark: '#4A4A4A',
    red: '#F00000',
  },
  pallete: [
    '#541488',
    '#D80368',
    '#2D294F',
    '#277473',
    '#46A8BD',
    '#FE5E40',
    '#FF8652',
    '#FFAE00',
    '#00A877',
    '#D0021B',
  ],
};

export default Colors;
