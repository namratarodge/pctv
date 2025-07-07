export default function MembershipPause() {
  return (
    <>
      <div className="h-100 text-black">
        <h1 className="text-4xl font-semibold">
          Your membership will pause in 1 day
        </h1>
        <p className="my-4">
          Whatever you choose, it will take effect on 3 May 2025. <br /> you will
          still be able to watch until then.
        </p>
        <div className="bg-gray-100 mt-4 py-4 px-6 rounded-sm space-y-4 text-sm">
          <div>
            <p className="font-semibold">Pause start date</p>
            <p>2 May 2024</p>
          </div>
          <div>
            <p className="font-semibold">Pause end date</p>
            <p>2 May 2024</p>
          </div>

          <p>
            Your Billing will automatically resume with your usual plan price
            when your pause ends.
          </p>
        </div>

        <button className="rounded-full text-white border bg-red-500 px-4 py-1 mt-4 text-sm cursor-pointer">
         Done
        </button>
      </div>
    </>
  );
}
