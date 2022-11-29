function Background() {
    return (
        <div className="bg-gradient-to-tr from-blue-500 to-purple-500
                        h-screen
                        w-screen
                        flex flex-row">
            <div className="w-1/3">
                <h1 className="text-8xl text-white text-center">I{"'"}m Ben</h1>
            </div>
            <div className="w-2/3 bg-black">
                <p>goodbye</p>
            </div>            
        </div>
    );
}

export default Background