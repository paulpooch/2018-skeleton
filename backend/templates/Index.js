import React from 'react';
import config from '../../config';

const Index = ({ scripts, styles }) => (
  <html className="no-js" lang="en-us">
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <title>2018 Skeleton</title>
      {styles.map(style => <link rel="stylesheet" href={`/dist/css/${style}`} />)}
    </head>
    <body>
      <div id={config.REACT_ROOT_ELEMENT} style={{ minHeight: '100vh' }} />
      {scripts.map(script => <script defer key={script} src={`/dist/js/${script}`} charSet="UTF-8" />)}
    </body>
  </html>
);

export default Index;
