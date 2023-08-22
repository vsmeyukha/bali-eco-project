import { ReactElement, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { auth } from '../firebase/config';
import BigLoader from "@/components/loaders/BigLoader";

interface RouteProps {
  children: ReactNode
}

// ? The type of route to create ("protected" or "unauthenticated").
type RouteType = "protected" | "unauthenticated";

// ? Factory function to create either a protected or unauthenticated route.
// ? - Protected routes are only accessible by authenticated users.
// ? - Unauthenticated routes are only accessible by unauthenticated users.
// ? Function returns a React functional component representing the desired route.
export const createRoute = (routeType: RouteType): React.FC<RouteProps> => {
  const RouteComponent: React.FC<RouteProps> = ({children}): ReactElement => {
    const router = useRouter();

    // ? State responsible for showing Loader component
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
      // ? Set up an authentication state listener using Firebase's `onAuthStateChanged` method.
      // ? This listener is triggered every time the user's authentication status changes.
      // ? - If the user is logged in, the callback receives the user object.
      // ? - If the user is logged out, the callback receives null.
      // ? This method returns an `unsubscribe` function, which can be called to remove the listener when it's no longer needed (e.g., when the component is unmounted).
      const unsubscribe = auth.onAuthStateChanged((user) => {
        // ? Redirect logic based on route type and authentication status.
        if (routeType === "protected" && !user) {
          // ? Redirect unauthenticated users away from protected routes.
          // ? Если это защищенный маршрут и пользователь не авторизован, перенаправить на главную страницу для неавторизованных пользователей
          setTimeout(() => {
            router.push('/');
          }, 500);
        } else if (routeType === "unauthenticated" && user) {
          // ? Redirect authenticated users away from unauthenticated routes.
          // ? Если это незащищенный маршрут и пользователь авторизован, перенаправить на страницу с картой
          setTimeout(() => {
            router.push('/map');
          }, 500);
        }
        setIsLoading(false);
      });
  
      // ? Clean up the authentication state listener on component unmount.
      return () => unsubscribe();
    }, [router]);

    // ? Show a loader while determining the user's authentication status.
    if (isLoading) {
      return <BigLoader />;
    } else {
      return <>{children}</>;
    }
  }

  // ? Assign a display name to the component for better debugging.
  // ? Здесь устанавливается displayName для компонента
  RouteComponent.displayName = routeType === "protected" ? "ProtectedRoute" : "UnauthenticatedRoute";

  // ? Return the configured route component.
  // ? Здесь возвращается компонент
  return RouteComponent;
  
}

export default createRoute;