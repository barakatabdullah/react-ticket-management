import { InputText } from "primereact/inputText";
import { useForm, Controller } from "react-hook-form";
import { classNames } from "primereact/utils";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import Header from "../../../../components/Header";
// import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Boxes } from "../../../../global-env";
import { InputSwitch } from "primereact/inputswitch";
import { useMutation } from "@tanstack/react-query";
import api from "../../../../config/axios";
import { useUserStore } from "../../../../stores/user";
import { queryClient } from "../../../../config/queryClient";
import { InputNumber } from "primereact/inputnumber";

export default function AddCar() {
  const userStore = useUserStore();
  const { toast } = useOutletContext<Boxes>();
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      title: "",
      device_name: "",
      model: "",
      serialNumber: null,
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
    mutationFn: async (data: any) => {
      const res = await api.post("tickets", {
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
        detail: "Ticket added successfully",
        life: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
  });

  return (
    <div className="p12">
      <Header title="Add Ticket" />
      <form
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
                      <InputNumber
                        className={classNames({
                          "p-invalid": fieldState.error,
                        })}
                        
                        ref={field.ref} value={field.value} onBlur={field.onBlur} onValueChange={(e) => field.onChange(e)}
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
              type="button"
              onClick={() => navigate(-1)}
            />
            <Button className="max-lg:w-full" label="Submit" type="submit" />
          </div>
        </div>
      </form>
    </div>
  );
}
