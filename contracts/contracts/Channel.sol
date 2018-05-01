pragma solidity ^0.4.11;

contract Channel {
    
    mapping(uint8 => bytes32[]) Items;
    
    uint256 createdOn;
    string public title;
    string public description;
    address public owner;
    string public channelVersion;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    event ItemData(uint8 indexed itemEnum, bytes32 indexed itemHash, string itemJson, uint256 addedOn);

    function Channel(string _title, string _description) public {  
        owner = msg.sender;
        createdOn = now;
        channelVersion = "0.4.0";
        description = _description;
        title = _title;
    }

    function kill() onlyOwner() public {
        selfdestruct(owner);
    }

    function addItemToChannel(bytes32 itemHash, string itemInfo, uint8 itemEnum) onlyOwner() public returns (bytes32 _itemHash) {
        emit ItemData(itemEnum, itemHash, itemInfo, now);
        Items[itemEnum].push(itemHash);
        _itemHash = itemHash;
    }

    function removeItem(bytes32 itemHash, uint8 itemEnum) onlyOwner() public returns (bool success) {
        success = false;
        uint256 index = itemIndex(itemHash,itemEnum);
        if (index < 0) {
            revert();
        } else {
            delete(Items[itemEnum][index]);
            success = true;
        }
    }

    function itemIndex(bytes32 itemHash, uint8 itemEnum) public constant returns (uint256 index) {
        index = uint256(-1);
        for (uint256 i = 0; i < Items[itemEnum].length; i++) {
            if (itemHash == Items[itemEnum][i]) {
                index = i;
                break;
            }
        }
    }

    function returnItems(uint8 itemEnum) public constant returns (bytes32[] items) {
        items = Items[itemEnum];
    }
    
    function itemCount(uint8 itemEnum) public constant returns (uint256 total) {
        total = Items[itemEnum].length;
    }
    
}
