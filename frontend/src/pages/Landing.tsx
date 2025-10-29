import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Shield } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-primary/80"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center min-h-screen">
          <div className="text-center space-y-8 max-w-3xl animate-fade-in">
            <div className="space-y-4">
              <div className="inline-block">
                <div className="w-20 h-20 rounded-2xl bg-accent flex items-center justify-center mb-6 animate-float mx-auto">
                  <span className="text-primary font-bold text-3xl">HC</span>
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground">
                Welcome to HostelCare
              </h1>
              <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                Your one-stop solution for hostel maintenance and complaint management
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button
                size="lg"
                onClick={() => navigate("/slogin")}
                className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground group min-w-[200px]"
              >
                <GraduationCap className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Login as Student
              </Button>
              <Button
                size="lg"
                onClick={() => navigate("/alogin")}
                variant="secondary"
                className="w-full sm:w-auto group min-w-[200px]"
              >
                <Shield className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Login as Admin
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
