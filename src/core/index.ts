import { AeSdkAepp, Node, walletDetector, BrowserWindowMessageConnection, CompilerHttp, AE_AMOUNT_FORMATS, toAe, formatAmount } from '@aeternity/aepp-sdk';
import { store } from "src/controller/store";
import { setProps } from 'src/controller/wallet/walletSlice';
import { DaoRegistryACI, DaoACI } from './aci';
import { setDaoProps } from 'src/controller/dao/daoSlice';
import { setDaoDetailProps } from 'src/controller/dao/daoDetailSlice';
import Router from 'next/router';
import { notification } from 'antd';
import { actionNames, processKeys, updateProcessStatus } from 'src/controller/process/processSlice';

const NETWORK_TYPE = process.env.NEXT_PUBLIC_NETWORK_TYPE;
const TESTNET_NODE_URL = process.env.NEXT_PUBLIC_TESTNET_NODE_URL;
const MAINNET_NODE_URL = process.env.NEXT_PUBLIC_MAINNET_NODE_URL;
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_DAO_REGISTRY_ADDRESS;
const COMPILER_URL = process.env.NEXT_PUBLIC_COMPILER_URL;


let node = (NETWORK_TYPE === "testnet" ? { name: 'testnet', instance: new Node(TESTNET_NODE_URL) } : { name: 'mainnet', instance: new Node(MAINNET_NODE_URL) });

let aeSdk = null;
let walletConnected = false;
let daoRegistryContract = null;
let daoContract = null;
/**
 * 
 * @param title 
 * @param description 
 * @param messageType success, error, info, warning, open, destroy
 * @param fn 
 */
const MESSAGE_TYPE = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "INFO",
  WARNING: "warning",
  OPEN: "open",
  DESTROY: "destroy"
}
const openNotification = (title: string, description: string, messageType: string, fn?: () => void) => {
  let config = {
    message: title,
    description: description,
    onClick: () => {
      fn()
    }
  }

  switch (messageType) {
    case MESSAGE_TYPE.OPEN:
      notification.open(config);
      break;
    case MESSAGE_TYPE.INFO:
      notification.info(config);
      break;
    case MESSAGE_TYPE.SUCCESS:
      notification.success(config);
      break;
    case MESSAGE_TYPE.ERROR:
      notification.error(config);
      break;
    case MESSAGE_TYPE.WARNING:
      notification.warning(config);
      break;
    default:
      notification.open(config);
      break;
  }


};

