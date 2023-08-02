import { ReactElement, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from '../firebase/config';

import BigLoader from "@/components/loaders/BigLoader";

interface ProtectedRouteProps {
  children: ReactNode,
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }): ReactElement => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/');
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

export default ProtectedRoute;