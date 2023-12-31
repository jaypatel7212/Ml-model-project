// import React from "react";
// import { ethers } from 'ethers';
// import lighthouse from '@lighthouse-web3/sdk';

// function App() {

//   const encryptionSignature = async() =>{
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();
//     const address = await signer.getAddress();
//     const messageRequested = (await lighthouse.getAuthMessage(address)).data.message;
//     const signedMessage = await signer.signMessage(messageRequested);
//     return({
//       signedMessage: signedMessage,
//       publicKey: address
//     });
//   }

//   const progressCallback = (progressData) => {
//     let percentageDone =
//       100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
//     console.log(percentageDone);
//   };

//   /* Deploy file along with encryption */
//   const uploadFileEncrypted = async(file) =>{
//     /*
//        uploadEncrypted(e, accessToken, publicKey, signedMessage, uploadProgressCallback)
//        - e: js event
//        - accessToken: your API key
//        - publicKey: wallets public key
//        - signedMessage: message signed by the owner of publicKey
//        - uploadProgressCallback: function to get progress (optional)
//     */
//     const sig = await encryptionSignature();
//     const response = await lighthouse.uploadEncrypted(
//       file,
//       "03a4f6fe.ff4ee70766d646dc90345131bb679658",
//       sig.publicKey,
//       sig.signedMessage,
//       progressCallback
//     );
//     console.log(response);
//     /*
//       output:
//         data: {
//           Name: "c04b017b6b9d1c189e15e6559aeb3ca8.png",
//           Size: "318557",
//           Hash: "QmcuuAtmYqbPYmPx3vhJvPDi61zMxYvJbfENMjBQjq7aM3"
//         }
//       Note: Hash in response is CID.
//     */
//   }

//   return (
//     <div className="App">
//       <input onChange={e=>uploadFileEncrypted(e.target.files)} type="file" />
//     </div>
//   );
// }

// export default App;






// import logo from './logo.svg';
// import './App.css';
// import LighthouseAccessControl from './components/LighthouseAccessControl';
// import {ethers} from 'ethers';
// import lighthouse from '@lighthouse-web3/sdk';


// function App() {
//   const encryptionSignature = async() =>{
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
    
//     const signer = provider.getSigner();
//     const address = await signer.getAddress();
//     const messageRequested = (await lighthouse.getAuthMessage(address)).data.message;
//     const signedMessage = await signer.signMessage(messageRequested);
//     return({
//       signedMessage: signedMessage,
//       publicKey: address
//     });
//   }

//   const applyAccessConditions = async(e) =>{
//     // CID on which you are applying encryption
//     // CID is generated by uploading a file with encryption
//     // Only the owner of the file can apply access conditions
//     const cid = "QmV9E9ApGRogSU59p1EzsubiaWqQ6yY3ybir32ruRrTeRG";

//     // Conditions to add
//     const conditions = [
//       {
//         id: 1,
//         chain: "Mumbai",
//         method: "get",
//         standardContractType: "Custom",
//         contractAddress: "0x019e5A2Eb07C677E0173CA789d1b8ed4384e59A5",
//         returnValueTest: {
//       comparator: "==",
//       value: "1"
//         },
//         parameters: [],
//         inputArrayType: [],
//         outputType: "uint256"
//     }
//     ];

//     // Aggregator is what kind of operation to apply to access conditions
//     // Suppose there are two conditions then you can apply ([1] and [2]), ([1] or [2]), !([1] and [2]).
//     const aggregator = "([1])";
//     const {publicKey, signedMessage} = await encryptionSignature();
//     console.log(publicKey,signedMessage);

//     /*
//       accessCondition(publicKey, cid, signedMessage, conditions, aggregator)
//         Parameters:
//           publicKey: owners public key
//           CID: CID of the file to decrypt
//           signedMessage: message signed by the owner of publicKey
//           conditions: should be in a format like above
//           aggregator: aggregator to apply conditions
//     */
//     const response = await lighthouse.applyAccessCondition(
//       publicKey,
//       cid,
//       signedMessage,
//       conditions,
//       aggregator
//     );

//     console.log(response);
//     /*
//       {
//         data: {
//           cid: "QmZkEMF5y5Pq3n291fG45oyrmX8bwRh319MYvj7V4W4tNh",
//           status: "Success"
//         }
//       }
//     */
//   }

//   return (
//     <div className="App">
//       <button onClick={()=>{applyAccessConditions()}}>Apply Access Conditions</button>
//     </div>
//   );
// }

// export default App;






