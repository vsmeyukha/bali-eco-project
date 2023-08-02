import { ReactElement, ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "@/firebase/config";

import BigLoader from "@/components/loaders/BigLoader";

interface UnauthenticatedRouteProps {
  children: ReactNode,
}

const UnauthenticatedRoute: React.FC<UnauthenticatedRouteProps> = ({ children }): ReactElement => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setTimeout(() => { 
          router.push('/map');
        }, 500);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (isLoading) {
    return (
      <BigLoader />
    )
  }
  else {
    return (
      <>
        {children}
      </>
    )
  }

}

export default UnauthenticatedRoute;