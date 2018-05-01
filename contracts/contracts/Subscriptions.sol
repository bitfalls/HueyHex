pragma solidity ^0.4.11;

contract ERC20Interface {

    function totalSupply() constant public returns (uint256 totalSup);
    function balanceOf(address _owner) constant public returns (uint256 balance);
    function transfer(address _to, uint256 _value) public returns (bool success);
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success);
    function approve(address _spender, uint256 _value) public returns (bool success);
    function allowance(address _owner, address _spender) public constant returns (uint256 remaining);
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

}

contract Huey is ERC20Interface {

    string public constant symbol = "HUEY";

    string public constant name = "Huey";

    uint8 public constant decimals = 18;

    uint256 _totalSupply = 55000000 * 10**uint256(decimals);

    address public owner;

    address public hueyContract;

    mapping(address => uint256) public balances;

    mapping(address => mapping (address => uint256)) public allowed;

    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert();
        }
        _;
    }

    modifier onlyHueyContract() {
        if (msg.sender != hueyContract) {
            revert();
        }
        _;
    }

    // Constructor
    function Huey() public {
        owner = msg.sender;
        balances[owner] = _totalSupply;
    }

    function changeOwner(address _newOwner) onlyOwner() public returns (bool success) {
        owner = _newOwner;
        return true;
    }

    function updateHueyAddress(address _contractAddress) onlyOwner() public returns (bool success) {
        hueyContract = _contractAddress;
        return true;
    }
 
    function totalSupply() constant public returns (uint256 totalSup) {
        totalSup = _totalSupply;
    }

    function balanceOf(address _owner) constant public returns (uint256 balance) {
        return balances[_owner];
    }

    function transfer(address _to, uint256 _amount) public returns (bool success) {
        if (balances[msg.sender] >= _amount && _amount > 0 && balances[_to] + _amount > balances[_to]) {
            balances[msg.sender] -= _amount;
            balances[_to] += _amount;
            emit Transfer(msg.sender, _to, _amount);
            return true;
        } else {
            return false;
        }
    }

    function donate(address _from, address _to, uint256 _amount) onlyHueyContract() public returns (bool success) {
        if (balances[_from] >= _amount && _amount > 0 && balances[_to] + _amount > balances[_to] && _from != _to) {
            balances[_from] -= _amount;
            balances[_to] += _amount;
            emit Transfer(_from, _to, _amount);
            emit Donate(_from, _to, _amount);
            return true;
        } else {
            return false;
        }
    }

    function transferFrom(address _from, address _to, uint256 _amount) public returns (bool success) {
        if (balances[_from] >= _amount && allowed[_from][msg.sender] >= _amount && _amount > 0 && balances[_to] + _amount > balances[_to]) {
            balances[_from] -= _amount;
            allowed[_from][msg.sender] -= _amount;
            balances[_to] += _amount;
            emit Transfer(_from, _to, _amount);
            return true;
        } else {
            return false;
        }
    }

    function approve(address _spender, uint256 _amount) public returns (bool success) {
        allowed[msg.sender][_spender] = _amount;
        emit Approval(msg.sender, _spender, _amount);
        return true;
    }

    function allowance(address _owner, address _spender) constant public returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }

    event Donate(address indexed _from, address indexed _to, uint256 _value);

}


contract Subscriptions {
    
    address public owner;

    address public hueyTokenAddress;

    uint256 public TotalChannels;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    struct Channel {
        address contractAddress;
        uint256 subCount;
        uint256 totalDonations;
        uint256 donationCount;
    }
    
    //mapping of address to their channel
    mapping (address => Channel) public channels;
    //mapping of address to their subs
    mapping (address => address[]) public subs;

    mapping (uint256 => address) public allChannels;
    //mapping (address => uint256) public subscriberCount;

    //initalize contract
    function Subscriptions() public {  
        owner = msg.sender;
        TotalChannels = 0;
    }

    function changeOwner(address _newOwner) onlyOwner() public returns (bool) {
        owner = _newOwner;
        return true;
    }

    function changeTokenAddress(address _newTokenAddress) onlyOwner() public returns (bool) {
        hueyTokenAddress = _newTokenAddress;
        return true;
    }

    function registerChannelFromContract() public returns (bool success) {
        success = false;
        if (channels[tx.origin].contractAddress != address(0x0)) {
            revert();
        }
        channels[tx.origin] = Channel({
            contractAddress:msg.sender,
            subCount:0,
            totalDonations:0,
            donationCount:0
        });
        allChannels[TotalChannels] = msg.sender;
        TotalChannels += 1;
        success = true;
    }
    
    function registerChannelManually(address channelAdd) public returns (bool success) {
        success = false;
        if (channelAdd == address(0x0)) {
            revert();
        }
        if (channels[msg.sender].contractAddress != address(0x0)) {
            revert();
        }
        channels[msg.sender] = Channel({
            contractAddress:channelAdd,
            subCount:0,
            totalDonations:0,
            donationCount:0
        });
        allChannels[TotalChannels] = msg.sender;
        TotalChannels += 1;
        success = true;
    }

    function unregisterChannel() public returns (bool success) {
        channels[msg.sender].contractAddress = address(0x0);
        return true;
    }

    function channelExist(address addr) constant public returns (bool exist) {
        exist = false;
        if (channels[addr].contractAddress != address(0x0)) {
            exist = true;
        }
    }

    function subscribeToChannel(address addr) public returns (bool success) {
        success = false;
        if (!channelExist(addr)) {
            revert();
        }
        if (alreadySubscribed(msg.sender, addr)) {
            revert();
        }
        if (addr == msg.sender) {
            revert();
        }
        subs[msg.sender].push(addr);
        channels[addr].subCount = channels[addr].subCount + 1;
    }

    function returnChannels() constant public returns (address[] _subs) {
        _subs = subs[msg.sender];
    }
    
    function totalSubscribers(address addr) constant public returns (uint total) {
        total = channels[addr].subCount;
    }

    function donateTo(address _channel, uint256 _amount) public returns (bool success) {
        success = false;
        if (!channelExist(_channel)) {
            revert();
        }
        if (_amount <= 0) {
            revert();
        }
        if (msg.sender == _channel) {
            revert();
        }
        Huey hueyTokenInstance = Huey(hueyTokenAddress);
        bool ret = hueyTokenInstance.donate(msg.sender, _channel, _amount);
        if (ret) {
            channels[_channel].totalDonations = channels[_channel].totalDonations + _amount;
            channels[_channel].donationCount = channels[_channel].donationCount + 1;
            success = true;
        }
        return success;
    }

    function alreadySubscribed(address sender, address channel) internal constant returns (bool subscribed) {
        subscribed = false;
        for (uint256 i = 0; i < subs[sender].length; i++) {
            if (subs[sender][i] == channel) {
                subscribed = true;
            }
        }
    }

    function returnContractAddress(address channel) constant public returns (address conAddr) {
        conAddr = channels[channel].contractAddress;
    }
    function returnSubCount(address channel) constant public returns (uint256 subCount) {
        subCount = channels[channel].subCount;
    }
    function returnTotalDonations(address channel) constant public returns (uint256 totalDonations) {
        totalDonations = channels[channel].totalDonations;
    }
    function returnDonationCount(address channel) constant public returns (uint256 donationCount) {
        donationCount = channels[channel].donationCount;
    }
    function returnChannelCount() constant public returns (uint256 channelCount) {
        channelCount = TotalChannels;
    }
}
