import React from "react";
import img1 from "../components/assets/dataset1.jpg";
// import { singlemodel } from "../dummyData/singleModel";
import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import CreateModel from "./CreateModel";
import Model from "./Model";
import { useAccount } from "wagmi";
import { useLocation } from "react-router-dom";
// import "../styles/signledataset.scss";

function SingleModel(props) {
  // const location = useLocation()
  const { address } = useAccount();

  console.log(props.single);
  const modelData = props.single ? props.single : "";
  const [openModal, setOpenModal] = useState(false);
  const [code, setCode] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [model, setModel] = useState(false);

  const toggleComponent = () => {
    setModel(!model);
  };

  useEffect(() => {
    fetchCSVData();
  }, []);

  const fetchCSVData = async () => {
    try {
      const response = await fetch(
        `https://gateway.lighthouse.storage/ipfs/${modelData.file}`
      );
      const code = await response.text();

      setCode(code);
    } catch (error) {
      console.error("Error fetching Python code:", error);
    }
  };

  const codeText = `#!/usr/bin/env python

import sys
from subprocess import call

BYTES_PER_KB = 1000
UNITS = ['B', 'KB', 'MB', 'GB']

if len(sys.argv) < 4:
    print 'Usage: %s [size] [unit] [path]' % sys.argv[0]
    exit(1)

size = float(sys.argv[1])
unit = sys.argv[2].upper()
filepath = sys.argv[3]

try:
    multiplier = UNITS.index(unit)
except ValueError:
    print """'%s' is an invalid unit. Accepted units: %s""" % (unit, str(UNITS))
    exit(1)

num_bytes = size * pow(BYTES_PER_KB, multiplier)

call(['dd', 'if=/dev/zero', 'of=%s' % filepath, 'bs=%d' % num_bytes, 'count=1'])`;

  return (
    <>
      {model ? (
        <Model />
      ) : (
        <>
          {" "}
          <div className="signledataset-main-div">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                padding: "20px 50px",
                borderBottom: "1px solid white",
                fontFamily: "JosefinSans",
              }}
            >
              <div style={{ width: "50%" }}>
                {" "}
                <h1 className="single-data-title">{modelData.title}</h1>
                <p style={{ fontSize: "20px" }}>
                  {" "}
                  {/* The provided dataset contains information related to CBSE
                    Class-X results */}
                  </p>
                  <div
                    style={{
                      backgroundColor: "#1a74e2",
                      width: "60px",
                      padding: "10px",
                      borderRadius: "10px",
                    }}
                  >
                    {/* {item.access} */}
                  </div>
                </div>
                <div className="single-dataset-flex-sidebar">
                  <div>
                    <button
                      onClick={() => props.isProfile ? props.toggleComponent() : props.profileLinks("allDataset") }
                      className="back-btn"
                    >
                      ⇦
                    </button>
                    <button
                      className="single-data-btn"
                      onClick={() => setOpenModal(true)}
                    >
                      Create Model
                    </button>
                    <CreateModel
                      open={openModal}
                      onClose={() => setOpenModal(false)}
                    />
                    <button className="single-data-btn">Download</button>
                  </div>
                  <div>
                    <img src={`https://gateway.lighthouse.storage/ipfs/${modelData.image}`}
                  className="single-dataset-img"></img>
                  </div>
                </div>{" "}
              </div>
              <div className="single-dataset-flex-content">
                <div
                  style={{
                    width: "55%",
                    fontSize: "20px",
                    lineHeight: "37px",
                    letterSpacing: "1px",
                    fontFamily: "JosefinSans",
                  }}
                  className="single-dataset-desc"
                >
                  {modelData.description}
                </div>
                <div className="single-dataset"></div>
              </div>
              <div style={{ width: "70%", margin: "20px 50px" }}>
                <SyntaxHighlighter language="python" style={solarizedlight}>
                  {code}
                </SyntaxHighlighter>
              </div>
            </div>
         
        </>
      )}{" "}
    </>
  );
}

export default SingleModel;
