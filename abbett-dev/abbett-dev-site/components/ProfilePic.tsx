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
    // return (
    //     <div className="basis-3/12 md:mr-2 place-self-center">
    //         <picture className="">
    //             <source srcSet="/space-ben.png" type="image/png" />
    //             <img src="/space-ben.png" alt="Profile"  className="rounded-3xl"/>
    //         </picture>
    //     </div>
    // );
    
    var defaultHeight: number =  2048; //? Height of /public/space-ben.png
    var defaultWidth: number = 1464;  //? Width of /public/space-ben.png
    var scaleBy: number = 1;

    var height: number = defaultHeight * scaleBy;
    var width: number = defaultWidth * scaleBy; 
    console.log('height: ', height)
    console.log('width: ', width)
    

    return (
        <div className="basis-3/12 md:mr-2 place-self-center">
            <Image src="/space-ben.png" width={width} height={height} alt="Me"></Image>

        </div>
    );
}

export default ProfilePic;