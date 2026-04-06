// npm install next-auth

'use client'
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginPage() {

  const { data: session } = useSession()
  if(session) {
    return <>
      Signed in as {session.user.email} <br/>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  }

  return (
    <div className="flex items-center justify-center mt-15 text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

        <form className="flex flex-col gap-5">
            <input type="email" placeholder="Email" className="p-3 rounded-lg bg-gray-700 outline-none focus:ring-2 focus:ring-blue-500"/>
            <input type="password" placeholder="Password" className="p-3 rounded-lg bg-gray-700 outline-none focus:ring-2 focus:ring-blue-500" />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 cursor-pointer p-3 rounded-lg font-semibold transition"> 
                Login
            </button>
        </form>

        <div className="my-4 flex items-center">
          <div className="grow h-px bg-gray-600"></div>
          <span className="mx-2 text-gray-400 text-sm">OR</span>
          <div className="grow h-px bg-gray-600"></div>
        </div>

        <button onClick={() => signIn("google")} className="cursor-pointer bg-white text-black p-3 rounded-lg font-semibold flex items-center justify-center gap-2 w-full mb-2 hover:opacity-90">
          <img src="google.png" className="w-5" />
          Continue with Google
        </button>
        <button onClick={() => signIn("github")} className="cursor-pointer bg-black text-white p-3 rounded-lg font-semibold flex items-center justify-center gap-2 w-full">
          <img src="github.png" className="w-5" />
          Continue with Github
        </button>

        <p className="text-center mt-5 text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}