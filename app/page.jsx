'use client'
import React,{useRef,useState,useEffect} from 'react';
import toast from "react-hot-toast";
import Link from 'next/link';
import { useSession } from "next-auth/react";

export default function Home() {

  const { data: session } = useSession();
  const isUser = !!session;

  const max_length=3;

  const [url, seturl] = useState("")
    const [shorturl, setshorturl] = useState("")
    const [generated, setgenerated] = useState("")
    const [copiedIndex, setCopiedIndex] = useState(null);
    


    const [autoPaste, setAutoPaste] = useState(true);

  const urlRef = useRef(null);
  const aliasRef = useRef(null);

    const [links, setLinks] = useState([]);
    const limitReached = links.length >= max_length ;


    const generate = async () => {

  if (!url) {
    toast.error("Enter URL");
    return;
  }

  // Guest limit check
  if (!isUser) {
    const stored = JSON.parse(localStorage.getItem("guestLinks")) || [];
    if (stored.length >= 3) {
      toast.error("Limit reached! Login for unlimited.");
      return;
    }
  }

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url,
        shorturl,
        isUser
      })
    });

    const result = await res.json();

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    const newShort = `${process.env.NEXT_PUBLIC_HOST}/${result.short}`;

    // ✅ Save locally for guests
    if (!isUser) {
      const stored = JSON.parse(localStorage.getItem("guestLinks")) || [];

      const updated = [
        {
          short: newShort,
          original: url,
          clicks: 0,
          date: new Date().toLocaleDateString()
        },
        ...stored
      ];

      localStorage.setItem("guestLinks", JSON.stringify(updated));
      setLinks(updated); // 🔥 THIS FIXES INSTANT UI UPDATE
    }

    setgenerated(newShort);
    seturl("");
    setshorturl("");

    toast.success("Short URL created");

  } catch (err) {
    console.error(err);
    toast.error("Error occurred");
  }
};


useEffect(() => {
  if (!isUser) {
    const stored = JSON.parse(localStorage.getItem("guestLinks")) || [];
    setLinks(stored);
  }
}, [isUser]);



  

  useEffect(() => {
    if (!autoPaste) {
      if (urlRef.current) urlRef.current.value = "";
      return;
    }
    const pasteFromClipboard = async () => {
      try {
        if (!navigator.clipboard) {
          throw new Error("Clipboard not supported");
        }
        const text = await navigator.clipboard.readText();
        if (text && urlRef.current) {
          urlRef.current.value = text;
          seturl(text);
          toast.success("Pasted from clipboard");
        }
      } 
      catch (err) {
        console.error(err);
        toast.error("Clipboard access denied. Paste manually");
      }
    };
    pasteFromClipboard();}, [autoPaste]);

  const handleCopy = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      toast.success("Copied to clipboard!")
      setTimeout(() => {
        setCopiedIndex(null);
      }, 1500);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  return (
    <div>
      <div className='intro text-center text-[#C9CED6] mt-15 mb-5 px-6'>

        <div className='text-5xl font-extrabold bg-linear-to-r from-blue-500 from-30% via-pink-400 via-40% to-purple-500 to-90% bg-clip-text text-transparent'>
          <h1>More Than Just Short Links.</h1>
        </div>

        <div className='m-5 text-md'>
          <p>Minify gives you full control over your links with built-in analytics and a powerful dashboard.</p>
        </div>
        
        <div className='flex justify-center items-center'>
          <div className='border-4 bg-[#181E29] border-[#323E59] rounded-full flex items-center'>

            <div className='flex gap-3 p-5'>
              <img src="link.png" alt="link" />
              <p onClick={()=>urlRef.current.focus()}>Enter the link here</p>
              <input ref={urlRef} type="text" className='outline-none text-pink-300 font-extralight w-75'
              onChange={e =>{seturl(e.target.value)}} />
            </div>

            <div className='flex gap-3 '>
              <p onClick={()=>isUser && aliasRef.current.focus()}>Custom URL</p>
              <input ref={aliasRef} disabled={!isUser} type="text" placeholder={isUser ? "" : "Login required"} className={` outline-none w-30 text-gray-400 ${isUser?"cursor-auto":"cursor-not-allowed"}`}
              onChange={e =>{setshorturl(e.target.value)}} />
            </div>

            <div className='mx-2'>
              <button onClick={generate} className="px-10 py-4 rounded-full bg-[#144EE3] text-white font-semibold text-sm hover:opacity-90 hover:scale-102 transition cursor-pointer">
                Shorten Now!
              </button>
            </div>

          </div>

        </div>

        <div className="flex flex-col items-center justify-center gap-2 m-5">

          <div className='flex gap-3 justify-center items-center mt-3'>

            <label htmlFor="check" className="flex bg-[#181E29] cursor-pointer relative w-12 h-6 rounded-full border border-[#323E59]">
              <input type="checkbox" id='check' className='sr-only peer' checked={autoPaste} onChange={() => setAutoPaste(prev => !prev)} />
              <span className='w-2/5 h-4/5 bg-gray-600 absolute rounded-full left-1 top-0.5 peer-checked:bg-[#144EE3] peer-checked:left-6 transition-all duration-500'></span>
            </label>

            <p className="text-sm text-gray-400">Auto paste from clipboard</p>

          </div>
    
        <div className='mt-3'>
          <p>You can create <span className='text-pink-500'>{max_length-links.length}</span> more links. Register Now to enjoy Unlimited usage</p>
        </div>
        
    
        
      </div>

      <div className='mx-30 text-start '>

        <div className='grid grid-cols-[2fr_3fr_1fr_1fr_1fr] gap-10 text-white bg-[#181E29] p-5  rounded-t-xl items-center'>
          <div className="col1">Short Link</div>
          <div className="col2">Original Link</div>
          {/* <div className="col3">QR Code</div> */}
          <div className="col4">Clicks</div>
          <div className="col5">Status</div>
          <div className="col6">Date</div>
        </div>

        {links.map((link, index) => (
  <div key={index}
    className='grid grid-cols-[2fr_3fr_1fr_1fr_1fr] gap-10 text-[#C9CED6] bg-[#181e296f] p-5 my-1 items-center'>

    <div className='flex items-center justify-between'>
      <Link href={link.short} target="_blank" className="text-blue-400">
        {link.short}
      </Link>
      <button onClick={() => handleCopy(link.short, index)}>
        <img src="copy.svg" alt="copy" className='bg-[#1C283F] p-2 rounded-full cursor-pointer '/> 
      </button>

    </div>

    <div className="truncate">{link.original}</div>

    <div>{link.clicks}</div>

    <div className="text-green-400">Active</div>

    <div>{link.date}</div>

  </div>
))}

      </div>

      {/* 🔥 Blur Overlay (when limit reached) */}
  {limitReached && (
    <div className="absolute bottom-0 left-0 w-full p-10 ">
      
      {/* Blur layer */}
      <div className="absolute inset-0 backdrop-blur-md bg-linear-to-t from-[#0f172a] to-transparent" />

      {/* Optional message */}
      <div className="relative flex items-center justify-center h-full text-white font-medium">
  <Link href="/register" className="text-blue-400 underline cursor-pointer">
    Register Now
  </Link>
  <span className="ml-1">to enjoy unlimited history</span>
</div>
    </div>
  )}

    </div>
  </div>
  
  );
}
