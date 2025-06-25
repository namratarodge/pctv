import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

export default function Content() {
  return (
    <div className="px-4">
      <h1 className="text-lg">Analytics</h1>
      <p className="text-sm">
        Configure google analytics integration and credentials.
      </p>
      <div className="w-1/2 mt-4 space-y-4">
        <div className="mt-4">
          <label
            htmlFor="photo"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Google Service Account Key File (.json)
          </label>
          <div className="mt-2 flex items-center gap-x-3">
            <ArrowUpTrayIcon
              aria-hidden="true"
              className="size-10 text-gray-300"
            />
            <button
              type="button"
              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
            >
              Upload Json
            </button>
          </div>
        </div>
        <div className=" mt-4">
          <label className="text-md">Google Analytics View ID</label>
          <input
            type="text"
            name="siteUrl"
            id="siteUrl"
            className="mt-1 px-4 py-2 block w-full rounded-sm border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="263326005"
          />
        </div>
        <div className="mt-4">
          <label className="text-md">Google Analytics Tracking Code</label>
          <input
            type="text"
            name="siteUrl"
            id="siteUrl"
            className="mt-1 px-4 py-2 block w-full rounded-sm border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="UA-222738367-1"
          />
        </div>
        <button className="px-4 py-2 bg-red-500 text-white rounded-md  text-sm">
          Update
        </button>
      </div>
    </div>
  );
}
