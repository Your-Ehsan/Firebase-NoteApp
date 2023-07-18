import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase/initializeApp";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

function Login() {
  const navigateTo = useNavigate();
  const SignInGoogle = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);

        setDoc(
          doc(db, "data", result.user.email),
          {
            name: result.user.displayName,
            email: result.user.email,
            id: result.user.uid,
            photoURL: result.user.photoURL,
          },
          { merge: true }
        );

        console.log(result);
      })
      .catch((error) => {
        console.log(error);
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential);
      })
      .finally(() => navigateTo("/"));
  };
  return (
    <section className="w-screen h-screen flex justify-center items-center">
      <div>
        <button onClick={() => SignInGoogle()} className="btn btn-wide">
          Sign in with Google
        </button>
      </div>
    </section>
  );
}

export default Login;