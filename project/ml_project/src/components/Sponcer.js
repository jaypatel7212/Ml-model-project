import React from "react";
import "../styles/sponcer.scss";
import { motion } from "framer-motion";
import push from "../components/assets/pushprotocol1.png";
import bacallhau from "../components/assets/bacallhau.svg";
import ens from "../components/assets/ens.png";
import lighthouse from "../components/assets/lighthouse.jpeg";

const Sponcer = () => {
  const sponsors = [
    {
      id: 1,
      name: "Push Protocol",
      description:
        '"Push Protocol is a web3 communication network, enabling cross-chain notifications and messaging for dapps, wallets, and services.',
      image_url: push,
    },
    {
      id: 2,
      name: "Bacalhau",
      description:
        '"Bacalhau is a platform for fast, cost-efficient, and secure computation that enables users to run compute jobs where the data is generated and stored.',
      image_url: bacallhau,
    },
    {
      id: 3,
      name: "Tableland",
      description:
        'Tableland is an open source, permissionless cloud database built on SQLite. Read and write tamperproof data from apps, data pipelines, or EVM smart contracts.',
      image_url: ens,
    },
    {
      id: 4,
      name: "Lighthouse ",
      description:
        '"Lighthouse is a permanent file storage protocol that allows you to pay once and store your files forever. Lighthouse SDK can be used for storage on IPFS and Filecoin.',
      image_url: lighthouse,
    },
  ];

  return (
    <div className="sponsor-section">
      <h1 className="poweredbyHeading"> Powered By </h1>
      <div className="sponsor-cards">
        {sponsors.map((sponsor) => (
          <motion.div
            className="sponsor-card"
            key={sponsor.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: sponsor.id * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="icon-container">
              <img src={sponsor.image_url} alt={sponsor.name} />
            </div>

            <h2 className="sponsorname">{sponsor.name}</h2>

            <p className="LandingSponsorDesc">{sponsor.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Sponcer;
