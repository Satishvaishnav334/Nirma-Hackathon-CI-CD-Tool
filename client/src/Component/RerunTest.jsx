import React from 'react'

export const RerunTest = () => {
  return (
   <>
   <div className='flex flex-col p-10  h-[80vh] w-[80vw] m-auto justify-center '>
   <div className=' p-5 my-auto  rounded-2xl bg-zinc-100 '>
    <div className='flex justify-between align-center mx-4'>
        <h1 className='p-2 m-2 text-2xl font-bold'>MyApp</h1>
        <button className='bg-zinc-800 text-white px-3 cursor-pointer rounded-2xl m-2'> Test Again </button>
       
    </div>
    <ul className='flex flex-col mx-5'>
            <li className='border-2 w-full m-2 p-2 rounded-xl bg-zinc-400 flex justify-between align-center'>
                <h1 className='p-1 m-1'>Test history</h1>
                <button className='bg-zinc-600 text-white py-1 p-2 h-8 cursor-pointer rounded-lg m-1'>View test</button>
            </li>
            <li className='border-2 w-full m-2 p-2 rounded-xl bg-gray-400 flex justify-between align-center'>
                <h1 className='p-1 m-1'>Test history</h1>
                <button className='bg-zinc-600 text-white py-1 p-2 h-8  cursor-pointer rounded-lg m-1'>View test</button>
            </li>
            <li className='border-2 w-full m-2 p-2 rounded-xl bg-gray-400 flex justify-between align-center'>
                <h1 className='p-1 m-1'>Test history</h1>
                <button className='bg-zinc-600 text-white py-1 p-2 h-8 cursor-pointer rounded-lg m-1'>View test</button>
            </li>
            <li className='border-2 w-full m-2 p-2 rounded-xl  bg-gray-400 flex justify-between align-center'>
                <h1 className='p-1 m-1'>Test history</h1>
                <button className='bg-zinc-600 text-white py-1 p-2 h-8 cursor-pointer rounded-lg m-1'>View test</button>
            </li>
            <li className='border-2 w-full m-2 p-2 rounded-xl bg-gray-400 flex justify-between align-center'>
                <h1 className='p-1 m-1'>Test history</h1>
                <button className='bg-zinc-600 text-white py-1 p-2 h-8 cursor-pointer rounded-lg m-1'>View test</button>
            </li>
            
        </ul>
</div>
   </div>
   </>
  )
}
