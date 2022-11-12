import Link from "next/link";

function Footer() {
    return (
        <div className="bg-gray-100 dark:bg-gray-700 py-2">
            <h4 className="text-lg text-center dark:text-white">© 2022 <Link href="https://github.com/babbett">babbett</Link> | Waluigi Mode</h4>
        </div>
    );
}

export default Footer;