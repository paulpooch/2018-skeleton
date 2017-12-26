import React, { Component } from 'react';

export default class Register extends Component {
  render() {
    return (
      <form>
        <h1>Register</h1>
        <input type="email" name="email" />
        <input type="password" name="password" />
      </form>
    );
  }
}
