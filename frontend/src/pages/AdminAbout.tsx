import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import aboutImage from "@/assets/about-image.jpg";

const AdminAbout = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    if (!token || role !== "admin") {
      navigate("/alogin");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar role="admin" userName={userName || ""} />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12">About HostelCare</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src={aboutImage}
                alt="HostelCare Team"
                className="rounded-2xl shadow-lg w-full object-cover"
              />
            </div>

            <div className="order-1 lg:order-2 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Administrative Overview</h2>
                <p className="text-muted-foreground leading-relaxed">
                  As an administrator, you have access to comprehensive tools for managing all
                  maintenance requests across the hostel facility. Our system streamlines the
                  complaint resolution process and helps maintain optimal living conditions.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">System Features</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-accent mt-2 mr-3"></span>
                    <span>Real-time complaint tracking and status updates</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-accent mt-2 mr-3"></span>
                    <span>Category-wise complaint management for efficient resolution</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-accent mt-2 mr-3"></span>
                    <span>Dashboard analytics for monitoring pending and resolved issues</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-accent mt-2 mr-3"></span>
                    <span>Detailed complaint information including room numbers and descriptions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-accent mt-2 mr-3"></span>
                    <span>Quick status updates with dropdown selections</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Support & Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For technical support or system inquiries, please contact the Department of CSE.
                  Our team is committed to providing continuous support for efficient hostel
                  management operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminAbout;
