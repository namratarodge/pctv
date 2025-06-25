const people = [
  {
    title: "Global Transforms of Projects Control within Worlds",
    name: "Andy Browns",
    position: "Project Controls Director",
  },
  {
    title: "Optimizing Risk in Large Infrastructure Programs",
    name: "Samantha Lee",
    position: "Senior Risk Analyst",
  },
  {
    title: "AI in Cost Engineering: Future or Fad?",
    name: "Michael Chen",
    position: "Lead Cost Engineer",
  },
  {
    title: "The New Metrics of Success in Capital Projects",
    name: "Laura Gutierrez",
    position: "Performance Management Advisor",
  },
  {
    title: "Digitizing Project Forecasting in Real Time",
    name: "Robert Knight",
    position: "PMO Lead",
  },
  {
    title: "Post-Pandemic Challenges in Transit Development",
    name: "Fatima Al-Sayeed",
    position: "Transportation Strategy Consultant",
  },
  {
    title: "Sustainable Controls for Green Construction",
    name: "Daniel Johnson",
    position: "Sustainability & Cost Manager",
  },
  {
    title: "Data-Driven Decisions in Project Controls",
    name: "Emily Nakamura",
    position: "Project Controls Analyst",
  },
  {
    title: "Transforming Owner Organizations for Agility",
    name: "Thomas Müller",
    position: "Capital Projects Consultant",
  },
  {
    title: "Bridging Technology and Human Insight",
    name: "Priya Mehta",
    position: "Innovation Lead, Infrastructure",
  },
];

export default function Home() {
  return (
    <div className="pt-18  max-w-7xl mx-auto">
      <h2 className="text-white text-4xl ">WhatchList</h2>
      <div className="grid grid-cols-3  gap-4 py-6  ">
        {people.map((person, index) => (
          <div key={index} className="flex items-center gap-4 py-2 ">
            <img
              src="https://picsum.photos/300/200/"
              alt="test"
              className="w-2/5  rounded-lg"
            />
            <div>
              <h2 className="text-sm font-semibold text-gray-300 mb-2">
                {person.title}
              </h2>
              <p className="text-gray-400 text-sm">{person.name}</p>
              <p className="text-gray-400 text-sm ">{person.position}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
