import { useState, useEffect } from "react";
import EmergentBehavior from "./demos/emergent-behavior";

const Demos = () => {
    const [currentDemo, setCurrentDemo] = useState("");
    
    const CurrDemo = (demoName: string) => {
        switch (demoName) {
            case "Emergent Behavior":
                return <EmergentBehavior />
            default:
                return <div></div>
            }
    }

    return (
        <div className="grid grid-cols-4">
            <div className="col-span-1 dark:text-white">
                <h1 className="text-3xl text-center">Demos</h1>
                <ul className="">
                    <li><a className="hover:underline hover:cursor-pointer" onClick={() => setCurrentDemo("Emergent Behavior")}>Emergent Behavior</a></li>
                    <li><a className="hover:underline hover:cursor-pointer" onClick={() => setCurrentDemo("")}>Default</a></li>
                </ul>
            </div>
            <div className="col-span-2">
                <div id="current-demo" className="">
                    {CurrDemo(currentDemo)}
                </div>
            </div>
        </div>
    );
}

export default Demos