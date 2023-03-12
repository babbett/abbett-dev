import { useState } from "react";

const FontAwesomePicker = (props: any) => {
    const [showPicker, setShowPicker] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState("");
    //const [selectedIcon, setSelectedIcon] = useState(props.selectedIcon);
    
    const togglePicker = () => {
        setShowPicker(!showPicker);
    };

    const selectIcon = (icon: string) => {
        setSelectedIcon(icon);
        props.onSelect(icon);
        togglePicker();
    };

    const icons = {
        "fas fa-ambulance": "fas fa-ambulance",
        "fas fa-bath": "fas fa-bath",
        "fas fa-birthday-cake": "fas fa-birthday-cake",
        "fas fa-bug": "fas fa-bug",
        "fas fa-bus": "fas fa-bus",
        "fas fa-child": "fas fa-child",
        "fas fa-coffee": "fas fa-coffee",
        "fas fa-cube": "fas fa-cube",
        "fas fa-cubes": "fas fa-cubes",
        "fas fa-cut": "fas fa-cut",
        "fas fa-ellipsis-h": "fas fa-ellipsis-h",
        "fas fa-ellipsis-v": "fas fa-ellipsis-v",
        "fas fa-fighter-jet": "fas fa-fighter-jet",
        "fas fa-fire": "fas fa-fire",
        "fas fa-fire-extinguisher": "fas fa-fire-extinguisher",
        "fas fa-flask": "fas fa-flask",
        "fas fa-gamepad": "fas fa-gamepad",
        "fas fa-gift": "fas fa-gift",
        "fas fa-globe": "fas fa-globe",
        "fas fa-graduation-cap": "fas fa-graduation-cap",
        "fas fa-hashtag": "fas fa-hashtag",
        "fas fa-headphones": "fas fa-headphones",
        "fas fa-heart": "fas fa-heart",
        "fas fa-heartbeat": "fas fa-heartbeat",
        "fas fa-history": "fas fa-history",
        "fas fa-home": "fas fa-home",
        "fas fa-hourglass": "fas fa-hourglass",
    };

    const iconKeys = Object.keys(icons);

    return (
        <div className="relative">
            <button type="button" className="flex-none ml-1 rounded-md hover:text-sky-500" onClick={togglePicker}>
                <i className={selectedIcon}></i> icon...
            </button>
            {showPicker && (
                <div className="absolute top-0 left-0 z-10 w-64 h-64 bg-white border-2 rounded-md shadow-md overflow-y-auto">
                    <div className="flex flex-wrap">
                        {iconKeys.map((icon) => (
                            <button
                                type="button"
                                className="flex-none w-8 h-8 m-1 rounded-md hover:text-sky-500"
                                onClick={() => selectIcon(icon)}
                                key={icon.toString()}
                            >
                                <i className={icon}></i>icon
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};


export default FontAwesomePicker;