import { ReactElement, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { auth } from '../firebase/config';
import BigLoader from "@/components/loaders/BigLoader";

interface RouteProps {
  children: ReactNode
}

type RouteType = "protected" | "unauthenticated";

export const createRoute = (routeType: RouteType): React.FC<RouteProps> => {
  const RouteComponent: React.FC<RouteProps> = ({children}): ReactElement => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (routeType === "protected" && !user) {
          // ? Если это защищенный маршрут и пользователь не авторизован, перенаправить на главную
          setTimeout(() => {
            router.push('/');
          }, 500);
        } else if (routeType === "unauthenticated" && user) {
          // ? Если это незащищенный маршрут и пользователь авторизован, перенаправить на карту
          setTimeout(() => {
            router.push('/map');
          }, 500);
        }
        setIsLoading(false);
      });
  
      return () => unsubscribe();
    }, [router]);

    if (isLoading) {
      return <BigLoader />;
    } else {
      return <>{children}</>;
    }
  }

  // Здесь устанавливается displayName для компонента
  RouteComponent.displayName = routeType === "protected" ? "ProtectedRoute" : "UnauthenticatedRoute";

  // Здесь возвращается компонент
  return RouteComponent;
  
}

// Использование:
const ProtectedRoute = createRoute("protected");
const UnauthenticatedRoute = createRoute("unauthenticated");

export default createRoute;