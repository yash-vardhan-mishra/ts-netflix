import React, { MouseEvent, useRef } from "react";
import { auth } from "../../firebase";
import "./styles.css";

const SignupScreen = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const register = (e: MouseEvent<HTMLElement>) => {
    // button inside form sometimes refresh and to prevent it we use the statement below
    console.log("in here");

    e.preventDefault();
    if (emailRef.current && passwordRef.current) {
      auth
        .createUserWithEmailAndPassword(
          emailRef.current.value,
          passwordRef.current.value
        )
        .then((authUser) => console.log(authUser))
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const signIn = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (emailRef.current && passwordRef.current) {
      auth
        .signInWithEmailAndPassword(
          emailRef.current.value,
          passwordRef.current.value
        )
        .then((authUser) => console.log(authUser))
        .catch((err) => alert(err));
    }
  };

  return (
    <div className="signupScreen">
      <form action="">
        <h1>Sign In</h1>
        <input ref={emailRef} type="text" placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button type="submit" onClick={signIn}>
          Sign In
        </button>
        <h4>
          <span className="signupScreen__gray"> New to Netflix? </span>
          <span onClick={register} className="signupScreen__link">
            Sign Up now.
          </span>
        </h4>
      </form>
    </div>
  );
};

export default SignupScreen;
