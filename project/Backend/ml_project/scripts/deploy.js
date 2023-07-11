const { ethers } = require("hardhat");


async function deploy() {
    const ContractName = await ethers.getContractFactory("ModelValidationPlatform");
    const contract = await ContractName.deploy();
    console.log(" Contract deployed to address:", contract.address);
  }
  
 deploy();


 async function interact() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const contract = await ethers.getContractAt("ModelValidationPlatform", contractAddress);
  
  //set user data
  await contract.setUser(
    "jay",
    "developer",
    "Lamprostech",
    "Ahmedabad",
    " "
  );

  // Get user data
  // const user = await contract.getUser("0xc1b385F5B31bd5acc60d3dBd04fF5A65cFd18bdd"); 
  // console.log("User data:", user);
  
  //set data
  await contract.setData(
    "Model",
    "description",
    " ",
    1
  );
  
    //get dataset
    const getdata = await contract.getData(1);
    console.log("dataset :",getdata);

    const alluserdataset = await contract.getAllDataSet();
    console.log("Alluserdataset:",alluserdataset);
    
}

// interact();