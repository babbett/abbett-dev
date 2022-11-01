import Project from '../components/Project';
import type ProjectData from '../lib/Project';

function Projects({projArray}: {projArray: ProjectData[]}) {
    console.log(projArray)
    return (    
        <div className="w-10/12 mx-auto">
            {projArray.map((proj: ProjectData) => (
                <Project key={proj.Id}>{proj}</Project>
            ))}
        </div>
    );
}
 
export default Projects;