import { useEffect } from "react";
import Home from "./pages/Home";
import { getCurrentUser } from "./features/getCurrentUser";

const App = () => {
  useEffect(() => {
    const fetchCurrentUser = () => {
      getCurrentUser();
    };

    fetchCurrentUser();
  }, []);
  return (
    <>
      <Home />
    </>
  );
};

export default App;
