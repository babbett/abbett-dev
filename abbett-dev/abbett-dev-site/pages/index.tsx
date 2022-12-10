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
  // stop the animation when redirected to another page
  //const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Add an effect that looks like typing the current message
    // < characters are treated as backspaces
    //const message: string = "/* I'm Ben Abe<bo<et*<t */";
    const message: string = "/* I'm Ben Abet<<bot<<ett */";
    var index = 0;
    
    const intervalId = setInterval(function(){
      //setIsMounted(true);
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
        document.getElementById('intro')!.className += ' text-emerald-400';
        //setIsMounted(false);
        clearInterval(intervalId);
      }
    }, Math.random()*100+60);
  });

  return (
    <>
      <div className='md:basis-2/5 md:h-fit max-md:my-20 dark:text-white md:sticky md:top-1/2'>
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
                <a href='mailto:ben@abbett.dev' className='p-1 mx-auto ml-1 border-2 border-black dark:border-white rounded-lg text-lg hover:bg-gray-300 hover:dark:bg-gray-500'>
                  <button type='button' className='dark:text-white'>Email {FontAwesome("envelope")}</button>
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
    <div className='md:basis-3/5 dark:text-white'>
      <div className='w-9/12 mx-auto'>
        <section className='mt-2'>
          <h3 className='text-3xl my-4'><b>About Me</b></h3>
          <p className='ml-4'>
            I{"'"}m a computer science and math graduate with a passion for problem-solving. I currently work as a software developer at <Link href="https://www.brickriver.com"><span className='hover:text-blue-500 cursor-pointer'><u>Brick River Technologies</u></span></Link>, a small SaaS company which mainly provides tools for non-profits. In my free time, I enjoy taking care of my rabbit, playing chess, and rock climbing. I{"'"}m always looking for new opportunities and challenges to help me grow and develop my skills. If you have an opening you think I could be a great fit for, please don{"'"}t hesitate to reach out!
          </p>
        </section>
        <section className='mt-2'>
          <h3 className='text-3xl my-4'><b>Skills</b></h3>
          <div className='ml-4'>
            {/*SkillList()*/}
            <SkillList></SkillList>
          </div>
        </section>
        <section className='mt-2'>
          <h3 className='text-3xl my-4'><b>Projects</b></h3>
          <div className='flex flex-col'>
            <div className='flex-auto bg-gray-100 dark:bg-gray-800 h-full p-2 rounded-lg m-2'>
              <h3 className='text-lg mb-2'>About Me</h3>
              <p>Built and deployed a personal static web portfolio using Next.js and TailwindCSS, with a multiplayer Tic-Tac-Toe game using Firebase{"'"}s Realtime Database.</p>
            </div>
            <div className='flex-auto bg-gray-100 dark:bg-gray-800 h-full p-2 rounded-lg m-2'>
              <h3 className='text-lg mb-2'>AM/PM Catalyst</h3>
              <p>Lead the development of a Java applet that streamlines the workflow for AM/PM employees and allows them to generate PDF booklets from customer medical history saved in a MySQL database.</p>
            </div>
            <div className='flex-auto bg-gray-100 dark:bg-gray-800 h-full p-2 rounded-lg m-2'>
              <h3 className='text-lg mb-2'>Dominant Eigenvalue Finder</h3>
              <p>Developed a program that uses a CUDA-parallelized algorithm to calculate the dominant eigenvalue of a NxN matrix, with optimized shared memory caches and reduction algorithms</p>
            </div>
          </div>
        </section>
        <section className='mt-2'>
          <h3 className='text-3xl my-4'><b>Contact</b></h3>
          <div className='ml-4'>
            <span className='font-bold'>Email:</span> <a className='hover:text-blue-500' href='mailto:ben@abbett.dev'><u>ben@abbett.dev</u></a>
          </div>
          <div className='ml-4'>
            <span className='font-bold'>Github:</span> <a className='hover:text-blue-500' href='https://github.com/babbett'><u>github.com/babbett</u></a>
          </div>
          <div className='ml-4'>
            <span className='font-bold'>LinkedIn:</span> <a className='hover:text-blue-500' href='https://www.linkedin.com/in/abbett/'><u>linkedin.com/in/abbett</u></a>
          </div>
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
    <div className='bg-gradient-to-tr from-yellow-300 to-emerald-400 via-violet-600 flex-1 grow-0 m-1 pr-2 drop-shadow p-0.5 content-center rounded-md inline' key={skill}>
      <div className='bg-white dark:bg-gray-900 px-1 rounded text-gray-700 dark:text-gray-300'>{skill}</div>
    </div>
  );
}

function FontAwesome(name: string, dark?: boolean): React.ReactNode {
  return <i className={`fa-${dark ? "regular" : "solid"} fa-${name}`}></i>
}

export default Home;
