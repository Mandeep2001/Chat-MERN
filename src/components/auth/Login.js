import React, { Component } from "react";
import { connect } from "react-redux";
import { loginAction } from "../../store/actions/authActions";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

class Login extends Component {
  render() {
    return (
      <div className="my-auto">
        <Formik
          initialValues={{
            email: "",
            password: ""
          }}
          onSubmit={(values, actions) => {
            this.props
              .onLogin(values)
              .then(() => {
                this.props.history.push("/");
              })
              .catch(e => {
                console.log("Errore", e);
                actions.setFieldError("email", e);
              })
              .finally(() => actions.setSubmitting(false));
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Devi inserire un indirizzo e-mail valido.")
              .required("Devi inserire un indirizzo e-mail per continuare."),
            password: Yup.string()
              .min(8, "La password è troppo corta")
              .required("Devi inserire una password per continuare.")
          })}
        >
          {props => {
            const { touched, errors } = props;
            return (
              <Form
                className={
                  touched.email && touched.password
                    ? "container w-25 card p-4 needs-validation was-validated"
                    : "container w-25 card p-4 needs-validation"
                }
                noValidate
              >
                <h2 className="">Login</h2>
                <div className="pt-3 form-group">
                  <label htmlFor="email">Email address</label>
                  <Field
                    type="email"
                    className={
                      errors.email && touched.email
                        ? "error form-control"
                        : "form-control"
                    }
                    id="email"
                    name="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    required
                  />
                  <p className="invalid-feedback d-block">{errors.email}</p>
                  {errors.email && touched.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    className={
                      errors.password && touched.password
                        ? "error form-control"
                        : "form-control"
                    }
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                  {errors.password && touched.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    loginError: state.authReducer.loginError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: user => dispatch(loginAction(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
