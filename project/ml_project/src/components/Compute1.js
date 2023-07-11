import React from "react";
import "../styles/dataset.scss";
import { useState } from "react";
import SingleComputeModel1 from "./Container1";
import img1 from "../components/assets/dataset1.jpg";
import SingleComputeModel2 from "./Container2";

function Compute1() {
  const [compute, setCompute] = useState({
    training: false,
    computeFinal: false,
  });
  const [singleCompute1, setSingleCompute1] = useState(false);
  const [singleCompute2, setSingleCompute2] = useState(false);

  if (compute.training) {
    return <SingleComputeModel1 />;
  }
  if (compute.computeFinal) {
    return <SingleComputeModel2 />;
  }
  return (
    <>
      <div className="dataset-main-div">
        <div style={{ borderBottom: "1px solid", padding: "10px 0px " }}>
          {" "}
          <h1 style={{ margin: "10px 0px" }} className="dataset-content">
            Compute Your Model
          </h1>
          <div
            className="dataset-content"
            style={{
              width: "70%",
              textAlign: "justify",
              lineHeight: "25px",
              fontWeight: "500",
              fontSize: "20px",
            }}
          >
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
            sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
            aliquid ex ea commodi consequatur? Quis autem vel eum iure
            reprehenderit qui in ea voluptate velit esse quam nihil molestiae
            consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
            pariatur?"
          </div>
        </div>
        <div className="main-dataset-grid">
          <div style={{ width: "100%" }}>
            <img src={img1} alt="" className="dataset-img" />
            <div>
              <h4>Training</h4>
              <div>
                <p className="dataset-dec">
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
              <button
                className="dataset-viewmore"
                onClick={() => {
                  setCompute({ training: true, computeFinal: false });
                }}
              >
                Use Now
              </button>
            </div>
          </div>

          <div style={{ width: "100%" }}>
            <img src={img1} alt="" className="dataset-img" />
            <div>
              <h4>Final</h4>
              <div>
                <p className="dataset-dec">
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
              <button
                className="dataset-viewmore"
                onClick={() => {
                  setCompute({ training: false, computeFinal: true });
                }}
              >
                Use Now
              </button>
            </div>
          </div>
        </div>{" "}
      </div>
    </>
  );
}

export default Compute1;
