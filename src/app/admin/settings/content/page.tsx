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
  const [minYear, setMinYear] = useState<string>("");
  const [maxYear, setMaxYear] = useState<string>("");

  const [saving, setSaving] = useState(false);

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
            name: "streaming.qualities,browse.languages,homepage.countries,browse.ageRatings,browse.year_slider_min,browse.year_slider_max",
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

        setMinYear(
          JSON.parse(findSetting("browse.year_slider_min")?.value ?? "[]")
        );

        setMaxYear(
          JSON.parse(findSetting("browse.year_slider_max")?.value ?? "[]")
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

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return (window.location.href = "/login");
    const payload = [
      { _id: "6856a33a3e2804ea5de6743b", value: JSON.stringify(appRating) }, // browse.ageRatings
      { _id: "6856a33a3e2804ea5de67471", value: JSON.stringify(languages) }, // browse.languages
      { _id: "6856a33a3e2804ea5de67470", value: JSON.stringify(country) }, // homepage.countries
      { _id: "6856a33a3e2804ea5de6743e", value: JSON.stringify(qualities) }, // streaming.qualities (👈 avoid duplicate id)
      { _id: "6856a33a3e2804ea5de6743c", value: JSON.stringify(minYear) }, // streaming.qualities (👈 avoid duplicate id)
      { _id: "6856a33a3e2804ea5de6743d", value: JSON.stringify(maxYear) }, // streaming.qualities (👈 avoid duplicate id)
    ];

    try {
      setSaving(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/settings/update`,
        payload,
        {
          headers: { Authorization: token, "Content-Type": "application/json" },
        }
      );
      toast.success("Settings updated");
      // optionally re-fetch to reflect sanitized values from server
      // await fetch();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message ?? "Failed to update settings");
    } finally {
      setSaving(false);
    }
  };
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
            title="Certification"
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
              inputMode="numeric"
              value={minYear}
              onChange={(e) => setMinYear(e.target.value)}
              className="mt-1 px-4 py-2 block w-full rounded-sm border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="2020"
            />
          </div>
          <div className="w-1/2 mt-4">
            <label className="text-md">Browse Max Year</label>
            <input
              type="text"
              inputMode="numeric"
              value={maxYear}
              onChange={(e) => setMaxYear(e.target.value)}
              className="mt-1 px-4 py-2 block w-full rounded-sm border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="2020"
            />
          </div>
        </div>
        <button
          onClick={handleSave} // ✅ actually calls the function
          disabled={saving}
          className="px-4 py-2 bg-red-500 text-white rounded-md  text-sm cursor-pointer"
        >
          {saving ? "Saving..." : "Update"}
        </button>
      </div>
    </div>
  );
}
