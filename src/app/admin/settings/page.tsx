import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { navigationSettings } from "@/constants/Menu"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Settings() {
  return (
    <div className="px-4 sm:px-6 lg:px-2 flex">
      <div className="w-1/4 px-4">
        <nav aria-label="Sidebar" className="flex flex-1 flex-col">
          <ul role="list" className=" space-y-1">
            {navigationSettings.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-red-50 text-black border-l-4 border-red-600 font-semibold"
                      : "text-gray-600 hover:bg-gray-50 hover:text-red-600",
                    "group flex gap-x-3 rounded-md p-2 pl-3 text-sm/6 "
                  )}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="w-3/4 border border-gray-400 rounded-md p-4 bg-white">
        <div className="bg-white text-gray-500">
              dsdsds
        </div>
      </div>
    </div>
  );
}
