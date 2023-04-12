import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import PopupProvider from '@/contexts/PopupProvider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PopupProvider>
      <div className='w-full lg:w-[1440px] xl:w-[1440px] bg-white mx-auto z-10'>
        <Component {...pageProps} />
      </div>
    </PopupProvider>
  )
}
