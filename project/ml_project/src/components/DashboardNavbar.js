import React from "react";
import profile from "../components/assets/profile.jpg";
import { Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import push from "../components/assets/pushprotocol1.png"

function DashboardNavbar(props) {
  return (
    <>
      <div
        className="dash-nav-main"
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0px 100px",
          justifyContent: "flex-end",
        }}
      >
        {/* <div
          class="relative mb-4 flex w-full flex-wrap items-stretch"
          style={{ display: "flex", alignItems: "center", width: "100%" }}
        >
          <input
            type="search"
            class="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon2"
            style={{ padding: "10px", margin: "0 auto", width: "100%" }}
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="h-5 w-5"
            width={20}
            style={{ padding: "10px" }}
          >
            <path
              fill-rule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clip-rule="evenodd"
            />
          </svg>
        </div> */}
        <img src={push}  style={{width:"50px"}}></img>
        <div style={{ margin: "0px 30px" }}>
          {" "}
          <ConnectButton />
        </div>

        <div className="flex-div">
          <img
            className="p-user"
            src={profile}
            alt="Rounded avatar"
            style={{
              width: "35px",
              borderRadius: "100px",
              padding: "10px",
              backgroundColor: "white",
            }}
            onClick={() => props.dashboardLinks("addHome")}
          />{" "}
        </div>
      </div>
    </>
  );
}

export default DashboardNavbar;
