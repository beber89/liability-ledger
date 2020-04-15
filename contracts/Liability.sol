pragma solidity >=0.4.21 <0.7.0;

contract Liability {

  enum Role { Manager, Head, Member }

    struct Worker {
      bool init;
        Role role; // 1: manager, 2: dept head, 3: member
        address id;
        address boss;
    }
    struct Request {
      address toHead;
      uint agrees;
    }

    //modifer

    address public manager;
    mapping(address => Worker) public workers;
    mapping(address => Request) public requests;
    address[] public workersList;

    // Create a new ballot with 4 different proposals.
    constructor () public {
      manager = msg.sender;
      workers[manager].init = true;
      workers[manager].role = Role.Manager;
      workers[manager].id = manager;
      workers[manager].boss = address(0);
      workersList.push(msg.sender);
    }




    function register(address toWorker) public{
      if (workers[toWorker].init ) revert ("Worker already initialized");
      if(workers[msg.sender].role == Role.Member) revert ("Only Manager or Department head can register a user");
      workers[toWorker].init = true;
      workers[toWorker].boss = msg.sender;
      workers[toWorker].id = toWorker;
      if(msg.sender == manager) {
        workers[toWorker].role = Role.Head;
      } else {
        // case : sender is department head
        workers[toWorker].role = Role.Member;
      }
      workersList.push(toWorker);
    }

    function requestSwitchDept(address toHead) public {
      if(workers[msg.sender].role == Role.Manager) revert("This account is not a worker's account");
      if(workers[msg.sender].role != Role.Member) revert("Must be a member role");
      if(workers[msg.sender].boss == toHead)  revert("You can not request switching to the same department");
      if(workers[toHead].role != Role.Head) revert("Member allowed to switch to a new Head only");
      requests[msg.sender].agrees = 1;   // Worker initiated a request
      requests[msg.sender].toHead = toHead;
    }
    function agreeToRequest(address requester) public {
      if(requests[requester].toHead != msg.sender && workers[requester].boss != msg.sender) {
        revert("Only current head or new head are allowed to agree on this request");
      }
      requests[requester].agrees += 1;
      if (requests[requester].agrees == 3) {
        workers[requester].boss = requests[requester].toHead;
        // Removing request
        requests[requester] = Request(address(0), 0);
      }
    }

  function addressToString(address _addr) private pure returns(string memory) {
      bytes32 value = bytes32(uint256(_addr));
      bytes memory alphabet = "0123456789abcdef";

      bytes memory str = new bytes(42);
      str[0] = '0';
      str[1] = 'x';
      for (uint i = 0; i < 20; i++) {
          str[2+i*2] = alphabet[uint(uint8(value[i + 12] >> 4))];
          str[3+i*2] = alphabet[uint(uint8(value[i + 12] & 0x0f))];
      }
      return string(str);
  }

  function concat(string memory _s1, string memory _s2) private pure returns(string memory) {
    return string(abi.encodePacked(bytes(_s1), bytes(_s2)));
  }

  function role2string(Role role) private pure returns (string memory roleStr) {
    if(role == Role.Manager) {
      roleStr = "Manager";
    } else if (role == Role.Head) {
      roleStr = "Head";
    } else {
      roleStr = "Member";
    }
  }
  

  // events
  event Workers(string list);
  function getWorkers() public   {
    string memory str = "";
    for (uint i = 0; i < workersList.length; i++) {
      str = concat(str, "address:");
      str = concat(str, addressToString(workersList[i]));
      str = concat(str, ";");
      str = concat(str, "role:");
      str = concat(str, role2string(workers[workersList[i]].role));
      str = concat(str, "\n");
    }
    emit Workers(str);
  }
}
