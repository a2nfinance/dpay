import { AeSdkAepp, Node, walletDetector, BrowserWindowMessageConnection, CompilerHttp } from '@aeternity/aepp-sdk';
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

const connect = async () => {
  await initialize()
  await scanForWallets()
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
    await initialize();
    let contract = await aeSdk.initializeContract({ aci: DaoRegistryACI, address: CONTRACT_ADDRESS })
    const tx = await contract.get_daos();
    store.dispatch(setDaoProps({ att: "daos", value: tx.decodedResult }))
  } catch (e) {
    console.error(e)
  }

}

const getDaoDetail = async (address: string) => {
  try {
    store.dispatch(setDaoDetailProps({ att: "currentDaoAddress", value: address }))
    await initialize();
    let contract = await aeSdk.initializeContract({ aci: DaoACI, address: address })
    const tx = await contract.get();
    //const tx = await contract.create_dao("hello", "hello", [], null);
    console.log(tx.decodedResult);
    store.dispatch(setDaoDetailProps({ att: "daos", value: tx.decodedResult }))
  } catch (e) {
    console.error(e)
  }

}

const transfer = async () => {
  let returnValue = await aeSdk.spend(1, "ak_2JCYGyR1aqXuzHV35m5fnbKagmEQrgwwLnLaxCgUpT59VBjs55", { denomination: 'ae' });
  console.log(returnValue);
  console.log(returnValue.hash);
  return returnValue.hash;
}

const createDAO = async (isSubDAo: boolean, parentDAO: string) => {
  let daoForm = store.getState().daoForm;
  await initialize();
  await scanForWallets();
  let contract = await aeSdk.initializeContract({ aci: DaoRegistryACI, address: CONTRACT_ADDRESS })
  if (!isSubDAo) {
    console.log(daoForm.title,
      daoForm.description,
      daoForm.percentage,
      daoForm.open,
      daoForm.dao_type,
      daoForm.members.map(member => member.address)
    );
    const tx = await contract.create_dao(
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
    const tx = await contract.create_dao(
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



export {
  aeSdk,
  transfer,
  connect,
  disconnect,
  getDaos,
  getDaoDetail,
  createDAO
}