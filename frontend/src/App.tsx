import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/login";
import { UsersPage } from "./pages/users";
import { ClientsPage } from "./pages/clients";
import { PrivateRoute } from "./components/privateRoute";

function App() {
  return (
    <div className="h-screen bg-zinc-950 text-white">
      <Routes>
        <Route index element={<LoginPage/>}/>
        <Route path="users" element={<UsersPage />}/>
        <Route path="clients" element={<ClientsPage />}/>
      </Routes>
    </div>
  )
}

export default App;
