import ProjectData from "../../lib/Project";

function Project({ children, key }: { children: ProjectData, key:number }) {
    console.log(children)
    console.log(key)
    return (
        <div>
            <div>{children.Name}</div>
            <div>{children.Description}</div>
            <div>{children.Status}</div>
            <div>{children.Tools}</div>
        </div>
    );
}

export default Project;