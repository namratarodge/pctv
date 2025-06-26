"use client";
import React from "react";

export default function CreateProfile() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex  justify-center p-4">
      <div className="w-full bg-white rounded-md shadow-xl p-8">
        <div className="flex gap-2">
          <h1 className="text-xl font-bold mb-6  text-gray-800">
            Add New Page
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className=" gap-6">
            <div>
              <label className="block text-gray-800 mb-1">Page Title</label>
              <input
                type="text"
                name="name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Bio</label>
            <textarea
              name="bio"
              rows={4}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="px-6 bg-red-400 hover:bg-red-500 text-white font-semibold py-2 rounded-md transition-all"
            >
              Create
            </button>
            <button
              type="submit"
              className="px-6 font-semibold py-2 rounded-md transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
