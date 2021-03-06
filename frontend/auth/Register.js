import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from './authActions';

@connect((state, ownProps) => ({}), {
  register,
})
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleFieldChange = e => {
    const el = e.currentTarget;
    const name = el.getAttribute('name');
    const value = el.value;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    console.log('submit', this.state);
    const { email, password } = this.state;
    this.props.register({ email, password });
  };

  render() {
    const css = require('./Register.pcss');
    return (
      <form className={css.el} onSubmit={this.handleSubmit}>
        <h1>Register</h1>
        <input type="email" name="email" onChange={this.handleFieldChange} />
        <input type="password" name="password" onChange={this.handleFieldChange} />
        <button type="submit">Register</button>
      </form>
    );
  }
}
