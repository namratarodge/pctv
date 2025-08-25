
export default function SettingsInner() {
  return (
    <div className="px-4 ">
      <h1 className="text-lg">General</h1>
      <p className="text-sm">Config General site settings</p>
      <div className="w-1/2 mt-4">
        <label className="text-md">Site URL</label>
        <input
          type="text"
          name="siteUrl"
          defaultValue={process.env.NEXT_PUBLIC_API_URL}
          id="siteUrl"
          className="mt-1 px-4 py-2 block w-full rounded-sm border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="https://example.com"
        />
      </div>
      <div className="mt-4">
        <button className="px-4 py-2 bg-red-500 text-white rounded-md  text-sm">
          Generate Sitemap
        </button>
        <p className="text-sm mt-2">
          Once generated, sitemap index url will be:{" "}
          <a href="#" className="text-blue-400">
            {process.env.NEXT_PUBLIC_BASE_URL}storage/sitemaps/sitemap-index.xml
          </a>
        </p>
      </div>
      <hr className="my-4 border-gray-400" />
      {/* <button className="px-4 py-2 bg-red-500 text-white rounded-md  text-sm cursor-pointer">
        Update
      </button> */}
    </div>
  );
}
