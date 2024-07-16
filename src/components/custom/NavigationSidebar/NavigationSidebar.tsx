import "./NavigationSidebar.scss";
import { getCurrentUserProfile } from "@/server/controllers/user";
import { getCurrentUserId } from "@/server/actions/getCurrentUserId";
import { getAllServers } from "@/server/controllers/server";
import AddServerButton from "./AddServerButton/AddServerButton";
import ServerContainer from "./ServerContainer/ServerContainer";
import UserDetail from "./UserDetail/UserDetail";
import { logout } from "@/server/actions/logout";

const NavigationSidebar = async () => {
  const currentUserId = await getCurrentUserId();
  const profile = await getCurrentUserProfile(currentUserId!);

  if (!profile) {
    return await logout();
  }

  const servers = await getAllServers(currentUserId!);

  return (
    <div className="navigation-sidebar-container">
      <AddServerButton />

      <div className="navigation-sidebar-separator" />

      <ServerContainer servers={servers} />

      {profile && <UserDetail />}
    </div>
  );
};

export default NavigationSidebar;
