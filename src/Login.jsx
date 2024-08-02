import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { init } from "./slices/user";

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const response = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.Email,
        password: data.Password,
      }),
    });
    const responseData = await response.json();
    if (!response.ok) {
      setError("Feedback", {
        type: "manual",
        message: responseData.error,
      });
    } else {
      localStorage.setItem("jwt", responseData.jwtToken);
      dispatch(init({ ...responseData.user, isLoggedIn: true }));
      navigate("/");
    }
  };

  return (
    <div className="p-4 md:max-w-lg mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onFocus={() => clearErrors("Feedback")}
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
          >
            <div>
              <Input
                type="email"
                placeholder="Email"
                {...register("Email", {
                  required: "required",
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "use small letter with @ and .",
                  },
                })}
              />
              {errors.Email && (
                <span className="text-red-600 text-sm">
                  {errors.Email.message}
                </span>
              )}
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                {...register("Password", {
                  required: "required",
                })}
              />
              {errors.Password && (
                <span className="text-red-600 text-sm">
                  {errors.Password.message}
                </span>
              )}
            </div>

            <Button
              variant="default"
              type="submit"
              className="bg-lime-300 text-black focus:bg-lime-400 hover:bg-lime-300"
            >
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="font-semibold">
            Don&apos;t have an account?
            <Link
              to="/signup"
              className="py-1 px-4 ml-4 rounded bg-lime-300 text-foreground  focus:bg-lime-400"
            >
              Signup
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
