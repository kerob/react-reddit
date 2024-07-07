import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { createContext, useContext } from "react";

const AuthContext = createContext();

export function register(type, email, password, username) {
  switch (type) {
    case "email":
      createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          updateProfile(user, { displayName: username }).then(
            console.log("profile updated")
          );
        }
      );
    default:
      break;
  }
}

export function login(type, email, password) {
  switch (type) {
    case "email":
      signInWithEmailAndPassword(auth, email, password)
        .then(console.log("sign in email"))
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          console.log(errorMessage);
          console.log(errorCode);
        });
    default:
      break;
  }
}

export function logout() {
  signOut(auth);
}

export function useAuth() {
  //Hook to access user auth token
  return useContext(AuthContext);
}

export const AuthProvider = (props) => {
  const [user, loading] = useAuthState(auth);

  return (
    <AuthContext.Provider value={{ currentUser: user }}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
};
