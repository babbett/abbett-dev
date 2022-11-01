import ProjectData from "../lib/Project";

function Project({ children }: { children: ProjectData }) {
    console.log(children)
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