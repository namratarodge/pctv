import { Footer } from "@/components/layout";

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
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
                Unlimited session, Workshops, exclusive content and more
              </h1>
              <p className="mt-8 text-lg text-pretty text-white sm:text-xl/8">
                Sign Up. Start Free. Stay in Control.
              </p>
              <p className="mt-8 text-sm font-extralight text-white sm:text-sm">
                Ready to watch? Sign up for a free trial and start watching
                today.
              </p>
              <div className="mt-10 flex items-center justify-center gap-6">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="w-2/4 rounded-full px-4 py-3 text-sm text-white bg-gray-800 focus:outline-0"
                />

                <button className="w-1/4 rounded-full bg-red-500 px-6 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  Get Started
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
      <div className="p-6 lg:px-8 mx-auto max-w-6xl">
        <h2 className="text-white text-xl">More reasons To Join PCTV</h2>
        <div className="mt-4 flex gap-4 ">
          {joinPCTV.map((item, index) => (
            <div
              key={index}
              className="w-1/4 text-white bg-[#1f3844] px-4 py-6"
            >
              <h2 className="text-xl">
                We'll always let you know about important changes, bu
              </h2>
              <h4 className="text-sm mt-4">
                We'll always let you know about important changes, bu hds
              </h4>
              <div className="mt-3 text-right">
                <h3>TV</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-6 lg:px-8 mx-auto max-w-6xl">
        <h2 className="text-white text-xl">Our Top Voice</h2>
        <div className="mt-4 grid grid-cols-4 gap-4">
          {people.map((item, index) => (
            <div key={index} className="relative">
              <img
                src="https://picsum.photos/300/200/"
                className="w-full h-auto"
              />
              <div className="absolute top-6 left-2 uppercase font-bold bg-opacity-50 text-shadow-lg/30 text-white px-2 py-1 text-xl w-30">
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
