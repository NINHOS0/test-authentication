import { ProtectedRoute } from "./components/protectedRoute";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/login";
import { UsersPage } from "./pages/users";
import { ClientsPage } from "./pages/clients";

function App() {
  return (
    <div className="h-screen bg-zinc-950 text-white">
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="users" element={
          <ProtectedRoute>
            <UsersPage />
          </ProtectedRoute>
        } />
        <Route path="clients" element={
          <ProtectedRoute>
            <ClientsPage />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}

export default App;
