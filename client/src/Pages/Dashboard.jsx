import React, { useState } from 'react';
import FigmaViewer from '../Component/FigmaApi';

function Dashboard() {
    const [showComponent, setShow] = useState(false);

    return (
        <>
            <div className="flex justify-center h-screen items-center">
                <div className=" grid grid-cols-3 gap-4 p-4 rounded-lg  h-[50vh] w-[50vw]">
                    <div onClick={() => setShow(true)} className="h-[15vh] w-[15vw] bg-white hover:bg-zinc-300 hover:scale-95 transition-all     cursor-pointer flex justify-center items-center rounded-lg shadow-2xl text-xl font-bold">
                        <button>New Project Test</button>
                    </div>
                    <div onClick={() => setShow(true)} className="h-[15vh] w-[15vw] bg-white hover:bg-zinc-300 hover:scale-95 transition-all     cursor-pointer flex justify-center items-center rounded-lg shadow-2xl text-xl font-bold">
                        <button>Test 1</button>
                    </div>
                    <div onClick={() => setShow(true)} className="h-[15vh] w-[15vw] bg-white hover:bg-zinc-300 hover:scale-95 transition-all     cursor-pointer flex justify-center items-center rounded-lg shadow-2xl text-xl font-bold">
                        <button>Test 2</button>
                    </div>
                    <div onClick={() => setShow(true)} className="h-[15vh] w-[15vw] bg-white hover:bg-zinc-300 hover:scale-95 transition-all     cursor-pointer flex justify-center items-center rounded-lg shadow-2xl text-xl font-bold">
                        <button>Test 3</button>
                    </div>
                    <div onClick={() => setShow(true)} className="h-[15vh] w-[15vw] bg-white hover:bg-zinc-300 hover:scale-95 transition-all     cursor-pointer flex justify-center items-center rounded-lg shadow-2xl text-xl font-bold">
                        <button>Test 4</button>
                    </div>
                    <div onClick={() => setShow(true)} className="h-[15vh] w-[15vw] bg-white hover:bg-zinc-300 hover:scale-95 transition-all     cursor-pointer flex justify-center items-center rounded-lg shadow-2xl text-xl font-bold">
                        <button>Test 5</button>
                    </div>
                    
                  </div>
            </div>

            {showComponent && (
                       <div className="  fixed inset-0 flex   bg-opacity-10 backdrop-blur-md justify-center items-center">
                    <button 
                        onClick={() => setShow(false)}
                        className="absolute bottom-20 text-xl cursor-pointer bg-red-500 text-white px-3 py-1 rounded-full shadow-md hover:bg-red-600 transition"
                    > ✕
                    </button>
                        <FigmaViewer />
                    </div>
            )}
        </>
    );
}

export default Dashboard;
