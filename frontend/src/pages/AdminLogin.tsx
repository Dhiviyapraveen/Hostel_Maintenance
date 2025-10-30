import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { loginUser } from "@/api/api"; 
import logo from "@/assets/logo.jpg"; // ✅ Ensure path is correct

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const data = await loginUser(formData.username, formData.password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.role);
      localStorage.setItem("userName", data.username);
      toast.success("Admin login successful!");
      navigate("/adminhome");
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-4">
      <div className="w-full max-w-md space-y-4">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <Card className="animate-scale-in shadow-xl overflow-hidden border border-gray-200 rounded-2xl">
          {/* ✅ Added margin-top to give space above logo */}
          <div className="w-full bg-white flex justify-center items-center py-3 mt-2">
            <img
              src={logo}
              alt="HostelCare Logo"
              className="w-56 sm:w-60 md:w-64 lg:w-72 object-contain"
            />
          </div>

          {/* ✅ Reduced spacing between logo and title */}
          <CardHeader className="text-center pt-2 pb-4">
            <CardTitle className="text-2xl font-semibold">Admin Login</CardTitle>
            <CardDescription>Access the administrative dashboard</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter admin username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter admin password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Login as Admin
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
