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
            owner : utils.getDefaultAccounts()[1].address,
            title : "hello",
            description : "hello",
            members : [utils.getDefaultAccounts()[1].address, utils.getDefaultAccounts()[2].address],
            percentage: 100,
            status: 1,
            open: true,
            created_date: new Date().getTime(),
            dao_type: 1,
            sub_daos : [],
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

  it('Dao: create a proposal & vote it', async () => {
    const created_proposal = await contract.create_proposal("hello", "hello", 1, [[utils.getDefaultAccounts()[1].address, 1], [utils.getDefaultAccounts()[2].address, 2]], 1, 1, {onAccount: utils.getDefaultAccounts()[1]})
   
    const do_vote = await contract.vote(0, true, {onAccount: utils.getDefaultAccounts()[2]});

    const { decodedResult } = await contract.get_proposals();
    //console.log(decodedResult[0][1].voters);
    assert.equal(decodedResult.length, 1);
  });

  it('Dao: count vote', async () => {
    const created_proposal = await contract.create_proposal("hello", "hello", 1, [[utils.getDefaultAccounts()[1].address, 1], [utils.getDefaultAccounts()[2].address, 2]], 1, 1, {onAccount: utils.getDefaultAccounts()[1]})
   
    const do_vote = await contract.vote(0, true, {onAccount: utils.getDefaultAccounts()[2]});

   // const {decodedResult: excute_proposal_decodedResult} = await contract.execute_proposal(0, {onAccount: utils.getDefaultAccounts()[1]})

    const { decodedResult } = await contract.get_proposals();
    //console.log(decodedResult[0][1]);


    assert.equal(decodedResult.length, 1);
  });

  it('Dao: fund 1 ae ', async () => {
    const do_fund = await contract.fund({onAccount: utils.getDefaultAccounts()[2], amount: 1});
    const {decodedResult} = await contract.get();
    assert.equal(decodedResult.balance, 1)
  })

  it('Dao: fun the contract, create a payout proposal, vote, and execute proposal', async () => {
    await contract.fund({onAccount: utils.getDefaultAccounts()[2], amount: 2});
    
    await contract.create_proposal("Pay for address 3", "salary", 1, [[utils.getDefaultAccounts()[3].address, 1]], 0, 0, {onAccount: utils.getDefaultAccounts()[1]})
    
    await contract.vote(0, true, {onAccount: utils.getDefaultAccounts()[1]});
    await contract.vote(0, true, {onAccount: utils.getDefaultAccounts()[2]});

    let {decodedResult} = await contract.execute_proposal(0);

    assert.equal(decodedResult, 1)

  })

  it('Dao: fun the contract, create a payout proposal, vote, and execute proposal with timelock', async () => {
    await contract.fund({onAccount: utils.getDefaultAccounts()[2], amount: 2});
    
    await contract.create_proposal("Pay for address 3", "salary", 2, [[utils.getDefaultAccounts()[3].address, 1]], new Date().getTime() + 200, 0, {onAccount: utils.getDefaultAccounts()[1]})
    
    await contract.vote(0, true, {onAccount: utils.getDefaultAccounts()[1]});
    await contract.vote(0, true, {onAccount: utils.getDefaultAccounts()[2]});

    let {decodedResult} = await contract.execute_proposal(0);

    assert.equal(decodedResult, 1)

  })

});
