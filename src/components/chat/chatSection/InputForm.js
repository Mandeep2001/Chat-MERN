import React from "react";

function InputForm() {
  return (
    <div className="input-form d-flex align-items-center">
      <form className="content container w-80 d-flex">
        <button className="upload" type="button">
          <i className="fas fa-upload" />
        </button>
        <input
          className="message-input flex-fill"
          type="text"
          placeholder="Inserisci il messaggio..."
        />
        <button className="submit" type="submit">
          <i className="fas fa-paper-plane" />
        </button>
      </form>
    </div>
  );
}

export default InputForm;
