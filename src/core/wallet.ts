import { AeSdkAepp, Node, walletDetector, BrowserWindowMessageConnection } from '@aeternity/aepp-sdk';
import { store } from "src/controller/store";
import { setProps } from 'src/controller/wallet/walletSlice';

const TESTNET_NODE_URL = process.env.NEXT_PUBLIC_TESTNET_NODE_URL;
const MAINNET_NODE_URL = process.env.NEXT_PUBLIC_MAINNET_NODE_URL;
const COMPILER_URL = process.env.NEXT_PUBLIC_COMPILER_URL;

console.log(TESTNET_NODE_URL, MAINNET_NODE_URL,COMPILER_URL)

let aeSdk = null;

const initialize = async () => {
  if (aeSdk) return;
  aeSdk = new AeSdkAepp({
    name: 'DPAY',
    nodes: [
      { name: 'testnet', instance: new Node(TESTNET_NODE_URL) },
      { name: 'mainnet', instance: new Node(MAINNET_NODE_URL) },
    ],
    //@ts-ignore
    compilerUrl: COMPILER_URL,
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
}

const scanForWallets = async () => {
  const handleWallets = async ({ wallets, newWallet }) => {
    newWallet = newWallet || Object.values(wallets)[0]
    if (confirm(`Do you want to connect to wallet ${newWallet.info.name} with id ${newWallet.info.id}`)) {
      console.log('newWallet', newWallet)
      stopScan()
      let walletInfo = await aeSdk.connectToWallet(newWallet.getConnection())
      let walletConnected = true
      const { address: { current } } = await aeSdk.subscribeAddress('subscribe', 'connected')

      store.dispatch(setProps({
        att: "address",
        value: Object.keys(current)[0]
      }))

      //resolve(true)
    }
  }
  const scannerConnection = new BrowserWindowMessageConnection()
  const stopScan = walletDetector(scannerConnection, handleWallets)


}

const connect = async () => {
  initialize()
  scanForWallets()
}

const disconnect = async () => {
  await aeSdk.disconnectWallet()
  store.dispatch(setProps({
    att: "address",
    value: ""
  }))
  //this.walletConnected = false
  //if (this.reverseIframe) this.reverseIframe.remove()
}

const transfer = async () => {
  let returnValue = await aeSdk.spend(1, "ak_2JCYGyR1aqXuzHV35m5fnbKagmEQrgwwLnLaxCgUpT59VBjs55", { denomination: 'ae' });
  console.log(returnValue);
  console.log(returnValue.hash);
  return returnValue.hash;
}

export {
  aeSdk,
  transfer,
  connect,
  disconnect
}


// export default (store) => {
//   let aeSdk;

//   store.registerModule('aeSdk', {
//     namespaced: true,
//     getters: {
//       aeSdk: ({ ready }) => (ready ? aeSdk : undefined),
//     },
//     state: {
//       ready: false,
//       address: undefined,
//       networkId: undefined,
//     },
//     mutations: {
//       markAsReady(state) {
//         state.ready = true;
//       },
//       setAddress(state, address) {
//         state.address = address;
//       },
//       setNetworkId(state, networkId) {
//         state.networkId = networkId;
//       },
//     },
//     actions: {
//       async initialize({ commit }) {
//         if (aeSdk) return;
//         aeSdk = new AeSdkAepp({
//           name: 'Simple æpp',
//           nodes: [
//             { name: 'testnet', instance: new Node(TESTNET_NODE_URL) },
//             { name: 'mainnet', instance: new Node(MAINNET_NODE_URL) },
//           ],
//           //compilerUrl: COMPILER_URL,
//           onNetworkChange: async ({ networkId }) => {
//             const [{ name }] = (await aeSdk.getNodesInPool())
//               .filter((node) => node.nodeNetworkId === networkId);
//             aeSdk.selectNode(name);
//             commit('setNetworkId', networkId);
//           },
//           onAddressChange: ({ current }) => commit('setAddress', Object.keys(current)[0]),
//           onDisconnect: () => alert('Aepp is disconnected'),
//         });
//         commit('markAsReady');
//       },
//       async scanForWallets () {
//         return new Promise((resolve) => {
//           const handleWallets = async ({ wallets, newWallet }) => {
//             newWallet = newWallet || Object.values(wallets)[0]
//             if (confirm(`Do you want to connect to wallet ${newWallet.info.name} with id ${newWallet.info.id}`)) {
//               console.log('newWallet', newWallet)
//               stopScan()
//               this.walletInfo = await this.aeSdk.connectToWallet(newWallet.getConnection())
//               this.walletConnected = true
//               const { address: { current } } = await this.aeSdk.subscribeAddress('subscribe', 'connected')
//               this.$store.commit('aeSdk/setAddress', Object.keys(current)[0])
//               resolve(true)
//             }
//           }
//           const scannerConnection = new BrowserWindowMessageConnection()
//           const stopScan = walletDetector(scannerConnection, handleWallets)
//         })
//       },
//       async connect () {
//         if (this.connectMethod === 'reverse-iframe') {
//           this.reverseIframe = document.createElement('iframe')
//           this.reverseIframe.src = this.reverseIframeWalletUrl
//           this.reverseIframe.style.display = 'none'
//           document.body.appendChild(this.reverseIframe)
//         }
//         await this.$store.dispatch('aeSdk/initialize')
//         await this.scanForWallets()
//       },
//       async disconnect () {
//         await this.aeSdk.disconnectWallet()
//         this.walletConnected = false
//         if (this.reverseIframe) this.reverseIframe.remove()
//         this.$emit('aeSdk', null)
//       }
//     },
//   });
// };