import "../styles/landing.scss";
import bg1 from "../components/assets/ml.png";
import bg2 from "../components/assets/homeImg.png";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import shape from "../components/assets/banner-shape2.png";
import Navbar from "./Navbar";
import wallete from "../components/assets/bitcoin.png";
import started from "../components/assets/launch.png";
import dash from "../components/assets/browser.png";
import dataset from "../components/assets/dataset.png";
import model from "../components/assets/model.png";
import compute from "../components/assets/computeImg.png";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";

import Sponcer from "../components/Sponcer";
import { ethers } from "ethers";
import { modelInstance } from "../components/Contract";

import { useAccount } from "wagmi";

function Landing() {
  const navigate = useNavigate();
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();
  const walletAddress = address;
  console.log(walletAddress);

  const verifyUserAccount = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }
        const con = await modelInstance();
        const verifyTx = await con.isRegisteredMapping(address);
        // result = verifyTx
        console.log(verifyTx);
        // console.log(con);
        return verifyTx;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const SignupWithWallet = async () => {
    if (address) {
      const test = await verifyUserAccount();
      console.log(test);
      if (test) {
        navigate("/dashboard");
        window.location.reload();
      } else {
        navigate("/register");
      }
    } else {
      openConnectModal();
    }
  };

  const dashboard = () => {
    navigate("/dashboard");
  };
  const register = () => {
    navigate("/register");
  };
  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: "white" }}>
        <div className="hero">
          <div className="hero-left">
            <h1 className="hero-p">Welcome to </h1>
            <h1 className="hero-h1">De-datacollabria</h1>
            <p className="hero-p">
              The platform aims to ensure fairness, transparency, and
              trustworthiness in the evaluation and sharing of datasets as well
              as ML Models.
            </p>
            <div style={{ display: "flex" }}>
              <div className="hero-left-buttons">
                <button
                  className="hero-btn-1"
                  onClick={() => SignupWithWallet()}
                >
                  Get Started
                </button>
              </div>
              {/* <div className="hero-left-buttons">
                <button className="hero-btn-1" onClick={() => register()}>
                  Register
                </button>
              </div> */}
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-right-inside">
              <img className="hero-right-bg1" src={bg1} alt="backgroundimage" />
            </div>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <img
            src={shape}
            style={{
              width: "100%",
              position: "absolute",
              zIndex: "1",
              bottom: "-5px",
            }}
          ></img>
        </div>
        {/* <div
        className="section2"
        style={{
          widows: "100%",
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div className="section2-title">
          <p className="section2-text">Check out our wide range of services</p>
        </div>
        <div>
          <div className="grid-container">
            <div className="grid-item">
              <img src={discuss} style={{ width: "400px" }}></img>
              <p className="grid-item-text">Discussion Forum</p>
            </div>
            <div className="grid-item">
              <img src={report} style={{ width: "400px" }}></img>
              <p className="grid-item-text">Reporting Mechanism</p>
            </div>
            <div className="grid-item">
              <img src={certi} style={{ width: "400px" }}></img>
              <p className="grid-item-text">Model Certification and Badges</p>
            </div>
          </div>
        </div>
      </div> */}

        <div className="section3">
          <div style={{margin:"30px"}}>
            <p className="section3-right-title">
              Detailed Guide on How the System
            </p>
            <p className="section3-right-title">Works and Operates</p>
          </div>

          <div className="section3-right-content">
            <div style={{ width: "30%", margin: "20px" }}>
              <div className="section3-card">
                <div>
                  {" "}
                  <img
                    src={wallete}
                    style={{ width: "50px", margin: "10px" }}
                  ></img>
                </div>

                <b className="card-title">Connect your wallet:</b>
                <p className="card-dec">
                  Connecting your wallet is the first step to using our Platform
                </p>
              </div>
              <div className="section3-card">
                <img src={started} style={{ width: "50px" }}></img>{" "}
                <b className="card-title">Get Started:</b>
                <p className="card-dec">
                  Click on the 'Get Started' button to be redirected to the
                  sign-up page.
                </p>
              </div>
              <div className="section3-card">
                <img src={dash} style={{ width: "50px", margin: "10px" }}></img>{" "}
                <b className="card-title">User Dashboard:</b>
                <p className="card-dec">
                  The User Dashboard displays your profile information,
                  datasets, models, and other important details.
                </p>
              </div>
            </div>
            <div
              className="section3-left-inside"
              style={{ width: "40%", textAlign: "center" }}
            >
              <img
                className="section3-left-bg2"
                src={bg2}
                alt="backgroundimage"
                style={{}}
              />
            </div>
            <div style={{ width: "30%", margin: "20px" }}>
              <div className="section3-card">
                <img
                  src={dataset}
                  style={{ width: "50px", margin: "10px" }}
                ></img>{" "}
                <b className="card-title">Create Dataset:</b>
                <p className="card-dec">
                  To create a dataset, upload a file from your local device in
                  the required format. Fill in all the necessary details and
                  click the submit button.
                </p>
              </div>
              <div className="section3-card">
                <img
                  src={model}
                  style={{ width: "50px", margin: "10px" }}
                ></img>{" "}
                <b className="card-title">Create Model:</b>
                <p className="card-dec">
                  To create a model, you can either write code directly in the
                  integrated development environment (IDE) or import code from
                  your local device. Fill in all the required information and
                  click the submit button.
                </p>
              </div>
              <div className="section3-card">
                <img
                  src={compute}
                  style={{ width: "50px", margin: "10px" }}
                ></img>{" "}
                <b className="card-title">Decentralized Compute:</b>
                <p className="card-dec">
                  To create a model, you can either write code directly in the
                  integrated development environment (IDE) or import code from
                  your local device. Fill in all the required information and
                  click the submit button.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Sponcer></Sponcer>
        <footer id="footer">
          <div className="copyright">
            <p>
              {" "}
              Copyright © 2023, Created by <span>De-DataCollabria</span>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Landing;
