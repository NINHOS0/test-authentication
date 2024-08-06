import { Outlet } from "react-router-dom"
import { SideBar } from "../components/sideBar"

export const NavContainerPage = () => {
    return (
        <div className="flex">
            <SideBar/>
            <div className="w-full block">
                <Outlet/>
            </div>
        </div>
    )
}