// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/Counters.sol";

contract ModelValidationPlatform {

using Counters for Counters.Counter;
   
    struct User {
        string name;
        string occupation;
        string organization;
        string location;
        string image;
       // bool isRegistered;
    }

    enum Categories{ 
        education, drugsAndMedical, earthNature , scienceAndTechnology
    }

    struct Data {
        uint id;
        string title;
        string image;
        string description;
        string uploadFile;
        Categories categories;
        bool status;      //true-> public , false ->Private
    }

    struct Model {
        string file;
        string image;
        string title;
        string description;
        bool status;      //true-> public   , false ->Private
    }

    mapping(address => User) private userMapping;      // for user register 
    mapping (address =>bool) public isRegisteredMapping;   // for user register
    mapping (uint256 => Data) private dataSetMapping;     // Dataset 
    mapping(address => uint[]) public dataSetAddressMapping;   // Dataset
    mapping (uint256 => Model) private modelMapping; // model
    mapping (address =>uint[]) public modelAddressMapping; //model
    Counters.Counter public dataCount;
    Counters.Counter public modelCount;

    function setUser(string memory _name, string memory _occupation, string memory _organization, string memory _location, string memory _image) public {
        //  Check if the User is already registered
        require(!isRegisteredMapping[msg.sender],"User is already registered");
        userMapping[msg.sender] = User(_name , _occupation, _organization, _location, _image);
        isRegisteredMapping[msg.sender]=true;
    }

    function getUser(address _address) public view returns (User memory) {
        return userMapping[_address];
    }

    function setData(string memory _title, string memory _image , string memory _description, string memory _uploadFile,Categories _categories,bool _status) public {
        require(isRegisteredMapping[msg.sender], "User is not registered");
        dataCount.increment();
        uint256 newDataSetId = dataCount.current();
        dataSetMapping[newDataSetId] = Data(newDataSetId,_title,_image, _description, _uploadFile , _categories,_status);
        dataSetAddressMapping[msg.sender].push(newDataSetId);
    }

    function getData(uint256 id) public view returns (Data memory) {
        return dataSetMapping[id];
    }

    function getAllDataSet() public view returns(Data[] memory) {
       Data[] memory allUserDataSet = new Data[](dataCount.current());
       uint count=0;
        for(uint i=1;i<=dataCount.current();i++){
            if(dataSetMapping[i].status)
            {
            allUserDataSet[count]=dataSetMapping[i];
            count++;
            }
        }
        assembly {
        mstore(allUserDataSet, count)
    }
        return allUserDataSet;
    } 

    function getAllDataSetOfUser(address _address)  public view returns(Data[] memory) {
        uint256[] memory  allId = dataSetAddressMapping[_address];
        Data[] memory allUserDataSet = new Data[](allId.length);
        for(uint i=0;i<allId.length;i++)
        {
            allUserDataSet[i]=dataSetMapping[allId[i]];
        }
        return allUserDataSet;
    }

    function modelData(string memory _file , string memory _image , string memory _title ,string memory _description,bool _status) public {
        require(isRegisteredMapping[msg.sender], "User is not registered");
       modelCount.increment();
       uint256 newModelId = modelCount.current();
       modelMapping[newModelId] = Model(_file,_image,_title,_description,_status);
       modelAddressMapping[msg.sender].push(newModelId);
    }

    function getAllModelData() public view returns (Model[] memory){
        Model[] memory allUserModel = new Model[](modelCount.current());
        uint count=0;
        for(uint i=1;i<=modelCount.current();i++){
            if(modelMapping[i].status) 
            {
            allUserModel[i-1]=modelMapping[i];
            count++;
            }
        }
         assembly {
        mstore(allUserModel, count)
    }
        return allUserModel;
    }

    function getAllModelDataOfUser(address _address) public view returns(Model[] memory) {
        uint256[] memory allId = modelAddressMapping[_address];
        Model[] memory allUserModel = new Model[](allId.length);
        for(uint i=0;i<allId.length;i++){
            allUserModel[i]=modelMapping[allId[i]];
        }
        return allUserModel;
    }

    function makeDataSetPrivate(uint _id) public {
        bool isOwner = false;
        for(uint i=0;i<dataSetAddressMapping[msg.sender].length;i++)
        {
            if(dataSetAddressMapping[msg.sender][i]==_id)
            {
                isOwner =true;
            }
        }
        require(isOwner,"This dataset doesnot belongs to you");
        dataSetMapping[_id].status = false;
    }

    function makeDataSetPublic(uint _id) public {
        bool isOwner = false;
        for(uint i=0;i<dataSetAddressMapping[msg.sender].length;i++)
        {
            if(dataSetAddressMapping[msg.sender][i]==_id)
            {
                isOwner =true;
            }
        }
        require(isOwner,"This dataset doesnot belongs to you");
        dataSetMapping[_id].status = true;
    }

     function makeModelSetPrivate(uint _id) public {
        bool isOwner = false;
        for(uint i=0;i<modelAddressMapping[msg.sender].length;i++)
        {
            if(modelAddressMapping[msg.sender][i]==_id)
            {
                isOwner =true;
            }
        }
        require(isOwner,"This dataset doesnot belongs to you");
        modelMapping[_id].status = false;
    }

     function makeModelSetPublic(uint _id) public {
        bool isOwner = false;
        for(uint i=0;i<modelAddressMapping[msg.sender].length;i++)
        {
            if(modelAddressMapping[msg.sender][i]==_id)
            {
                isOwner =true;
            }
        }
        require(isOwner,"This dataset doesnot belongs to you");
        modelMapping[_id].status = true;
    }
    
}    