import React, { Component } from "react";
import { connect } from "react-redux";
import { sendMessageAction } from "../../../store/actions/chatActions";

class InputForm extends Component {
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
    if (!(this.state.message.trim() === "")) {
      this.props.sendMessage(this.state.message);
    }
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

const mapStateToProps = state => {
  return { socket: state.chat.socket };
};

export default connect(
  mapStateToProps,
  { sendMessage: sendMessageAction }
)(InputForm);
