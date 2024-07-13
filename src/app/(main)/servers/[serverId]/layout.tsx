import "./layout.scss";
import { getCurrentUserProfile } from "@/server/controllers/user";
import { getCurrentUserId } from "@/server/actions/getCurrentUserId";
import { redirect } from "next/navigation";
import { getServer } from "@/server/controllers/server";
import ServerSidebar from "@/components/custom/ServerSidebar/ServerSidebar";

type ServerIdLayoutPropsType = {
  children: React.ReactNode;
  params: { serverId: string };
};

const ServerIdLayout = async ({
  children,
  params,
}: ServerIdLayoutPropsType) => {
  const currentUserId = await getCurrentUserId();
  const profile = await getCurrentUserProfile(currentUserId!);

  if (!profile) {
    return redirect("/auth/login");
  }

  const server = await getServer(params?.serverId, profile?.id);

  if (!server) {
    return redirect("/");
  }

  return (
    <div className="server-id-layout-container">
      <ServerSidebar currentServer={server} />

      <main>{children}</main>
    </div>
  );
};

export default ServerIdLayout;