import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import StripeCheckout, { Token } from "react-stripe-checkout";
import firebase from "firebase";
import { selectUser } from "../../features/userSlice";
import { auth } from "../../firebase";
import { NAV_AVATAR } from "../../utils/constants";
import Nav from "../Nav";
import "./styles.css";

const plansList = [
  {
    planName: "Netflx Standard",
    planDescription: "1080p",
    stripePlanName: "Standard Plan",
    price: 649,
    isSubscribed: false,
  },
  {
    planName: "Netflx Basic",
    planDescription: "480p",
    stripePlanName: "Basic Plan",
    price: 499,
    isSubscribed: false,
  },
  {
    planName: "Netflx Premium",
    stripePlanName: "Premium Plan",
    planDescription: "4K+HDR",
    price: 799,
    isSubscribed: false,
  },
];

const makePayment = (token: Token, name: string, price: number) => {
  const body = {
    token,
    product: {
      name,
      price,
    },
  };
  return axios
    .post(`https://netflix-stripe-backend.herokuapp.com/payment`, body)
    .then((res) => console.log("success", res.config))
    .catch((err) => console.log("error", err));
};

const ProfileScreen = () => {
  const history = useHistory();
  const user = useSelector(selectUser);
  // useEffect(() => {
  //   const getUsers = async () => {
  //     try {
  //       const data = await firebase.database().ref("users").get();
  //       console.log("users data is,", data);
  //     } catch (error) {}
  //   };
  //   getUsers();
  // }, []);
  const [currentPlan, setCurrentPlan] = useState<string>("Netflx Premium");
  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen__body">
        <h1>Edit Profile</h1>
        <div className="profileScreen__info">
          <img src={NAV_AVATAR} alt="" />
          <div className="profileScreen__details">
            <h2>{user.email}</h2>
            <div className="profileScreen__plans">
              <h3>Plans(Current Plan: {currentPlan})</h3>
              <div>
                {plansList.map((plan, i) => (
                  <div key={i} className="profileScreen__plansList">
                    <div
                      className={` ${
                        plan.isSubscribed
                          ? "profileScreen__planDescriptionGray"
                          : "profileScreen__planDescription"
                      } `}
                    >
                      <h6>{plan.planName}</h6>
                      <h6>{plan.planDescription}</h6>
                    </div>
                    <StripeCheckout
                      stripeKey="pk_test_51IHZgIB48UCtFGWixiGSZTcSX43B6L3ogkugloGtaUGRYIyJBqEAz3toe9hXsNVAJK7mgfQFSwTKS2cT5gujEzmA00xhCW410E"
                      name={plan.stripePlanName}
                      amount={plan.price * 100}
                      currency="inr"
                      token={(token) =>
                        makePayment(token, plan.planName, plan.price)
                      }
                      shippingAddress
                    >
                      <button
                        // onClick={() => history.push("/payment", {})}
                        disabled={plan.isSubscribed}
                        className={`profileScreen__planButton ${
                          plan.isSubscribed && "profileScreen__planGrayButton"
                        }`}
                      >
                        {plan.isSubscribed ? "Current Pacakge" : "Subscribe"}
                      </button>
                    </StripeCheckout>
                  </div>
                ))}
              </div>
              <button
                onClick={() => auth.signOut()}
                className="profileScreen__signOut"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
