import React from 'react';
import config from '../../config';

const Index = () => (
  <html className="no-js" lang="en-us">
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <title>2018 Skeleton</title>
    </head>
    <body>
      <div id={ config.REACT_ROOT_ELEMENT } style={{ minHeight: '100vh' }} />
      <script defer src="/dist/js/entry.js" charSet="UTF-8" />
    </body>
  </html>
);

export default Index;
