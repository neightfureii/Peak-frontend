import React, { useState } from 'react';
import { Lock, Mail, User, Eye, EyeOff, Loader2, UserCheck } from 'lucide-react';
import { useRegister } from '@refinedev/core';
import { Button } from '@/components/ui/button';
import leftSideImageSrc from '../../../public/images/login.jpg';
import { CustomHeader } from '@/components/refine-ui/layout/custom-title';
import { ThemeToggle } from '@/components/refine-ui/theme/theme-toggle';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorValidation, setErrorValidation] = useState('');

  // Integrating Refine's auth hook for user registration
  const { mutate: register } = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorValidation('');

    // Basic password matching validation layer
    if (password !== confirmPassword) {
      setErrorValidation('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    
    // Pass registration credentials to your Refine authProvider
    register({ fullName, email, password }, {
      onSettled: () => setIsSubmitting(false)
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground grid lg:grid-cols-2 font-sans antialiased">
      
      {/* LEFT SIDE: HERO PICTURE SIDEBAR (Matches Login view exactly) */}
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

      {/* RIGHT SIDE: MINIMAL SIGNUP FORM */}
      <div className="flex flex-col justify-center items-center px-6 lg:px-12 relative py-12 lg:py-0">
        
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
              Create an Account
            </h1>
            <p className="text-sm text-muted-foreground">
              Register to start booking venues and managing equipment
            </p>
          </div>

          {/* Interactive Form Field Section */}
          <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name Field Block */}
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm font-medium leading-none">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pl-10 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Email Field Block */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium leading-none">
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
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pl-10 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Password Field Block */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium leading-none">
                  Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pl-10 pr-10 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
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

              {/* Confirm Password Field Block */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium leading-none">
                  Confirm Password
                </label>
                <div className="relative flex items-center">
                  <UserCheck className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pl-10 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Client-side Error Message Display */}
              {errorValidation && (
                <p className="text-xs font-medium text-destructive text-center bg-destructive/10 py-1.5 rounded">
                  {errorValidation}
                </p>
              )}

              {/* Action Buttons */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Sign Up'
                )}
              </Button>
            </form>
          </div>

          {/* Footer Navigation Action Area */}
          <p className="text-center text-sm text-muted-foreground pt-2">
            Already have an account?{' '}
            <a href="/login" className="underline underline-offset-4 hover:text-primary transition-colors">
              Sign in
            </a>
          </p>

        </div>
      </div>

    </div>
  );
};

export default SignUp;