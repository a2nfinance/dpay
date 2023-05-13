const { assert } = require('chai');
const { utils } = require('@aeternity/aeproject');

const EXAMPLE_CONTRACT_SOURCE = './contracts/DAO.aes';

describe('DAO', () => {
  let aeSdk;
  let contract;

  before(async () => {
    aeSdk = await utils.getSdk();

    // a filesystem object must be passed to the compiler if the contract uses custom includes
    const fileSystem = utils.getFilesystem(EXAMPLE_CONTRACT_SOURCE);

    // get content of contract
    const sourceCode = utils.getContractContent(EXAMPLE_CONTRACT_SOURCE);

    // initialize the contract instance
    contract = await aeSdk.initializeContract({ sourceCode, fileSystem });
    await contract.init(
      {
        owner: utils.getDefaultAccounts()[1].address,
        title: "hello",
        description: "hello",
        members: [utils.getDefaultAccounts()[1].address, utils.getDefaultAccounts()[2].address],
        percentage: 100,
        status: 1,
        open: true,
        created_date: new Date().getTime(),
        dao_type: 1,
        sub_daos: [],
        proposals: [],
        member_fund: [],
        contributor_fund: []
      }

    );

    // create a snapshot of the blockchain state
    await utils.createSnapshot(aeSdk);
  });

  // after each test roll back to initial state
  afterEach(async () => {
    await utils.rollbackSnapshot(aeSdk);
  });


  it('DAO: create a proposal & vote it', async () => {
    const created_proposal = await contract.create_proposal("hello", "hello", 1, [[utils.getDefaultAccounts()[1].address, 1], [utils.getDefaultAccounts()[2].address, 2]], 1, 1, { onAccount: utils.getDefaultAccounts()[1] })

    await contract.vote(0, true, { onAccount: utils.getDefaultAccounts()[2] });

    const { decodedResult } = await contract.get_proposals();
    assert.equal(decodedResult[0][1].voters.size, 1);
  });

  it('DAO: create a proposal & unvote it', async () => {
    const created_proposal = await contract.create_proposal("hello", "hello", 1, [[utils.getDefaultAccounts()[1].address, 1], [utils.getDefaultAccounts()[2].address, 2]], 1, 1, { onAccount: utils.getDefaultAccounts()[1] })

    await contract.vote(0, true, { onAccount: utils.getDefaultAccounts()[2] });

    await contract.vote(0, false, { onAccount: utils.getDefaultAccounts()[2] });

    const { decodedResult } = await contract.get_proposals();

    assert.equal(decodedResult[0][1].voters.get(utils.getDefaultAccounts()[2].address), false);
  });

  it('DAO: count voted members', async () => {
    const created_proposal = await contract.create_proposal("hello", "hello", 1, [[utils.getDefaultAccounts()[1].address, 1], [utils.getDefaultAccounts()[2].address, 2]], 1, 1, { onAccount: utils.getDefaultAccounts()[1] })

    await contract.vote(0, true, { onAccount: utils.getDefaultAccounts()[2] });
    await contract.vote(0, true, { onAccount: utils.getDefaultAccounts()[1] });

    const { decodedResult } = await contract.get_proposals();

    assert.equal(decodedResult[0][1].voters.size, 2);
  });

  it('DAO: only member can vote a proposal', async () => {
    const created_proposal = await contract.create_proposal("hello", "hello", 1, [[utils.getDefaultAccounts()[1].address, 1], [utils.getDefaultAccounts()[2].address, 2]], 1, 1, { onAccount: utils.getDefaultAccounts()[1] })

    try {
      await contract.vote(0, true, { onAccount: utils.getDefaultAccounts()[3] });
    } catch (e) {
      assert.exists(e.message);
    }

  });

  it('DAO: fund 1 ae ', async () => {
    const do_fund = await contract.fund({ onAccount: utils.getDefaultAccounts()[2], amount: 1 });
    const { decodedResult } = await contract.get();
    assert.equal(decodedResult.balance, 1)
  })

  it('DAO: Execute proposal when all members voted', async () => {
    await contract.fund({ onAccount: utils.getDefaultAccounts()[2], amount: 2 });

    await contract.create_proposal("Pay for address 3", "salary", 1, [[utils.getDefaultAccounts()[3].address, 1]], 0, 0, { onAccount: utils.getDefaultAccounts()[1] })

    await contract.vote(0, true, { onAccount: utils.getDefaultAccounts()[1] });
    await contract.vote(0, true, { onAccount: utils.getDefaultAccounts()[2] });

    let { decodedResult } = await contract.execute_proposal(0);

    assert.equal(decodedResult, 1);

  })


  it('DAO: Can not execute proposal when a proposal has not votes enough', async () => {
    await contract.fund({ onAccount: utils.getDefaultAccounts()[2], amount: 2 });

    await contract.create_proposal("Pay for address 3", "salary", 1, [[utils.getDefaultAccounts()[3].address, 1]], 0, 0, { onAccount: utils.getDefaultAccounts()[1] })

    await contract.vote(0, true, { onAccount: utils.getDefaultAccounts()[1] });
    try {
      let { decodedResult } = await contract.execute_proposal(0);
    } catch (e) {
      assert.exists(e.message);
    }


  })

  it('DAO: execute proposal with timelock', async () => {
    await contract.fund({ onAccount: utils.getDefaultAccounts()[2], amount: 2 });

    await contract.create_proposal("Pay for address 3", "salary", 2, [[utils.getDefaultAccounts()[3].address, 1]], new Date().getTime() + 200, 0, { onAccount: utils.getDefaultAccounts()[1] })

    await contract.vote(0, true, { onAccount: utils.getDefaultAccounts()[1] });
    await contract.vote(0, true, { onAccount: utils.getDefaultAccounts()[2] });

    let { decodedResult } = await contract.execute_proposal(0);

    assert.equal(decodedResult, 1)

  })

  it("DAO: add member", async () => {
    await contract.add_member(utils.getDefaultAccounts()[3].address, { onAccount: utils.getDefaultAccounts()[1] });
    let { decodedResult } = await contract.get_members();
    assert.equal(decodedResult.length, 3)
  })


  it("DAO: only owner can add member", async () => {
    try {
      await contract.add_member(utils.getDefaultAccounts()[3].address, { onAccount: utils.getDefaultAccounts()[2] });
    } catch (e) {
      assert.exists(e.message)
    }

  })

  it("DAO: remove member", async () => {
    await contract.remove_member(utils.getDefaultAccounts()[2].address, { onAccount: utils.getDefaultAccounts()[1] });
    let { decodedResult } = await contract.get_members();
    assert.equal(decodedResult.length, 1)
  })


  it("DAO: only owner can remove member", async () => {
    try {
      await contract.remove_member(utils.getDefaultAccounts()[2].address, { onAccount: utils.getDefaultAccounts()[2] });
    } catch (e) {
      assert.exists(e.message)
    }

  })


  it("DAO: leave dao", async () => {
    await contract.leave({ onAccount: utils.getDefaultAccounts()[2] });
    let { decodedResult } = await contract.get_members();
    assert.equal(decodedResult.length, 1)
  })

  it("DAO: change dao status", async () => {
    await contract.change_dao_status(2, { onAccount: utils.getDefaultAccounts()[1] });
    let { decodedResult } = await contract.get()
    assert.equal(decodedResult.status, 2)
  })

  it("DAO: could not change dao status if dao status is 3", async () => {
    await contract.change_dao_status(3, { onAccount: utils.getDefaultAccounts()[1] });
    let result = true;
    try {
      await contract.change_dao_status(2, { onAccount: utils.getDefaultAccounts()[1] });
    } catch (e) {
      result = false
    }

    let { decodedResult } = await contract.get()
    assert.equal(result, false)
  })

  it("DAO: change proposal status", async () => {
    await contract.fund({ onAccount: utils.getDefaultAccounts()[2], amount: 2 });

    await contract.create_proposal("Pay for address 3", "salary", 1, [[utils.getDefaultAccounts()[3].address, 1]], 0, 0, { onAccount: utils.getDefaultAccounts()[1] })

    await contract.change_proposal_status(0, 2, { onAccount: utils.getDefaultAccounts()[1] })

    let { decodedResult } = await contract.get_proposals();


    assert.equal(decodedResult[0][1].status, 2)
  })

  it("DAO: could not do something if DAO status is not active", async () => {
    await contract.change_dao_status(2, { onAccount: utils.getDefaultAccounts()[1] });
    try {
      await contract.create_proposal("hello", "hello", 1, [[utils.getDefaultAccounts()[1].address, 1], [utils.getDefaultAccounts()[2].address, 2]], 1, 1, { onAccount: utils.getDefaultAccounts()[1] })
    } catch(e) {
      assert.exists(e.message)
    }
  })

});
