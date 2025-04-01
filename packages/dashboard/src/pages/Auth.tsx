import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Github, Mail } from "lucide-react";
import { handleSignIn } from "@/lib/utils";
import EmailPasswordForm from "@/components/common/EmailPasswordForm";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [showEmailForm, setShowEmailForm] = useState(false);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "register") {
      setActiveTab("register");
    } else {
      setActiveTab("login");
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 py-16 flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <Card className="bg-card/80 border-white/10 shadow-xl">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold">
                {activeTab === "login"
                  ? "Sign in to Vader"
                  : "Create your account"}
              </CardTitle>
              <CardDescription>
                {activeTab === "login"
                  ? "Enter your details to access your account"
                  : "Get started with Vader diagnostics"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-4">
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleSignIn("github")}
                >
                  <Github className="mr-2" size={18} />
                  Continue with GitHub
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleSignIn("google")}
                >
                  <Mail className="mr-2" size={18} />
                  Continue with Google
                </Button>
              </div>

              {false && // Remove this when username/password auth is implemented
                (!showEmailForm ? (
                  <div className="text-center mt-4">
                    <Button
                      variant="ghost"
                      className="text-primary hover:underline text-sm"
                      onClick={() => setShowEmailForm(true)}
                    >
                      Continue with email and password
                    </Button>
                  </div>
                ) : (
                  <EmailPasswordForm activeTab={activeTab} />
                ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Auth;
