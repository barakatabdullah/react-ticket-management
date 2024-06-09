import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavMenu from "./NavMenu";

export default function NavBar() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  return (
    <div className="w-screen h-20 lg:hidden">
      <div className="bg-white h-20 z-100 flex items-center justify-between w-screen fixed left-0 top-0 rhight-0 border">
        <div className="container mx-auto flex items-center justify-between max-sm:px-6">
          <div className="w-12">
            <Link to="/">
              <img src="/logo.svg" alt="Acara" />
            </Link>
          </div>
          <div className="h-12 flex gap-4">
            <div className="flex items-center">
              <Sidebar
                className="w-80 bg-#0d0e12 "
                visible={visible}
                onHide={() => setVisible(false)}
              >
                <div className=" flex flex-col items-center justify-center h-full ">
                <div className="my-10 mx-4 h-12 p-2">
          <Link className="flex gap-4 items-center justify-start h-full" to="/">
            <img className="h-full" src="/logo.svg" alt="Acara" />
            <h3 className="text-5 text-white font-bold">Tickets Manager</h3>
          </Link>
        </div>
                  <NavMenu />

                </div>
              </Sidebar>
              <Button
                outlined
                icon="i-tabler-menu-2"
                onClick={() => setVisible(true)}
              />
            </div>
            <Button
              icon="i-tabler-logout"
              text
              onClick={() => {
                localStorage.removeItem("token")
                navigate("/auth/login")
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
