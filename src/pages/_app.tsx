import type { AppProps } from 'next/app'
import 'antd/dist/reset.css'
import { LayoutProvider } from 'src/layout/LayoutProvider'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LayoutProvider>
      <Component {...pageProps} />
    </LayoutProvider>
  )
}
