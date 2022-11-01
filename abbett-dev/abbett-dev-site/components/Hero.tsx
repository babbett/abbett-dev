import { useEffect, useState } from "react";
import Nameplate from "./Nameplate"
import ProfilePic from "./ProfilePic";

function Hero() {
    return (
        <>
            {/* <div className="px-10 pt-2 max-w-3xl mx-auto rounded-xl bg-blue-100 shadow-lg">
                <h1 className="text-left text-7xl">Ben Abbett</h1>
                <p>.NET Developer</p>
            </div> */}
            <div className="p-10 m-auto shadow-lg bg-gray-200 dark:bg-gray-700 rounded-3xl flex flex-row sm:flex-col-reverse w-10/12">
                <Nameplate/>
                <ProfilePic/>
            </div>
        </>
    );
}

export default Hero