import { SectorMultiSelect } from "@/components/forms";

export default function Content() {
  return (
    <div className="px-4">
      <h1 className="text-lg">General</h1>
      <p className="text-sm">
        Control how content is displayed across the site.
      </p>
      <div className="w-1/2 mt-4 space-y-4">
        <SectorMultiSelect title="Age Ratings" />
        <SectorMultiSelect title="Language" />
        <SectorMultiSelect title="Country" />
        <SectorMultiSelect title="Possible Video Qualities" />
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
        <button className="px-4 py-2 bg-red-500 text-white rounded-md  text-sm">
          Update
        </button>
      </div>
    </div>
  );
}
