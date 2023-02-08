import type ProjectData from '../../lib/Project';

function Project({ children }: { children: ProjectData }, key: number) {
    return (
        <div className='bg-white dark:bg-gray-400 my-2'>
            <div className='dark:text-white text-'>{children.Name}</div>
            <div className='dark:text-white'>{children.Description}</div>
            <div className='dark:text-white'>{children.Status}</div>
            <div className='dark:text-white'>{children.Tools}</div>
        </div>
    );
}

function Projects({projArray}: {projArray: ProjectData[]}) {
    console.log(projArray)
    return (    
        <div className="w-10/12 mx-auto bg-red-500">
            {projArray.map((proj: ProjectData) => (
                <Project key={proj.Id}>{proj}</Project>
            ))}
        </div>
    );
} 
export default Projects;