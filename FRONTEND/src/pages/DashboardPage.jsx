import React from "react";
import UrlForm from "../components/UrlForm";
import UserUrl from "../components/UserUrl";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center pt-16 px-4">
      <div className="w-full max-w-3xl -mt-10 bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          URL Shortener
        </h1>

        <UrlForm />
        <UserUrl />
      </div>
    </div>
  );
};

export default DashboardPage;
