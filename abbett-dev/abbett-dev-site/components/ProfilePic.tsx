import Image from "next/image";

function ProfilePic() {
    return (
        <div className="basis-1/4 place-self-center sm:mt-10">
            <picture>
                <source srcSet="/../abbett-dev-site/public/me.png" type="image/webp" />
                <img src="/../abbett-dev-site/public/me.png" alt="Profile" />
            </picture>
        </div>
    );
}

export default ProfilePic;