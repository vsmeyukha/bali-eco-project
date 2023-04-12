import { useState, useEffect } from 'react';

function useViewportWidth() {
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setViewportWidth(window.innerWidth);

      const handleResize = () => {
        setViewportWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return viewportWidth;
}

export default useViewportWidth;
