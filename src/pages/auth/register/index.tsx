import { InputText } from "primereact/inputText";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

import { useForm, Controller } from "react-hook-form";



import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api from "../../../config/axios";
import { setUserId, setUserName } from "../../../stores/user";

export default function Register() {
  const methods = useForm({
    mode: "all"
  });
  const navigate = useNavigate()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    mutateAsync(data);
  };

  const { mutateAsync } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (data: any) => {
      const res = await api.post("/register", {
        ...data
      });
      return res;
    },
    onSuccess: (res) => {
      setUserId(res.data.user.id)
      setUserName(res.data.user.name)
      localStorage.setItem("userId", res.data.user.id);
      localStorage.setItem("name", res.data.user.name);
      toast({
        severity: "success",
        summary: "Success",
        detail: "Registered successfully",
        life: 3000,
      });
      navigate("/auth/login");
    },
  });


  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card className="w-2/8">
        <h3 className="text-center mb-8 font-bold text-8">Register</h3>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-8 w-full"
        >
          <div className="flex flex-col gap-2">
            <label className="font-bold" htmlFor="name">
              Username
            </label>
            <Controller
              control={methods.control}
              rules={{
                required: true,
                minLength: 3
              }}
              render={({ field, fieldState }) => <><InputText {...field} id="name" /><span className="text-red">
                {fieldState.error?.message}
              </span></>}
              name="name"
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <label className="font-bold" htmlFor="email">
              Email
            </label>
            <Controller
              control={methods.control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              }}
              render={({ field, fieldState }) => <><InputText {...field} id="email" /><span className="text-red">
                {fieldState.error?.message}
              </span></>}
              name="email"
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <label className="font-bold">Password</label>
            <Controller
              control={methods.control}
              rules={{
                required: true,
              }}
              render={({ field, fieldState }) => (
                <><Password
                  {...field}
                  pt={{
                    input: { className: "w-full" },
                  }}
                  inputId="password" /><span className="text-red">
                    {fieldState.error?.message}
                  </span></>
              )}
              name="password"
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <label className="font-bold" htmlFor="password_confirmation">Password Confirmation</label>
            <Controller
              control={methods.control}
              rules={{
                required: true,
                validate: (value) => value === methods.getValues("password") || "Passwords do not match",
              }}
              render={({ field, fieldState }) => (
                <><Password
                  {...field}
                  feedback={false}
                  pt={{
                    input: { className: "w-full" },
                  }}
                  inputId="password_confirmation" /><span className="text-red">
                    {fieldState.error?.message}
                  </span></>
              )}
              name="password_confirmation"
            />
          </div>
          <Button label="Register" type="submit" />
        </form>
        <div className="flex justify-center w-full pt-4">
          <Button
            label="or Login with your account"
            link
            onClick={() => navigate('/auth/login')}

          />
        </div>
      </Card>
    </div>
  );
}
