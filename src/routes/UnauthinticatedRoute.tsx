import { ReactElement, ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "@/firebase/config";

interface UnauthenticatedRouteProps {
  children: ReactNode,
}

const UnauthenticatedRoute: React.FC<UnauthenticatedRouteProps> = ({ children }): ReactElement => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/map');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (isLoading) {
    return (
      <div>Loading...</div>
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