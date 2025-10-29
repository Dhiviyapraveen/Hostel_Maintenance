import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import axios from "axios";

interface Issue {
  _id: string;
  description: string;
  roomNo: string;
  category: string;
  status: string;
  createdAt: string;
}

const AdminComplaintView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = localStorage.getItem("userName");
  const [issues, setIssues] = useState<Issue[]>([]);
  const [statusUpdates, setStatusUpdates] = useState<{ [key: string]: string }>({});

  // Extract category from route
  const pathCategory = location.pathname.replace("/complaint", ""); // e.g. "/complaintcarpentry" → "carpentry"
  const category = pathCategory.charAt(0).toUpperCase() + pathCategory.slice(1); // "Carpentry"

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");

    if (!token || role !== "admin") {
      navigate("/alogin");
      return;
    }

    loadIssues();
  }, [navigate, category]);

  const loadIssues = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/issues");
      // Filter by category dynamically
      const filteredIssues = response.data.filter(
        (issue: Issue) => issue.category === category
      );
      setIssues(filteredIssues);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load issues from server");
    }
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setStatusUpdates({ ...statusUpdates, [id]: newStatus });
  };

  const handleUpdate = async (id: string) => {
    const newStatus = statusUpdates[id];
    if (!newStatus) {
      toast.error("Please select a status");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/issues/${id}`, { status: newStatus });
      toast.success("Issue status updated successfully!");
      loadIssues(); // refresh list
    } catch (error) {
      console.error(error);
      toast.error("Failed to update issue status");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar role="admin" userName={userName || ""} />

      <main className="flex-1 container mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{category} Issues</CardTitle>
            <CardDescription>
              View, manage, and resolve all {category.toLowerCase()} complaints
            </CardDescription>
          </CardHeader>

          <CardContent>
            {issues.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No {category.toLowerCase()} issues submitted yet
                </p>
              </div>
            ) : (
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Room No</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {issues.map((issue) => (
                      <TableRow key={issue._id}>
                        <TableCell>{issue.roomNo}</TableCell>
                        <TableCell className="max-w-md break-words">
                          {issue.description}
                        </TableCell>
                        <TableCell>
                          {new Date(issue.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={statusUpdates[issue._id] || issue.status}
                            onValueChange={(value) => handleStatusChange(issue._id, value)}
                          >
                            <SelectTrigger className="w-[130px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Pending">Pending</SelectItem>
                              <SelectItem value="Resolved">Resolved</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            onClick={() => handleUpdate(issue._id)}
                            disabled={
                              !statusUpdates[issue._id] ||
                              statusUpdates[issue._id] === issue.status
                            }
                          >
                            Update
                          </Button>
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

export default AdminComplaintView;
