import Image from "next/image";
import React, { memo, useCallback } from "react";
import "./Avatar.scss";

type AvatarPropsType = {
  imageUrl: string;
  imageName: string;
  onClick?: () => void;
};

const Avatar = ({ imageUrl, imageName, onClick }: AvatarPropsType) => {
  return (
    <div className="avatar-container" onClick={onClick}>
      <Image src={imageUrl} alt={imageName || "image"} width={16} height={16} />
    </div>
  );
};

export default memo(Avatar);