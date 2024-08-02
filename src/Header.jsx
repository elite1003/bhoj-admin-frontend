import { NavLink } from "react-router-dom";
import { LogIn, LogOut, MenuIcon } from "lucide-react";
import { badgeVariants } from "@/components/ui/badge";
import Logo from "./assets/letter-b-leaf-logo-concept-600nw-2363290659.jpg";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";
import { useDispatch } from "react-redux";
import { logout } from "./slices/user";
import Profile from "./Profile";
import DropDownMenu from "./DropDownMenu";
import { useState } from "react";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [isMenuOpen, setMenu] = useState(false);
  const dispatch = useDispatch();
  const toggleMenu = () => {
    setMenu((prev) => !prev);
  };
  return (
    <header className="flex justify-between items-center h-12 max-w-4xl m-auto  py-8">
      <div className="px-4">
        <NavLink to="/">
          <img
            src={Logo}
            alt="Bhoj"
            height={40}
            width={40}
            className="md:hover:scale-125"
          />
        </NavLink>
      </div>
      <div className="flex-1 px-2 py-2">
        {!isLoggedIn && (
          <nav className="flex justify-end items-center gap-4">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                [
                  cn([
                    `${badgeVariants({
                      variant: "outline",
                    })} text-lg gap-1 hover:bg-lime-300`,
                  ]),
                  isActive ? "bg-lime-300" : "",
                ].join(" ")
              }
            >
              <LogIn /> Login
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                [
                  cn([
                    `${badgeVariants({
                      variant: "outline",
                    })} text-lg gap-1 hover:bg-lime-300`,
                  ]),
                  isActive ? "bg-lime-300" : "",
                ].join(" ")
              }
            >
              Signup
            </NavLink>
          </nav>
        )}
        {isLoggedIn && (
          <nav className="flex justify-end items-center gap-4">
            <NavLink
              to="/recipe"
              className={({ isActive }) =>
                [
                  cn([
                    `${badgeVariants({
                      variant: "outline",
                    })} text-lg gap-1 hover:bg-lime-300`,
                  ]),
                  isActive ? "bg-lime-300" : "",
                ].join(" ")
              }
            >
              Recipe
            </NavLink>
            <NavLink
              to="/order"
              className={({ isActive }) =>
                [
                  cn([
                    `${badgeVariants({
                      variant: "outline",
                    })} text-lg gap-1 hover:bg-lime-300`,
                  ]),
                  isActive ? "bg-lime-300" : "",
                ].join(" ")
              }
            >
              Order
            </NavLink>
            <div className="hidden md:flex md:gap-4">
              <Badge
                onClick={() => dispatch(logout())}
                variant="outline"
                className="hover:cursor-pointer hover:bg-lime-300 active:bg-lime-300 text-lg gap-1"
              >
                <LogOut /> Logout
              </Badge>
              <Profile />
            </div>
            <MenuIcon
              className="md:hidden bg-slate-100 focus:bg-lime-300 active:bg-lime-300"
              onClick={toggleMenu}
            />
            {isMenuOpen && <DropDownMenu />}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
