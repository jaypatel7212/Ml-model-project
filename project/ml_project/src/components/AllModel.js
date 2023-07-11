import React from "react";
import { data } from "../dummyData/model";
import { useState, useEffect } from "react";
import { modelInstance } from "./Contract";
import lighthouse from "@lighthouse-web3/sdk";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import "react-toastify/dist/ReactToastify.css";
import model from "../components/assets/model3.png"

function AllModel(props) {
  const { address } = useAccount();
  const [allModelData, setAllModelData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getModels = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }
        const con = await modelInstance();
        const modelData = await con.getAllModelDataOfUser(address);

        setAllModelData(modelData);
        setLoading(false);
        console.log(modelData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchModels() {
      await getModels();
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
      {allModelData.map((item, index) => (
        <>
          <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <img
              src={`https://gateway.lighthouse.storage/ipfs/${item.image}`}
              alt={`Image ${index}`}
              className="dataset-img"
            />
            <div>
              <h4 key={index}>{item.name}</h4>
              <div key={index}></div>
              <div key={index} className="dataset-dec">
                {item.description}
              </div>
            </div>
            <button
              className="dataset-viewmore"
              onClick={() => {
                props.setSingle(allModelData[index]);
                props.profileLinks("singleModel")

              }}
            >
              View More
            </button>
          </div>
        </>
      ))}
      
      <div className="alldataset-grid">
      <img
              src={model}
              className="dataset-img"
            />
      <h4 >DISK</h4>
      {/* /* <div key={index}>
        {item.file_type} ( {item.file_size})
      </div> */}
          <div
            
            className="dataset-dec"
            style={{ margin: "10px 0px" }}
          >
            DISK is a local feature extractor. Matching two images across wide baselines is traditionally achieved with local features, composed of keypoints (xy coordinates in the image) and descriptors (feature vectors that describe the neighbourhood of each keypoint). DISK is trained within a probabilistic framework using reinforcement learning techniques and can extract very dense yet discriminative local features. The likelihood that two local features match can be established by simply computing the distance between their descriptors. These correspondences can be used to match two images or fed to a Structure from Motion framework to reconstruct a scene given multiple images, among other applications.
          </div>
          <button
            className="dataset-viewmore"
            onClick={() => {
              
              // toggleComponent(); 
            }}
          >
            View More
          </button>
        </div>
      
      </>
      )}
    </div>
  );
}

export default AllModel;
