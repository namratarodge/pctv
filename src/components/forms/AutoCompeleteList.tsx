"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import UserAvatar from "./UserAvatar";

type User = {
  _id: string;
  name: string;
  poster: string; // URL to image
  known_for : string;
};

type AutoCompletePersonListProps = {
  onSelect: (selected: User) => void;
};

export default function UserAutoComplete({
  onSelect,
}: AutoCompletePersonListProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
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
        `${process.env.NEXT_PUBLIC_API_URL}/peoples`,
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

  const handleSelect = (user: User) => {
    setSelectedUser(user);
    setQuery(user.name);
    setSuggestions([]);
    onSelect(user);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-1">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelectedUser(null);
        }}
        placeholder="Search user by name..."
        className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
      />

      {loading && <p className="text-sm mt-1">Loading...</p>}

      {suggestions.length > 0 && (
        <ul className="border border-gray-300 mt-2 rounded-md shadow-md bg-white max-h-60 overflow-y-auto">
          {suggestions.map((user) => (
            <li
              key={user._id}
              onClick={() => handleSelect(user)}
              className="flex items-center gap-2 px-2 py-2 cursor-pointer hover:bg-blue-50"
            >
              <UserAvatar user={user} />
              <div className="flex flex-col">
                <span>{user.name}</span>
                <small>{user.known_for}</small>
              </div>
            </li>
          ))}
        </ul>
      )}

      {selectedUser && (
        <div className="mt-4 p-4 border rounded-md bg-green-50">
          <h3 className="font-bold">Selected User</h3>
          <div className="flex items-center gap-2 mt-2">
            <UserAvatar user={selectedUser} />
            <div className="flex flex-col">
              <span>{selectedUser.name}</span>
              <small>{selectedUser.known_for}</small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
