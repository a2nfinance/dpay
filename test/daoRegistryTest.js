const { assert } = require('chai');
const { utils } = require('@aeternity/aeproject');

const EXAMPLE_CONTRACT_SOURCE = './contracts/DAORegistry.aes';

describe('DAORegistry', () => {
  let aeSdk;
  let contract;
  let daoContract;

  before(async () => {
    aeSdk = await utils.getSdk();

    // a filesystem object must be passed to the compiler if the contract uses custom includes
    const fileSystem = utils.getFilesystem(EXAMPLE_CONTRACT_SOURCE);

    // get content of contract
    const sourceCode = utils.getContractContent(EXAMPLE_CONTRACT_SOURCE);

    // initialize the contract instance
    contract = await aeSdk.initializeContract({ sourceCode, fileSystem });
    await contract.init();

    // create a snapshot of the blockchain state
    await utils.createSnapshot(aeSdk);
  });

  // after each test roll back to initial state
  afterEach(async () => {
    await utils.rollbackSnapshot(aeSdk);
  });

  it('DaoRegistry: create a DAO', async () => {
    await contract.create_dao("hello", "hello", 100, true, 1, [utils.getDefaultAccounts()[1].address, utils.getDefaultAccounts()[2].address], null, {onAccount: utils.getDefaultAccounts()[1]})

    const { decodedResult } = await contract.get_daos();
    assert.equal(decodedResult.length, 1);
  });

  it('DaoRegistry: get empty list when not set before', async () => {
    const { decodedResult } = await contract.get_daos();
    assert.equal(decodedResult.length, 0);
  });

  it('DAORegistry: create two daos', async () => {
    // The first DAO contract
    await contract.create_dao("hello", "hello", 100, true, 1, [utils.getDefaultAccounts()[1].address, utils.getDefaultAccounts()[2].address], null, {onAccount: utils.getDefaultAccounts()[1]})
    // Use Chain Clone
    await contract.create_dao("hello", "hello", 100, true, 1, [utils.getDefaultAccounts()[1].address, utils.getDefaultAccounts()[2].address], null, {onAccount: utils.getDefaultAccounts()[2]})
    const { decodedResult } = await contract.get_daos();
    assert.equal(decodedResult.length, 2);
  })

  it("DAORegistry: create sub dao", async ()=> {
    await contract.create_dao("hello", "hello", 100, true, 1, [utils.getDefaultAccounts()[1].address, utils.getDefaultAccounts()[2].address], null, {onAccount: utils.getDefaultAccounts()[1]})
    const { decodedResult } = await contract.get_daos();
    console.log(decodedResult);
    await contract.create_dao(
      "hello", 
      "hello", 
      100, 
      true, 
      1, 
      [utils.getDefaultAccounts()[1].address, 
      utils.getDefaultAccounts()[2].address], 
      decodedResult[0][0], 
      {onAccount: utils.getDefaultAccounts()[1]}
      )
    const res = await contract.get_daos();
    console.log(res.decodedResult);
    assert.equal(res.decodedResult.length, 2);
  })
});
