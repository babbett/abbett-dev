import Nameplate from "../Nameplate"
import ProfilePic from "../ProfilePic";

function Hero() {
    return (
        <div className="p-10 m-auto flex md:flex-row flex-col w-10/12">
            <ProfilePic/>
            <Nameplate/>
        </div>
    );    
}

export default Hero