import { useNavigate } from "react-router-dom";
import { Nav, Sidenav } from "rsuite";
import UserBadgeIcon from "@rsuite/icons/UserBadge";
import GlobalIcon from "@rsuite/icons/Global";
import ExitIcon from '@rsuite/icons/Exit';
import { useAuth } from "../contexts/useAuth";

export const SideBar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth()

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
              onClick={logout}
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
