//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7; //versions

contract SimpleStorage{
    uint256 public x;
    struct People{
        uint256 x;
        string name;
    }
    People[] public peopleList;
    mapping(string=>uint256) public m;
    function addPeople(uint256 _x,string memory _name) public{
        peopleList.push(People(_x,_name));
        m[_name] = _x;
    }


    function store(uint256 _y) public virtual {
        x = _y;
    }
    function retrieve() public view returns(uint256)
    {
        return x;
    }
}
//0xd9145CCE52D386f254917e481eB44e9943F39138