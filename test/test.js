let LiabilityLedger = artifacts.require("./Liability.sol");

let liabilityLedgerInstance;

let bookIdx = 1;


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
  it("Valid librarian registration by boss, valid members registration by librarians", function() {
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

  it("Librarian add a book", function() {
    return liabilityLedgerInstance.addBook(bookIdx, "Ibn Battuta Travels", { from: accounts[2]}).then(function (result) {
      // Manager is registering a department head
      return liabilityLedgerInstance.books(bookIdx)
    }).then(function(book) {
      assert.equal('Ibn Battuta Travels', book.title, 'Book added');
    });
  });

  it("Member requests a book", function() {
    return liabilityLedgerInstance.request(bookIdx, { from: accounts[4]}).then(function (result) {
      // Manager is registering a department head
      return liabilityLedgerInstance.requests(bookIdx)
    }).then(function(request){
      assert.equal(accounts[4], request.member, 'request by member 4');
      assert.equal(true, request.flag, 'book 1 is required');
    });
  });
  // it("Member 5 requests a book", function() {
  //   return liabilityLedgerInstance.request(bookIdx, { from: accounts[5]}).then(function (result) {
  //     // Manager is registering a department head
  //     assert.equal(accounts[5], liabilityLedgerInstance.requests[0].member, 'request by member 5');
  //     assert.equal(bookIdx, liabilityLedgerInstance.requests[bookIdx-1].book, 'book 1 is required');
  //   })
  // });

  // it("Librarian lend a book", function() {
  //   return liabilityLedgerInstance.lendBook(bookIdx, accounts[4], { from: accounts[2]}).then(function (result) {
  //     // Manager is registering a department head
  //     assert.equal(accounts[4], liabilityLedgerInstance.books[bookIdx-1].holder, 'Book is held by account 4');
  //   })
  // });

  // it("Member lends his borrowed book", function() {
  //   return liabilityLedgerInstance.offload(bookIdx, accounts[5], { from: accounts[4]}).then(function (result) {
  //     // Manager is registering a department head
  //     assert.equal(accounts[5], liabilityLedgerInstance.books[bookIdx-1].holder, 'Book is held by account 5');
  //   })
  // });

  // it("Librarian add a book", function() {
  //   return liabilityLedgerInstance.addBook({"name":"Another New book"}, { from: accounts[3]}).then(function (result) {
  //     // Manager is registering a department head
  //     assert.equal('Another New book', liabilityLedgerInstance.books[bookIdx].name, 'Book added');
  //   })
  // });


  // // // NEGATIVE CASES

  // //Negative Test case: registring dept head by non manager
  // it("member trying to register an address", function() {
  //   return liabilityLedgerInstance.register(accounts[6], { from: accounts[5]}).then(function (result) {
  //     throw("Manager or Librarians only can register members");
  // }).catch(function (e) {
  //   if(e === "Manager or Librarians only can register members") {
  //     assert(false);
  //   } else {
  //     assert(true);
  //   }
  // })
  // });

  // //Negative Test case: registring member who is registered already
  // it("member being reregistered", function() {
  //   return liabilityLedgerInstance.register(accounts[5], { from: accounts[2]}).then(function (result) {
  //     throw("member already registered");
  // }).catch(function (e) {
  //   if(e === "member already registered") {
  //     assert(false);
  //   } else {
  //     assert(true);
  //   }
  // })
  // });

  // it("Member add a book", function() {
  //   return liabilityLedgerInstance.addBook({"name":"Book should not be added"}, { from: accounts[4]}).then(function (result) {
  //     // Manager is registering a department head
  //     assert.equal(1, liabilityLedgerInstance.bookCount, 'Book not added');
  //   })
  // });

  // it("Member 5 requests book 2", function() {
  //   return liabilityLedgerInstance.request(bookIdx+1, { from: accounts[5]}).then(function (result) {
  //     // Manager is registering a department head
  //     assert.equal(accounts[5], liabilityLedgerInstance.requests[0].member, 'request by member 5');
  //     assert.equal(bookIdx+1, liabilityLedgerInstance.requests[0].book, 'book 2 is required');
  //   })
  // });

  // it("Librarian lend a non-requested book", function() {
  //   return liabilityLedgerInstance.lendBook(bookIdx+1, accounts[4], { from: accounts[2]}).then(function (result) {
  //     // Manager is registering a department head
  //     throw("Book is not requested by account 4");
  // }).catch(function (e) {
  //   if(e === "Book is not requested") {
  //     assert(false);
  //   } else {
  //     assert(true);
  //   }
  // })
  // });







  // ------------------------------------------------------------------------------------------------
});