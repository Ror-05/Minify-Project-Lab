import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className=" p-8 flex justify-between items-center">
      <Link href="/">
        <h1 className="text-3xl font-extrabold bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent cursor-pointer">
          Minify
        </h1>
      </Link>
      <div className="flex items-center">
        <Link href="/login">
          <button className="flex items-center gap-1 text-white bg-[#181E29] px-5 py-3 border-2 border-[#353C4A] font-semibold text-sm hover:opacity-90 hover:scale-105 transition rounded-full cursor-pointer   ">
            Login
            <img src="login.svg" alt="login" width={25} />
          </button>
        </Link>
        <Link href="/register">
          <button className="ml-4 px-10 py-4 rounded-full bg-[#144EE3] shadow-[4px_6px_12px_rgba(20,78,227,0.6)] text-white font-semibold text-sm hover:opacity-90 hover:scale-105 transition cursor-pointer">
            Register Now
          </button>
        </Link>
      </div>

    </nav>
  )
}

export default Navbar
