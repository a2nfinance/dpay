const { AeSdk, MemoryAccount, Node, CompilerHttp } = require('@aeternity/aepp-sdk')
const { utils } = require('@aeternity/aeproject');

require('dotenv').config()


const node = new Node('https://testnet.aeternity.io') // ideally host your own node
const account = new MemoryAccount(process.env.SECRET_KEY)

const aeSdk = new AeSdk({
    nodes: [{ name: 'testnet', instance: node }],
    accounts: [account],
    onCompiler: new CompilerHttp('https://v7.compiler.stg.aepps.com'), // ideally host your own compiler
})

const CONTRACT_SOURCE = './contracts/DAORegistry.aes';

// a filesystem object must be passed to the compiler if the contract uses custom includes
const fileSystem = utils.getFilesystem(CONTRACT_SOURCE);

// get content of contract
const sourceCode = utils.getContractContent(CONTRACT_SOURCE);

const main = async () => {
    // initialize the contract instance
    const contract = await aeSdk.initializeContract({ sourceCode, fileSystem });

    const tx = await contract.init()

    console.log(tx)
}

main();