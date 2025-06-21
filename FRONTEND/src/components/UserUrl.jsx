import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUserUrls } from "../api/user.api";

const UserUrl = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["userUrls"],
    queryFn: getAllUserUrls,
    refetchInterval: 30000,
  });
  const [copiedUrlId, setCopiedUrlId] = useState(null);
  const baseUrl = "http://localhost:3000";

  const handleCopy = async (fullShortUrl, id) => {
    try {
      await navigator.clipboard.writeText(fullShortUrl);
      setCopiedUrlId(id);
      setTimeout(() => setCopiedUrlId(null), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-600 py-8">Failed to fetch URLs</div>
    );

  const urls = data?.urls || [];

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow p-6">
      <div className="bg-blue-50 rounded-md p-4 overflow-x-auto h-56 ">
        {urls.length === 0 ? (
          <div className="text-gray-500 text-center">No URLs created.</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="py-2 px-2">Original URL</th>
                <th className="py-2 px-2">Short URL</th>
                <th className="py-2 px-2 text-center">Clicks</th>
                <th className="py-2 px-2 text-center">Copy</th>
              </tr>
            </thead>
            <tbody>
              {urls.reverse().map((url) => {
                const fullShortUrl = `${baseUrl}/${url.short_url}`;
                const isCopied = copiedUrlId === url._id;

                return (
                  <tr key={url._id} className="border-b hover:bg-blue-100">
                    <td className="py-2 px-2 break-all">{url.full_url}</td>
                    <td className="py-2 px-2 break-all">
                      <a
                        href={fullShortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {`localhost:3000/${url.short_url}`}
                      </a>
                    </td>
                    <td className="py-2 px-2 text-center">{url.clicks}</td>
                    <td className="py-2 px-2 text-center">
                      <button
                        type="button"
                        onClick={() => handleCopy(fullShortUrl, url._id)}
                        className={`px-3 py-2 rounded-md transition-colors ${
                          isCopied
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {isCopied ? "Copied!" : "Copy"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserUrl;
