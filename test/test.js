let LiabilityLedger = artifacts.require("./Liability.sol");

let liabilityLedgerInstance;



contract('Liability Ledger Contract', function (accounts) {
  //accounts[0] is the default account
  //Test case 1
  it("Contract deployment", function() {
    return LiabilityLedger.deployed().then(function (instance) {
      liabilityLedgerInstance = instance;
      assert(liabilityLedgerInstance !== undefined, 'Liability Ledger contract should be defined');
    });
  });

  //Test case: registration
  it("Valid worker registration by boss", function() {
    return liabilityLedgerInstance.register(accounts[2], { from: accounts[0]}).then(function (result) {
      // Manager is registering a department head
      assert.equal('0x01', result.receipt.status, 'Registration is valid');
      return liabilityLedgerInstance.register(accounts[3], { from: accounts[0]});
    }).then(function (result) {
      // Manager is registering a department head
      assert.equal('0x01', result.receipt.status, 'Registration is valid');
      return liabilityLedgerInstance.register(accounts[4], { from: accounts[2]});
    }).then(function (result) {
      // Department head is registering a member
      assert.equal('0x01', result.receipt.status, 'Registration is valid');
      return liabilityLedgerInstance.register(accounts[5], { from: accounts[3]});
    }).then(function (result) {
      // Department head is registering a member
      assert.equal('0x01', result.receipt.status, 'Registration is valid');
    });
  });

  // Test case: requesting department switch
  it("Switching between two bosses", function() {
    return liabilityLedgerInstance.requestSwitchDept(accounts[3], {from: accounts[4]}).then(function (result) {
      assert.equal('0x01', result.receipt.status, 'Request initiated');
      return liabilityLedgerInstance.agreeToRequest(accounts[4], {from: accounts[2]});
    }).then(function (result) {
      assert.equal('0x01', result.receipt.status, 'Request accepted by current boss');
      return liabilityLedgerInstance.agreeToRequest(accounts[4], {from: accounts[3]});
    }).then(function (result) {
      assert.equal('0x01', result.receipt.status, 'Request accepted by new boss');
      // TODO: Check proper way to call this
      return liabilityLedgerInstance.workers.call(accounts[4]);
    }).then(function (result) {
      assert.equal(accounts[3], result.boss, 'New Boss is now the boss of worker # 4');
    });
  });

  // //Test case: Manager ceding her role
  // it("Manager is ceding his/her role", function() {
  //   return liabilityLedgerInstance.transferManagement(accounts[1], {from: accounts[0]}).then(function (result) {
  //     assert.equal('0x01', result.receipt.status, 'Manager Transferred management');
  //     return liabilityLedgerInstance.manager.call();
  //   }).then(function (result) {
  //     // TODO: check if accounts[1] is proper to be used in this equality relation
  //     assert.equal(accounts[1], result[0], 'New Boss is now manager');
  //   });
  // });


  // // NEGATIVE CASES

  //Negative Test case: registring dept head by non manager
  it("Worker registered by non-manager or non dept head", function() {
    return liabilityLedgerInstance.register(accounts[6], { from: accounts[5]}).then(function (result) {
      throw("Manager or Dept head only can register workers");
  }).catch(function (e) {
    if(e === "Manager or Dept head only can register workers") {
      assert(false);
    } else {
      assert(true);
    }
  })
  });

  //Negative Test case: registring worker who is having a boss already
  it("Worker, who is already having a boss, being reregistered", function() {
    return liabilityLedgerInstance.register(accounts[5], { from: accounts[2]}).then(function (result) {
      throw("Worker already having a boss");
  }).catch(function (e) {
    if(e === "Worker already having a boss") {
      assert(false);
    } else {
      assert(true);
    }
  })
  });

  //Negative Test case: requesting department switch by bossless worker
  it("Requesting department switch by bossless worker", function() {
    return liabilityLedgerInstance.requestSwitchDept(accounts[2], { from: accounts[6]}).then(function (result) {
      throw("Worker not having a boss");
  }).catch(function (e) {
    if(e === "Worker not having a boss") {
      assert(false);
    } else {
      assert(true);
    }
  })
  });
  //Negative Test case: requesting department switch by dept head
  it("Requesting department switch by dept head", function() {
    return liabilityLedgerInstance.requestSwitchDept(accounts[2], { from: accounts[3]}).then(function (result) {
      throw("Worker is a dept head");
  }).catch(function (e) {
    if(e === "Worker is a dept head") {
      assert(false);
    } else {
      assert(true);
    }
  })
  });

  //Negative Test case: Requesting department switch by manager
  it("Requesting department switch by manager", function() {
    return liabilityLedgerInstance.requestSwitchDept(accounts[2], { from: accounts[1]}).then(function (result) {
      throw("Worker is a Manager");
  }).catch(function (e) {
    if(e === "Worker is a Manager") {
      assert(false);
    } else {
      assert(true);
    }
  })
  });

  //Negative Test case: requesting department switch to same department
  it("Requesting department switch to same department", function() {
    return liabilityLedgerInstance.requestSwitchDept(accounts[3], { from: accounts[4]}).then(function (result) {
      throw("Worker is already in dept");
  }).catch(function (e) {
    if(e === "Worker is already in dept") {
      assert(false);
    } else {
      assert(true);
    }
  })
  });

  //Negative Test case: Head #7 instead of Head #3 agrees to request with head # 2 
  it("Requesting department switch to same department", function() {
    // manager registers new head
    liabilityLedgerInstance.register(accounts[7], { from: accounts[1]});
    return liabilityLedgerInstance.requestSwitchDept(accounts[3], { from: accounts[4]}).then(function (result) {
      return liabilityLedgerInstance.agreeToRequest(requester, {from: accounts[7]});
  }).then(function(result){
    throw("Head #7 can not agree to this request");
  })
  .catch(function (e) {
    if(e === "Head #7 can not agree to this request") {
      assert(false);
    } else {
      assert(true);
    }
  });
  });

  // //Negative Test case: a non manager ceding manager role
  // it("False Manager (previous manager) is ceding his/her supposedly manager role", function() {
  //   return liabilityLedgerInstance.transferManagement(accounts[8], {from: accounts[1]}).then(function (result) {
  //     throw("Worker #1 is not supposed to be manager");
  //   }).catch(function (e) {
  //     if(e === "Worker #1 is not supposed to be manager") {
  //       assert(false);
  //     } else {
  //       assert(true);
  //     }
  //   });
  // });


  // ------------------------------------------------------------------------------------------------
});