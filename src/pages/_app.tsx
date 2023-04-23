import type { AppProps } from 'next/app'
import 'antd/dist/reset.css'
import { Provider } from "react-redux";
import { LayoutProvider } from 'src/layout/LayoutProvider'
import { store } from 'src/controller/store';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <LayoutProvider>
        <Component {...pageProps} />
      </LayoutProvider>
    </Provider>

  )
}
