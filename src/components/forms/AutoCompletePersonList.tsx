import axios from "axios";
import React, {  useState } from "react";
import { toast } from "react-toastify";

type UserTag = {
  id: string;
  name: string;
};

function slugify(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, "-");
}

type AutoCompletePersonListProps = {
  users: UserTag[];
  placeholder?: string;
  onSelect: (selected: UserTag[]) => void;
  onAddUser?: (newUser: UserTag) => void;
};

export default function AutoCompletePersonList({
  users = [],
  placeholder = "Search or add new...",
  onSelect,
  onAddUser,
}: AutoCompletePersonListProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<UserTag[]>([]);
  const [filtered, setFiltered] = useState<UserTag[]>([]);
  const [showList, setShowList] = useState(false);

  // Filter users not selected and match query
  const filterUsers = (value: string) => {
    return users.filter(
      (user) =>
        user.name?.toLowerCase().includes(value.toLowerCase()) &&
        !selected.includes(user)
    );
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim().length > 0) {
      setFiltered(filterUsers(value));
      setShowList(true);
    } else {
      setShowList(false);
    }
  };

  // Select existing user
  const handleSelect = (item: UserTag) => {
    const newSelection = [...selected, item];
    setSelected(newSelection);
    onSelect(newSelection);
    setQuery("");
    setShowList(false);
  };

  // Add a new user (not in list)
  const handleAddNewUser = async () => {
    const name = query.trim();
    if (name.length === 0) return;

    const payload = {
      name: slugify(name),
      display_name: name,
      type: "genre",
    };

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/tag`,
        payload,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status) {
        toast("Tags created successfully:", response.data.data);

        const newUser: UserTag = {
          id: response.data.data._id,
          name: response.data.data.display_name,
        };

        // Optionally notify parent about new user addition
        if (onAddUser) onAddUser(newTag);

        // Select the newly added user
        const newSelection = [...selected, newUser];
        setSelected(newSelection);
        onSelect(newSelection);

        setQuery("");
        setShowList(false);
      } else {
        toast("Tags creation failed:", response.data.message);
      }
    } catch (error) {
      toast("Error creating plan:", error);
    }
  };

  // Remove selected user
  const handleRemove = (id: string) => {
    const newSelection = selected.filter((item) => item.id !== id);
    setSelected(newSelection);
    onSelect(newSelection);
  };

  const isExactMatch =
    users.some((user) => user.name?.toLowerCase() === query.toLowerCase()) ||
    query.trim() === "";

  return (
    <div className="relative w-full max-w-md mx-auto ">
      {/* Selected users */}
      <div className="flex flex-wrap gap-2 mb-2">
        {selected.map((item, i) => (
          <div
            key={i}
            className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
          >
            {item.name}
            <button
              onClick={() => handleRemove(item.id)}
              className="ml-2 text-blue-600 hover:text-red-600"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Input */}
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Dropdown */}
      {showList && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-md max-h-60 overflow-y-auto">
          {/* List filtered users */}
          {filtered.length > 0 ? (
            filtered.map((item, i) => (
              <li
                key={i}
                onClick={() => handleSelect(item)}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100"
              >
                {item.name}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-400">No match found</li>
          )}

          {/* Show "Add new" only if no exact match and query isn't empty */}
          {!isExactMatch && query.trim() !== "" && (
            <li
              onClick={handleAddNewUser}
              className="px-4 py-2 cursor-pointer text-green-600 hover:bg-green-100 font-semibold"
            >
              + Add {query.trim()}
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
