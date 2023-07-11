import React from "react";
import DashboardNavbar from "./DashboardNavbar";
import "../styles/dataset.scss";
import SingleModel from "./SingleModel";
import { data } from "../dummyData/model";
import { useState, useEffect } from "react";
import { modelInstance } from "./Contract";
import { ethers } from "ethers";
import CreateModel from "./CreateModel";
import "react-toastify/dist/ReactToastify.css";
import model from "../components/assets/model3.png"

function Model({ single, setSingle }) {
  const [singleModel, setSingleModel] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [allModelData, setAllModelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isProfile, setIsProfile] = useState(true);

  const toggleComponent = () => {
    setSingleModel(!singleModel);
    // window.location.pathname("/singlemodel");
  };

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
        const modelData = await con.getAllModelData();

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
    <>
      {singleModel ? (
        <SingleModel
          single={single}
          toggleComponent={toggleComponent}
          isProfile={isProfile}
        />
      ) : (
        <div className="dataset-main-div">
          <div>
            {" "}
            <h1 style={{ margin: "0" }} className="dataset-content">
              Model
            </h1>
            <div className="dataset-content">
              Search and discover hundreds of trained, ready-to-deploy machine
              learning models in one place.
            </div>
            <div className="dataset-content" style={{ margin: "20px 0px" }}>
              <button className="data-btn" onClick={() => setOpenModal(true)}>
                Create Model
              </button>
            </div>{" "}
            <CreateModel open={openModal} onClose={() => setOpenModal(false)} />
          </div>
          <div
            class="relative mb-4 flex w-full flex-wrap items-stretch"
            style={{
              display: "flex",
              alignItems: "center",
              width: "80%",
              position: "relative",
              padding: "20px 0px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-5 w-5"
              width={20}
              style={{ padding: "10px", position: "absolute", color: "black" }}
            >
              <path
                fill-rule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clip-rule="evenodd"
              />
            </svg>
            <input
              type="search"
              class="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon2"
              style={{
                padding: "10px 40px",
                margin: "0 auto",
                width: "100%",
                borderRadius: "15px",
              }}
            />
          </div>

          <div className="main-dataset-grid">
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
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "black",
                  }}
                >
                  <div>       
                     <img
                    src={`https://gateway.lighthouse.storage/ipfs/${item.image}`}
                    alt={`Image ${index}`}
                    className="dataset-img"
                  />
                  </div>

                  <div className="alldataset-grid">
                    <h4 key={index}>{item.name}</h4>
                    {/* /* <div key={index}>
                      {item.file_type} ( {item.file_size})
                    </div> */}
                        <div
                          key={index}
                          className="dataset-dec"
                          style={{ margin: "10px 0px" }}
                        >
                          {item.description}
                        </div>
                        <button
                          className="dataset-viewmore"
                          onClick={() => {
                            setSingle(allModelData[index]);
                            toggleComponent();
                          }}
                        >
                          View More
                        </button>
                      </div>
                    </div>
                  </>
                ))}
              </>
            )}
             <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "black",
                  }}
                >
                  <div>       
                     <img
                    src={model}
                    
                    className="dataset-img"
                  />
                  </div>

                  <div className="alldataset-grid">
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
                            
                            toggleComponent();
                          }}
                        >
                          View More
                        </button>
                      </div>
                    </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Model;
