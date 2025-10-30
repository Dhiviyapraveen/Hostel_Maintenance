import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import aboutImage from "@/assets/aboutus.jpg";

const UserAbout = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const roomNo = localStorage.getItem("roomNo");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    if (!token || role !== "student") {
      navigate("/slogin");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar role="student" userName={userName || ""} roomNo={roomNo || ""} />

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
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  HostelCare is dedicated to providing efficient and seamless maintenance services
                  for hostel residents. We understand the importance of a well-maintained living
                  environment and strive to address all maintenance concerns promptly.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Our Services</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-accent mt-2 mr-3"></span>
                    <span>Comprehensive carpentry services for furniture and fixtures</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-accent mt-2 mr-3"></span>
                    <span>Professional plumbing solutions for all water-related issues</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-accent mt-2 mr-3"></span>
                    <span>Expert electrical services ensuring safety and functionality</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-accent mt-2 mr-3"></span>
                    <span>Regular housekeeping for cleanliness and hygiene</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-accent mt-2 mr-3"></span>
                    <span>Network and connectivity support for uninterrupted internet access</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserAbout;
