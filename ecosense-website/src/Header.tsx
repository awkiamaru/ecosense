import React from "react";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  return <header>{props.title}</header>;
};

export default Header;
