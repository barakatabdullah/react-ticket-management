import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useNavigate, useOutletContext } from "react-router-dom";

import { Tag } from "primereact/tag";
import { useMutation } from "@tanstack/react-query";
import api from "../../../config/axios";
import { type Boxes } from "../../../global-env";
import {  confirmDialog } from "primereact/confirmdialog";
import { queryClient } from "../../../config/queryClient";


// @ts-expect-error: fix later
export function ItemTemplate(ticket) {

  const {toast} = useOutletContext<Boxes>()
  const navigate = useNavigate();


 function onDelete(id){
   confirmDialog({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    defaultFocus: 'reject',
    acceptClassName: 'p-button-danger',
    accept: () => mutate(id),
    reject:()=>{
      toast({
        severity: "warn",
        summary: "Canceled",
        life: 3000,
      });
    }
});



 }


  const { mutate } = useMutation({
    mutationFn: async (id) => {
      const res = await api.delete("/tickets/"+id);
      return res;
    },
    onSuccess: (res) => {
      console.log(res)
      if(res.status===204){
        toast({
          severity: "success",
          summary: "Success",
          detail: "Ticket deleted successfully",
          life: 3000,
        })
        queryClient.invalidateQueries({ queryKey: ["tickets"] });
      }else{
        toast({
          severity: "warn",
          summary: "Warning",
          detail: "Somethin went wrong",
          life: 3000,
        })
      }
    },
  });


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function cardFooter(ticket: any) {
    return (
      <div className="flex items-center justify-between ">
        <Button
        icon="i-tabler-trash"
        outlined
        onClick={() => onDelete(ticket.id)}
        />
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
    <><Card
      title={ticket.title}
      subTitle={<div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Tag
            severity={ticket.status === "open" ? "success" : "warning"}
            value={ticket.status} />
        </div>
      </div>}
      footer={cardFooter(ticket)}
      key={ticket.id}
      className="rounded-2 "
      pt={{
        root: { className: "shadow-none! border" },
        title: { className: "h-20  break-words" },
        content: { className: "p1!" },
      }}
    ></Card></>
  );
}
