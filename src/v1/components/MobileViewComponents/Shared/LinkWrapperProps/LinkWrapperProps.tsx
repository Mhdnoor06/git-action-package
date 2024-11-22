import React, { ReactNode } from "react";

interface LinkWrapperProps {
  url: string;
  children: ReactNode;
}

const LinkWrapper: React.FC<LinkWrapperProps> = ({ url, children }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#000" }}
    >
      {children}
    </a>
  );
};

export default LinkWrapper;
