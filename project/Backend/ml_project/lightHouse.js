// import * as dotenv from 'dotenv'
// dotenv.config()
// import lighthouse from '@lighthouse-web3/sdk'
const lighthouse = require('@lighthouse-web3/sdk');


const uploadFile = async() =>{
  const path = "./hello.txt"; // Give path to the file
//   const apiKey = process.env.API_KEY; //generate from https://files.lighthouse.storage/ or cli (lighthouse-web3 api-key --new)
  // Both file and folder are supported by the upload function
  const response = await lighthouse.upload(path, "03a4f6fe.ff4ee70766d646dc90345131bb679658");
  
  /*
      data: {
        Name: 'test',
        Hash: 'QmWC9AkGa6vSbR4yizoJrFMfmZh4XjZXxvRDknk2LdJffc',
        Size: '6198'
      }
      Note: Hash in response is CID.
  */
  console.log(response);
  console.log("Visit at: https://gateway.lighthouse.storage/ipfs/" + response.data.Hash);
}

uploadFile()