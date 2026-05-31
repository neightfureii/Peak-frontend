import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useLogin } from '@refinedev/core';
import { Button } from '@/components/ui/button';
import leftSideImageSrc from '../../../public/images/login.jpg';
import { CustomHeader } from '@/components/refine-ui/layout/custom-title';
import { ThemeToggle } from '@/components/refine-ui/theme/theme-toggle';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Integrating Refine's auth hook
  const { mutate: login } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Pass authentication credentials to Refine data layers
    login({ email, password }, {
      onSettled: () => setIsSubmitting(false)
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground grid lg:grid-cols-2 font-sans antialiased">
      
      {/* LEFT SIDE: HERO PICTURE SIDEBAR (Hidden on mobile/tablet) */}
      <div className="relative hidden lg:flex flex-col justify-between p-10 bg-muted overflow-hidden border-r">
        {/* Background Image Layer */}
        <img 
          src={leftSideImageSrc} 
          alt="University Physical Education Facility" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay blend to keep typography perfectly readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60 z-10" />

        {/* Branding Header Content */}
        <a href="/" className="relative z-20 flex items-center gap-2 font-bold text-lg text-white tracking-tight">
          <CustomHeader />
        </a>
      </div>

      {/* RIGHT SIDE: MINIMAL LOGIN FORM */}
      <div className="flex flex-col justify-center items-center px-6 lg:px-12 relative">
        
        {/* Floating Mobile Branding Logo (Only visible when Left Sidebar is hidden) */}
        <a href="/" className="absolute top-8 left-6 flex lg:hidden items-center gap-2 font-bold text-lg tracking-tight">
          <CustomHeader />
        </a>

        <ThemeToggle className='absolute top-8 right-6' />

        {/* Main Content Card Context wrapper */}
        <div className="w-full max-w-[360px] space-y-6">
          
          {/* Header Block */}
          <div className="flex flex-col space-y-2 text-center lg:text-left">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome Back
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to access your athletic dashboard
            </p>
          </div>

          {/* Interactive Form Field Section */}
          <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Email Field Block */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <input
                    id="email"
                    type="email"
                    placeholder="name@university.edu"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pl-10 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Password Field Block */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium leading-none">
                    Password
                  </label>
                  <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                    Forgot password?
                  </a>
                </div>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pl-10 pr-10 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
                    disabled={isSubmitting}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </div>

          {/* Footer Registration Action Area */}
          <p className="text-center text-sm text-muted-foreground pt-2">
            Don't have an account yet?{' '}
            <a href="/register" className="underline underline-offset-4 hover:text-primary transition-colors">
              Sign up
            </a>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Login;