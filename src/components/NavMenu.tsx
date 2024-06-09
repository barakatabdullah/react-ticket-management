
import { Link } from "react-router-dom";

const menuItems = [
    {
      label: "Home",
      icon: "i-tabler-home",
      page: "/",
    },
    {
      label: "Tickets",
      icon: "i-tabler-ticket",
      page: "/tickets",
    },

  ];

export default function NavMenu() {

    return (
        <div className="flex flex-col items-start gap-4 w-full h-full p4">
        {menuItems.map((item) => {
          return (
            <div className="w-full"   key={item.label}>
              <Link className="text-#9a9cae font-bold hover:text-white flex items-center gap-4 w-full px-4 py-2.5 rounded-2 group hover:bg-#3f425459" to={item.page}>
              <i className={`${item.icon} text-#9a9cae text-5 group-hover:text-white`}></i>
              {item.label}
              </Link>
            </div>
          );
        })}
      </div>
    )
}