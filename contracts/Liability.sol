pragma solidity >=0.4.21 <0.7.0;

contract Liability {

    struct Worker {
      bool init;
        uint role; // 1: manager, 2: dept head, 3: member
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

    // Create a new ballot with 4 different proposals.
    constructor () public {
      manager = msg.sender;
      workers[manager].init = true;
      workers[manager].role = 1;
      workers[manager].id = manager;
      workers[manager].boss = address(0);
    }

    function register(address toWorker) public{
      if (workers[toWorker].init ) revert ("Worker already initialized");
      if(workers[msg.sender].role == 3) revert ("Only Manager or Department head can register a user");
      workers[toWorker].init = true;
      workers[toWorker].boss = msg.sender;
      workers[toWorker].id = toWorker;
      if(msg.sender == manager) {
        workers[toWorker].role = 2;
      } else {
        // case : sender is department head
        workers[toWorker].role = 3;
      }
    }

    function requestSwitchDept(address toHead) public {
      if(workers[msg.sender].role == 0) revert("This account is not a worker's account");
      if(workers[msg.sender].role != 3) revert("Must be a member role");
      if(workers[msg.sender].boss == toHead)  revert("You can not request switching to the same department");
      if(workers[toHead].role != 2) revert("Member allowed to switch to a new Head only");
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

  // events
  event NewWorker(uint role, address boss);
  function getWorker(address add) public{
    emit NewWorker(workers[add].role, workers[add].boss);
  }
}
