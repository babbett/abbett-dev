import Image from "next/image";
import myImage from "./../public/me.png";

function ProfilePic() {
    return (
        <div className="basis-1/4 place-self-center sm:mt-10">
            <Image className="bg-black" src={myImage} alt="Picture of me"></Image>
        </div>
    );
}

export default ProfilePic;