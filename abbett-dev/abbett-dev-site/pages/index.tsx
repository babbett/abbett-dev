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
import React, { useState, useEffect } from 'react'

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

//? NOTES: option+W for wrap in html element

/** The 'portfolio' part of the app. Contact me, download resume, list of projects, etc.. 
 * 
 * @returns The home page.
 */
const Home = ({ projects }: InferGetStaticPropsType<typeof getStaticProps > ) => {
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

const IntroPane = (): React.ReactElement => {
  useEffect(() => {
    // Add an effect that looks like typing the current message
    // < characters are treated as backspaces
    //const message: string = "/* I'm Ben Abe<bo<et*<t */";
    const message: string = "/* I'm Ben Abet<<bot<<ett */";
    var index = 0;
    
    const intervalId = setInterval(function(){
      if (index < message.length) {
        if (message[index] !== '<') {
          document.getElementById('intro')!.innerHTML += message[index];
        }
        else {
          var currMessage = document.getElementById('intro')!.innerHTML;
          document.getElementById('intro')!.innerHTML = currMessage.substring(0, currMessage.length - 1);
        }
        index++;
      }
  
      if (index == message.length) {
        // document.getElementById('intro').className += ' text-green-400';
        document.getElementById('intro')!.className += ' text-green-500';
        clearInterval(intervalId);
      }
    }, Math.random()*100+60);
  });

  return (
    <>
      <div className='md:basis-1/2 md:h-fit max-md:my-20 dark:text-white md:sticky md:top-1/2'>
        {/* for testing midline: <div className='sticky top-1/2 w-full h-1 bg-red-500 -z-10'></div> */}
        <section>
          <div className='md:relative'>
            <div className='md:absolute md:w-full md:-top-20'>
              <h1 className='text-6xl text-center mb-2'>Hello World<WaveHand></WaveHand></h1>
              <h2 className='text-4xl text-center mb-2' id='intro'></h2>
              <h3 className='text-3xl text-center mb-2'> </h3>
              {/* <h2 className='text-3xl text-center mb-2 text-gray-500 dark:text-white'>Software Developer</h2> */}
              <div className='flex flex-row items-center'>
                <a href='/abbett-resume.pdf' target="_blank" rel="noopener noreferrer" className='p-1 mx-auto mr-1 border-2 border-black dark:border-white rounded-lg text-lg hover:bg-gray-300 hover:dark:bg-gray-500'>
                  <button type='button' className='dark:text-white'>Resume {FontAwesome("file")}</button>
                </a>
                <a href='mailto:bwabbett@gmail' className='p-1 mx-auto ml-1 border-2 border-black dark:border-white rounded-lg text-lg hover:bg-gray-300 hover:dark:bg-gray-500'>
                  <button type='button' className='dark:text-white'>Contact {FontAwesome("envelope")}</button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

const MainPane = (): React.ReactElement => {
  return (
    <div className='md:basis-1/2 dark:text-white'>
      <div className='w-9/12 mx-auto'>
        <section className='mt-2'>
          <h3 className='text-3xl my-4'><b>About Me</b></h3>
          <p className='ml-4'>
            I graduated from Gordon College in 2021 with a double major in Computer Science and Mathematics. 
            Since then, I{"'"}ve spent my time building software for nonprofits at <Link href="https://www.brickriver.com">Brick River Technologies</Link>,
          </p>
        </section>
        <section className='mt-2'>
          <h3 className='text-3xl my-4'><b>Skills</b></h3>
          <div className='ml-4'>
            {SkillList()}
          </div>
        </section>
        <section className='mt-2'>
          <h3 className='text-3xl my-4'><b>Projects</b></h3>
          <p className='ml-4'>
            Hello
          </p>
        </section>
        <section className='mt-2'>
          <h3 className='text-3xl my-4'><b>Contact</b></h3>
          <div className='ml-4'>
              <span className='font-bold'>Email:</span> <a href='mailto:bwabbett@gmail.com'>bwabbett@gmail.com</a>
          </div>
        </section>
        {/* Long content test */}
        <section className='mt-2'>
          <h3 className='text-3xl my-4'>Long Content Test</h3>
          <p className='ml-4'>
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

const WaveHand = (): React.ReactElement => {
  return (
    <span className='animate-waving-hand inline-block mx-1'>👋</span>
  );
}

const SkillList = (): React.ReactElement => {
  // Create a list of skills
  const skills: string[] = [
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
  const skillElements: React.ReactElement[] = skills.map((skill: string) => {
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

const Skill = (skill: string): React.ReactElement => {
  return (
    <div className='bg-gradient-to-tr from-yellow-300 to-emerald-400 via-violet-600 flex-1 grow-0 m-1 pr-2 drop-shadow p-0.5 content-center rounded-md inline'>
      <div className='bg-white dark:bg-gray-900 px-1 rounded hover:bg-clip-text text-gray-700 dark:text-gray-300 hover:text-white'>{skill}</div>
    </div>
  );
}

function FontAwesome(name: string, dark?: boolean): React.ReactNode {
  return <i className={`fa-${dark ? "regular" : "solid"} fa-${name}`}></i>
}

export default Home;
