import React from "react";
import { data } from "../dummyData/dataset";
import { useState, useEffect } from "react";
import { modelInstance } from "./Contract";
import { ethers } from "ethers";
import "../styles/profile.scss";
import data3 from "../components/assets/dataset4.jpg"

import "react-toastify/dist/ReactToastify.css";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";

function AllDataset(props) {
  const navigate = useNavigate();
  const { address } = useAccount();
  const [allDataSet, setAllDataSet] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }
        const con = await modelInstance();
        console.log("get data function");
        const dataSet = await con.getAllDataSetOfUser(address);

        setAllDataSet(dataSet);
        setLoading(false);
        console.log(dataSet);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    async function fetchModels() {
      await getData();
    }
    console.log("hello");
    fetchModels();
  }, []);

  return (
    <div className="main-dataset-grid-profile">
      {loading ? (
        <div className="loader-container">
          <div className="loader-spinner"></div>
        </div>
      ) : (
        <>
          {" "}
      {allDataSet.map((item, index) => (
        <div key={index}>
          <div
            style={{ width: "100%",backgroundColor:"black",borderRadius:"20px",boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25);"}}
          >
            <img
              src={`https://gateway.lighthouse.storage/ipfs/${item.image}`}
              alt={`Image ${index}`}
              className="dataset-image"
            />
            <div className="alldataset-grid">
              <h4 key={index}>{item.name}</h4>
              <div key={index}>
                <p className="dataset-dec">{item.title}</p>
              </div>
              <div key={index}>
                <p className="dataset-dec">{item.description}</p>
              </div>
              <button
                className="dataset-viewmore"
                onClick={() => {
                  props.setSingle(allDataSet[index]);
                  props.profileLinks("SingleDataset");
                }}
              >
                View More
              </button>
            </div>
          </div>
      
        </div>
      ))}
       <div  style={{ width: "100%",backgroundColor:"black",borderRadius:"20px",boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25);"}}>
                  <img
                    src={data3}
                    alt=""
                    className="dataset-img"
                  />
                  <div className="alldataset-grid">
                    <h4 >Data Scientist Salaries</h4>
                    {/* <div key={index}>
                      {item.file_type} ( {item.file_size})
                    </div> */}
                    <div >
                      <p className="dataset-dec">Discover the true earning potential of data scientists across a vast array of companies with our comprehensive dataset. Featuring average salaries from over 8000 companies, this dataset provides a valuable resource for job seekers, industry professionals, and data enthusiasts alike. Uncover salary trends, compare compensation across sectors, and gain insights into the factors influencing data scientist salaries. Join the exploration, share your findings, and contribute to the collective knowledge of the Kaggle community. Let's dive into the world of data scientist salaries together! Access the dataset now and unlock a wealth of information for your analyses.</p>
                    </div>
                    <button
                    className="dataset-viewmore"
                    onClick={() => {
                      // setSingle(allDataSet[index]);
                      // toggleComponent(); 
                    }}
                  >
                    View More
                  </button>
                  </div>
                  
                </div>
      </>
      )}
    </div>
  );
}

export default AllDataset;
