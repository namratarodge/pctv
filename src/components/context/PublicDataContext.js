// context/PublicDataContext.jsa

"use client";
import { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";
const PublicDataContext = createContext();
import { jwtDecode } from "jwt-decode";

export function PublicDataProvider({ children }) {
  const [user, setUser] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tvtopic, setTvtopic] = useState([]);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTVTopic = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/tags?type=keyword`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status) {
        const modifiedData = response.data.data.data;
        // console.log(modifiedData);
        setLoading(false);
        setTvtopic(modifiedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Always stop loading, whether success or failure
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/tags?type=genre`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status) {
        const modifiedData = response.data.data.data;
        setLoading(false);
        setCategories(modifiedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Always stop loading, whether success or failure
    }
  };

  const fetchPages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/pages`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            limit: 5,
          },
        }
      );
      if (response.data.status) {
        const modifiedData = response.data.data.data;
        setLoading(false);
        setPages(modifiedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Always stop loading, whether success or failure
    }
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      // setUser(decoded);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users`,
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
            params: {
              _id: decoded.id,
            },
          }
        );
        if (response.data.status) {
          const modifiedData = response.data.data.data;
          const userData = {
            id: modifiedData._id,
            first_name: modifiedData.first_name,
            last_name: modifiedData.last_name,
            email: modifiedData.email,
            gender: modifiedData.gender,
            phone: modifiedData.phone,
            country: modifiedData.country,
            avatar_url: modifiedData.avatar_url,
          };
          setUser(userData);
        }
      } catch (error) {
        console.log(error.code);
        // if(error.code === 'ERR_BAD_REQUEST'){
        //   window.location.href = "/login";
        // }
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchUser();
    fetchTVTopic();
    fetchCategories();
    fetchPages();
  }, []);

  return (
    <PublicDataContext.Provider
      value={{
        tvtopic,
        categories,
        pages,
        user,
        loading,
      }}
    >
      {children}
    </PublicDataContext.Provider>
  );
}

export const usePublicData = () => useContext(PublicDataContext);
