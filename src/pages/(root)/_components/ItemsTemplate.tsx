import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Boxes } from "../../../global-env";
import { useUserStore } from "../../../stores/user";
import { Tag } from "primereact/tag";

// @ts-expect-error: fix later
export function ItemTemplate(ticket) {
  const navigate = useNavigate();
  const userStore = useUserStore();
  const { toast } = useOutletContext<Boxes>();


  function cardFooter(ticket: any) {
    return (
      <div className="flex items-center justify-between ">
        <Button
          text
          label="More details"
          onClick={() => navigate("/tickets/" + ticket.id)}
          icon="i-tabler-arrow-right"
          iconPos="right"
        />
      </div>
    );
  }
  return (
    <Card
      title={ticket.title}
      subTitle={
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Tag 
              severity={ticket.status === "open"? "success" : "warning"}
              value={ticket.status}
            />
          </div>
        </div>
      }
      footer={cardFooter(ticket)}
      key={ticket.id}
      className="rounded-2 "
      pt={{
        root: { className: "shadow-none! border" },
        title: { className: "h-20  break-words" },
        content: { className: "p1!" },
      }}
    ></Card>
  );
}
