/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'diver': "url('/images/backgrounds/line1.png')",
        'manatee': "url('/images/backgrounds/manatee.png')",
        'ocean-reef': "url('/images/backgrounds/111.webp')",
        'gradient-text': 'linear-gradient(180deg, white 0%, #2196F3 100%)',
        'tips-blue-wave': "url('/images/backgrounds/TipsBlueWave.svg')",
        'tips-blue-wave-small': "url(/images/backgrounds/tipsWaveSmall.svg)",
        'tips-png': "url(/images/backgrounds/tipsPNG.png)",
        '404-not-found': "url(/images/backgrounds/404NotFound.jpg)"
      },
      backgroundClip: {
        text: 'text',
      },
      alignSelf: ['start', 'end', 'center', 'baseline', 'stretch'],
      screens: {
        '1440px': '1440px',
      },
    },
    fontFamily: {
      'oceanic-bold': ['TRIAL_Oceanic-Bold'],
      'oceanic-extrabold': ['TRIAL_Oceanic-Extrabold'],
      'oceanic-light': ['TRIAL_Oceanic-Light'],
      'oceanic-medium': ['TRIAL_Oceanic-Medium'],
      'oceanic-poster': ['TRIAL_Oceanic-Poster'],
      'oceanic-regular': ['TRIAL_Oceanic-Regular'],
      'roboto-thin': ['Roboto-Thin'],
      'roboto-black': ['Roboto-Black'],
      'roboto-medium': ['Roboto-Medium'],
      'montserrat': ['Montserrat'],
      'montserrat-black': ['Montserrat-Black'],
      'montserrat-bold': ['Montserrat-Bold']
    },
    boxShadow: {
      'button': '0px 1px 6px rgba(255, 255, 255, 1)',
      'button-hover': '0px 1px 12px rgba(255, 255, 255, 1)',
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}