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
      },
      backgroundClip: {
        text: 'text',
      },
      alignSelf: ['start', 'end', 'center', 'baseline', 'stretch'],
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
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}