export default function changePassword() {
  return (
    <>
      <div className="h-100 text-black">
        <h1 className="text-4xl font-semibold">Change Password</h1>
        <p className="my-4">Account Details</p>
        <div className="bg-gray-100 mt-4 py-6 px-6 rounded-sm">
          <h3 className="text-sm">Update Password</h3>
          <small>
            Protect your account with a unique at least 6 charachters long
          </small>
          <div className="mt-4 w-2/3 space-y-3">
            <input
              id="name"
              name="email"
              type="text"
              required
              placeholder="Current Password"
              autoComplete="email"
              className="block w-full rounded-full bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
            />
            <input
              id="name"
              name="email"
              type="text"
              required
              placeholder="New Password"
              autoComplete="email"
              className="block w-full rounded-full bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
            />
            <input
              id="name"
              name="email"
              type="text"
              required
              placeholder="Re-enter New Password"
              autoComplete="email"
              className="block w-full rounded-full bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <button className="rounded-full bg-red-500 text-white px-6 py-1 mt-4 text-sm cursor-pointer">
            Save
          </button>
          <button className="rounded-full text-red-400 border border-red-400 px-4 py-1 mt-4 text-sm cursor-pointer">
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
