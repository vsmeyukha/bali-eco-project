// ? Custom Document component to augment the application's <html> and <body> tags.
// ? This is a Next.js specific feature.

import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
      <Html lang="en">
        <Head />
        <body className='bg-gray-200 min-h-screen flex justify-center'>
          <Main />
          <NextScript />
        </body>
      </Html>
  )
}
