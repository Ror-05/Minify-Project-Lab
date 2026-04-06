'use client'
import React,{useRef,useState,useEffect} from 'react';

export default function Home() {
  const [isUser,setisUser] = useState(false);
  const [autoPaste, setAutoPaste] = useState(true);

  const urlRef = useRef(null);
  const aliasRef = useRef(null);

  useEffect(() => {
  if (autoPaste) {
    navigator.clipboard.readText().then(text => {
      if (text) urlRef.current.value = text;
    });
  }
}, [autoPaste]);

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
              <input ref={urlRef} type="text" className='outline-none text-pink-300 font-extralight w-75' />
            </div>

            <div className='flex gap-3 '>
              <p onClick={()=>isUser && aliasRef.current.focus()}>Custom URL</p>
              <input ref={aliasRef} disabled={!isUser} type="text" placeholder={isUser ? "" : "Login required"} className={` outline-none w-30 text-gray-400 ${isUser?"cursor-auto":"cursor-not-allowed"}`} />
            </div>

            <div className='mx-2'>
              <button className="px-10 py-4 rounded-full bg-[#144EE3] text-white font-semibold text-sm hover:opacity-90 hover:scale-102 transition cursor-pointer">
                Shorten Now!
              </button>
            </div>

          </div>

        </div>

        <div className="flex items-center justify-center gap-2 m-5">
          <div className='p-8>
            <label htmlFor="check" className='flex bg-gray-100 cursor-pointer relative w-20 h-10 rounded-full'>
              <input type="checkbox" id='check' className='sr-only peer' />
              <span className='w-2/5 h-4/5 bg-rose-300 absolute rounded-full left-1 top-1 peer-checked:bg-rose-600 peer-checked:left-11 transition-all duration-500'></span>
            </label>
          </div>
          <p className="text-sm text-gray-400">Auto paste from clipboard</p>
        </div>

        <div className='mt-3'>
          <p>You can create <span className='text-pink-500'>05</span> more links. Register Now to enjoy Unlimited usage</p>
        </div>
        
        
      </div>

      <div className='mx-30 '>

        <div className='grid grid-cols-[2.3fr_3fr_1fr_1fr_1fr_1fr] gap-5 text-white bg-[#181E29] p-5  rounded-t-xl'>
          <div className="col1">Short Link</div>
          <div className="col2">Original Link</div>
          <div className="col3">QR Code</div>
          <div className="col4">Clicks</div>
          <div className="col5">Status</div>
          <div className="col6">Date</div>
        </div>

      </div>

    </div>
  );
}
