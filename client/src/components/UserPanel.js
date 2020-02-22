import React from "react";

function UserPanel({ email, logout }) {
  return (
    <section className="user_panel">
      <span className="user_panel__email">{email}</span>
      <button className="user_panel__btn" onClick={logout}>
        <i className="user_panel__icon fas fa-power-off"></i>
      </button>
    </section>
  );
}

export default UserPanel;
