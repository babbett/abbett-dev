import Image from "next/image";

function ProfilePic() {
    // return (
    //     <div className="basis-3/12 place-self-center">
    //         <picture>
    //             <source srcSet="/me-2.png" type="image/png" />
    //             <img src="/me-2.png" alt="Profile"  className="min:h-16 min:w-16 max:h-16 max:w-16 rounded-3xl"/>
    //         </picture>
    //     </div>
    // );
    return (
        <div className="basis-3/12 mr-2 place-self-center">
            <picture>
                <source srcSet="/space-ben.png" type="image/png" />
                <img src="/space-ben.png" alt="Profile"  className="min:h-16 min:w-16 max:h-16 max:w-16 rounded-3xl"/>
            </picture>
        </div>
    );
}

export default ProfilePic;