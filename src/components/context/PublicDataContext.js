// context/PublicDataContext.jsa

"use client";
import { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";
import { jwtDecode } from "jwt-decode";
const PublicDataContext = createContext();

export function PublicDataProvider({ children }) {
  const [user, setUser] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tvtopic, setTvtopic] = useState([]);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTVTopic = async () => {
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
        setTvtopic(modifiedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchCategories = async () => {
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
        setCategories(modifiedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchPages = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/pages`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            limit: 10,
          },
        }
      );
      if (response.data.status) {
        const modifiedData = response.data.data.data;
        setPages(modifiedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchUser = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (token && token.split(".").length === 3) {
      const decoded = jwtDecode(token);
      // setUser(decoded);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user`,
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            }
          }
        );
        if (response.data.status) {
          const modifiedData = response.data.data;
          const userData = {
            id: modifiedData._id,
            first_name: modifiedData.first_name,
            last_name: modifiedData.last_name,
            email: modifiedData.email,
            gender: modifiedData.gender,
            phone: modifiedData.phone,
            country: modifiedData.country,
            avatar: modifiedData.avatar,
            userType: modifiedData.userType,
            subscriptions : modifiedData.subscriptions
          };
          setUser(userData);
        }
        setLoading(false);
      } catch (error) {
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
