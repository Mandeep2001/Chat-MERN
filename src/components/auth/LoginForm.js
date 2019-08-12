import React, { Component } from "react";
import validator from "email-validator";

export class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        email: "",
        password: ""
      },
      errors: {
        email: null,
        password: null,
        global: null
      },
      isSubmitted: false,
      loading: false
    };
  }

  validateForm = ({ email, password }) => {
    let errors = {};
    if (!password || password.lenght < 8) {
      errors = {
        ...errors,
        password: "La password deve contenere almeno 8 caratteri."
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
    const { data, errors, loading, isSubmitted } = this.state;
    return (
      <form
        className={
          isSubmitted
            ? "container w-25 card p-4 needs-validation was-validated"
            : "container w-25 card p-4 needs-validation"
        }
        onSubmit={this.handleSubmit}
        noValidate
        // loading={loading}
      >
        <h2 className="pb-3">Login</h2>
        {errors.global && (
          <div class="alert alert-danger" role="alert">
            {errors.global}
          </div>
        )}
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
            // id="password"
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
      </form>
    );
  }
}

export default LoginForm;
