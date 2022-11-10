import { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";

type NavProps = {
    to: string,
    children: React.ReactNode,
};

type MobileProps = {
    open: boolean, 
    setOpen: Dispatch<SetStateAction<boolean>>,
}

function NavLink({ to, children }: NavProps) {
    return (
        <Link href={to}>
            <a className="mx-2 dark:text-white">{children}</a>
        </Link>
    );
}

function MobileNav({ open, setOpen }: MobileProps) {
    return (
        <div className={`absolute top-0 left-0 h-screen w-screen bg-white dark:bg-gray-600 transform ${open ? "-translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out filter drop-shadow-md `}>
            <div className="flex items-center justify-center filter drop-shadow-md bg-white dark:bg-gray-700 h-20"> {/*logo container*/}
                <Link className="text-xl font-semibold" href="/">LOGO</Link>
            </div>
            <div className="flex flex-col ml-4">
                <Link href="/contact">
                    <a onClick={() => setTimeout(() => {setOpen(!open)}, 100)} className="text-xl font-normal my-4 ml-1 dark:text-white">Contact</a>
                </Link>
                <Link href="/about">
                    <a onClick={() => setTimeout(() => {setOpen(!open)}, 100)} className="text-xl font-medium my-4 dark:text-white">About</a>
                </Link>
            </div> 
        </div>
    )
}

function Navbar() {
    const [open, setOpen] = useState(false)
    return (
        <nav className="flex filter drop-shadow-md bg-white  dark:bg-gray-700 px-4 py-4 h-16 items-center">
            <MobileNav open={open} setOpen={setOpen}/>
            <div className="w-3/12 flex items-center">
                <Link href="/">
                    <a className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-400">{'{ BA }'}</a>
                </Link>
            </div>
            <div className="w-9/12 flex justify-end items-center">

                <div className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden" onClick={() => {
                    setOpen(!open)
                }}>
                    {/* hamburger button */}
                    <span className={`h-1 w-full bg-black dark:bg-white rounded-lg transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-3.5" : ""}`} />
                    <span className={`h-1 w-full bg-black dark:bg-white rounded-lg transition-all duration-300 ease-in-out ${open ? "w-0" : "w-full"}`} />
                    <span className={`h-1 w-full bg-black dark:bg-white rounded-lg transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-3.5" : ""}`} />
                </div>

                <div className="hidden md:flex">
                    <NavLink to="/about">
                        ABOUT
                    </NavLink>
                    <NavLink to="/contact">
                        CONTACT
                    </NavLink>
                    <NavLink to="/colortest">
                        .ct
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;