import { Link } from "react-router-dom";
import NavMenu from "./NavMenu";

export default function SideBar() {

  return (
    <div className=" h-screen w-75 max-lg:hidden text-white">
      <div className="bg-#0d0e12 z-100 flex flex-col items-center justify-center h-screen fixed left-0 top-0 bottom-0">
        <div className="my-10 mx-4 h-12 p-2">
          <Link className="flex gap-4 items-center justify-start h-full" to="/">
            <img className="h-full" src="/logo.svg" alt="Acara" />
            <h3 className="text-5 font-bold">Tickets Manager</h3>
          </Link>
        </div>
        <NavMenu />
        <div className="pb-10 flex flex-col items-start gap-4 w-full  p4">
          <div className="flex items-center gap-4 w-full px-4 py-2.5 rounded-2 group hover:bg-#3f425459" >
            <i className="i-tabler-logout text-#9a9cae text-5 group-hover:text-white" ></i>
            <Link onClick={() => localStorage.removeItem("token")} className="text-#9a9cae font-bold group-hover:text-white" to="/auth/login">
              Logout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
