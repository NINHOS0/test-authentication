import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./pages/login";
import { UsersPage } from "./pages/users";

const router = createBrowserRouter(
  [
    {
      path: "/login",
      element: <LoginPage />,
      index: true,
      
    },
    {
      path: "/users",
      element: <UsersPage/>,
    }
  ]
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
