import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center mt-20 text-white">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>

        <form className="flex flex-col gap-5">
            <input type="text" placeholder="Full Name" className="p-3 rounded-lg bg-gray-700 outline-none focus:ring-2 focus:ring-green-500"/>
            <input type="email" placeholder="Email" className="p-3 rounded-lg bg-gray-700 outline-none focus:ring-2 focus:ring-green-500"/>
            <input type="password" placeholder="Password" className="p-3 rounded-lg bg-gray-700 outline-none focus:ring-2 focus:ring-green-500"/>
            <button type="submit" className="bg-green-600 hover:bg-green-700 p-3 rounded-lg font-semibold transition cursor-pointer" >
                Register
            </button>
        </form>

        <p className="text-center mt-5 text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-green-400 hover:underline">
                Login
            </Link>
        </p>
      </div>
    </div>
  );
}