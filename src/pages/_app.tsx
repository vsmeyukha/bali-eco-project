import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import PopupProvider from '@/contexts/PopupProvider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PopupProvider>
      <div className='w-full
        1440px:w-[1440px]
        2xl:w-[1536px]
        xl:w-[1280px]
        lg:w-[1024px]
        md:w-[768px]
        sm:w-[640px]
        bg-white
        mx-auto
        z-10'
      >
        <Component {...pageProps} />
      </div>
    </PopupProvider>
  )
}
