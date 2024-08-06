import { Link } from "react-router-dom"
import { UsersPage } from "../pages/users"

export const SideBar = () => {
    return (
        <div className="w-64 h-screen bg-zinc-900 flex flex-col">
            <Link to="./users" className="w-full p-2 pl-4 hover:bg-zinc-800"> Usuários </Link>
            <Link to="./clients" className="w-full p-2 pl-4 hover:bg-zinc-800"> Clientes </Link>
        </div>
    )
}