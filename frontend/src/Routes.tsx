import React from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { ProfileSettings } from './pages/ProfileSettings';
import { Credits } from './pages/Credits';
import { CoverLetters } from './pages/CoverLetters';
import { ResumeForm } from './components/resume/ResumeForm';
import { ResumeList } from './components/resume/ResumeList';
import { Pricing } from './pages/Pricing';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { Toast } from './components/ui/Toast';
import { useToast } from './hooks/useToast';

export const Routes = () => {
  const { toast } = useToast();

  return (
    <>
      <Navbar />
      <RouterRoutes>
        {/* Routes publiques */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/pricing" element={<Pricing />} />

        {/* Routes protégées */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<ProfileSettings />} />
          <Route path="/resumes" element={<ResumeList />} />
          <Route path="/resumes/new" element={<ResumeForm />} />
          <Route path="/resumes/:id" element={<ResumeForm />} />
          <Route path="/cover-letters" element={<CoverLetters />} />
          <Route path="/credits" element={<Credits />} />
        </Route>
      </RouterRoutes>
      <Toast {...toast} />
    </>
  );
}; 