const { ethers } = require("hardhat");


async function deploy() {
    const ContractName = await ethers.getContractFactory("ModelValidationPlatform");
    const contract = await ContractName.deploy();
    console.log(" Contract deployed to address:", contract.address);
  }
  
 deploy();


 