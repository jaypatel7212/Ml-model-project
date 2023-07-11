import React from "react";
import "../styles/dashboard.scss";
import { Link } from "react-router-dom";
import Menu from "../components/assets/menu2.png";
import dataset from "../components/assets/dataset2.png";
import model from "../components/assets/model2.png";
import code from "../components/assets/code2.png";
import plus from "../components/assets/plus.png";
import Profile from "../components/Profile";
import Dataset from "../components/Dataset";
import Model from "../components/Model";
import Code from "../components/Code";
import CreateDataset from "../components/CreateDataset";
import CreateModel from "../components/CreateModel";
import DashboardNavbar from "../components/DashboardNavbar";
import { useState, useEffect, useRef } from "react";
import Compute1 from "../components/Compute1";
import modelimg from "../components/assets/model.png";
import logo from "../components/assets/logo.png";
import home from "../components/assets/home.png";
import datasetimg from "../components/assets/dataset.png";
import computeimg from "../components/assets/computeImg.png";

function Dashboard() {
  const [openModal, setOpenModal] = useState(false);
  const [openModal1, setOpenModal1] = useState(false);
  const [showItem, setShowItem] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [addDataset, setAddDataset] = useState(false);
  const [addModel, setAddModel] = useState(false);
  const [addCode, setAddCode] = useState(false);
  const [addCompute, setAddCompute] = useState(false);
  const [addHome, setAddHome] = useState(true);
  const [singleDataSet, setSingleDataSet] = useState(false);
  const [singleModelData, setSingleModelData] = useState(false);

  const [openProfile, setOpenProfile] = useState(false);

  const [single, setSingle] = useState()

  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowItem(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const showItems = () => {
    setShowItem(!showItem);
  };

  const closeSidebar = () => {
    setIsActive(!isActive);
  };

  const dashboardLinks = (a) => {
    if (a === "addHome") {
      setAddHome(true);
      setAddCompute(false);
      setAddDataset(false);
      setAddModel(false);
      setAddCode(false);
      setSingleDataSet(false);
      setSingleModelData(false);
    }
    if (a === "addCompute") {
      setAddCompute(true);
      setAddHome(false);
      setAddDataset(false);
      setAddModel(false);
      setAddCode(false);
      setSingleDataSet(false);
      setSingleModelData(false);

    }
    if (a === "addDataset") {
      setAddHome(false);
      setAddCompute(false);
      setAddDataset(true);
      setAddModel(false);
      setSingleDataSet(false);
      setSingleModelData(false);
      setAddCode(false);
    }
    if (a === "addModel") {
      setAddHome(false);
      setAddModel(true);
      setAddDataset(false);
      setAddCode(false);
      setAddCompute(false);
      setSingleDataSet(false);
      setSingleModelData(false);
    }
    if (a === "addCode") {
      setAddHome(false);
      setAddCompute(false);
      setAddCode(true);
      setAddDataset(false);
      setAddModel(false);
      setSingleDataSet(false);
      setSingleModelData(false);
    }
    if (a === "singleDataSet") {
      setAddHome(false);
      setAddCompute(false);
      setAddCode(false);
      setAddDataset(false);
      setAddModel(false);
      setSingleDataSet(true);
      setSingleModelData(false);
    }
    if (a === "singleModelData") {
      setAddHome(false);
      setAddCompute(false);
      setAddCode(false);
      setAddDataset(false);
      setAddModel(false);
      setSingleDataSet(false);
      setSingleModelData(true);
    }
  };

  return (
    <>
      <div className="dashboard-main">
        <div className="left-db">
          <div
            className="dashLogo-flex"
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "flex-start",
              margin: "50px 0px",
            }}
          >
            <img
              src={Menu}
              alt="menu"
              className={isActive ? "active" : ""}
              onClick={() => {
                showItems();
                closeSidebar();
              }}
              style={{ width: "30px", padding: "0px 20px" }}
            />
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                className="dashLogo"
                style={{ width: "150px" }}
              />
            </Link>
          </div>
          <div style={{ width: "100%",marginTop:"30px " }} ref={containerRef}>
            <button className="create-button-dashboard">
              <img
                src={plus}
                alt="plus"
                className="dashPlus"
                onClick={showItems}
                style={{
                  width: "30px",
                  padding: "0px 20px",
                }}
              />{" "}
              <div style={{ fontSize: "1.1rem", fontWeight: "500",borderStartEndRadius:"10px" }}>
                Create
              </div>
            </button>
            {showItem && (
              <ul
                style={{
                  margin: "10px 0px",
                  position: "absolute",
                  padding: "20px 0px",
                  width: "250px",
                  backgroundColor: " hsl(39deg, 100%, 68%)",
                }}
              >
                <li style={{ margin: "0px", color: "black" }}>
                  <img
                    src={datasetimg}
                    alt="dataset"
                    className="dashDataset"
                    style={{ width: "30px", padding: "0px 20px" }}
                  />
                  <div onClick={() => setOpenModal(true)}> Create Dataset</div>
                </li>
                <CreateDataset
                  open={openModal}
                  onClose={() => setOpenModal(false)}
                />
                <li style={{ margin: "0px", color: "black" }}>
                  <img
                    src={modelimg}
                    alt="model"
                    className="dashModel"
                    style={{ width: "30px", padding: "0px 20px" }}
                  />
                  <div onClick={() => setOpenModal1(true)}> Create Model</div>
                </li>{" "}
                <CreateModel
                  open={openModal1}
                  onClose={() => setOpenModal1(false)}
                />
              </ul>
            )}
          </div>

          <ul>
            <>
              <li
                className={addHome ? "active" : ""}
                onClick={() => {
                  dashboardLinks("addHome");
                }}
              >
                <img
                  src={home}
                  alt="dataset"
                  className="dashDataset"
                  style={{ width: "30px", padding: "0px 20px" }}
                />
                <div> Home</div>
              </li>
              <li
                className={addDataset ? "active" : ""}
                onClick={() => {
                  dashboardLinks("addDataset");
                }}
              >
                <img
                  src={dataset}
                  alt="dataset"
                  className="dashDataset"
                  style={{ width: "30px", padding: "0px 20px" }}
                />
                <div> Dataset</div>
              </li>
              <li
                className={addModel ? "active" : ""}
                onClick={() => {
                  dashboardLinks("addModel");
                }}
              >
                <img
                  src={model}
                  alt="model"
                  className="dashModel"
                  style={{ width: "30px", padding: "0px 20px" }}
                />
                <div>Model</div>
              </li>
              <li
                className={addCode ? "active" : ""}
                onClick={() => {
                  dashboardLinks("addCode");
                }}
              >
                <img
                  src={code}
                  alt="code"
                  className="dashCode"
                  style={{ width: "30px", padding: "0px 20px" }}
                />
                <div>Code</div>
              </li>
              <li
                className={addCompute ? "active" : ""}
                onClick={() => {
                  dashboardLinks("addCompute");
                }}
              >
                <img
                  src={computeimg}
                  alt="code"
                  className="dashCode"
                  style={{ width: "30px", padding: "0px 20px" }}
                />
                <div>Decentralized Compute</div>
              </li>
            </>
          </ul>
        </div>
        <div className="right-db">
          <div>
            <DashboardNavbar dashboardLinks={dashboardLinks} />

            {addHome ? (
              <>
                <Profile single={single} setSingle={setSingle}></Profile>
              </>
            ) : addDataset ? (
              <>
                <Dataset setSingle={setSingle} dashboardLinks={dashboardLinks} single={single}></Dataset>
              </>
            ) : addModel ? (
              <>
                <Model setSingle={setSingle} dashboardLinks={dashboardLinks} single={single}></Model>
              </>
            ) : addCode ? (
              <>
                <Code></Code>
              </>
            ) : addCompute ? (
              <>
                <Compute1></Compute1>
              </>
            ) : openProfile ? (
              <Profile dashboardLinks={dashboardLinks} />
            ) : singleDataSet ? <singleDataset />: singleModelData ? <singleModelData/> : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
