import React from "react";
import { register } from "../providers/AuthProvider";

export default function SignUp() {
  function handleCreateThread(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    // const formRaw = JSON.parse(formJson);

    if (formJson.password === formJson.passwordCheck) {
      register("email", formJson.email, formJson.password, formJson.username);
    } else {
      console.log("Log in to create thread");
    }
  }

  return (
    <div className="sign-in post-container">
      <h2>Register An Account</h2>
      <form className="sign-in__form" onSubmit={handleCreateThread}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" placeholder="Enter Email" required />
        <label htmlFor="title">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          required
        />
        <label htmlFor="title">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          required
        />
        <label htmlFor="title">Confirm Password</label>
        <input
          type="password"
          name="passwordCheck"
          placeholder="Confirm Password"
          required
        />
        <button className="sign-in__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
