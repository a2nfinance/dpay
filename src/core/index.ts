import { AeSdkAepp, Node, walletDetector, BrowserWindowMessageConnection, CompilerHttp, AE_AMOUNT_FORMATS } from '@aeternity/aepp-sdk';
import { store } from "src/controller/store";
import { setProps } from 'src/controller/wallet/walletSlice';
import { DaoRegistryACI, DaoACI } from './aci';
import { setDaoProps } from 'src/controller/dao/daoSlice';
import { setDaoDetailProps } from 'src/controller/dao/daoDetailSlice';
const TESTNET_NODE_URL = process.env.NEXT_PUBLIC_TESTNET_NODE_URL;
const MAINNET_NODE_URL = process.env.NEXT_PUBLIC_MAINNET_NODE_URL;
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_DAO_REGISTRY_ADDRESS;
const COMPILER_URL = process.env.NEXT_PUBLIC_COMPILER_URL;

let aeSdk = null;
let walletConnected = false;
let daoRegistryContract = null;
let daoContract = null;
const initialize = async () => {
  if (aeSdk) return;
  aeSdk = new AeSdkAepp({
    name: 'DPAY',
    nodes: [
      { name: 'testnet', instance: new Node(TESTNET_NODE_URL) },
      { name: 'mainnet', instance: new Node(MAINNET_NODE_URL) },
    ],
    onCompiler: new CompilerHttp(COMPILER_URL),
    onNetworkChange: async ({ networkId }) => {
      const [{ name }] = (await aeSdk.getNodesInPool())
        .filter((node) => node.nodeNetworkId === networkId);
      aeSdk.selectNode(name);
      store.dispatch(setProps({
        att: "networkId",
        value: networkId
      }))

    },
    onAddressChange: ({ current }) => {
      store.dispatch(setProps({
        att: "address",
        value: Object.keys(current)[0]
      }))
    }
    ,
    onDisconnect: () => alert('Aepp is disconnected')
  });
  store.dispatch(setProps({
    att: "ready",
    value: true
  }))
  console.log("create aesdk")

}

const scanForWallets = async () => {
  if (!walletConnected) {
    const handleWallets = async ({ wallets, newWallet }) => {

      newWallet = newWallet || Object.values(wallets)[0]
      console.log(`Do you want to connect to wallet ${newWallet.info.name} with id ${newWallet.info.id}`)
      stopScan()
      let walletInfo = await aeSdk.connectToWallet(newWallet.getConnection())
      walletConnected = true
      const { address: { current } } = await aeSdk.subscribeAddress('subscribe', 'connected')

      store.dispatch(setProps({
        att: "address",
        value: Object.keys(current)[0]
      }))
    }
    const scannerConnection = new BrowserWindowMessageConnection()
    const stopScan = walletDetector(scannerConnection, handleWallets)
  }
}
const convertCtToAk = (address: string) => {
  return address.replace("ct", "ak");
}
const connect = async () => {
  await initialize()
  await scanForWallets()
  if (!daoRegistryContract) {
    daoRegistryContract = await aeSdk.initializeContract({ aci: DaoRegistryACI, address: CONTRACT_ADDRESS })
  }
}

const initReadDaoRegistryContract = async () => {
  await initialize()
  if (!daoRegistryContract) {
    daoRegistryContract = await aeSdk.initializeContract({ aci: DaoRegistryACI, address: CONTRACT_ADDRESS })
  }
}

const connectDao = async (daoAddress: string) => {
  await initialize()
  await scanForWallets()
  if (!daoContract) {
    daoContract = await aeSdk.initializeContract({ aci: DaoACI, address: daoAddress })
  }

}

const initReadDaoContract = async (daoAddress: string) => {
  await initialize()
  daoContract = await aeSdk.initializeContract({ aci: DaoACI, address: daoAddress })
}


const disconnect = async () => {
  await aeSdk.disconnectWallet()
  store.dispatch(setProps({
    att: "address",
    value: ""
  }))
  walletConnected = false
  //if (this.reverseIframe) this.reverseIframe.remove()
}

const getDaos = async () => {
  try {
    await initReadDaoRegistryContract();
    const tx = await daoRegistryContract.get_daos();
    console.log(tx.decodedResult);
    store.dispatch(setDaoProps({ att: "daos", value: tx.decodedResult }))
  } catch (e) {
    console.error(e)
  }

}

const getSubDaosOf = async () => {
  try {
    let currentDaoAddress = store.getState().daoDetail.currentDaoAddress;
    if (currentDaoAddress) {
      await initReadDaoRegistryContract();
      const tx = await daoRegistryContract.get_sub_daos_of(convertCtToAk(currentDaoAddress));
      console.log(tx.decodedResult);
      store.dispatch(setDaoDetailProps({ att: "sub_daos", value: tx.decodedResult }))
    }
   
  } catch (e) {
    console.error(e)
  }
}

const getDaoDetail = async (address: string) => {
  try {
    store.dispatch(setDaoDetailProps({ att: "currentDaoAddress", value: address }))
    await initReadDaoContract(address);
    const tx = await daoContract.get();
    //const tx = await contract.create_dao("hello", "hello", [], null);
    console.log(tx.decodedResult);
    store.dispatch(setDaoDetailProps({ att: "simpleData", value: tx.decodedResult }))
  } catch (e) {
    console.error(e)
  }

}

