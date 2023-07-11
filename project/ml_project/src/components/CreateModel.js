import React from "react";
import { useState } from "react";
import { useEffect, useRef } from "react";
import "../styles/register.scss";
import file from "../components/assets/file.png";
import "../styles/createdataset.scss";
import { modelInstance } from "./Contract";
import lighthouse from "@lighthouse-web3/sdk";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateModel({ open, onClose }) {
  const [file, setFile] = useState(null);
  const [inputImg, setInputImg] = useState(null);
  const [btnloading, setbtnloading] = useState(false);
  const fileInputRefModel = useRef(null);
  const fileInputRefModelImg = useRef(null);
  const [Data, setData] = useState({
    name: null,
    description: null,
    file: null,
    status: null,
    image: null,
  });

  useEffect(() => {
    console.log(Data);
  }, [Data]);

  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  const uploadModel = async () => {
    try {
      console.log("in upload model function");
      const file = Data.file; // Access the file from the array
      const output = await lighthouse.upload(
        file,
        "ee42a13a.3117f0d2e3bc4e73bb459ea3612a2471",
        progressCallback
      );
      console.log("File Status:", output);

      return output;
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async () => {
    try {
      console.log("in upload Image Model function");
      const image = Data.image; // Access the file from the array
      const output = await lighthouse.upload(
        image,
        "ee42a13a.3117f0d2e3bc4e73bb459ea3612a2471",
        progressCallback
      );
      console.log("Image Status:", output);

      return output;
    } catch (error) {
      console.log(error);
    }
  };

  const createModel = async () => {
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
      const output = await uploadModel();
      const cids = output.data.Hash;
      console.log("cids: ", cids);

      const outputImage = await uploadImage();
      const cidsImage = outputImage.data.Hash;
      console.log("CidsForImage ", cidsImage);

      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }
        const con = await modelInstance();
        console.log("Hello");
        const tx = await con.modelData(
          cids,
          cidsImage,
          Data.name,
          Data.description,
          Data.status
        );

        console.log(tx);
        await tx.wait();
        setbtnloading(false);
        console.log(con);
        onClose();
      }
    } catch (error) {
      console.log(error);
      setbtnloading(false);
    }
  };

  if (!open) return null;
  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer"
      >
        <div className="modalRight">
          <p
            className="closeBtn"
            onClick={onClose}
            style={{ cursor: "pointer" }}
          >
            X
          </p>
          <div className="register-main-div" style={{ width: "90%" }}>
            <div className="register-sub-div" style={{ margin: "0" }}>
              <div
                className="form-file"
                // style={{
                //   width: "80%",
                //   display: "flex",
                //   flexDirection: "column",
                //   height: "15vh",
                //   justifyContent: "space-evenly",
                //   color: "black",
                // }}
              >
                <div style={{ width: "50px", margin: "0 auto" }}>
                  {inputImg && (
                    <img
                      src={URL.createObjectURL(inputImg)}
                      alt=""
                      style={{ width: "50px" }}
                    />
                  )}
                </div>
                <div
                  onClick={() => fileInputRefModelImg.current.click()}
                  style={{
                    border: "1px solid",
                    padding: "10px",
                    width: "50%",
                    margin: "0 auto",
                    cursor: "pointer",
                    fontSize: "15px",
                    textAlign: "center",
                    color: "black",
                  }}
                >
                  {" "}
                  {inputImg ? (
                    <span>{inputImg.name}</span>
                  ) : (
                    <span> Upload Model Image </span>
                  )}
                  <div>
                    <input
                      type="file"
                      name="image"
                      hidden
                      ref={fileInputRefModelImg}
                      accept=".jpg, .png, .jpeg"
                      onChange={(e) => {
                        setInputImg(e.target.files[0]);
                        setData({ ...Data, image: e.target.files });
                      }}
                      style={{ marginLeft: "40px" }}
                    />
                  </div>
                </div>
                <div
                  className="file-input-container"
                  style={{
                    color: "black",
                    marginBottom: "10px",
                    padding: "6px",
                    fontWeight: "400",
                  }}
                >
                  <div
                    onClick={() => fileInputRefModel.current.click()}
                    style={{
                      padding: "8px",

                      margin: "0px auto",
                      cursor: "pointer",
                      fontSize: "15px",
                      textAlign: "start",
                      color: "black",
                    }}
                  >
                    {" "}
                    {file ? (
                      <span>{file.name}</span>
                    ) : (
                      <span> Upload Your File </span>
                    )}
                    <input
                      type="file"
                      name="file"
                      hidden
                      ref={fileInputRefModel}
                      // accept=".csv"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                        setData({ ...Data, file: e.target.files });
                      }}
                      style={{ marginLeft: "40px" }}
                      // multiple
                    />
                  </div>
                </div>
              </div>
              <label className="form-flexlable" style={{ width: "400px" }}>
                <input
                  type="text"
                  name="name"
                  value={Data.title}
                  onChange={(e) => {
                    setData({ ...Data, name: e.target.value });
                  }}
                  className="form-inputLable"
                  placeholder="Model name"
                />
              </label>
              <label className="form-flexlable" style={{ width: "400px" }}>
                <input
                  type="text"
                  name="occupation"
                  value={Data.description}
                  onChange={(e) => {
                    setData({ ...Data, description: e.target.value });
                  }}
                  className="form-inputLable"
                  placeholder="Description"
                />
              </label>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "50%",
                  height: "50px",
                  margin: "0 auto ",
                  justifyContent: "space-around",
                }}
              >
                <div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                  <input
                    class="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                    type="radio"
                    name="flexRadioDefault"
                    id="radioDefault01"
                    value="true"
                    onChange={(e) => {
                      setData({ ...Data, status: e.target.value });
                    }}
                  />
                  <label
                    class="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                    for="radioDefault02"
                    style={{ color: "black" }}
                  >
                    public
                  </label>
                </div>
                <div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                  <input
                    class="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                    type="radio"
                    name="flexRadioDefault"
                    id="radioDefault02"
                    value="false"
                    onChange={(e) => {
                      setData({ ...Data, status: e.target.value });
                    }}
                  />
                  <label
                    class="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                    for="radioDefault02"
                    style={{ color: "black" }}
                  >
                    private
                  </label>
                </div>
              </div>
              <div
                className="form-button"
                style={{ display: "flex", width: "70%" }}
              >
                <button
                  className="form-btn"
                  style={{ width: "100%", margin: "0px 20px" }}
                  onClick={createModel}
                  disabled={btnloading}
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
                    >
                      <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"></path>
                    </svg>
                  ) : (
                    <> Create Model</>
                  )}
                </button>
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateModel;
