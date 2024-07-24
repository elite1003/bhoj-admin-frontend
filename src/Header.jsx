import { NavLink } from "react-router-dom";
import { LogIn } from "lucide-react";
import { badgeVariants } from "@/components/ui/badge";
import Logo from "./assets/letter-b-leaf-logo-concept-600nw-2363290659.jpg";
import { cn } from "@/lib/utils";
const Header = () => {
  return (
    <header className="flex justify-between items-center h-12 max-w-4xl m-auto shadow-md py-8">
      <div className="px-4">
        <NavLink to="/">
          <img
            src={Logo}
            alt="Bhoj"
            height={40}
            width={40}
            className="hover:scale-125"
          />
        </NavLink>
      </div>
      <div className="flex-1 px-2 py-2">
        <nav className="flex justify-end items-center gap-4">
          <NavLink
            to="/login"
            className={cn([
              `${badgeVariants({
                variant: "outline",
              })} text-lg gap-1 focus:bg-lime-300`,
              (isActive) => (isActive ? "bg-lime-300" : ""),
            ])}
          >
            <LogIn /> Login
          </NavLink>
          <NavLink
            to="/signup"
            className={`${(isActive) =>
              isActive ? "bg-lime-300" : ""} ${badgeVariants({
              variant: "outline",
            })} text-lg  focus:bg-lime-300`}
          >
            Signup
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
