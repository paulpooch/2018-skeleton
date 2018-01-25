import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

@graphql(gql`
  query TodoAppQuery {
    books {
      title
      author
    }
  }
`)
export default class Test extends Component {
  render() {
    return <div>Test</div>;
  }
}
