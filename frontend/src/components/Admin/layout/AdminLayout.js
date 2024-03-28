
import { Layout } from "antd";
import React from "react";
import useUser from "apps/admin/store/useUser";
import { useRouter } from "next/navigation";


const { Content, Footer } = Layout;

function CopyrightComponent() {
  return React.createElement(
    "div",
    { className: "text-center" },
    "© 2024-",
    new Date().getFullYear(),
    " Connect Kitchen. All rights reserved."
  );
}

function NavLogo({ onClick }) {
  return React.createElement(
    "div",
    {
      className: "logo flex p-3 items-center justify-center",
      onClick: onClick,
    },
    React.createElement(
      "h1",
      { className: "text-white pl-1" },
      "Connect Kitchen"
    )
  );
}

const AdminLayout = ({ children, showTitle, title = "Connect Kitchen" }) => {
  const router = useRouter();

  const { isAuthenticated } = useUser();

  const pathname = router.usePathname();

  console.log(isAuthenticated, "isauthnciated");

  return isAuthenticated ? (
    <>
     {children}
    </>
  ) : null;
};

export default AdminLayout;
