"use client";
import { BackwardIcon } from "@heroicons/react/24/outline";
// pages/create-profile.tsx
import React, { useState } from "react";

export default function CreateProfile() {
  const [formData, setFormData] = useState({
    name: "",
    knownFor: "",
    bio: "",
    gender: "",
    birthDate: "",
    deathDate: "",
    popularity: "",
    birthPlace: "",
    allowAutoUpdate: false,
    image: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, image: files?.[0] || null });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
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
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Bio</label>
            <textarea
              name="bio"
              rows={4}
              onChange={handleChange}
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
