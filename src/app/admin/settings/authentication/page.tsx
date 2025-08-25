'use client'

import { SettingsFormValues } from "@/constants/Type";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Content() {

  const [clientId, setclientId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [siteKey, setSiteKey] = useState<string>("");

  const fetch = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/settings`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          params: {
            name: "GOOGLE.CLIENT_ID,GOOGLE.RECAPTCHA_SITE_KEY",
          },
        }
      );
      if (response.data.status) {
        const modifiedData = response.data.data.data;

        const findSetting = (name: string) =>
          modifiedData.find((item: SettingsFormValues) => item.name === name)?.value;
        console.log(response.data.data.data)
        console.log(findSetting("GOOGLE.RECAPTCHA_SITE_KEY"));
        setSiteKey(
          findSetting("GOOGLE.RECAPTCHA_SITE_KEY")
        );
        setclientId(
          findSetting("GOOGLE.CLIENT_ID")
        );

        console.log(siteKey);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateSettings = async () => {
    setLoading(true);
    const payload = {
      data: [
        { name: 'GOOGLE.CLIENT_ID', value: clientId },
        { name: 'GOOGLE.RECAPTCHA_SITE_KEY', value: siteKey },
      ],
    };

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/settingUpdate`, payload,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          }
        }
      );
      if (response.data.status) {
        fetch();
        toast('Settings updated!');
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };




  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="px-4">
      <h1 className="text-lg">Authentication</h1>
      <p className="text-sm">
        Configure registration, social login and related 3rd party integrations.
      </p>
      <div className="w-1/2 mt-4 space-y-4">
        <div className="mt-4">
          <div className="flex items-center gap-2">
            {/* <Toggle /> */}
            <label className="text-md font-medium">Google Client</label>
          </div>
        </div>
        <div className=" mt-4">
          <label className="text-md">Google Client ID</label>
          <input
            type="text"
            name="siteUrl"
            id="siteUrl"
            value={clientId}
            onChange={(e) => setclientId(e.target.value)}
            className="mt-1 px-4 py-2 block w-full rounded-sm border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="263326005"
          />
        </div>
        <div className="mt-4">
          <label className="text-md">Google Client Secret</label>
          <input
            type="text"
            name="siteUrl"
            id="siteUrl"
            value={siteKey}
            onChange={(e) => setSiteKey(e.target.value)}
            className="mt-1 px-4 py-2 block w-full rounded-sm border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="UA-222738367-1"
          />
        </div>

        <button
          onClick={updateSettings}
          disabled={loading}
          className="px-4 py-2 bg-red-600 disabled:opacity-60 text-white rounded-md text-sm cursor-pointer hover:bg-red-700"
        >
          {loading ? 'Saving…' : 'Update'}
        </button>
      </div>
    </div>
  );
}
