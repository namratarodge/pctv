import { Footer, Slider, SliderNumber, TopicSlider } from "@/components/layout";
import { SpeakerXMarkIcon } from "@heroicons/react/24/outline";
import { PlayCircleIcon } from "@heroicons/react/24/solid";

const joinPCTV = [
  {
    title: "We'll always let you know about important changes, bu",
    description: "We'll always let you know about important changes, bu hds",
  },
  {
    title: "We'll always let you know about important changes, bu",
    description: "We'll always let you know about important changes, bu hds",
  },
  {
    title: "We'll always let you know about important changes, bu",
    description: "We'll always let you know about important changes, bu hds",
  },
  {
    title: "We'll always let you know about important changes, bu",
    description: "We'll always let you know about important changes, bu hds",
  },
];

const people = [
  { name: "Greg Lawton", image: "/people/greg_lawton.png" },
  { name: "Michael Armes", image: "/people/michael_armes.png" },
  { name: "Sadia Janjua", image: "/people/sadia_janjua.png" },
  { name: "Dr. Alexia Nalewaik", image: "/people/dr._alexia_nalewaik.png" },
  { name: "Hatem Elbanna", image: "/people/hatem_elbanna.png" },
  { name: "Karen Mislick", image: "/people/karen_mislick.png" },
  { name: "Greg Lawton", image: "/people/greg_lawton.png" },
  { name: "Michael Armes", image: "/people/michael_armes.png" },
];

export default function Home() {
  return (
    <>
      <div className="relative isolate overflow-hidden pt-14">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto lg:px-8">
          <div className="mx-auto max-w-11/12  py-32 sm:py-48 lg:py-56 ">
            <div className="text-left">
              <h1 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-5xl w-1/2">
                Delivering the UK's most complex projects and programmes
              </h1>
              <p className="mt-8 text-sm text-pretty text-white sm:text-md">
                Mathew Vickerstaff
              </p>
              <div className="mt-10 flex  justify-between  ">
                <div className="flex  gap-4">
                  <button className="flex rounded-full bg-red-500 px-4 gap-2 py-2 items-center text-sm font-semibold text-white shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20 cursor-pointer">
                    Watch Now
                    <PlayCircleIcon className="h-7 w-7 text-white" />
                  </button>
                  <button className="w-25 rounded-full bg-gray-500 px-6 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                    Share
                  </button>
                </div>

                <button className="p-3 text-center items-center border-gray-300 rounded-full border  text-sm font-semibold text-white shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  <SpeakerXMarkIcon className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
      <div className="p-6 lg:px-8 mx-auto max-w-11/12">
        <Slider title="End Client and Govt. Voices" progress/>
        <Slider title="Continue Watching" progress />
        <Slider title="PCTv Regions" speakers  />
        <SliderNumber title="PCTv Top 10 Sessions"   />
        <TopicSlider title="PCTv Topic"   />
      </div>
    </>
  );
}
