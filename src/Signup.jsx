import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (data.Password !== data.ConfirmPassword) {
      setError("ConfirmPassword", {
        type: "manual",
        message: "password and confirm password should match",
      });
      return;
    }
    const response = await fetch("http://localhost:4000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.FullName,
        email: data.Email,
        role: "admin",
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
      navigate("/login");
    }
  };

  return (
    <div className="p-4 md:max-w-lg mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Signup</CardTitle>
          <CardDescription>Create New Account</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onFocus={() => clearErrors("Feedback")}
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
          >
            <div>
              {errors.Feedback && (
                <pre className="text-red-600 text-sm">
                  {errors.Feedback.message}
                </pre>
              )}
              <Input
                type="text"
                placeholder="Full name"
                {...register("FullName", { required: "required" })}
              />
              {errors.FullName && (
                <span className="text-red-600 text-sm">
                  {errors.FullName.message}
                </span>
              )}
            </div>
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
                  minLength: { value: 8, message: "minimum length 8" },
                })}
              />
              {errors.Password && (
                <span className="text-red-600 text-sm">
                  {errors.Password.message}
                </span>
              )}
            </div>
            <div>
              <Input
                type="password"
                placeholder="Confirm Password"
                {...register("ConfirmPassword", {
                  required: "required",
                  minLength: { value: 8, message: "minimum length 8" },
                })}
              />
              {errors.ConfirmPassword && (
                <span className="text-red-600 text-sm">
                  {errors.ConfirmPassword.message}
                </span>
              )}
            </div>

            <Button
              variant="default"
              type="submit"
              className="bg-lime-300 text-black focus:bg-lime-400 hover:bg-lime-300"
            >
              Create Account
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="font-semibold">
            Already have an account?
            <Link
              to="/login"
              className="py-1 px-4 ml-4 rounded bg-lime-300 text-foreground  focus:bg-lime-400"
            >
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
