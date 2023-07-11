import React from "react";
import "../styles/singledataset.scss";
import { singledataset } from "../dummyData/singledataset";
import csvdata from "../dummyData/data.csv";
import { useEffect } from "react";
import { useState } from "react";
import CreateDataset from "./CreateDataset";
import Dataset from "./Dataset";

function SingleDataset(props) {
  const [csvData, setCSVData] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openDataset, setOpenDataset] = useState(false);

  console.log(props.single);
  const dataSetData = props.single ? props.single : "";
  // setCsvRows(dataSetData);
  console.log("Single dataset ", dataSetData);

  const toggleComponent = () => {
    setOpenDataset(!openDataset);
  };

  useEffect(() => {
    fetchCSVData();
  }, []);

  const fetchCSVData = async () => {
    try {
      const response = await fetch(
        `https://gateway.lighthouse.storage/ipfs/${dataSetData.uploadFile}`
      );
      const data = await response.text();

      // Parse CSV data
      const rows = data.split("\n");
      const headers = rows[0].split(",").map((header) => header.trim());
      const parsedData = rows
        .slice(1)
        .filter((row) => row.trim() !== "") // Filter out empty rows
        .map((row) => {
          const values = row.split(",").map((value) => value.trim());
          const rowData = {};
          headers.forEach((header, index) => {
            rowData[header] = values[index];
          });
          return rowData;
        });

      setTableHeaders(headers);
      setTableRows(parsedData);
      setCSVData(parsedData);
    } catch (error) {
      console.error("Error fetching CSV file:", error);
    }
  };

  return (
    <>
      {openDataset ? (
        <Dataset />
      ) : (
        <>
          
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
                <div
                  style={{
                    width: "50%",
                  }}
                >
                  {" "}
                  <h1 className="single-data-title" >
                    {dataSetData?.title}
                  </h1>
                  <p style={{ fontSize: "20px" }}>
                    {" "}
                    {/* {dataSetData.description} */}
                  </p>
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
                      Create Dataset
                    </button>{" "}
                    <CreateDataset
                      open={openModal}
                      onClose={() => setOpenModal(false)}
                    />
                    <button className="single-data-btn">Download</button>
                  </div>
                  <div>
                    <img
                      src={`https://gateway.lighthouse.storage/ipfs/${dataSetData.image}`}
                      className="single-dataset-img"
                    ></img>
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
                  {dataSetData.description}
                </div>
                <div className="single-dataset">
                  <div>
                    <lable
                      style={{
                        fontWeight: "700",
                        fontSize: "20px",
                        lineHeight: "30px",
                        fontFamily: "JosefinSans",
                      }}
                    >
                      Categories :
                    </lable>
                    <div
                      style={{
                        fontWeight: "400",
                        fontSize: "17px",
                        lineHeight: "30px",
                        fontFamily: "JosefinSans",
                      }}
                    >
                      {dataSetData.categories}
                    </div>
                  </div>
                 
                 
                </div>
              </div>{" "}
              {/* <pre>{csvRows}</pre> */}
              {tableRows.length > 0 && (
        <div className="container">
        <div className="scrollable-container">
          <table>
            <thead>
              <tr>
                {tableHeaders.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, index) => (
                <tr key={index}>
                  {tableHeaders.map((header, index) => (
                    <td key={index}>{row[header]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      )}
            </div>
          
        </>
      )}
    </>
  );
}

export default SingleDataset;
