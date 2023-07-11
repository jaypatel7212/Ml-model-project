import React from "react";
import "../styles/dataset.scss";
import { data } from "../dummyData/dataset";
import CreateDataset from "./CreateDataset";
import { useState, useEffect } from "react";
import SingleDataset from "./SingleDataset";
import { modelInstance } from "./Contract";
import "react-toastify/dist/ReactToastify.css";
import data3 from "../components/assets/dataset4.jpg"
import { ethers } from "ethers";

function Dataset({ single, setSingle, dashboardLinks }) {
  const [openModal, setOpenModal] = useState(false);
  const [singleDataset, setSingleDataset] = useState(false);
  const [allModelData, setAllModelData] = useState([]);
  const [allDataSet, setAllDataSet] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfile, setIsProfile] = useState(true);
  const [loading, setLoading] = useState(true);

  const toggleComponent = () => {
    setSingleDataset(!singleDataset);
  };

  const getDatas = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }
        const con = await modelInstance();
        const Data = await con.getAllDataSet();

        setAllDataSet(Data);
        setLoading(false);
        console.log(Data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchModels() {
      await getDatas();
    }
    console.log("hello");
    fetchModels();
  }, []);
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filtered = allDataSet.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <>
      {singleDataset ? (
        <SingleDataset single={single} toggleComponent={toggleComponent} isProfile={isProfile}/>
      ) : (
        <div className="dataset-main-div">
          <div>
            {" "}
            <h1 style={{ margin: "10px 0px " }} className="dataset-content">
              Datasets
            </h1>
            <div
              className="dataset-content"
              style={{ margin: "10px 0px ", fontWeight: "500" }}
            >
              Explore, analyze, and share quality data.
            </div>
            <div className="dataset-content" style={{ margin: "20px 0px" }}>
              <button className="data-btn" onClick={() => setOpenModal(true)}>
                Create Dataset
              </button>
            </div>{" "}
            <CreateDataset
              open={openModal}  
              onClose={() => setOpenModal(false)}
            />
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
              className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon2"
              style={{
                padding: "10px 40px",
                margin: "0 auto",
                width: "100%",
                borderRadius: "15px",
              }}
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          <div className="main-dataset-grid">
            {allDataSet.map((item, index) => (
              <>
                <div style={{ width: "100%",backgroundColor:"black",borderRadius:"20px",boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25);"}}>
                  <img
                    src={`https://gateway.lighthouse.storage/ipfs/${item.image}`}
                    alt={`Image ${index}`}
                    className="dataset-img"
                  />
                  <div className="alldataset-grid">
                    <h4 key={index}>{item.title}</h4>
                    {/* <div key={index}>
                      {item.file_type} ( {item.file_size})
                    </div> */}
                    <div key={index}>
                      <p className="dataset-dec">{item.description}</p>
                    </div>
                    <button
                    className="dataset-viewmore"
                    onClick={() => {
                      setSingle(allDataSet[index]);
                      toggleComponent();
                    }}
                  >
                    View More
                  </button>
                  </div>
                  
                </div>
              </>
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

export default Dataset;
