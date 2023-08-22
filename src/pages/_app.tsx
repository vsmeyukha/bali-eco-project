// ? Global styles import
import '@/styles/globals.css';

// ? Required imports from Next.js and React
import type { AppProps } from 'next/app';

// ? Internationalization (i18n) support
import { appWithTranslation } from 'next-i18next';

// ? Custom App component. This component wraps around all page components.
// ? Useful for maintaining global state, styles, or any data that needs to persist across pages.
function App({ Component, pageProps }: AppProps) {

  return (
      <div className='
        1440px:w-[1440px]
        2xl:w-[1536px]
        xl:w-[1280px]
        lg:w-[1024px]
        md:w-[768px]
        sm:w-[640px]
        w-screen
        bg-white
        mx-auto
        z-10'
    >
      {/* Rendering the current page component */}
        <Component {...pageProps} />
      </div>
  )
}

// ? Wrapping the App component with i18n support
export default appWithTranslation(App);