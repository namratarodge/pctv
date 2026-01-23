// context/PublicDataContext.jsa

"use client";
import { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";
const PublicDataContext = createContext();

function getItemDataByType(items, type) {
  if (!Array.isArray(items)) return [];

  return items.filter((item) => item.type === type);
}

export function PublicDataProvider({ children }) {
  const [user, setUser] = useState([]);
  const [categories, setCategories] = useState([]);
  const [masterContry, setMasterCountry] = useState([]);
  const [tvtopic, setTvtopic] = useState([]);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/tags`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            limit: 100,
          },
        }
      );
      if (response.data.status) {
        const modifiedData = response.data.data.data;
        const keyword = getItemDataByType(modifiedData, "keyword");
        const genre = getItemDataByType(modifiedData, "genre");
        const production_country = getItemDataByType(
          modifiedData,
          "production_country"
        );
        setTvtopic(keyword);
        setCategories(genre);
        setMasterCountry(production_country);
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
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user`,
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
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
            subscription: modifiedData.subscription,
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
    fetchCategory();
    fetchPages();
  }, []);

  return (
    <PublicDataContext.Provider
      value={{
        tvtopic,
        categories,
        masterContry,
        pages,
        user,
        refetchUser : fetchUser,
        loading,
      }}
    >
      {children}
    </PublicDataContext.Provider>
  );
}

export const usePublicData = () => useContext(PublicDataContext);
