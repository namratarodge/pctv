"use client";
import { SectorMultiSelect } from "@/components/forms";
import { SettingsFormValues } from "@/constants/Type";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Content() {
  // const [settings, setSettings] = useState<
  //   { id: number; name: string; value: string }[]
  // >([]);

  const [appRating, setAppRating] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [country, setCountry] = useState<string[]>([]);
  const [qualities, setQualities] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/settings`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          params: {
            name: "streaming.qualities,browse.languages,homepage.countries,browse.ageRatings",
          },
        }
      );
      if (response.data.status) {
        const modifiedData = response.data.data.data;
        // setSettings(modifiedData);

        // Find each setting by name, parse JSON value to string arrays
        const findSetting = (name: string) =>
          modifiedData.find((item: SettingsFormValues) => item.name === name);

        setAppRating(
          JSON.parse(findSetting("browse.ageRatings")?.value ?? "[]")
        );
        setLanguages(
          JSON.parse(findSetting("browse.languages")?.value ?? "[]")
        );
        setCountry(
          JSON.parse(findSetting("homepage.countries")?.value ?? "[]")
        );
        setQualities(
          JSON.parse(findSetting("streaming.qualities")?.value ?? "[]")
        );
        
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast("Error fetching data:");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="px-4">
      <h1 className="text-lg">General</h1>
      <p className="text-sm">
        Control how content is displayed across the site.
      </p>
      <div className="w-1/2 mt-4 space-y-4">
        {!loading && appRating && (
          <SectorMultiSelect
            data={appRating}
            title="Age Ratings"
            onChange={(newData) => setAppRating(newData)}
          />
        )}

        {!loading && languages && (
          <SectorMultiSelect
            data={languages}
            title="Language"
            onChange={(newData) => setLanguages(newData)}
          />
        )}

        {!loading && country && (
          <SectorMultiSelect
            data={country}
            title="Country"
            onChange={(newData) => setCountry(newData)}
          />
        )}

        {!loading && qualities && (
          <SectorMultiSelect
            data={qualities}
            title="Possible Video Qualities"
            onChange={(newData) => setQualities(newData)}
          />
        )}

        <div className="flex w-full gap-4">
          <div className="w-1/2 mt-4">
            <label className="text-md">Browse Min Year</label>
            <input
              type="text"
              name="siteUrl"
              id="siteUrl"
              className="mt-1 px-4 py-2 block w-full rounded-sm border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="2020"
            />
          </div>
          <div className="w-1/2 mt-4">
            <label className="text-md">Browse Min Year</label>
            <input
              type="text"
              name="siteUrl"
              id="siteUrl"
              className="mt-1 px-4 py-2 block w-full rounded-sm border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="2020"
            />
          </div>
        </div>
        <button className="px-4 py-2 bg-red-500 text-white rounded-md  text-sm cursor-pointer">
          Update
        </button>
      </div>
    </div>
  );
}
