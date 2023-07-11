import React from "react";
import img from "../components/assets/profile.jpg";
import "../styles/profile.scss";
import DashboardNavbar from "./DashboardNavbar";
import dataset from "../components/assets/dataset2.png";
import model from "../components/assets/model2.png";
import download from "../components/assets/down.png";
import { useState, useEffect } from "react";
import AllModel from "./AllModel";
import AllDataset from "./AllDataset";
import SingleDataset from "./SingleDataset";
import SingleModel from "./SingleModel";
import { modelInstance } from "./Contract";
import { useAccount } from "wagmi";
import { ethers } from "ethers";

function Profile({ single, setSingle }) {
  const { address } = useAccount();

  const [allDataset, setAllDataset] = useState(true);
  const [allModel, setAllModel] = useState(false);
  const [singleDataset, setSingleDataset] = useState(false);
  const [singleModel, setSingleModel] = useState(false);

  const [userName, setUserName] = useState();
  const [occupation, setOccupation] = useState();
  const [organization, setOrganization] = useState();
  const [location, setLocation] = useState();
  const [image, setImage] = useState();

  const toggleComponent = () => {
    setSingleDataset(!singleDataset);
    setSingleModel(!singleModel);
  };

  const MainUserData = {
    userName: userName,
    occupation: occupation,
    organization: organization,
    location: location,
    image: image,
  };

  const getUserAccountDetails = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }
        const con = await modelInstance();
        const userData = await con.getUser(address);

        // console.log(userData)
        // console.log(userData[0])
        // console.log(userData[1])
        setUserName(userData[0]);
        setOccupation(userData[1]);
        setOrganization(userData[2]);
        setLocation(userData[3]);
        setImage(userData[4]);
        return userData;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserAccountDetails();
  }, []);

  const profileLinks = (a) => {
    if (a === "allDataset") {
      setAllDataset(true);
      setAllModel(false);
      setSingleModel(false);
      setSingleDataset(false);
    }
    if (a === "allModel") {
      setAllDataset(false);
      setAllModel(true);
      setSingleModel(false);
      setSingleDataset(false);
    }
    if (a === "SingleDataset") {
      setAllDataset(false);
      setAllModel(false);
      setSingleModel(false);
      setSingleDataset(true);
    }
    if (a === "singleModel") {
      setAllDataset(false);
      setAllModel(false);
      setSingleModel(true);
      setSingleDataset(false);
    }
  };
  if (singleDataset) {
    return (
      <>
        <SingleDataset
          single={single}
          profileLinks={profileLinks}
          onClick={() => toggleComponent()}
        />
      </>
    );
  }
  if (singleModel) {
    return (
      <>
        <SingleModel
          single={single}
          profileLinks={profileLinks}
          onClick={() => toggleComponent()}
        />
      </>
    );
  }

  return (
    <>
      <div style={{ margin: "50px 0px" }}>
        <div style={{ margin: "50px, 0px" }}>
          <div className="profile-main">
            <div style={{ margin: "20px 0px" }}>
              <img
                className="p-user"
                src={img}
                alt="Rounded avatar"
                style={{
                  width: "35px",
                  borderRadius: "100px",
                  padding: "10px",
                  backgroundColor: "white",
                }}
              />{" "}
            </div>
            <div style={{ margin: "0px 20px" }}>
              <h3
                style={{
                  textAlign: "center",
                  fontFamily: "JosefinSans",
                  fontWeight: 600,
                  letterSpacing: "2px",
                  textAlign: "start",
                  fontSize: "30px",
                }}
              >
                Welcome, {userName}
              </h3>
              <div
                style={{
                  textAlign: "center",

                  fontWeight: 400,
                  letterSpacing: "1px",
                  textAlign: "start",
                  lineHeight: "30px",
                  fontSize: "20px",
                  lineHeight: "25px",
                }}
              >
                This plateform evaluation and sharing of dataset as well as ML
                Models
              </div>
              <div
                style={{
                  textAlign: "center",

                  fontWeight: 400,
                  letterSpacing: "1px",
                  textAlign: "start",
                  fontSize: "20px",
                  lineHeight: "30px",

                  lineHeight: "25px",
                }}
              >
                Occupation: {occupation}
              </div>
              <div
                style={{
                  textAlign: "center",
                  lineHeight: "30px",

                  fontWeight: 400,
                  letterSpacing: "1px",
                  textAlign: "start",
                  fontSize: "20px",
                  lineHeight: "25px",
                }}
              >
                Organization: {organization}
              </div>
              <div
                style={{
                  textAlign: "center",
                  lineHeight: "30px",

                  fontWeight: 400,
                  letterSpacing: "1.8px",
                  textAlign: "start",
                  fontSize: "20px",
                  lineHeight: "25px",
                }}
              >
                Location: {location}
              </div>
            </div>
          </div>
          <div className="profile-second-section">
            <div className="profile-progress">
              {" "}
              <img
                src={dataset}
                alt="dataset"
                className="dashDataset"
                style={{ width: "30px", padding: "0px 20px", margin: "10px" }}
              />
              <div
                style={{
                  textAlign: "center",
                  fontFamily: "JosefinSans",
                  fontWeight: 500,
                  letterSpacing: "2px",
                  textAlign: "start",
                  fontSize: "17px",
                }}
              >
                {" "}
                Dataset
              </div>
              <div style={{ textAlign: "center" }}>20</div>
            </div>
            <div className="profile-progress">
              {" "}
              <img
                src={model}
                alt="model"
                className="dashModel"
                style={{ width: "30px", padding: "0px 20px", margin: "10px" }}
              />
              <div
                style={{
                  textAlign: "center",
                  fontFamily: "JosefinSans",
                  fontWeight: 400,
                  letterSpacing: "2px",
                  textAlign: "start",
                  fontSize: "17px",
                }}
              >
                Model
              </div>
              <div style={{ textAlign: "center" }}>10</div>
            </div>
            <div className="profile-progress">
              <img
                src={download}
                alt="model"
                className="dashModel"
                style={{ width: "30px", padding: "0px 20px", margin: "10px" }}
              />
              <div
                style={{
                  textAlign: "center",
                  fontFamily: "JosefinSans",
                  fontWeight: 400,
                  letterSpacing: "2px",
                  textAlign: "start",
                  fontSize: "17px",
                }}
              >
                {" "}
                Model Downloads
              </div>{" "}
              <div style={{ textAlign: "center" }}>10</div>
            </div>
            <div className="profile-progress">
              <img
                src={download}
                alt="model"
                className="dashModel"
                style={{ width: "30px", padding: "0px 20px", margin: "10px" }}
              />
              <div
                style={{
                  textAlign: "center",
                  fontFamily: "JosefinSans",
                  fontWeight: 500,
                  letterSpacing: "2px",
                  textAlign: "start",
                  fontSize: "17px",
                }}
              >
                {" "}
                Dataset Downloads
              </div>{" "}
              <div style={{ textAlign: "center" }}>10</div>
            </div>
          </div>
          <div className="profile-third-section">
            <button
              style={{ marginRight: "30px", border: "none" }}
              className={allDataset ? "active" : "tag-btn"}
              onClick={() => {
                profileLinks("allDataset");
              }}
            >
              All Datasets
            </button>

            <button
              style={{ marginRight: "30px", border: "none" }}
              className={allModel ? "active" : "tag-btn"}
              onClick={() => {
                profileLinks("allModel");
              }}
              id="tag-btn"
            >
              All Models
            </button>
            <button
              style={{ marginRight: "30px", border: "none" }}
              className="tag-btn"
            >
              Model Downloads
            </button>
            <button
              style={{ marginRight: "30px", border: "none" }}
              className="tag-btn"
            >
              Dataset Downloads
            </button>
          </div>
        </div>
        {allDataset ? (
          <>
            <AllDataset profileLinks={profileLinks} setSingle={setSingle} />
          </>
        ) : allModel ? (
          <>
            <AllModel
              profileLinks={profileLinks}
              setSingle={setSingle}
            ></AllModel>
          </>
        ) : null}
      </div>
    </>
  );
}
export default Profile;
