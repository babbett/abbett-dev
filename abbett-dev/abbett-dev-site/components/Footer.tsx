import Link from "next/link";

function Footer() {
    return (
        <div className="md:py-2 py-10 w-full">
            <hr className="my-2 mx-auto w-11/12"/>
            <h4 className="text-lg text-center dark:text-white">© 2022 Ben Abbett | {ExternalLinks()}</h4>
        </div>
    );
}

function ExternalLinks() {
    return (
        <>
            <a title='Github Profile' href='https://github.com/babbett'>
                <span className='fa-brands fa-github text-lg mx-1'></span>
            </a>
            <a title='LinkedIn Profile' href='https://www.linkedin.com/in/abbett/'>
                <span className='fa-brands  fa-linkedin text-lg mx-1'></span>
            </a>
        </>
    );
}

export default Footer;