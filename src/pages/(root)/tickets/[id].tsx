import {
  //  useNavigate,
  
  useOutletContext, useParams } from "react-router-dom";
import { useMutation,
  //  useQuery
   } from "@tanstack/react-query";
// import { Skeleton } from "primereact/skeleton";
import { Card } from "primereact/card";
import Header from "../../../components/Header";
import { Button } from "primereact/button";
import { useState } from "react";
// import { getTicket } from "./_utils";
import { Controller, useForm } from "react-hook-form";
import { useUserStore } from "../../../stores/user";
import { Boxes } from "../../../global-env";
import api from "../../../config/axios";
import { classNames } from "primereact/utils";
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputText";
import { queryClient } from "../../../config/queryClient";


export default function Car() {


  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  const userStore = useUserStore();
  const { toast } = useOutletContext<Boxes>();
  // const navigate = useNavigate();


  // const { isPending, data } = useQuery({
  //   queryKey: ["ticket", id],

  //   queryFn: () => getTicket(Number(id)),
  //   // select: (data) => data,
  // });


  const { handleSubmit, control } = useForm({
    defaultValues: {
      title: "",
      device_name: "",
      model: "",
      serialNumber: "",
      description: "",
      created_by: 1,
      status: true,
    },
    mode: "all",
  });

  //fix (any) type issue later
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    mutateAsync(data);
  };

  const { mutateAsync } = useMutation({

    //fix later
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (data: any) => {
      const res = await api.put("tickets/"+id, {
        ...data,
        created_by: userStore.userId,
        status: data.status ? "open" : "closed",
      });
      return res;
    },
    onSuccess: (res) => {
      console.log(res);
      toast({
        severity: "success",
        summary: "Success",
        detail: "Ticket edited successfully",
        life: 3000,
      });

      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
  });



  // if (isPending)
  //   return (
  //     <div className="p5">
  //       <Skeleton className="w-full p5" />
  //     </div>
  //   );


  const content = {
    view: (
      // <div className="grid grid-cols-8 max-xl:grid-cols-6 gap-8 max-lg:grid-cols-4 max-sm:grid-cols-1">
      //   <div className="col-span-3 flex flex-col gap-6 max-xl:col-span-2 max-lg:col-span-2 max-sm:col-span-1">
      //     <Card title={data?.title} className=" shadow-none border">
      //       <div className="flex flex-col gap-6">
      //         <div className="flex flex-col gap-2">
      //           <p className="text-4 text-gray">Description:</p>
      //           <p className="text-5">{data?.description}</p>
      //         </div>
      //       </div>
      //     </Card>
      //     <div className="grid grid-cols-3 gap-4">
      //       <Card className="flex flex-col gap-4 shadow-none border col-span-2">
      //         <p className="text-4 text-gray">Status:</p>
      //         <div className="flex">
      //           <p className="text-7 font-bold">{data?.Status}</p>
      //         </div>
      //       </Card>
      //     </div>
      //     <div className="flex flex-col gap-4">
      //       <Button label="Book Now"
      //         onClick={() => setVisible(true)}
      //       />

      //       <div className="flex justify-center gap-4">
      //         <Button
      //           outlined
      //           severity="secondary"
      //           icon="i-tabler-share"
      //         />
      //         <Button
      //           className="border-green text-green"
      //           outlined
      //           icon="i-tabler-brand-whatsapp"
      //         />

      //       </div>
      //     </div>
      //   </div>
      // </div>

      <div>
        <div className=" flex flex-col items-center justify-center h-full ">
                    <div className="flex flex-col items-center justify-center text-center gap-2">
                        <img className="filter grayscale " src="/photos/comingsoon.svg" alt="" />
                        <p className="text-3xl">Comming Soon</p>
                        <p>Ticket details is under development because the api have an issue should be fixed</p>
                    </div>

                </div>
      </div>
    ),
    edit: (<form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-8 gap-8 max-lg:grid-cols-1"
    >

      <div className="col-span-6 flex flex-col gap-6 max-lg:col-span-1">
        <Card className="w-full shadow-none border">
          <div className="grid grid-cols-2 gap-8 max-lg:grid-cols-1">
            <div className="flex flex-col gap-2 ">
              <label className="font-bold" htmlFor="title">
                Title
              </label>
              <Controller
                control={control}
                rules={{
                  required: "Title is required",
                }}
                render={({ field, fieldState }) => (
                  <>
                    <InputText
                      className={classNames({
                        "p-invalid": fieldState.error,
                      })}
                      {...field}
                      id="title"
                    />

                    <span className="text-red">
                      {fieldState.error?.message}
                    </span>
                  </>
                )}
                name="title"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label className="font-bold" htmlFor="device_name">
                Device Name
              </label>
              <Controller
                control={control}
                rules={{
                  required: "Device Name is required",
                }}
                render={({ field, fieldState }) => (
                  <>
                    <InputText
                      className={classNames({
                        "p-invalid": fieldState.error,
                      })}
                      {...field}
                      id="device_name"
                    />

                    <span className="text-red">
                      {fieldState.error?.message}
                    </span>
                  </>
                )}
                name="device_name"
              />
            </div>

            <div className="flex flex-col gap-2 ">
              <label className="font-bold" htmlFor="model">
                Model
              </label>
              <Controller
                control={control}
                rules={{
                  required: "Model is required",
                }}
                render={({ field, fieldState }) => (
                  <>
                    <InputText
                      className={classNames({
                        "p-invalid": fieldState.error,
                      })}
                      {...field}
                      id="model"
                    />

                    <span className="text-red">
                      {fieldState.error?.message}
                    </span>
                  </>
                )}
                name="model"
              />
            </div>

            <div className="flex flex-col gap-2 ">
              <label className="font-bold" htmlFor="SerialNumber">
                Serial Number
              </label>
              <Controller
                control={control}
                rules={{
                  required: "Serial Number is required",
                }}
                render={({ field, fieldState }) => (
                  <>
                    <InputText
                      className={classNames({
                        "p-invalid": fieldState.error,
                      })}
                      {...field}
                      id="serialNumber"
                    />

                    <span className="text-red">
                      {fieldState.error?.message}
                    </span>
                  </>
                )}
                name="serialNumber"
              />
            </div>

            <div className="flex flex-col gap-2 ">
              <label className="font-bold" htmlFor="description">
                Description
              </label>
              <Controller
                control={control}
                rules={{
                  required: "Description is required",
                }}
                render={({ field, fieldState }) => (
                  <>
                    <InputText
                      className={classNames({
                        "p-invalid": fieldState.error,
                      })}
                      {...field}
                      id="description"
                    />

                    <span className="text-red">
                      {fieldState.error?.message}
                    </span>
                  </>
                )}
                name="description"
              />
            </div>

            <div className="flex flex-col gap-2 ">
              <label className="font-bold" htmlFor="status">
                status
              </label>
              <Controller
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <InputSwitch
                      className={classNames({
                        "p-invalid": fieldState.error,
                      })}
                      checked={field.value}
                      onChange={field.onChange}
                      id="status"
                    />

                    <span className="text-red">
                      {fieldState.error?.message}
                    </span>
                  </>
                )}
                name="status"
              />
            </div>
          </div>
        </Card>

        <div className="flex gap-4 justify-end items-center max-lg:flex-col-reverse max-lg:gap-2 w-full">
          <Button
            className="max-lg:w-full"
            outlined
            label="Cancel"
            onClick={() => setEditMode(false)}
          />
          <Button className="max-lg:w-full" label="Submit" type="submit" />
        </div>
      </div>
    </form>
    )
  }

  const mode = editMode ? "edit" : "view";

  return (
    <div className="p12">
      <Header title="Ticket Details">
        {!editMode ? <Button
          label="Edit"
          onClick={() => setEditMode(true)}
        />:undefined
        }
      </Header>

      {content[mode]}


    </div>
  );
}
