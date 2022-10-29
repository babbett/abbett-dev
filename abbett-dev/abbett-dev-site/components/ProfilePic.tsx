import Image from "next/image";

function ProfilePic() {
    return (
        <div className="basis-5/12 place-self-center">
            <picture>
                <source srcSet="/me-bw.png" type="image/png" />
                <img src="/me.png" alt="Profile"  className="rounded-full h-64 w-64"/>
            </picture>
        </div>
    );
}

export default ProfilePic;