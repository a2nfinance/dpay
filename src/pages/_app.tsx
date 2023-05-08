import { ConfigProvider, theme } from 'antd';
import 'antd/dist/reset.css';
import type { AppProps } from 'next/app';
import { Provider } from "react-redux";
import { store } from 'src/controller/store';
import { LayoutProvider } from 'src/layout/LayoutProvider';
const { defaultAlgorithm, darkAlgorithm } = theme;
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#cf2e2e',
        },
        algorithm: defaultAlgorithm
      }}
    >
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <LayoutProvider>

          <Component {...pageProps} />

        </LayoutProvider>
        {/* </PersistGate> */}
      </Provider >
    </ConfigProvider>
  )
}
