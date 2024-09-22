import { NavLink, NavLinkProps } from "react-router-dom";
import React from "react";
import useLang from "@hooks/useLang";

// Custom Link component to prepend language to route paths
const CustomLink: React.FC<NavLinkProps> = ({ to, ...props }) => {
  const { lang } = useLang(); // Get current language from custom hook
  const localizedPath = `/${lang}${to}`; // Prepend language to the path

  return <NavLink to={localizedPath} {...props} />;
};

export default CustomLink;
