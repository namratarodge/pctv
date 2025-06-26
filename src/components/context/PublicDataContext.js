// context/PublicDataContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const PublicDataContext = createContext();

export function PublicDataProvider({ children }) {
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
      console.log("test");
      console.log(response.data);
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
          params : {
            limit : 5
          }
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

  useEffect(() => {
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
        loading,
      }}
    >
      {children}
    </PublicDataContext.Provider>
  );
}

export const usePublicData = () => useContext(PublicDataContext);
