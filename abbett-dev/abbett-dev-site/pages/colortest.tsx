const tailwindColors: string[] = ["Hello", "Goodbye"]

const ColorTest = () => (
    <div>
        <label htmlFor="cars">Choose a car:</label>
        <select name="cars" id="cars">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
        </select>
        <div className="">
            <div className="h-32 w-32 bg-red-100"></div>
            <div className="h-32 w-32 bg-red-300"></div>
            <div className="h-32 w-32 bg-red-500"></div>
        </div>
    </div>
);

export default ColorTest;