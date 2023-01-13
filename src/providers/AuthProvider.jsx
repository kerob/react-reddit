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

export function register(type, email, password) {
  switch (type) {
    case "email":
      createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          updateProfile(user, { displayName: "testguy" }).then(
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
      signInWithEmailAndPassword(auth, email, password);
      console.log("sign in email");
    default:
      break;
  }
}

export function logout() {
  signOut(auth);
}

export function useAuth() {
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
