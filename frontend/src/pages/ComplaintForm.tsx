import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

const ComplaintForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = localStorage.getItem("userName");
  const roomNo = localStorage.getItem("roomNo");

  const categoryMap: { [key: string]: string } = {
    "/carpentry": "Carpentry",
    "/plumbing": "Plumbing",
    "/electrical": "Electrical",
    "/housekeeping": "Housekeeping",
    "/network": "Network",
    "/others": "Others",
  };

  const category = categoryMap[location.pathname] || "General";

  const [description, setDescription] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    if (!token || role !== "student") {
      navigate("/slogin");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!description.trim()) {
      toast.error("Please provide a complaint description");
      return;
    }

    const complaint = {
      name: userName,
      roomNo,
      category,
      description,
      status: "Pending",
    };

    try {
      const response = await fetch("http://localhost:5000/api/issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(complaint),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error submitting complaint:", errorData);
        throw new Error(errorData.message || "Failed to submit complaint");
      }

      toast.success("Complaint submitted successfully!");
      navigate("/userhistory");
    } catch (error: any) {
      console.error("Error submitting complaint:", error);
      toast.error(error.message || "Failed to submit complaint");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar role="student" userName={userName || ""} roomNo={roomNo || ""} />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle className="text-2xl">{category} Complaint</CardTitle>
              <CardDescription>Submit your maintenance request</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <div className="px-3 py-2 bg-secondary rounded-md text-sm">
                      {userName}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Room Number</Label>
                    <div className="px-3 py-2 bg-secondary rounded-md text-sm">
                      {roomNo}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Category</Label>
                  <div className="px-3 py-2 bg-secondary rounded-md text-sm font-medium">
                    {category}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Complaint Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Please describe the issue in detail..."
                    className="min-h-[150px]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/home")}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    Submit Complaint
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ComplaintForm;
