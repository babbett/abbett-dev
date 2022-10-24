import Image from "next/image";
import { useEffect, useState } from "react";
import Nameplate from "./Nameplate"

function Hero() {
    // const subtitleArr = [".NET Developer", "Penis Man", "Lil Boy Ben", "The Benster"]

    // function changeMessage() {
        
    // }
    return (
        <>
            {/* <div className="px-10 pt-2 max-w-3xl mx-auto rounded-xl bg-blue-100 shadow-lg">
                <h1 className="text-left text-7xl">Ben Abbett</h1>
                <p>.NET Developer</p>
            </div> */}
            <div className="p-10 shadow-lg bg-gray-100 rounded-3xl flex flex-row">
                <Nameplate/>
                <div className="basis-1/4">
                    <Image src="/../public/me.png" layout="intrinsic" height="100%" width="100%" alt="Picture of me"></Image>
                </div>
            </div>
        </>
    );
}

export default Hero