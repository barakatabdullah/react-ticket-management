import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
// import { Card } from "primereact/card";
import { DataView } from "primereact/dataview";
import Header from "../../components/Header";
import { getTikets } from "./_utils";
import { ItemTemplate } from "./_components/ItemsTemplate";

export default function Home() {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    placeholderData: keepPreviousData,
    queryKey: ["tickets"],
    queryFn: getTikets,
    select: (data) => data?.slice(0, 4),
  });

  console.log(data)

  return (
    <div className=" flex flex-col gap-8 p-12">
      <Header title="Welcome to Tickets Manager" />

      <div>
        hello
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-7 font-bold">Top Tickets</h2>
          <Button
            text
            label="Browse Tickets"
            onClick={() => navigate("/tickets")}
            icon="i-tabler-arrow-right"
            iconPos="right"
          />
        </div>

        <DataView
          value={data}
          loading={isLoading}
          layout="grid"
          pt={{
            root: { className: "rounded-3  " },
            content: { className: " bg-transparent" },
            grid: {
              className:
                "grid grid-cols-4 gap-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1",
            },
          }}
          itemTemplate={ItemTemplate}
          rows={4}
        />
      </div>
    </div>
  );
}
