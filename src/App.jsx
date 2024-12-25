import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "preline/preline";
import AppRoutes from './routes';

function App() {
  const location = useLocation();

  useEffect(() => {
    if (window.HSStaticMethods && typeof window.HSStaticMethods.autoInit === "function") {
      try {
        window.HSStaticMethods.autoInit();
      } catch (error) {
        console.error("Error initializing Preline components:", error);
      }
    }
  }, [location.pathname]);

  return <AppRoutes />;
}

export default App;
