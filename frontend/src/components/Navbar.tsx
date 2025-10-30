import { Link, useNavigate } from "react-router-dom";
import { Home, FileText, Info, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  role: "student" | "admin";
  userName?: string;
  roomNo?: string;
}

const Navbar = ({ role, userName, roomNo }: NavbarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <nav className="bg-card shadow-md sticky top-0 z-50 border-b border-border">
      {/* ✅ Removed container centering to make HostelCare fully left-aligned */}
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        {/* ✅ Left corner title */}
        <Link
          to={role === "student" ? "/home" : "/adminhome"}
          className="flex items-center space-x-2"
        >
          <span className="font-bold text-xl text-foreground">HostelCare</span>
        </Link>

        {/* ✅ Right side buttons */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          {role === "student" ? (
            <>
              <Link to="/home">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Button>
              </Link>
              <Link to="/userhistory">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>My Reports</span>
                </Button>
              </Link>
              <Link to="/userabout">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Info className="w-4 h-4" />
                  <span>About</span>
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/adminhome">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Home className="w-4 h-4" />
                  <span>Dashboard</span>
                </Button>
              </Link>
              <Link to="/adminabout">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Info className="w-4 h-4" />
                  <span>About</span>
                </Button>
              </Link>
            </>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="px-2 py-1.5 text-sm">
                <p className="font-medium">{userName || "User"}</p>
                {roomNo && <p className="text-muted-foreground">Room: {roomNo}</p>}
                <p className="text-muted-foreground capitalize">{role}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-destructive cursor-pointer"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

