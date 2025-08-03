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
  onSelect: (selected: User) => void;
};

export default function AutoCompeleteTitleForHeader({
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
    setQuery(data.name);
    setSuggestions([]);
    onSelect(data);
  };

  return (
    <div className=" relative">
      <div className="flex items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          // setSelectedUser(null);
        }}
        placeholder="Search by title name..."
        className="w-80  border-b-1 border-gray-300 px-1 py-2  focus:outline-none focus:outline-0 text-md "
      />
      </div>

      {suggestions.length > 0 && (
        <ul className="border absolute  border-gray-300 mt-2 rounded-md shadow-md bg-white max-h-60 overflow-y-auto w-100">
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
