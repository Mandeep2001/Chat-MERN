import React, { Component } from "react";

export default class InputForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ""
    };
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="input-form d-flex align-items-center">
        <form
          className="content container w-80 d-flex"
          onSubmit={this.handleSubmit}
        >
          <button className="upload" type="button">
            <i className="fas fa-upload" />
          </button>
          <input
            className="message-input flex-fill"
            type="text"
            value={this.state.message}
            name="message"
            onChange={this.changeHandler}
            placeholder="Inserisci il messaggio..."
          />
          <button className="submit" type="submit">
            <i className="fas fa-paper-plane" />
          </button>
        </form>
      </div>
    );
  }
}
