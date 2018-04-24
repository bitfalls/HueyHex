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

    function donate(address _to, uint256 _amount) onlyHueyContract() public returns (bool success) {
        if (balances[tx.origin] >= _amount && _amount > 0 && balances[_to] + _amount > balances[_to] && tx.origin != _to) {
            balances[tx.origin] -= _amount;
            balances[_to] += _amount;
            emit Transfer(tx.origin, _to, _amount);
            emit Donate(tx.origin, _to, _amount);
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
