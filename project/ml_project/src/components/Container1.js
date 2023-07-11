import React from "react";
import "../styles/singledataset.scss";
import { useState } from "react";
import Compute1 from "./Compute1";
import "../styles/popup.scss";
import axios from "axios";
import img1 from "../components/assets/dataset1.jpg";

function Container1() {
  const [openCompute, setOpenCompute] = useState(false);
  const [btnloading, setbtnloading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [modelUrls, setModelUrls] = useState([]);
  const [notebookUrl, setNotebookUrl] = useState("");
  const [datasetUrls, setDatasetUrls] = useState([]);
  const [datasetUrl, setDatasetUrl] = useState("");
  const [fields, setFields] = useState([""]); // Array to store the form field values
  const [jobId, setJobId] = useState("");
  const [cid, setCid] = useState("");

  // const togglePopup = () => {
  //   setIsVisible(isVisible);
  // };

  const toggleComponent = () => {
    setOpenCompute(!openCompute);
  };
  const handleAddDatasetUrl = () => {
    setDatasetUrls([...datasetUrls, datasetUrl]);
    setDatasetUrl("");
  };
  const handleAddModelUrl = () => {
    setModelUrls([...modelUrls, notebookUrl]);
    setNotebookUrl("");
  };
  const handleRemoveModelUrl = (index) => {
    const updatedModelUrls = [...modelUrls];
    updatedModelUrls.splice(index, 1);
    setModelUrls(updatedModelUrls);
  };
  const handleRemoveDatasetUrl = (index) => {
    const updatedDatasetUrls = [...datasetUrls];
    updatedDatasetUrls.splice(index, 1);
    setDatasetUrls(updatedDatasetUrls);
  };

  const handleExecute = () => {
    setbtnloading(true);
    const apiUrl = "http://localhost:5000/execute/container1";
    const requestData = {
      notebookUrl: notebookUrl,
      inputs: datasetUrls.map((url) => ({ url: url })),
    };

    axios
      .post(apiUrl, requestData)
      .then((response) => {
        const { jobId, cid } = response.data;
        setJobId(jobId);
        setCid(cid);
        console.log(response.data);
        setIsVisible(!isVisible);
        setbtnloading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setbtnloading(false);
      });
  };

  return (
    <>
      {openCompute ? (
        <Compute1 />
      ) : (
        <>
          <div className="signledataset-main-div">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                padding: "20px 50px",
                borderBottom: "1px solid black",
              }}
            >
              <div style={{ width: "50%" }}>
                {" "}
                <h1 className="single-data-title">Training</h1>
                <p
                  style={{
                    textAlign: "justify",
                    fontSize: "20px",
                    lineHeight: "27px",
                    letterSpacing: "1px",
                    fontFamily: "JosefinSans",
                  }}
                >
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
              <div className="single-dataset-flex-sidebar">
                <div>
                  <button
                    onClick={() => toggleComponent()}
                    className="back-btn"
                  >
                    ⇦
                  </button>
                </div>
                <div>
                  <img src={img1} className="single-dataset-img"></img>
                </div>
              </div>{" "}
            </div>
            <div style={{ padding: "20px 50px" }}>
              <h3
                style={{
                  margin: "0",
                  letterSpacing: "1px",
                  fontFamily: "JosefinSans",
                  fontSize: "20px",
                }}
                className="dataset-content"
              >
                Compute Your Model
              </h3>{" "}
              <div style={{ padding: "20px 0px" }}>
                {" "}
                <div>
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: "650",
                      padding: "10px 0px",
                    }}
                  >
                    Enter DataSet URLs:
                  </div>
                  <input
                    type="text"
                    value={datasetUrl}
                    onChange={(e) => setDatasetUrl(e.target.value)}
                    placeholder="Enter dataset URL"
                    style={{ padding: "10px" }}
                  />
                  <button
                    onClick={handleAddDatasetUrl}
                    style={{
                      margin: "0px 20px",
                      padding: "10px",
                      width: "100px",
                      backgroundColor: "#f7d060",
                      border: "none",
                      borderRadius: "10px",
                    }}
                  >
                    Add
                  </button>
                  <div>
                    <h4>DataSet URLs:</h4>
                    {datasetUrls.map((url, index) => (
                      <div
                        key={index}
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          width: "500px",
                          padding: "10px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          {url}

                          <button onClick={() => handleRemoveDatasetUrl(index)}>
                            X
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: "650",
                      padding: "10px 0px",
                    }}
                  >
                    Enter Model Link
                  </div>
                  <input
                    type="text"
                    value={notebookUrl}
                    onChange={(e) => setNotebookUrl(e.target.value)}
                    placeholder="Enter Model Link"
                    style={{ padding: "10px" }}
                  />
                  {/* <button
                      onClick={handleAddModelUrl}
                      style={{
                        margin: "0px 20px",
                        padding: "10px",
                        width: "100px",
                        backgroundColor: "#1a74e2",
                        border: "none",
                        borderRadius: "10px",
                      }}
                    >
                      Add{" "}
                    </button>
                    <div>
                      <h4> Model Link</h4>
                      {modelUrls.map((url, index) => (
                        <div
                          key={index}
                          style={{
                            backgroundColor: "white",
                            color: "black",
                            width: "500px",
                            padding: "10px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            {url}{" "}
                            <button onClick={() => handleRemoveModelUrl(index)}>
                              X
                            </button>
                          </div>
                        </div>
                      ))}
                    </div> */}
                </div>
              </div>
              <button
                className="single-data-btn"
                style={{ margin: "0px" }}
                // onClick={togglePopup}
                onClick={handleExecute}
              >
                {btnloading ? (
                  <svg
                    className="animate-spin button-spin-svg-pic"
                    version="1.1"
                    id="L9"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 100 100"
                    style={{ fill: "#fff" }}
                  >
                    <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"></path>
                  </svg>
                ) : (
                  <> Compute</>
                )}
              </button>{" "}
              <h3>JOBID: {jobId}</h3>
              <h3>CID: {jobId}</h3>
              {/* {isVisible && (
                  <div className="popup">
                    <button className="close-button" onClick={togglePopup}>
                      X
                    </button>
                    <div className="popup-content">
                    <h3>JOBID: {jobId}</h3>
                    <h3>CID: {jobId}</h3>
                    </div>
                  </div>
                )} */}
            </div>{" "}
          </div>
        </>
      )}
    </>
  );
}

export default Container1;
