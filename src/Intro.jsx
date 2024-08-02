import HomeImage from "./assets/f57794be6408563354c463c702ab45b91600672364.avif";
import Signin from "./assets/sign-in-register-svgrepo-com.svg";
import ScooterDelivery from "./assets/scooter-svgrepo-com.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Intro = () => {
  return (
    <div className="m-auto max-w-7xl relative">
      <img src={HomeImage} alt="Leafy background" />
      <div className=" mt-4 absolute top-0 flex flex-col w-full">
        <div className="mx-auto">
          <h1 className="text-xl md:text-3xl font-bold">How it works?</h1>
        </div>
        <div className="flex flex-col gap-y-2 md:flex-row my-8 md:my-10 justify-center">
          <div className="w-full px-8 md:w-1/3 md:px-2">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className=" w-1/2 mx-auto">
                  <img src={Signin} alt="Sigin Logo" />
                </CardTitle>
                <CardDescription className="text-xl font-bold text-foreground mx-auto">
                  Step 1
                </CardDescription>
              </CardHeader>
              <CardContent className="text-lg font-semibold text-center">
                <p>Register for online ordering</p>
              </CardContent>
              <CardFooter className=" text-center">
                <p>And deliver orders to millions of customers with ease</p>
              </CardFooter>
            </Card>
          </div>
          <div className="w-full px-8 md:px-2 md:w-1/3">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="w-1/2 mx-auto">
                  <img src={ScooterDelivery} alt="Delivery Logo" />
                </CardTitle>
                <CardDescription className="text-xl font-bold text-foreground mx-auto">
                  Step 2
                </CardDescription>
              </CardHeader>
              <CardContent className="text-lg font-semibold text-center">
                <p>Start receiving orders online</p>
              </CardContent>
              <CardFooter className=" text-center">
                <p>Manage orders on our partner app, web dashboard</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
