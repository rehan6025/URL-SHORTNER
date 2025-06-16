import React from "react";
import LoginForm from "../components/LoginForm";

const AuthPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <LoginForm />
    </div>
  );
};

export default AuthPage;
