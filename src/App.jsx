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
    // eslint-disable-next-line react/prop-types
    ProtectedRoute = ({ children }) => {
      if (UserData === null) {
        return <Navigate to="/login" />;
      }
      return children;
    };

  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route element={<MainLayout />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="login" element={<Login />} />
          </Route>
        )
      )}
    />
  );
}

export default App;
