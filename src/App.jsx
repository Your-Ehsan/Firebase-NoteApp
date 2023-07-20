import PropTypes from "prop-types";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useAuthContext } from "./contexts/AuthContext";

function App() {
  const { UserData } = useAuthContext(),
    ProtectedRoute = ({ children }) => {
      if (UserData === null) {
        return <Navigate to="/login" />;
      }
      return children;
    };

  ProtectedRoute.propTypes = {
    children: PropTypes.object.isRequired,
  };

  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route element={<MainLayout />}>
            <Route
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
              index
            />
            <Route path="login" element={<Login />} />
          </Route>
        )
      )}
    />
  );
}
export default App;
