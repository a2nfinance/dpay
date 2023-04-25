import type { AppProps } from 'next/app'
import 'antd/dist/reset.css'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { LayoutProvider } from 'src/layout/LayoutProvider'
import { store, persistor } from 'src/controller/store';
import React from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <LayoutProvider>
      
          <Component {...pageProps} />
 
      </LayoutProvider>
      {/* </PersistGate> */}
    </Provider >

  )
}
