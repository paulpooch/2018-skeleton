const path = require('path');

module.exports = {
  DIRECTORIES: {
    DIST: path.resolve(process.cwd(), 'frontend', 'dist'),
  },
  PORT: 8000,
  REACT_ROOT_ELEMENT: 'react-root',
};
