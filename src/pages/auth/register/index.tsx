import { InputText } from "primereact/inputText";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

import { useForm, Controller } from "react-hook-form";



import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api from "../../../config/axios";
import { setUserId, setUserName, setUserToken } from "../../../stores/user";

export default function Register() {
  const methods = useForm();
  const navigate = useNavigate()

  const onSubmit = (data: any) => {
    mutateAsync(data);
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post("/register", {
        ...data
      });
      return res;
    },
    onSuccess: (res) => {
      console.log(res)
      setUserId(res.data.user.id)
      setUserName(res.data.user.name)
      localStorage.setItem("userId", res.data.user.id);
      localStorage.setItem("name", res.data.user.name);
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
              }}
              render={({ field }) => <InputText {...field} id="name" />}
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
                required: true,
              }}
              render={({ field }) => <InputText {...field} id="email" />}
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
              render={({ field }) => (
                <Password
                  {...field}
                  pt={{
                    input: { className: "w-full" },
                  }}
                  inputId="password"
                />
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
              }}
              render={({ field }) => (
                <Password
                  {...field}
                  pt={{
                    input: { className: "w-full" },
                  }}
                  inputId="password_confirmation"
                />
              )}
              name="password_confirmation"
            />
          </div>
          <Button label="Register" type="submit" />
        </form>
        <div className="flex justify-center w-full">
            <Button
            label="or Login with your account"
            link
            onClick={()=>navigate('/auth/login')}

            />
        </div>
      </Card>
    </div>
  );
}
