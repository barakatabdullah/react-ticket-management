import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { DataView } from "primereact/dataview";
import {  getTikets } from "../_utils";
import { ItemTemplate } from "../_components/ItemsTemplate";
import TicketsTableHeder from "./_components/TicketsTableHeder";
import Header from "../../../components/Header";
import { useState } from "react";

export default function Tickets() {
  const [filter,setFilter]=useState('')

  const { data, isLoading } = useQuery({
    placeholderData: keepPreviousData,
    queryKey: ["tickets"],
    queryFn: getTikets,

    //fix typeerror later
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    select: (data) => data?.filter((ticket:any)=>Object.values(ticket)
    .join('')
    .toLowerCase()
    .includes(filter.toLowerCase())),
  });

  return (
    <div className="p-8">
      <Header title="Tickets" />
      <div>
        <DataView
          header={<TicketsTableHeder filter={filter} setFilter={setFilter} />}
          value={data}
          loading={isLoading}
          layout="grid"
          pt={{
            root: { className: "rounded-2 overflow-hidden border" },
            content: { className: "p4" },
            grid: {
              className:
                "grid grid-cols-4 gap-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1",
            },
          }}
          itemTemplate={ItemTemplate}
          alwaysShowPaginator={false}
          paginator
          rows={8}
        />
      </div>
    </div>
  );
}
