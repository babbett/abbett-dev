import Hero from '../components/Hero'
import Description from '../components/Description'
import Projects from '../components/Projects'
import * as fs from 'fs/promises';
import path from 'path';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import type ProjectData from '../lib/Project';

export const getStaticProps: GetStaticProps = async () => {
    const jsonDirectory = path.join(process.cwd(), 'lib');
    //Read the json data file data.json
    const fileContents = await fs.readFile(jsonDirectory + '/projects.json', 'utf8');
    // Convert to ProjectObj
    const projects: ProjectData[] = JSON.parse(fileContents);

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return { props: { projects } }
}

/** The 'portfolio' part of the app. Contact me, download resume, list of projects, etc.. 
 * 
 * @returns The home page.
 */
function Home({projects}: InferGetStaticPropsType<typeof getStaticProps > ) {
  return (
      <div>
        <Hero/>
        <Description/>
        <Projects projArray={[projects]}></Projects>
      </div>
  );
    
}

export default Home;
