import { useEffect, useRef } from "react";
import { login } from "../providers/AuthProvider";

export default function FormDialog({ showForm, closeForm }) {
  const formRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    showForm ? formRef.current.showModal() : formRef.current.close();
  }, [showForm]);

  return (
    <dialog ref={formRef}>
      <div className="dialog-header">
        <button
          onClick={() => {
            closeForm();
          }}
        >
          alskdfjsdlkfj
        </button>
      </div>
      <h2>Sign In</h2>
      <form className="sign-in__form" method="dialog">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          ref={emailRef}
          placeholder="Enter Username"
        />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" ref={passwordRef} />
        <button
          className="sign-in__button"
          type="submit"
          onClick={() =>
            login("email", emailRef.current.value, passwordRef.current.value)
          }
          // onClick={() => {
          //   login("email", "tester@test.com", "tester");
          //   console.log(emailRef.current.value);
          //   console.log(passwordRef.current.value);
          // }}
          // onClick={signInWithEmail}
        >
          Sign In
        </button>
        <div className="sign-in__redirect">
          <a href="#">Lost your password?</a>
          {/* <Link to="/register" href="#">
              Don't have an account?
            </Link> */}
        </div>
      </form>
      {/* <button
          className="sign-in__button"
          style={{ "--btn-clr": "#4285F4" }}
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </button> */}
    </dialog>
  );
}
