
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Github, Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [showEmailForm, setShowEmailForm] = useState(false);
  
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'register') {
      setActiveTab('register');
    } else {
      setActiveTab('login');
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 py-16">
        <div className="mx-auto max-w-md px-4">
          <Card className="bg-card/80 border-white/10 shadow-xl">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold">
                {activeTab === 'login' ? 'Sign in to Vader' : 'Create your account'}
              </CardTitle>
              <CardDescription>
                {activeTab === 'login' 
                  ? 'Enter your details to access your account' 
                  : 'Get started with Vader diagnostics'}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-4">
                <Button variant="outline" className="w-full" onClick={() => {}}>
                  <Github className="mr-2" size={18} />
                  Continue with GitHub
                </Button>
                
                <Button variant="outline" className="w-full" onClick={() => {}}>
                  <Mail className="mr-2" size={18} />
                  Continue with Google
                </Button>
              </div>
              
              {!showEmailForm ? (
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
                <>
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-card px-2 text-sm text-muted-foreground">
                        OR
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>
                    
                    {activeTab === 'register' && (
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="••••••••"
                        />
                      </div>
                    )}
                    
                    {activeTab === 'login' && (
                      <div className="text-right">
                        <Button variant="link" className="p-0 h-auto text-sm">
                          Forgot password?
                        </Button>
                      </div>
                    )}
                    
                    <Button className="w-full">
                      {activeTab === 'login' ? 'Sign In' : 'Create Account'}
                    </Button>
                  </div>
                </>
              )}
              
              <div className="text-center text-sm mt-6">
                {activeTab === 'login' ? (
                  <p>
                    Don't have an account?{' '}
                    <Link to="/auth?tab=register" className="text-primary hover:underline">
                      Sign up
                    </Link>
                  </p>
                ) : (
                  <p>
                    Already have an account?{' '}
                    <Link to="/auth?tab=login" className="text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Auth;
