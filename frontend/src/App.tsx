import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import { LoginPage } from "./pages/login";
import { UsersPage } from "./pages/users";
import { ClientsPage } from "./pages/clients";
import { SideBar } from "./components/sideBar";
import { NavContainerPage } from "./pages/NavContainer";



function App() {
  return (
    <div className="h-screen bg-zinc-950 text-white">
      <Routes>
        <Route path="login" element={<LoginPage/>}/>
        <Route path="/" element={<NavContainerPage />}>
          <Route path="users" element={<UsersPage />} />
          <Route path="clients" element={<ClientsPage />}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App;
