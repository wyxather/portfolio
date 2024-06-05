import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LayoutGroup, motion } from 'framer-motion';
import { createContext, useContext, useState } from 'react';
import {
  faArrowLeft,
  faArrowRight,
  faDownload,
} from '@fortawesome/free-solid-svg-icons';
import orion from '../images/orion.png';
import { SearchContext } from './search';

const Locale = 'en-GB';

const DateConfig = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
};

const ProjectContext = createContext();

class ProjectItem {
  constructor(title, summary, tags, lastUpdated, link, image) {
    this.title = title;
    this.summary = summary;
    this.tags = tags;
    this.lastUpdated = lastUpdated;
    this.link = link;
    this.image = image;
  }
}

const ProjectItems = [
  new ProjectItem(
    'monkey',
    'A simple web app to track your expense. Featuring a token based auth, multiple profiles and categories.',
    ['Next.js', 'NextUI', 'MongoDB'],
    new Date(2024, 6, 5).toLocaleDateString(Locale, DateConfig),
    'https://github.com/wyxather/monkey',
    null,
  ),
  new ProjectItem(
    'orion',
    'A base to be used for game hacking or game modding related content. Featuring return address spoofer for both x86 and x64 operating system, minimal imports and custom animated imgui widgets.',
    ['C', 'C++', 'HLSL', 'DirectX 9', 'DirectX 11', 'ImGui'],
    new Date(2024, 3, 16).toLocaleDateString(Locale, DateConfig),
    'https://github.com/wyxather/orion',
    orion,
  ),
  new ProjectItem(
    'portfolio',
    'My personal portfolio.',
    ['ReactJS', 'Tailwind CSS', 'Framer Motion', 'daisyUI'],
    new Date(2024, 3, 25).toLocaleDateString(Locale, DateConfig),
    'https://github.com/wyxather/portfolio',
    null,
  ),
];

export function PageProjects() {
  const [activeProjectItemIndex, setActiveProjectItemIndex] = useState(null);
  const [searchInputText] = useContext(SearchContext);
  const projectItems = searchInputText
    ? ProjectItems.filter((projectItem) => {
        const searchKeyword = searchInputText.toLowerCase();
        for (const tag of projectItem.tags) {
          if (tag.toLowerCase().includes(searchKeyword)) {
            return true;
          }
        }
        return (
          projectItem.title.toLowerCase().includes(searchKeyword) ||
          projectItem.summary.toLowerCase().includes(searchKeyword) ||
          projectItem.lastUpdated.toLowerCase().includes(searchKeyword)
        );
      })
    : ProjectItems;
  return (
    <ProjectContext.Provider
      value={[activeProjectItemIndex, setActiveProjectItemIndex]}
    >
      <div className='relative flex flex-wrap'>
        {projectItems.map((projectItem, projectItemIndex) =>
          activeProjectItemIndex !== projectItemIndex ? (
            <motion.div
              className='relative m-4 h-64 w-64 overflow-clip rounded-lg bg-base-300 shadow-md'
              key={projectItem.title}
              initial={{
                scale: 0,
                opacity: 0,
              }}
              whileInView={{
                scale: 1,
                opacity: 1,
              }}
              viewport={{ once: false }}
              layout
              layoutId={projectItem.title}
            >
              <LayoutGroup id={projectItem.title}>
                <motion.div
                  layoutId='imgContainer'
                  className='flex h-64 w-64 justify-center bg-base-200'
                >
                  <motion.img
                    layoutId='img'
                    className='h-full w-auto object-cover'
                    src={projectItem.image}
                    alt=''
                  ></motion.img>
                </motion.div>
                <div className='absolute top-48 h-48 w-64 bg-base-300/80 transition duration-300 ease-in hover:-translate-y-2/3 hover:ease-out'>
                  <button
                    className='btn btn-ghost btn-sm absolute bottom-0 right-0 m-2'
                    onClick={() => setActiveProjectItemIndex(projectItemIndex)}
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                  <motion.div
                    layout='position'
                    layoutId='lastUpdated'
                    className='absolute bottom-0 left-0 mx-4 my-4 cursor-default rounded bg-stone-800 px-2 text-xs shadow-md'
                  >
                    Last Updated: {projectItem.lastUpdated}
                  </motion.div>
                  <motion.div
                    layout='position'
                    layoutId='title'
                    className='text-md mx-4 mt-2 line-clamp-2 font-bold uppercase'
                  >
                    {projectItem.title}
                  </motion.div>
                  <motion.div
                    layout='position'
                    layoutId='tags'
                    className='mx-4 mt-2 flex max-h-10 flex-wrap overflow-clip'
                  >
                    {projectItem.tags.map((tag) => (
                      <div
                        key={tag}
                        className='mb-2 mr-1 cursor-default rounded bg-primary px-1 text-sm text-xs font-bold text-primary-content shadow-md'
                      >
                        {tag}
                      </div>
                    ))}
                  </motion.div>
                  <motion.div
                    layout='position'
                    layoutId='summary'
                    className='mx-4 mt-2 line-clamp-3 cursor-default text-justify text-sm'
                  >
                    {projectItem.summary}
                  </motion.div>
                </div>
              </LayoutGroup>
            </motion.div>
          ) : (
            <motion.div
              className='absolute z-10 h-screen w-screen min-w-80 bg-base-300'
              key={projectItem.title}
              layout
              layoutId={projectItem.title}
            >
              <LayoutGroup id={projectItem.title}>
                <button
                  className='btn btn-primary absolute left-0 top-0 z-10 m-4'
                  onClick={() => setActiveProjectItemIndex(null)}
                >
                  <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                </button>
                <div className='h-1/2 min-h-64 w-full min-w-64'>
                  <motion.div
                    layoutId='imgContainer'
                    className='flex h-full w-full justify-center bg-base-200'
                  >
                    <motion.img
                      layoutId='img'
                      className='h-full w-auto object-cover'
                      src={projectItem.image}
                      alt=''
                    ></motion.img>
                  </motion.div>
                </div>
                <div className='min-h-64 w-fit'>
                  <motion.div
                    layout='position'
                    layoutId='title'
                    className='mx-8 mt-8 cursor-default text-2xl font-bold uppercase'
                  >
                    {projectItem.title}
                  </motion.div>
                  <motion.div
                    layout='position'
                    layoutId='lastUpdated'
                    className='mx-8 mt-1 w-fit cursor-default rounded bg-stone-800 px-1 text-xs shadow-md' //'absolute bottom-0 left-0 mx-4 my-4 cursor-default rounded bg-stone-800 px-2 opacity-50 shadow-md'
                  >
                    Last Updated: {projectItem.lastUpdated}
                  </motion.div>
                  <motion.div
                    layout='position'
                    layoutId='tags'
                    className='mx-8 mt-2 flex flex-wrap'
                  >
                    {projectItem.tags.map((tag) => (
                      <div
                        key={tag}
                        className='mb-2 mr-1 cursor-default rounded bg-primary px-1 text-sm text-xs font-bold text-primary-content shadow-md'
                      >
                        {tag}
                      </div>
                    ))}
                  </motion.div>
                  <motion.div
                    layoutId='summary'
                    className='mx-8 mt-4 cursor-default text-justify'
                  >
                    {projectItem.summary}
                  </motion.div>
                </div>
              </LayoutGroup>
              <a
                className='btn btn-ghost absolute bottom-0 right-0 m-8'
                href={projectItem.link}
                target='_blank'
                rel='noreferrer'
              >
                <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon>
              </a>
            </motion.div>
          ),
        )}
      </div>
    </ProjectContext.Provider>
  );
}
