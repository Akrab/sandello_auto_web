import React from "react";
import { NavLink as RouteLink } from "react-router-dom";

export default function NavLink ({ url, children, id }) {
    function getClasses({ isActive, isPending }) {
        let classes = "nav-link";
        if (isActive) classes += " active";
        return classes;
    };

    return <RouteLink role="button" tabIndex={0} to={url} className={getClasses} id={id}>{children}</RouteLink>
};