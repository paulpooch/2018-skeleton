const path = require('path');

module.exports = {
  DIRECTORIES: {
    DIST: path.resolve(process.cwd(), 'frontend', 'dist'),
    MODELS: path.resolve(process.cwd(), 'backend', 'models'),
    PUBLIC_PATH: '/dist/',
  },
  REACT_ROOT_ELEMENT: 'react-root',
};