//// Decrypt file
// import React from "react";
// import {ethers} from 'ethers';
// import lighthouse from '@lighthouse-web3/sdk';

// function App() {

//   const [fileURL, setFileURL] = React.useState(null);

//   const encryptionSignature = async() =>{
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();
//     const address = await signer.getAddress();
//     const messageRequested = (await lighthouse.getAuthMessage(address)).data.message;
//     console.log(messageRequested)
//     const signedMessage = await signer.signMessage(messageRequested);
//     return({
//       signedMessage: signedMessage,
//       publicKey: address
//     });
//   }

//   /* Decrypt file */
//   const decrypt = async() =>{
//     // Fetch file encryption key
//     const cid = "QmTZyhc6p4Hbd7WnswTDYcnGWxovxf5osSQkuBXPrK2R2P"; //replace with your IPFS CID
//     const {publicKey, signedMessage} = await encryptionSignature();

//     console.log(publicKey);
//     /*
//       fetchEncryptionKey(cid, publicKey, signedMessage)
//         Parameters:
//           CID: CID of the file to decrypt
//           publicKey: public key of the user who has access to file or owner
//           signedMessage: message signed by the owner of publicKey
//     */
//     const keyObject = await lighthouse.fetchEncryptionKey(
//       cid,
//       publicKey,
//       signedMessage
//     );

//     // Decrypt file
//     /*
//       decryptFile(cid, key, mimeType)
//         Parameters:
//           CID: CID of the file to decrypt
//           key: the key to decrypt the file
//           mimeType: default null, mime type of file
//     */
   
//     const fileType = "image/jpeg";
//     const decrypted = await lighthouse.decryptFile(cid, keyObject.data.key, fileType);
//     console.log(decrypted)
//     /*
//       Response: blob
//     */

//     // View File
//     const url = URL.createObjectURL(decrypted);
//     console.log(url);
//     setFileURL(url);
//   }

//   return (
//     <div className="App">
//       <button onClick={()=>decrypt()}>decrypt</button>
//       {
//         fileURL?
//           <a href={fileURL} target="_blank">viewFile</a>
//         :
//           null
//       }
//     </div>
//   );
// }

// export default App;










// // for share files 
// import React from "react";
// import { ethers } from 'ethers';
// import lighthouse from '@lighthouse-web3/sdk';

// function App() {

//   const signAuthMessage = async() =>{
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();
//     const publicKey = (await signer.getAddress()).toLowerCase();
//     const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data.message;
//     const signedMessage = await signer.signMessage(
//       messageRequested
//     );
//     return({publicKey: publicKey, signedMessage: signedMessage});
//   }

//   const shareFile = async() =>{
//     const cid = "QmTZyhc6p4Hbd7WnswTDYcnGWxovxf5osSQkuBXPrK2R2P";

//     // Then get auth message and sign
//     // Note: the owner of the file should sign the message.
//     const {publicKey, signedMessage} = await signAuthMessage();

//     const publicKeyUserB = ["0xc1b385F5B31bd5acc60d3dBd04fF5A65cFd18bdd"];
    
//     const res = await lighthouse.shareFile(
//       publicKey,
//       publicKeyUserB,
//       cid,
//       signedMessage
//     );

//     console.log(res)
//     /*
//       data: {
//         cid: "QmTTa7rm2nMjz6wCj9pvRsadrCKyDXm5Vmd2YyBubCvGPi",
//         shareTo: ["0x201Bcc3217E5AA8e803B41d1F5B6695fFEbD5CeD"],
//         status: "Success"
//       }
//     */
//     /*Visit: 
//         https://files.lighthouse.storage/viewFile/<cid>  
//       To view encrypted file
//     */
//   }

//   return (
//     <div className="App">
//       <button onClick={()=>shareFile()}>share file</button>
//     </div>
//   );
// }

// export default App;










// for image upload

import React from "react";
import lighthouse from '@lighthouse-web3/sdk';

function App() {

  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  const uploadFile = async(file) =>{
    // Push file to lighthouse node
    // Both file and folder are supported by upload function
    const output = await lighthouse.upload(file, "03a4f6fe.ff4ee70766d646dc90345131bb679658", progressCallback);
    console.log('File Status:', output);
    /*
      output:
        data: {
          Name: "filename.txt",
          Size: 88000,
          Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
        }
      Note: Hash in response is CID.
    */

      console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);
  }

  return (
    <div className="App">
      <input onChange={e=>uploadFile(e.target.files)} type="file" />
    </div>
  );
}

export default App;