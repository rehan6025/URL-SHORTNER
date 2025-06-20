import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { createShortUrl } from "../api/shortUrl.api";
import { useSelector } from "react-redux";

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [customSlug, setCustomSlug] = useState("");

  const handleSubmit = async () => {
    const ShortUrl = await createShortUrl(url);
    console.log(ShortUrl);
    setShortUrl(ShortUrl);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="url"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Enter your long URL
        </label>
        <input
          type="url"
          id="url"
          value={url}
          onInput={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/very/long/url/that/needs/shortening"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        onClick={handleSubmit}
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        Shorten
      </button>

      {/* {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )} */}

      {isAuthenticated && (
        <div className="mt-4">
          <label
            htmlFor="customSlug"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Custom URL (optional)
          </label>
          <input
            type="text"
            id="customSlug"
            value={customSlug}
            onChange={(e) => setCustomSlug(e.target.value)}
            placeholder="Enter a custom slug "
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {shortUrl && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-600 mb-1">Your shortened URL:</p>
          <div className="flex items-center">
            <input
              type="text"
              value={shortUrl}
              readOnly
              className="flex-1 p-2 border border-gray-300 rounded-l-md bg-white"
            />
            <button
              type="button"
              onClick={handleCopy}
              className={`px-3 py-2 rounded-r-md ${
                copied
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlForm;
