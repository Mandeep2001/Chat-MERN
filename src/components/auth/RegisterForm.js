import React, { Component } from "react";
import validator from "email-validator";

export class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        email: "",
        password: "",
        name: "",
        username: ""
      },
      errors: {
        email: null,
        password: null,
        name: "",
        username: "",
        global: null
      },
      isSubmitted: false
    };
  }

  validateForm = ({ email, password, username, name }) => {
    let errors = {};
    if (!password) {
      errors = {
        ...errors,
        password: "Inserisci una password."
      };
    }

    if (!username) {
      errors = {
        ...errors,
        username: "Inserisci un nome utente."
      };
    }

    if (!name) {
      errors = {
        ...errors,
        name: "Inserisci un nome."
      };
    }

    if (!validator.validate(email)) {
      errors = { ...errors, email: "Inserisci un indirizzo e-mail valido." };
    }
    return errors;
  };

  handleSubmit = event => {
    event.preventDefault();
    const errors = this.validateForm(this.state.data);
    this.setState({ errors, isSubmitted: true });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: { global: err }, loading: false })
        );
    }
  };

  handleChange = event => {
    this.setState({
      data: { ...this.state.data, [event.target.name]: event.target.value }
    });
  };

  render() {
    const { data, errors, isSubmitted } = this.state;
    return (
      <form
        className={
          isSubmitted
            ? "container w-25 card p-4 needs-validation was-validated"
            : "container w-25 card p-4 needs-validation"
        }
        onSubmit={this.handleSubmit}
        noValidate
      >
        <h2 className="pb-3">Sign Up</h2>
        {errors.global && (
          <div className="alert alert-danger" role="alert">
            {errors.global}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            className={"form-control"}
            id="name"
            name="name"
            onChange={this.handleChange}
            value={data.name}
            aria-describedby="nameHelp"
            placeholder="Inserisci il nome"
            required
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="username">Nome utente</label>
          <input
            type="text"
            className={"form-control"}
            id="username"
            name="username"
            onChange={this.handleChange}
            value={data.username}
            aria-describedby="usernameHelp"
            placeholder="Inserisci il nome utente"
            required
          />
          {errors.username && (
            <div className="invalid-feedback">{errors.username}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className={"form-control"}
            id="email"
            name="email"
            onChange={this.handleChange}
            value={data.email}
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className={"form-control"}
            id="password"
            name="password"
            onChange={this.handleChange}
            value={data.password}
            aria-describedby="passwordHelp"
            placeholder="Password"
            required
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <p className="invalid-feedback d-block">{errors.general}</p>
      </form>
    );
  }
}

export default RegisterForm;
