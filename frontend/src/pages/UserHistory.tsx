import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

interface Complaint {
  _id: string;
  name: string;
  roomNo: string;
  category: string;
  description: string;
  status: string;
  createdAt: string;
}

const UserHistory = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const roomNo = localStorage.getItem("roomNo");
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    if (!token || role !== "student") {
      navigate("/slogin");
      return;
    }

    const fetchComplaints = async () => {
      try {
        const res = await fetch("https://hostel-maintenance.onrender.com/api/issues");
        if (!res.ok) {
          throw new Error("Failed to fetch complaints");
        }
        const data = await res.json();

        // Filter only this student's complaints
        const userComplaints = data.filter((c: Complaint) => c.roomNo === roomNo);
        setComplaints(userComplaints);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load complaints. Please try again later.");
      }
    };

    fetchComplaints();
  }, [navigate, roomNo]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar role="student" userName={userName || ""} roomNo={roomNo || ""} />

      <main className="flex-1 container mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">My Complaint History</CardTitle>
            <CardDescription>View all your submitted maintenance requests</CardDescription>
          </CardHeader>
          <CardContent>
            {complaints.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No complaints submitted yet</p>
              </div>
            ) : (
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Room No</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {complaints.map((complaint) => (
                      <TableRow key={complaint._id}>
                        <TableCell className="font-medium">{complaint.category}</TableCell>
                        <TableCell className="max-w-md truncate">{complaint.description}</TableCell>
                        <TableCell>{complaint.roomNo}</TableCell>
                        <TableCell>
                          {new Date(complaint.createdAt).toLocaleDateString("en-GB")}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              complaint.status === "Resolved" ? "default" : "secondary"
                            }
                            className={
                              complaint.status === "Resolved"
                                ? "bg-green-600 text-white"
                                : "bg-yellow-200 text-black"
                            }
                          >
                            {complaint.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default UserHistory;
