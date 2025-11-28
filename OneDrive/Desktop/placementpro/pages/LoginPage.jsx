
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { Card, Input, Button } from '../components/ui';
import { UserRole } from '../types';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, currentUser } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      switch (currentUser.role) {
        case UserRole.Admin:
          navigate('/admin');
          break;
        case UserRole.Student:
          navigate('/student');
          break;
        case UserRole.Employer:
          navigate('/employer');
          break;
        case UserRole.PlacementOfficer:
          navigate('/officer');
          break;
        default:
          navigate('/');
      }
    }
  }, [currentUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center app-gradient py-12 px-4 sm:px-6 lg:px-8">
      {/* Decorative floating shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-16 -top-16 w-56 h-56 rounded-full bg-white/10 blur-3xl opacity-40 animate-[-webkit-transform_8s_linear_infinite]" />
        <div className="absolute -right-20 bottom-10 w-72 h-72 rounded-full bg-white/5 blur-2xl opacity-30" />
      </div>

      <div className="relative max-w-md w-full space-y-8 animate-fade-in">
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-white/20 glass mx-auto shadow-lg">
            <span className="w-3 h-3 rounded-full bg-white animate-ping mr-3" />
            <h1 className="text-xl font-bold text-white">PlacementPro</h1>
          </div>

          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="glass card-float rounded-2xl shadow-2xl border border-white/10 p-6">
          <Card>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <Input
                id="email"
                label="Email address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                id="password"
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div>
                <Button type="submit" className="btn-animated w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  Sign in
                </Button>
              </div>
            </form>

            <div className="mt-4 text-sm text-center text-black">
              <p className="font-bold">Demo Credentials:</p>
              <p>student@placementpro.com</p>
              <p>employer@placementpro.com</p>
              <p>admin@placementpro.com</p>
              <p>officer@placementpro.com</p>
              <p className="mt-1">Password for all: <span className="font-mono">password</span></p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
