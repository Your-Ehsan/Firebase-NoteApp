import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useAuthContext } from "./contexts/AuthContext";

function App() {
  const { UserData, LoadingUser } = useAuthContext(),
    ProtectedRoute = () => {
      if (UserData === null && !LoadingUser) {
        return redirect("/login");
      } else {
        return { UserData, LoadingUser };
      }
    };
  console.log(UserData, LoadingUser);
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route element={<MainLayout />}>
            <Route
              index
              loader={ProtectedRoute}
              element={<Home />}
              errorElement={<h1>ERROR — Something went wrong!</h1>}
            />
            <Route path="login" element={<Login />} />
          </Route>
        )
      )}
    />
  );
}

export default App;
