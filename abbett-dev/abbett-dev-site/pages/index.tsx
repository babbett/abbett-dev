import Hero from '../components/Hero'
import Description from '../components/Description'
import Projects from '../components/Projects'
import * as fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import type ProjectData from '../lib/Project';
// Import next.js css class
import styles from '../styles/Home.module.css' 
import { ReactNode } from 'react';

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
 function Home({ projects }: InferGetStaticPropsType<typeof getStaticProps > ) {
  //   return (
  //     <div>
  //       <Hero/>
  //       <Description/>
  //       <Projects projArray={projects}></Projects>
  //     </div>
  // );dksk
  return (
    <div className='mx-auto flex md:flex-row flex-col'>
      <IntroPane/>
      <MainPane/>
    </div>
  )
}

function WaveHand() {
  return (
    <span className='animate-waving-hand inline-block mx-1'>👋</span>
  );
}

function IntroPane() {
  return (
    <>
      <div className='md:basis-1/2 md:h-fit max-md:my-20 dark:text-white md:sticky md:top-1/2'>
        {/* <div className='sticky top-1/2 w-full h-1 bg-red-500 -z-10'></div> */}
        <section>
          <div className='md:relative'>
            <div className='md:absolute md:w-full md:-top-20'>
              <h1 className='text-6xl text-center mb-2'>Hello World<WaveHand></WaveHand></h1>
              <h2 className='text-4xl text-center mb-2'>I{"'"}m Ben Abbett</h2>
              <h3 className='text-3xl text-center mb-2'> </h3>
              {/* <h2 className='text-3xl text-center mb-2 text-gray-500 dark:text-white'>Software Developer</h2> */}
              <div className='flex flex-row items-center'>
                <a href='/abbett-resume.pdf' target="_blank" rel="noopener noreferrer" className='p-1 mx-auto mr-1 border-2 border-black dark:border-white rounded-lg text-lg'>
                  <button type='button' className='dark:text-white'>Resume {FontAwesome("file")}</button>
                </a>
                <button type='button' className='p-1 mx-auto ml-1 border-2 border-black dark:border-white rounded-lg text-lg'>Contact {FontAwesome("envelope")}</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function MainPane() {
  return (
    <div className='md:basis-1/2 dark:text-white'>
      <div className='w-9/12 mx-auto'>
        <section className='mt-2'>
          <h3 className='text-3xl my-4'>About Me</h3>
          <p>
          I graduated from Gordon College in 2021 with a double major in Computer Science and Mathematics. 
          Since then, I{"'"}ve spent my time building software for nonprofits at <Link href="https://www.brickriver.com">Brick River Technologies</Link>,
          </p>
        </section>
        <section className='mt-2'>
          <h3 className='text-3xl my-4'>Skills</h3>
          <div className='w-12/12'>
            {SkillList()}
          </div>
        </section>
        <section className='mt-2'>
          <h3 className='text-3xl my-4'>Projects</h3>
          <p>
            Hello
          </p>
        </section>
        <section className='mt-2'>
          <h3 className='text-3xl my-4'>Contact</h3>
          <div>
              <span className='font-bold'>Email:</span> <a href='mailto:bwabbett@gmail.com'>bwabbett@gmail.com</a>
          </div>
        </section>
        {/* Long content test */}
        <section className='mt-2'>
          <h3 className='text-3xl my-4'>Long Content Test</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dignissim cursus dui, vitae vulputate lacus facilisis a. In sagittis nunc quis odio tincidunt sollicitudin. Sed vel libero a massa elementum blandit sit amet quis odio. Pellentesque et justo eget nisl mattis gravida. Nam faucibus lobortis dapibus. Quisque ut felis sapien. Donec tempus sem ac facilisis placerat.
            Etiam faucibus arcu nulla, vel tristique turpis vehicula et. Nam et augue eget erat lobortis malesuada ut sed ante. Proin eleifend, ex id aliquam vestibulum, ipsum eros consectetur risus, sed mattis ligula tellus ullamcorper tortor. Fusce dictum tempor sem, a lacinia mi semper in. Vestibulum ac ultricies leo, quis rutrum urna. Suspendisse tempor nisi nec convallis varius. Donec lacinia interdum molestie.
            Fusce eu interdum sapien. Vivamus aliquam et nisl et scelerisque. Duis vel erat a nisi varius congue. Aliquam pellentesque euismod vestibulum. Donec vestibulum placerat sapien eget mattis. Cras ultrices massa vel suscipit hendrerit. In ipsum erat, tristique ac laoreet sit amet, dignissim sit amet lorem. Integer vestibulum dictum lacus sed venenatis. Aliquam erat volutpat. Sed ex dolor, pulvinar id porta vitae, pharetra quis enim.
            Quisque egestas efficitur sem quis vestibulum. Duis lectus diam, posuere ac laoreet ac, tempor eget mauris. Donec non egestas felis, quis tempus velit. Nullam pulvinar ipsum ligula, eget placerat metus malesuada at. Vivamus ornare neque mi, id dapibus orci mollis scelerisque. Etiam a interdum lacus. Aenean aliquet interdum dolor, id elementum dui malesuada luctus. Phasellus ultricies hendrerit nisl at mattis. Vivamus et viverra ligula. Aenean in nisl turpis. Proin dignissim magna in facilisis accumsan. Nulla a auctor est.
            Aliquam justo mi, luctus id iaculis eu, venenatis a diam. Curabitur pellentesque mi id nisl tincidunt elementum. In tincidunt, dui id rhoncus vestibulum, libero enim rhoncus mauris, quis vulputate lacus arcu faucibus elit. Proin porta mattis mattis. Vivamus vitae ante ante. Maecenas sed ullamcorper nunc, id interdum justo. Aliquam bibendum tellus eu ornare porttitor.
          </p>
        </section>
      </div>
    </div>
  );
}

function SkillList() {
  // Create a list of skills
  const skills = [
    'React',
    'Next.js',
    'ASP.NET',
    'C#',
    'C++',
    'SQL',
    'JavaScript',
    'TypeScript',
    'Python',
    'Git'
  ];

  // Create a list of skill elements
  const skillElements: ReactNode[] = skills.map((skill: string) => {
    return Skill(skill);
  });


  return (
    <div className='w-12/12'>
      <div className='flex flex-row flex-wrap'>
        {skillElements}
      </div>
    </div>
  );
}

function Skill(skill: string): React.ReactNode {
  return (
    <div className='bg-gradient-to-tr from-yellow-300 to-emerald-400 via-violet-600 flex-1 grow-0 m-1 p-0.5 content-center rounded-md inline'>
      <div className='bg-white dark:bg-gray-700 px-1 rounded hover:bg-clip-text'>{skill}</div>
    </div>
  );
}

function FontAwesome(name: string, dark?: boolean) {
  return <i className={`fa-${dark ? "regular" : "solid"} fa-${name}`}></i>
}

export default Home;
