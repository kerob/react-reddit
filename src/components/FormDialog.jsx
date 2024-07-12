import { useEffect, useRef } from 'react';
import { login, useAuth } from '../providers/AuthProvider';
import IconBtn from './IconBtn';
import { GrFormClose } from 'react-icons/gr';

// function SignInForm() {}
function RegisterForm() {}

function CreateThreadForm() {}

export default function FormDialog({ showForm, closeForm }) {
  const { currentUser } = useAuth();
  const formRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    showForm ? formRef.current.showModal() : formRef.current.close();
  }, [showForm]);

  // function handleFormDialog(e) {
  //   e.preventDefault();

  //   const form = e.target;
  //   const formData = new FormData(form);
  //   const formJson = Object.fromEntries(formData.entries());

  //   login("email", formJson.email, formJson.password, formRef.current.close());
  // }
  function SignInForm() {
    return (
      <>
        <h2>Sign In</h2>
        <form
          className="sign-in__form"
          method="dialog"
          // onSubmit={handleFormDialog}
        >
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
              login('email', emailRef.current.value, passwordRef.current.value)
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
      </>
    );
  }

  return (
    <dialog ref={formRef}>
      <div className="dialog-header">
        <IconBtn
          Icon={GrFormClose}
          func={() => {
            closeForm();
          }}
        />
      </div>
      {currentUser ? (
        <>
          <h2>Sign in as {currentUser.displayName}</h2>
        </>
      ) : (
        <SignInForm />
      )}
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
