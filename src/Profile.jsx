import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UserCircle2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateName } from "./slices/user";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    const name = e.target.name.value;
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/user/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 500) console.error(data);
      } else {
        localStorage.setItem("jwt", data);
        dispatch(updateName(name));
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center">
          <Avatar>
            {/*ToDO: add image of user */}
            {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
            <AvatarFallback>
              <UserCircle2 className="hover:cursor-pointer hover:bg-lime-300 rounded-lg active:bg-lime-300" />
            </AvatarFallback>
          </Avatar>
          <span className="text-xl font-semibold sm:hidden">Profile</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue={user.name}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Role</Label>
              <p className="mx-2 text-muted-foreground hover:cursor-not-allowed">
                {user.role}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              variant="outline"
              className="hover:cursor-pointer hover:bg-lime-300 active:bg-lime-300 text-lg"
            >
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Profile;
