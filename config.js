const path = require('path');

module.exports = {
  DIRECTORIES: {
    DIST: path.resolve(process.cwd(), 'frontend', 'dist'),
    PUBLIC_PATH: '/dist/',
  },
  REACT_ROOT_ELEMENT: 'react-root',
};
