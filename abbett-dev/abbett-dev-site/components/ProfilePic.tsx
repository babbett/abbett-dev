import Image from "next/image";

function ProfilePic() {
    return (
        <div className="basis-5/12 place-self-center">
            <picture>
                <source srcSet="/me-2.png" type="image/png" />
                <img src="/me-2.png" alt="Profile"  className="min:h-64 min:w-64 max:h-16 max:w-16 rounded-3xl"/>
            </picture>
        </div>
    );
}

export default ProfilePic;