import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Hammer, 
  Wrench, 
  Zap, 
  Sparkles, 
  Wifi, 
  ClipboardList, 
  CheckCircle, 
  Package 
} from "lucide-react";

const AdminHome = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const [stats, setStats] = useState({ pending: 0, resolved: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("https://hostel-maintenance.onrender.com/api/issues/status");
        const data = await res.json();
        setStats({
          pending: data.pending || 0,
          resolved: data.resolved || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  const services = [
    {
      title: "Carpentry",
      icon: Hammer,
      path: "/complaintcarpentry",
      description: "View and manage carpentry complaints",
    },
    {
      title: "Plumbing",
      icon: Wrench,
      path: "/complaintplumbing",
      description: "View and manage plumbing complaints",
    },
    {
      title: "Electrical",
      icon: Zap,
      path: "/complaintelectrical",
      description: "View and manage electrical complaints",
    },
    {
      title: "Housekeeping",
      icon: Sparkles,
      path: "/complainthousekeeping",
      description: "View and manage housekeeping complaints",
    },
    {
      title: "Network",
      icon: Wifi,
      path: "/complaintnetwork",
      description: "View and manage network complaints",
    },
    {
      title: "Others",
      icon: Package,
      path: "/complaintothers",
      description: "View and manage other general complaints",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar role="admin" userName={userName || ""} />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Complaints</CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-warning">{stats.pending}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Awaiting resolution
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resolved Complaints</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-success">{stats.resolved}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Successfully completed
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Complaint Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminHome;
