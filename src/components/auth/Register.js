import React, { Component } from "react";
import { connect } from "react-redux";
import { registerAction } from "../../store/actions/authActions";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export class Register extends Component {
  render() {
    return (
      <div className="my-auto">
        <Formik
          initialValues={{
            name: "",
            username: "",
            email: "",
            password: ""
          }}
          onSubmit={(values, actions) => {
            this.props
              .onRegister(values)
              .then(() => {
                this.props.history.push("/login");
              })
              .catch(e => {
                console.log("Errore", e);
                actions.setFieldError("general", e);
              })
              .finally(() => actions.setSubmitting(false));
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Devi inserire un indirizzo e-mail valido.")
              .required("Devi inserire un indirizzo e-mail per continuare."),
            username: Yup.string().required(
              "Devi inserire uno username per continuare."
            ),
            password: Yup.string()
              .min(8, "La password è troppo corta")
              .required("Devi inserire una password per continuare."),
            name: Yup.string().required("Devi inserire un nome per continuare.")
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
                <h2 className="">Sign Up</h2>
                <div className="pt-3 form-group">
                  <label htmlFor="email">Nome</label>
                  <Field
                    type="text"
                    className={
                      errors.name && touched.name
                        ? "error form-control"
                        : "form-control"
                    }
                    id="name"
                    name="name"
                    aria-describedby="nameHelp"
                    placeholder="Inserisci il nome"
                    required
                  />
                  {errors.name && touched.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Nome utente</label>
                  <Field
                    type="text"
                    className={
                      errors.username && touched.username
                        ? "error form-control"
                        : "form-control"
                    }
                    id="username"
                    name="username"
                    aria-describedby="usernameHelp"
                    placeholder="Inserisci il nome utente"
                    required
                  />
                  {errors.username && touched.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Indirizzo e-mail</label>
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
                    placeholder="Inserisci il tuo indirizzo e-mail"
                    required
                  />
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
                    placeholder="Inserisci una password"
                    required
                  />
                  {errors.password && touched.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <p className="invalid-feedback d-block">{errors.general}</p>
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
    user: state.auth.user,
    registerError: state.auth.registerError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRegister: user => dispatch(registerAction(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
