"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import UserAvatar from "./UserAvatar";
import { TitleDetailsType } from "@/constants/Type";

type User = {
  id : string;
  _id: string;
  name: string;
  poster: string; // URL to image
  known_for : string;
};

type AutoCompletePersonListProps = {
  onSelect: (selected: string) => void;
};

export default function AutoCompeleteTitle({
  onSelect,
}: AutoCompletePersonListProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<TitleDetailsType[]>([]);
  // const [selectedUser, setSelectedUser] = useState<TitleDetailsType | null>(null);
  const [loading, setLoading] = useState(false);

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
    // setSelectedUser(user);
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
          // setSelectedUser(null);
        }}
        placeholder="Search user by title name..."
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
    </div>
  );
}
