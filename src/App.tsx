import React, { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomeScreen from "./containers/HomeScreen";
import LoginScreen from "./containers/LoginScreen";
import { auth } from "./firebase";
import { login, logout, selectUser } from "./features/userSlice";
import { isObjectValid } from "./utils/helperFunctions";
import ProfileScreen from "./containers/ProfileScreen";
import PaymentScreen from "./containers/PaymentScreen";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  console.log("the user in redux is, ", user);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
        <Router>
          {isObjectValid(user) ? (
            <Switch>
              <Route exact path="/profile">
                <ProfileScreen />
              </Route>
              <Route exact path="/payment">
                <PaymentScreen />
              </Route>
              <Route exact path="/">
                <HomeScreen />
              </Route>
            </Switch>
          ) : (
            <LoginScreen />
          )}
        </Router>
    </div>
  );
}

export default App;
