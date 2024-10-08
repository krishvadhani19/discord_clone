import React, { memo } from "react";
import "./ServerContainer.scss";
import ServerItem from "./ServerItem/ServerItem";
import { SERVER_WITH_CHANNELS } from "../NavigationSidebar";

type ServerContainerPropsType = {
  servers: SERVER_WITH_CHANNELS[] | null;
};

const ServerContainer = ({ servers }: ServerContainerPropsType) => {
  if (!servers) {
    return <div>No servers</div>;
  }

  return (
    <div className="server-container">
      {servers.map((serverItem, key) => {
        return <ServerItem key={key} serverItem={serverItem} />;
      })}
    </div>
  );
};

export default memo(ServerContainer);
