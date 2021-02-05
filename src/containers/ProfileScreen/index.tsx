import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { auth } from "../../firebase";
import { NAV_AVATAR } from "../../utils/constants";
import Nav from "../Nav";
import "./styles.css";

const plansList = [
  {
    planName: "Netflx Standard",
    planDescription: "1080p",
    isSubscribed: false,
  },
  {
    planName: "Netflx Basic",
    planDescription: "480p",
    isSubscribed: false,
  },
  {
    planName: "Netflx Premium",
    planDescription: "4K+HDR",
    isSubscribed: true,
  },
];

const ProfileScreen = () => {
  const user = useSelector(selectUser);
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
                {plansList.map((plan) => (
                  <div className="profileScreen__plansList">
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
                    <button
                      className={`profileScreen__planButton ${
                        plan.isSubscribed && "profileScreen__planGrayButton"
                      }`}
                    >
                      {plan.isSubscribed ? "Current Pacakge" : "Subscribe"}
                    </button>
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