const initialize = async () => {
  try {
    if (aeSdk) return;
    aeSdk = new AeSdkAepp({
      name: 'DPAY',
      nodes: [
        node
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
      onDisconnect: () => openNotification("Disconnected", "Disconnected from Hero Wallet", "warning", () => { })
    });
    store.dispatch(setProps({
      att: "ready",
      value: true
    }))
    console.log("create aesdk")
  } catch (e) {
    openNotification("Init SDK", e.message, MESSAGE_TYPE.ERROR, () => { })
  }


}

const scanForWallets = async () => {
  try {
    if (!walletConnected) {
      const handleWallets = async ({ wallets, newWallet }) => {

        newWallet = newWallet || Object.values(wallets)[0]
        console.log(`Do you want to connect to wallet ${newWallet.info.name} with id ${newWallet.info.id}`)
        stopScan()

        await aeSdk.connectToWallet(newWallet.getConnection())

        walletConnected = true
        const { address: { current } } = await aeSdk.subscribeAddress('subscribe', 'connected')

        store.dispatch(setProps({
          att: "address",
          value: Object.keys(current)[0]
        }))
      }
      const scannerConnection = new BrowserWindowMessageConnection();
      const stopScan = walletDetector(scannerConnection, handleWallets);
    }
  } catch (e) {
    openNotification("Connect wallet", e.message, MESSAGE_TYPE.ERROR, () => { })
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
      store.dispatch(setDaoDetailProps({ att: "subDaos", value: tx.decodedResult }))
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

const createDAO = async () => {
  try {
    let daoForm = store.getState().daoForm;
    store.dispatch(updateProcessStatus({
      actionName: actionNames.createDao,
      att: processKeys.processing,
      value: true
    }))
    await connect();
    const tx = await daoRegistryContract.create_dao(
      daoForm.title,
      daoForm.description,
      daoForm.percentage,
      daoForm.open,
      daoForm.dao_type,
      daoForm.members.map(member => member.address),
      null
    );
    openNotification("Create DAO", `Create ${daoForm.title} successful`, MESSAGE_TYPE.SUCCESS, () => { })
    //Reload DAOs
    getDaos();
  } catch (e) {
    openNotification("Create DAO", e.message, MESSAGE_TYPE.ERROR, () => { })
  }

  store.dispatch(updateProcessStatus({
    actionName: actionNames.createDao,
    att: processKeys.processing,
    value: false
  }))

}


const createSubDAO = async () => {
  try {
    let { currentDaoAddress, simpleData } = store.getState().daoDetail;
    let { title, description, members } = store.getState().subDaoForm;
    store.dispatch(updateProcessStatus({
      actionName: actionNames.createSubDao,
      att: processKeys.processing,
      value: true
    }))
    await connect();
    const tx = await daoRegistryContract.create_dao(
      title,
      description,
      simpleData.percentage,
      simpleData.open,
      simpleData.dao_type,
      members,
      convertCtToAk(currentDaoAddress)
    );
    openNotification("Create SubDao", `Create SubDao successful`, MESSAGE_TYPE.SUCCESS, () => { })
    // Reload subdao list
    getSubDaosOf();
  } catch (e) {
    openNotification("Create SubDao", e.message, MESSAGE_TYPE.ERROR, () => { })
  }
  store.dispatch(updateProcessStatus({
    actionName: actionNames.createSubDao,
    att: processKeys.processing,
    value: false
  }))

}

const createProposal = async (formValues: {
  title: string,
  payment_type: number,
  description: string,
  recipients: { address: string, amount: number }[],
  start_time?: string,
  stop_time?: string
}) => {
  try {
    let currentDaoAddress = store.getState().daoDetail.currentDaoAddress;
    if (currentDaoAddress) {
      store.dispatch(updateProcessStatus({
        actionName: actionNames.createProposal,
        att: processKeys.processing,
        value: true
      }))
      await connectDao(currentDaoAddress);
      let startTime = 0;
      let stopTime = 0;
      if (formValues.payment_type === 2) {

        startTime = new Date(formValues.start_time).getTime();
      } else if (formValues.payment_type === 3) {
        startTime = new Date(formValues.start_time).getTime();
        stopTime = new Date(formValues.stop_time).getTime();
      }
      console.log(formValues.title,
        formValues.description,
        formValues.payment_type,
        formValues.recipients.map((recipient) => {
          return [recipient.address, formatAmount(recipient.amount, { denomination: AE_AMOUNT_FORMATS.AE })]
        }),
        startTime,
        stopTime)
      const tx = await daoContract.create_proposal(
        formValues.title,
        formValues.description,
        formValues.payment_type,
        formValues.recipients.map((recipient) => {
          return [recipient.address, formatAmount(recipient.amount, { denomination: AE_AMOUNT_FORMATS.AE })]
        }),
        startTime,
        stopTime
      );
      console.log(tx.decodedResult);

      openNotification("Create Proposal", `Create Proposal Successful`, MESSAGE_TYPE.SUCCESS, () => { })
      // Reload proposals list
      getDaoProposals()
    }
  } catch (e) {
    openNotification("Create Proposal", e.message, MESSAGE_TYPE.ERROR, () => { })
  }
  store.dispatch(updateProcessStatus({
    actionName: actionNames.createProposal,
    att: processKeys.processing,
    value: false
  }))
}

const fundDao = async (amount: number) => {
  try {
    let currentDaoAddress = store.getState().daoDetail.currentDaoAddress;
    if (currentDaoAddress) {
      if (amount > 0) {
        store.dispatch(updateProcessStatus({
          actionName: actionNames.addFund,
          att: processKeys.processing,
          value: true
        }))

        await connectDao(currentDaoAddress);
        const tx = await daoContract.fund({ amount: amount, denomination: AE_AMOUNT_FORMATS.AE });
        console.log(tx.decodedResult);
        openNotification("Add Fund", `Add ${amount} AE successful`, MESSAGE_TYPE.SUCCESS, () => { })
        // Reload fund
        await getDaoDetail(currentDaoAddress)
        getContributorFund()
        getMemberFund()
      }
    }
  } catch (e) {
    openNotification("Add Fund", e.message, MESSAGE_TYPE.ERROR, () => { })
  }

  store.dispatch(updateProcessStatus({
    actionName: actionNames.addFund,
    att: processKeys.processing,
    value: false
  }))
}

const getDaoProposals = async () => {
  try {
    let currentDaoAddress = store.getState().daoDetail.currentDaoAddress;
    if (currentDaoAddress) {

      await initReadDaoContract(currentDaoAddress);
      const tx = await daoContract.get_proposals();
      store.dispatch(setDaoDetailProps({ att: "proposals", value: tx.decodedResult }))
    }
  } catch (e) {
    openNotification("Get Proposal", e.message, MESSAGE_TYPE.ERROR, () => { })
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
  try {
    let currentDaoAddress = store.getState().daoDetail.currentDaoAddress;
    if (currentDaoAddress) {
      store.dispatch(updateProcessStatus({
        actionName: actionNames.addMember,
        att: processKeys.processing,
        value: true
      }))
      await connectDao(currentDaoAddress);
      const tx = await daoContract.add_member(address);
      console.log(tx.decodedResult);
      openNotification("Add Member", `Add new member "${address}" successful`, MESSAGE_TYPE.SUCCESS, () => { })
      // Reload member list
      getDaoDetail(currentDaoAddress)
      getMembers();
    }
  } catch (e) {
    openNotification("Add Member", e.message, MESSAGE_TYPE.ERROR, () => { })
  }

  store.dispatch(updateProcessStatus({
    actionName: actionNames.addMember,
    att: processKeys.processing,
    value: false
  }))
}

const removeMember = async (address: string) => {
  try {
    let currentDaoAddress = store.getState().daoDetail.currentDaoAddress;
    if (currentDaoAddress) {
      store.dispatch(updateProcessStatus({
        actionName: actionNames.removeMember,
        att: processKeys.processing,
        value: true
      }))
      await connectDao(currentDaoAddress);
      const tx = await daoContract.remove_member(address);
      console.log(tx.decodedResult);
      openNotification("Remove Member", `Remove member "${address}" successful`, MESSAGE_TYPE.SUCCESS, () => { })
      // Reload member list
      getDaoDetail(currentDaoAddress)
      getMembers();
    }
  } catch (e) {
    openNotification("Remove Member", e.message, MESSAGE_TYPE.ERROR, () => { })
  }

  store.dispatch(updateProcessStatus({
    actionName: actionNames.removeMember,
    att: processKeys.processing,
    value: false
  }))

}
const joinDao = async (address: string) => {
  try {

    store.dispatch(updateProcessStatus({
      actionName: actionNames.join,
      att: processKeys.processing,
      value: true
    }))
    await connectDao(address);
    const tx = await daoContract.join();
    console.log(tx.decodedResult);
    openNotification("Join Dao", `You joined successful`, MESSAGE_TYPE.SUCCESS, () => { })

  } catch (e) {
    openNotification("Join Dao", e.message, MESSAGE_TYPE.ERROR, () => { })
  }

  store.dispatch(updateProcessStatus({
    actionName: actionNames.join,
    att: processKeys.processing,
    value: false
  }))
}

const leaveDao = async () => {
  try {
    let currentDaoAddress = store.getState().daoDetail.currentDaoAddress;
    store.dispatch(updateProcessStatus({
      actionName: actionNames.leave,
      att: processKeys.processing,
      value: true
    }))
    await connectDao(currentDaoAddress);
    const tx = await daoContract.leave();
    console.log(tx.decodedResult);
    openNotification("Leave Dao", `You left successful`, MESSAGE_TYPE.SUCCESS, () => { })
    // Reload member list
    getDaoDetail(currentDaoAddress)
    getMembers();
  } catch (e) {
    openNotification("Leave Dao", e.message, MESSAGE_TYPE.ERROR, () => { })
  }

  store.dispatch(updateProcessStatus({
    actionName: actionNames.leave,
    att: processKeys.processing,
    value: false
  }))
}

const vote = async (index: number, vote_value: boolean) => {
  try {
    let currentDaoAddress = store.getState().daoDetail.currentDaoAddress;
    if (currentDaoAddress) {
      store.dispatch(updateProcessStatus({
        actionName: actionNames.vote,
        att: processKeys.processing,
        value: true
      }))
      await connectDao(currentDaoAddress);
      const tx = await daoContract.vote(index, vote_value);
      console.log(tx.decodedResult);
      openNotification("Vote", `Vote successful`, MESSAGE_TYPE.SUCCESS, () => { })
      // Reload Dao Proposals
      getDaoProposals()
    }
  } catch (e) {
    openNotification("Vote", e.message, MESSAGE_TYPE.ERROR, () => { })
  }

  store.dispatch(updateProcessStatus({
    actionName: actionNames.vote,
    att: processKeys.processing,
    value: false
  }))
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
  try {
    let currentDaoAddress = store.getState().daoDetail.currentDaoAddress;
    if (currentDaoAddress) {
      store.dispatch(updateProcessStatus({
        actionName: actionNames.executeProposal,
        att: processKeys.processing,
        value: true
      }))
      await connectDao(currentDaoAddress);
      const tx = await daoContract.execute_proposal(index);
      console.log(tx.decodedResult);
      openNotification("Execute proposal", `Execute proposal successful`, MESSAGE_TYPE.SUCCESS, () => { })
      // Reload proposal list
      await getDaoDetail(currentDaoAddress)
      getDaoProposals()
    }
  } catch (e) {
    openNotification("Execute proposal", e.message, MESSAGE_TYPE.ERROR, () => { })
  }
  store.dispatch(updateProcessStatus({
    actionName: actionNames.executeProposal,
    att: processKeys.processing,
    value: false
  }))
}

export {
  aeSdk,
  connect,
  disconnect,
  getDaos,
  getDaoDetail,
  createDAO,
  createSubDAO,
  getSubDaosOf,
  createProposal,
  fundDao,
  getDaoProposals,
  getMemberFund,
  getContributorFund,
  getMembers,
  addMember,
  joinDao,
  leaveDao,
  removeMember,
  vote,
  updateDaoStatus,
  updateProposalStatus,
  executeProposal
}