import { ReactElement } from "react";
import Head from "next/head";

// ? AppHead Component
// ? This component sets up the meta tags, title and favicon for the application.
// ? It uses the Next.js Head component to inject elements into the HTML head of the rendered page.

const AppHead: React.FC = (): ReactElement => {
  return (
    <Head>
      <title>BaliGreenMap</title>
      <meta name="description" content="BaliGreenMap is a community-driven initiative to improve the ecological situation of Bali. Report and track trash hotspots to keep the island pristine." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/images/svgs/white-logo.svg" />
  </Head>
  )
}

export default AppHead;