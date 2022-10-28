import Image from "next/image";

function ProfilePic() {
    return (
        <div className="basis-1/4 place-self-center sm:mt-10">
            <picture>
                <source srcSet="/me-bw.png" type="image/png" />
                <img src="/me.png" alt="Profile"  className="rounded-full"/>
            </picture>
        </div>
    );
}

export default ProfilePic;