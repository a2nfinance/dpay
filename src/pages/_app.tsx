import { ConfigProvider, Spin, theme } from 'antd';
import 'antd/dist/reset.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { Provider } from "react-redux";
import { store } from 'src/controller/store';
import { LayoutProvider } from 'src/layout/LayoutProvider';
const { defaultAlgorithm, darkAlgorithm } = theme;
export default function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])
  return (

    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ec417a',
        },
        algorithm: defaultAlgorithm
      }}
    >
      <Spin spinning={loading} size='large'>
        <Provider store={store}>
          {/* <PersistGate loading={null} persistor={persistor}> */}

          <LayoutProvider>

            <Component {...pageProps} />

          </LayoutProvider>

          {/* </PersistGate> */}
        </Provider >
      </Spin>
    </ConfigProvider >

  )
}
