import { useNavigate } from "react-router-dom";
import { Nav, Sidenav } from "rsuite";
import UserBadgeIcon from "@rsuite/icons/UserBadge";
import GlobalIcon from "@rsuite/icons/Global";

export const SideBar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-64 h-screen bg-zinc-900 flex flex-col">
      <Sidenav className="!bg-transparent">
        <Sidenav.Body>
          <Nav activeKey={window.location.pathname}>
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
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};
