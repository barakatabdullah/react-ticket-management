import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const menuItems = [
    {
      label: "Home",
      icon: "i-tabler-home",
      page: "/",
    },
    {
      label: "Tickets",
      icon: "i-tabler-car",
      page: "/tickets",
    },

  ];

export default function NavMenu() {
    const navigate = useNavigate();
    return (
        <div className="relative flex flex-col items-center justify-center gap-4 w-40 h-full">
        {menuItems.map((item) => {
          return (
            <div key={item.label}>
              <Button
                className="w-16 h-16 bg-#f5f8facc text-gray-400 text-5 hover:text-#4f46e5"
                text
                icon={item.icon}
                onClick={() => navigate(item.page)}
                tooltip={item.label}
              />
            </div>
          );
        })}
      </div>
    )
}