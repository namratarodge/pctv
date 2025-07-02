const option = [
  {
    name: "Not enough good sessions",
    value: "not",
  },
  {
    name: "Not enough good sessions1",
    value: "not1",
  },
  {
    name: "Other",
    value: "not1",
  },
];

export default function CancelMembershipFinal() {
  return (
    <>
      <div className="mb-5 text-black">
        <h1 className="text-4xl font-semibold">
          We have cancelled your membership
        </h1>
        <p className="my-4 text-md">
          your email confimartion will be sent to sandesh@apptroid.com. <br />
          you may continue to watch TV shows and movies untill 3 May 2025.
        </p>
        <div className="bg-gray-100 mt-4 py-4 px-6 rounded-sm space-y-2 text-sm">
          <p className="font-semibold">
            We are alwasy improving our service and your feedbacks matters.
          </p>
          <p>
            Why did you cancel your membership with us ? (Select all that apply)
          </p>
          {option.map((item) => (
            <div key={item.name} className="flex gap-2">
              <input type="checkbox" />

              <label>{item.name}</label>
            </div>
          ))}

          <div>
            <textarea className="border p-4 rounded-md border-gray-400 w-full"/>
          </div>
        </div>
      </div>
      <button className="rounded-full text-white border bg-red-500 px-4 py-1.5 text-sm cursor-pointer">
       Done
      </button>
    </>
  );
}
