"use client";

import React, { memo, useCallback } from "react";
import "./ServerItem.scss";
import Tooltip from "@/components/ui/Tooltip/Tooltip";
import { useParams, useRouter } from "next/navigation";
import classNames from "classnames";
import { SERVER_WITH_CHANNELS } from "../../NavigationSidebar";

type ServerItemPropsType = {
  serverItem: SERVER_WITH_CHANNELS;
};

const ServerItem = ({ serverItem }: ServerItemPropsType) => {
  const { serverId } = useParams();
  const router = useRouter();

  const handelServerItemClick = useCallback(() => {
    router.push(
      `/servers/${serverItem.id}/channels/${serverItem?.channels?.[0]?.id}`
    );
  }, [router, serverItem]);

  return (
    <Tooltip title={serverItem.name}>
      <div
        className={classNames("server-item-container", {
          isSelected: serverId === serverItem.id,
        })}
        onClick={handelServerItemClick}
      >
        {
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={serverItem?.imageUrl}
            alt={serverItem?.name || "serverName"}
            width={44}
            height={44}
          />
        }

        <div className="server-item-container-border" />
      </div>
    </Tooltip>
  );
};

export default memo(ServerItem);
