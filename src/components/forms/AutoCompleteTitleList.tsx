"use client";

import { TitleDetailsType } from "@/constants/Type";
import axios from "axios";
import { useEffect, useState } from "react";
import UserAvatar from "./UserAvatar";

type User = {
  id: string;
  _id: string;
  name: string;
  poster: string; // URL to image
  known_for: string;
};

type AutoCompletePersonListProps = {
  value?: string;
  onSelect: (selected: string) => void;
};

export default function AutoCompeleteTitle({
  value,
  onSelect,
}: AutoCompletePersonListProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<TitleDetailsType[]>([]);
  const [selectedUser, setSelectedUser] = useState<TitleDetailsType | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  // Fetch selected title by ID if editing
  useEffect(() => {
    const fetchInitialTitle = async () => {
      if (value && !selectedUser) {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/titles`, {
            headers: {
              Authorization: token,
            },
            params: {
              _id : value
            }
          });
          const data = res.data?.data;
          if (data) {
            setSelectedUser(data);
          }
        } catch (err) {
          console.error("Failed to fetch selected title", err);
        }
      }
    };

    fetchInitialTitle();
  }, [value, selectedUser]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim()) {
        fetchSuggestions(query);
      } else {
        setSuggestions([]);
      }
    }, 300); // debounce 300ms

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const fetchSuggestions = async (searchText: string) => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/titles`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          params: {
            name: searchText,
          },
        }
      );
      if (response.data.status) {
        setSuggestions(response.data.data.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch suggestions", err);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (data: TitleDetailsType) => {
    setSelectedUser(data);
    setQuery("");
    setSuggestions([]);
    onSelect(data._id);
  };

  return (
    <div className="w-full mx-auto mt-1">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelectedUser(null);
        }}
        placeholder="Search title by name..."
        className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
      />

      {loading && <p className="text-sm mt-1">Loading...</p>}

      {suggestions.length > 0 && (
        <ul className="border relative border-gray-300 mt-2 rounded-md shadow-md bg-white max-h-60 overflow-y-auto">
          {suggestions.map((data) => (
            <li
              key={data._id}
              onClick={() => handleSelect(data)}
              className="flex items-center gap-2 px-2 py-2 cursor-pointer hover:bg-blue-50"
            >
              <UserAvatar poster={data.poster} />
              <div className="flex flex-col text-gray-800">
                <span>{data.name}</span>
                <small>{data.type}</small>
              </div>
            </li>
          ))}
        </ul>
      )}

      {selectedUser && (
        <div className="mt-4 p-4 border rounded-md bg-green-50">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold">Selected Title</h3>
              <div className="flex items-center gap-2 mt-2">
                <UserAvatar poster={selectedUser.poster} />
                <div className="flex flex-col">
                  <span>{selectedUser.name}</span>
                  <small>{selectedUser.type}</small>
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedUser(null)}
              className="text-red-500 hover:text-red-700 text-sm cursor-pointer"
              title="Remove"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
