import React, { useState } from "react";

function UpdateProfileForm({ uploadImage, handleChange }) {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  return (
    <form>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
          // value={username}
          onChange={event => handleChange(event)}
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          // value={password}
          onChange={event => handleChange(event)}
          placeholder="Password"
        />
      </div>
      <div className="custom-file">
        <input
          type="file"
          className="custom-file-input"
          id="imageUpload"
          onChange={event => uploadImage(event.target.files[0])}
          accept="image/x-png,image/jpeg"
        />
        <label className="custom-file-label" htmlFor="customFile">
          Choose file
        </label>
      </div>
    </form>
  );
}

export default UpdateProfileForm;
