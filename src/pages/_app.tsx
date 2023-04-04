import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import PopupProvider from '@/contexts/PopupProvider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PopupProvider>
      <Component {...pageProps} />
    </PopupProvider>
  )
}
