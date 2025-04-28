import { Toggle } from "@/components/forms";

export default function Content() {
  return (
    <div className="px-4">
      <h1 className="text-lg">Authentication</h1>
      <p className="text-sm">
        Configure registration, social login and related 3rd party integrations.
      </p>
      <div className="w-1/2 mt-4 space-y-4">
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <Toggle />
            <label className="text-md font-medium">Google Client</label>
          </div>
        </div>
        <div className=" mt-4">
          <label className="text-md">Google Client ID</label>
          <input
            type="text"
            name="siteUrl"
            id="siteUrl"
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
            className="mt-1 px-4 py-2 block w-full rounded-sm border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="UA-222738367-1"
          />
        </div>
        <div className="mt-8">
          <div className="flex items-center gap-2">
            <Toggle />
            <label className="text-md font-medium">Facebook Login</label>
          </div>
        </div>
        <div className=" mt-4">
          <label className="text-md">Facebook App ID</label>
          <input
            type="text"
            name="siteUrl"
            id="siteUrl"
            className="mt-1 px-4 py-2 block w-full rounded-sm border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="263326005"
          />
        </div>
        <div className="mt-4">
          <label className="text-md">Facebook App Secret</label>
          <input
            type="text"
            name="siteUrl"
            id="siteUrl"
            className="mt-1 px-4 py-2 block w-full rounded-sm border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="UA-222738367-1"
          />
        </div>
        <button className="px-4 py-2 bg-red-400 text-white rounded-md  text-sm cursor-pointer hover:bg-red-500">
          Update
        </button>
      </div>
    </div>
  );
}
