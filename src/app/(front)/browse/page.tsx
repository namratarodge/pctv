const categorys = [
  { id: 1, name: "Digital Marketing" },
  { id: 2, name: "E-commerce" },
  { id: 3, name: "Social Media" },
  { id: 4, name: "Mobile Apps" },
  { id: 5, name: "Web Development" },
  { id: 6, name: "Cybersecurity" },
  { id: 7, name: "Cloud Computing" },
  { id: 8, name: "Digital Design" },
  { id: 9, name: "Online Education" },
  { id: 10, name: "Digital Analytics" },
];
const country = [
  { id: 1, name: "United States" },
  { id: 2, name: "Canada" },
  { id: 3, name: "United Kingdom" },
  { id: 4, name: "Australia" },
  { id: 5, name: "Germany" },
  { id: 6, name: "France" },
  { id: 7, name: "Japan" },
  { id: 8, name: "India" },
  { id: 9, name: "Brazil" },
  { id: 10, name: "South Africa" },
];

const Language = [
  { id: 1, name: "English" },
  { id: 2, name: "Spanish" },
  { id: 3, name: "French" },
  { id: 4, name: "German" },
  { id: 5, name: "Hindi" },
];

const Levels = [
  { id: 1, name: "Beginner" },
  { id: 2, name: "Intermediate" },
  { id: 3, name: "Expert" },
];

export default function Browser() {
  return (
    <div className="pt-18 max-w-7xl mx-auto flex mb-10">
      <div className="w-1/4 px-4 py-6 overflow-auto h-screen">
        <div className="w-full border-b border-gray-500 pb-6">
          <div className="text-gray-300">TV Topic</div>
          <div className="relative inline-block mt-4 w-full">
            <select className="block appearance-none w-full border border-gray-500  text-gray-300 py-2 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:ring-2 ">
              <option>2010</option>
              <option>2015</option>
              <option>2020</option>
              <option>2025</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-red-600">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                <path d="M5.516 7.548a.75.75 0 011.06 0L10 10.97l3.424-3.423a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 010-1.06z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="py-4 border-b border-gray-500">
          <h2 className="text-gray-400">Categories</h2>
          <div className="mt-2">
            <ul className="list-none">
              {categorys.map((category) => (
                <li className="text-gray-300 py-1 cursor-pointer" key={category.id}>
                  <label className="cursor-pointer">
                  <input
                    type="checkbox"
                    className="mr-2 form-checkbox accent-red-500 border border-red-400"
                  />{" "}
                  {category.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full max-w-md mx-auto mt-4 border-b pb-6 border-gray-500">
          <label
            htmlFor="yearRange"
            className="block text-md font-medium text-gray-700 mb-2"
          >
            Year
          </label>
          <input
            type="range"
            id="yearRange"
            min="2010"
            max="2025"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>2010</span>
            <span>2010</span>
            <span>2025</span>
          </div>
        </div>
        <div className="w-full border-b border-gray-500 py-6">
          <div className="text-gray-300">Select Region</div>
          <div className="relative inline-block mt-4 w-full">
            <select className="block appearance-none w-full border border-gray-500  text-gray-300 py-2 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:ring-2 ">
              {country.map((country) => (
                <option key={country.id}>{country.name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-red-600">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                <path d="M5.516 7.548a.75.75 0 011.06 0L10 10.97l3.424-3.423a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 010-1.06z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="w-full border-b border-gray-500 py-6">
          <div className="text-gray-300">Language</div>
          <div className="relative inline-block mt-4 w-full">
            <select className="block appearance-none w-full border border-gray-500  text-gray-300 py-2 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:ring-2 ">
              {Language.map((language) => (
                <option key={language.id}>{language.name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-red-600">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                <path d="M5.516 7.548a.75.75 0 011.06 0L10 10.97l3.424-3.423a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 010-1.06z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="w-full border-b border-gray-500 py-6">
          <div className="text-gray-300">Levels</div>
          <div className="relative inline-block mt-4 w-full">
            <select className="block appearance-none w-full border border-gray-500  text-gray-300 py-2 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:ring-2 ">
              {Levels.map((level) => (
                <option key={level.id}>{level.name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-red-600">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                <path d="M5.516 7.548a.75.75 0 011.06 0L10 10.97l3.424-3.423a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 010-1.06z" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <button className="cursor-pointer w-full mt-4 rounded-full bg-red-500 px-6 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Reset Filter
          </button>
        </div>

      </div>
      <div className="w-3/4 px-4 py-2">
        <h1 className="text-3xl text-white">PCE Brazil</h1>
        <div className="grid grid-cols-4 gap-2 mt-4">
          {categorys.map((category) => (
            <div className="border" key={category.id}>
              <img src="https://picsum.photos/300/200/" className="rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
