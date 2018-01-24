module.exports = {
  plugins: [
    require('postcss-smart-import'),
    require('postcss-mixins'), // Must be before postcss-simple-vars & postcss-nested.
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('autoprefixer')({ browsers: ['last 3 versions'] }),
  ],
};