const createDAO = async (isSubDAo: boolean, parentDAO: string) => {
  let daoForm = store.getState().daoForm;
  await connect();
  if (!isSubDAo) {
    const tx = await daoRegistryContract.create_dao(
      daoForm.title,
      daoForm.description,
      daoForm.percentage,
      daoForm.open,
      daoForm.dao_type,
      daoForm.members.map(member => member.address),
      null
    );
    console.log(tx.decodedResult);
  } else {
    const tx = await daoRegistryContract.create_dao(
      daoForm.title,
      daoForm.description,
      daoForm.percentage,
      daoForm.open,
      daoForm.dao_type,
      Object.values(daoForm.members),
      parentDAO
    );
    console.log(tx.decodedResult);
  }
}

const createProposal = async (formValues: {
  title: string,
  payment_type: number,
  description: string,
  recipients: { address: string, amount: number }[],
  startTime?: number,
  stopTime?: number
}) => {
  let currentDaoAddress = store.getState().daoDetail.currentDaoAddress;
  if (currentDaoAddress) {
    await connectDao(currentDaoAddress);
    let startTime = 0;
    let stopTime = 0;
    if (formValues.payment_type === 2) {

      startTime = new Date(formValues.startTime).getTime();
    } else if (formValues.payment_type === 3) {
      startTime = new Date(formValues.startTime).getTime();
      stopTime = new Date(formValues.stopTime).getTime();
    }
    console.log(formValues.title,
      formValues.description,
      formValues.payment_type,
      formValues.recipients.map((recipient) => {
        return [recipient.address, recipient.amount]
      }),
      startTime,
      stopTime)
    const tx = await daoContract.create_proposal(
      formValues.title,
      formValues.description,
      formValues.payment_type,
      formValues.recipients.map((recipient) => {
        return [recipient.address, recipient.amount]
      }),
      startTime,
      stopTime
    );
    console.log(tx.decodedResult);
  }
}

const fundDao = async (amount: number) => {
  let currentDaoAddress = store.getState().daoDetail.currentDaoAddress;
  if (currentDaoAddress) {
    if (amount > 0) {
      await connectDao(currentDaoAddress);
      const tx = await daoContract.fund({ amount: amount, denomination: AE_AMOUNT_FORMATS.AE });
      console.log(tx.decodedResult);

    }
  }
}

const getDaoProposals = async () => {
  let currentDaoAddress = store.getState().daoDetail.currentDaoAddress;
  if (currentDaoAddress) {

    await initReadDaoContract(currentDaoAddress);
    const tx = await daoContract.get_proposals();
    console.log(tx.decodedResult);

    store.dispatch(setDaoDetailProps({ att: "proposals", value: tx.decodedResult }))

  }
}


const getMemberFund = async () => {
  let currentDaoAddress = store.getState().daoDetail.currentDaoAddress;
  if (currentDaoAddress) {

    await initReadDaoContract(currentDaoAddress);
    const tx = await daoContract.get_member_fund();
    console.log(tx.decodedResult);

    store.dispatch(setDaoDetailProps({ att: "member_fund", value: tx.decodedResult }))

  }
}


const getContributorFund = async () => {
  let currentDaoAddress = store.getState().daoDetail.currentDaoAddress;
  if (currentDaoAddress) {

    await initReadDaoContract(currentDaoAddress);
    const tx = await daoContract.get_contributor_fund();
    console.log(tx.decodedResult);

    store.dispatch(setDaoDetailProps({ att: "contributor_fund", value: tx.decodedResult }))

  }
}


const getMembers = async () => {
  let currentDaoAddress = store.getState().daoDetail.currentDaoAddress;
  if (currentDaoAddress) {

    await initReadDaoContract(currentDaoAddress);
    const tx = await daoContract.get_members();
    console.log(tx.decodedResult);

    store.dispatch(setDaoDetailProps({ att: "members", value: tx.decodedResult }))

  }
}

const addMember = async (address: string) => {
  let currentDaoAddress = store.getState().daoDetail.currentDaoAddress;
  if (currentDaoAddress) {

    await connectDao(currentDaoAddress);
    const tx = await daoContract.add_member(address);
    console.log(tx.decodedResult);

  }
}

const removeMember = async (address: string) => {
  let currentDaoAddress = store.getState().daoDetail.currentDaoAddress;
  if (currentDaoAddress) {

    await connectDao(currentDaoAddress);
    const tx = await daoContract.remove_member(address);
    console.log(tx.decodedResult);

  }
}

const updateDaoStatus = async (status: number) => {
  let currentDaoAddress = store.getState().daoDetail.currentDaoAddress;
  if (currentDaoAddress) {

    await connectDao(currentDaoAddress);
    const tx = await daoContract.change_dao_status(status);
    console.log(tx.decodedResult);

  }
}

const updateProposalStatus = async (index: number, status: number) => {
  let currentDaoAddress = store.getState().daoDetail.currentDaoAddress;
  if (currentDaoAddress) {

    await connectDao(currentDaoAddress);
    const tx = await daoContract.change_proposal_status(index, status);
    console.log(tx.decodedResult);

  }
}

const executeProposal = async (index: number) => {
  let currentDaoAddress = store.getState().daoDetail.currentDaoAddress;
  if (currentDaoAddress) {

    await connectDao(currentDaoAddress);
    const tx = await daoContract.execute_proposal(index);
    console.log(tx.decodedResult);

  }
}

export {
  aeSdk,
  connect,
  disconnect,
  getDaos,
  getDaoDetail,
  createDAO,
  getSubDaosOf,
  createProposal,
  fundDao,
  getDaoProposals,
  getMemberFund,
  getContributorFund,
  getMembers,
  addMember,
  removeMember,
  updateDaoStatus,
  updateProposalStatus,
  executeProposal
}