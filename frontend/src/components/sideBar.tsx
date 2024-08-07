import { useNavigate } from "react-router-dom";
import { Nav, Sidenav } from "rsuite";
import UserBadgeIcon from "@rsuite/icons/UserBadge";
import GlobalIcon from "@rsuite/icons/Global";
import ExitIcon from '@rsuite/icons/Exit';
import Cookies from "js-cookie";

export const SideBar = () => {
  const navigate = useNavigate();

  function logoutHandler() {
    Cookies.remove("auth-token")
    navigate("/")
  }

  return (
    <div className="w-64 h-screen bg-zinc-900 flex flex-col">
      <Sidenav className="!bg-transparent h-full">
        <Sidenav.Body className="h-full">
          <Nav activeKey={window.location.pathname} className="h-full">
            <Nav.Item
              eventKey="/users"
              icon={<UserBadgeIcon />}
              onClick={() => navigate("/users")}
              className="!bg-transparent hover:!bg-white/5"
            >
              Usuários
            </Nav.Item>
            <Nav.Item
              eventKey="/clients"
              icon={<GlobalIcon />}
              onClick={() => navigate("/clients")}
              className="!bg-transparent hover:!bg-white/5"
            >
              Clientes
            </Nav.Item>
            <Nav.Item
              icon={<ExitIcon />}
              onClick={logoutHandler}
              className="!bg-transparent hover:!bg-white/5 !mt-64"
            >
              Logout
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
        
      </Sidenav>
    </div>
  );
};
