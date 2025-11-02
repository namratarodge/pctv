"use client";

import { toUserTag, UserTagForUser } from "@/constants/Type";
import axios from "axios";
import { useEffect, useState } from "react";

type AutoCompletePersonListProps = {
  value?: UserTagForUser | null;
  onSelect: (selected: UserTagForUser) => void;
};

export default function AutoCompeleteListUser({
  value,
  onSelect,
}: AutoCompletePersonListProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<UserTagForUser[]>([]);
  // const [selectedUser, setSelectedUser] = useState<UserTagForUser | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (value) {
      setQuery(value.email);
    } else {
      setQuery("");
    }
  }, [value]);

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
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          params: {
            email: searchText,
          },
        }
      );
      if (response.data.status) {
        const raws = response.data.data.data || [];
        setSuggestions(raws.map(toUserTag)); // 👈 adapt here
      }
    } catch (err) {
      console.error("Failed to fetch suggestions", err);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (user: UserTagForUser) => {
    // setSelectedUser(user);
    setQuery(user.email);
    setSuggestions([]);
    onSelect(user);
  };

  return (
    <div className="w-full mt-2">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          // setSelectedUser(null);
        }}
        placeholder="Search user by name..."
        className=" w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
      />

      {loading && <p className="text-sm mt-1">Loading...</p>}

      {suggestions.length > 0 && (
        <ul className="border border-gray-300 mt-2 rounded-md shadow-md bg-white max-h-60 overflow-y-auto">
          {suggestions.map((user) => (
            <li
              key={user.id ?? user._id}
              onClick={() => handleSelect(user)}
              className="flex items-center gap-1 px-2 py-2 cursor-pointer hover:bg-blue-50"
            >
              {/* <UserAvatar direct={true} poster={user?.avatar} /> */}
              <div className="flex flex-col">
                <span>{user?.first_name}</span>
                <small>{user?.email}</small>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
