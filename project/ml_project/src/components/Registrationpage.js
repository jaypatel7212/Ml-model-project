import React, { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";
import Navbar from "../pages/Navbar";
import upload from "../components/assets/upload.png";
import { modelInstance } from "./Contract";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Registrationpage() {
  const [file, setFile] = useState(null);
  const [btnloading, setbtnloading] = useState(false);
  const [showInputField, setShowInputField] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    file: null,
    name: null,
    occupation: null,
    organization: null,
    location: null,
  });

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  const uploadImage = async () => {
    try {
      console.log("in upload image function");

      const file = userData.file; // Access the file from the array
      const output = await lighthouse.upload(
        [file],
        "ee42a13a.3117f0d2e3bc4e73bb459ea3612a2471",
        progressCallback
      );
      console.log("File Status:", output);

      return output;
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const createUserAccount = async () => {
    toast.info("Process is in Progress", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setbtnloading(true);
    try {
      console.log("in create account function");
      const output = await uploadImage();
      const cids = output.data.Hash;
      console.log("cids: ", cids);

      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }
        const con = await modelInstance();
        console.log("Hello");
        const tx = await con.setUser(
          userData.name,
          userData.occupation,
          userData.organization,
          userData.location,
          cids
        );

        console.log(tx);
        await tx.wait();
        setbtnloading(false);
        navigate("/dashboard");
        window.location.reload();
        console.log(con);
      }
    } catch (error) {
      console.log(error);
      setbtnloading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-main-div">
        <h1 className="form-title">Register</h1>
        <div className="register-sub-div">
          <div className="form-file">
            <div style={{ width: "50px", margin: "0 auto" }}>
              {file && (
                <img
                  src={URL.createObjectURL(file)}
                  alt=""
                  style={{ width: "50px" }}
                />
              )}
            </div>
            <div
              className="file-input-container"
              style={{ width: "40%", margin: "15px auto", padding: "0px" }}
            >
              <div
                onClick={() => fileInputRef.current.click()}
                style={{
                  cursor: "pointer",
                  backgroundColor: "lightgray",
                  color: "black",
                  padding: "10px",
                }}
              >
                {file ? (
                  <span>{file.name}</span>
                ) : (
                  <span> Choose profile </span>
                )}
                <input
                  type="file"
                  hidden
                  ref={fileInputRef}
                  name="New File Name"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    setUserData({ ...userData, file: e.target.files[0] });
                  }}
                  accept=".jpg,.jpeg,.png,.pdf" // Optional: Set accepted file extensions
                  style={{
                    fontFamily: "JosefinSans",
                    fontSize: "13px",
                    color: "black",
                  }}
                />
              </div>
            </div>
          </div>

          <label className="form-flexlable">
            Name:
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={(e) => {
                setUserData({ ...userData, name: e.target.value });
              }}
              className="form-inputLable"
            />
          </label>
          <label className="form-flexlable">
            Occupation:
            <input
              type="text"
              name="occupation"
              value={userData.occupation}
              onChange={(e) => {
                setUserData({ ...userData, occupation: e.target.value });
              }}
              className="form-inputLable"
            />
          </label>
          <label className="form-flexlable">
            Organization:
            <input
              type="text"
              name="organization"
              value={userData.organization}
              onChange={(e) => {
                setUserData({ ...userData, organization: e.target.value });
              }}
              className="form-inputLable"
            />
          </label>
          <label className="form-flexlable">
            Location:
            <input
              type="text"
              name="location"
              value={userData.location}
              onChange={(e) => {
                setUserData({ ...userData, location: e.target.value });
              }}
              className="form-inputLable"
            />
          </label>
          <div className="form-button">
            <button
              type="submit"
              className="form-btn"
              onClick={createUserAccount}
              disabled={btnloading}
            >
              {" "}
              {btnloading ? (
                <svg
                  className="animate-spin button-spin-svg-pic"
                  version="1.1"
                  id="L9"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 100 100"
                >
                  <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"></path>
                </svg>
              ) : (
                <>Register</>
              )}
            </button>{" "}
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
}

export default Registrationpage;
