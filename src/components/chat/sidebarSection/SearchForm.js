import React, { Component } from "react";
import { connect } from "react-redux";
import { searchUserAction } from "../../../store/actions/chatActions";

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ""
    };
  }

  handleChange = event => {
    this.setState({ query: event.target.value }, () => {
      this.searchQuery(this.state.query);
    });
  };

  searchQuery = query => {
    const users = this.props.users.filter(u => {
      return u.user.username.includes(query);
    });
    this.props.searchUser(users);
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="search-form d-flex align-items-center">
        <form className="w-100">
          <div className="search-inner-form">
            <input
              type="text"
              placeholder="Cerca..."
              value={this.state.query}
              onChange={this.handleChange}
            />
            <i className="fas fa-search" aria-hidden="true" />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { users: state.chat.usersList };
};

export default connect(
  mapStateToProps,
  { searchUser: searchUserAction }
)(SearchForm);
