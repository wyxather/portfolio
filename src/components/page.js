import { motion } from 'framer-motion';
import { createContext, useContext } from 'react';
import { PageSkills } from './page_skills';
import { PageContact } from './page_contact';
import { PageProjects } from './page_projects';

export const PageContext = createContext();

export const PageItems = ['About', 'Skills', 'Projects', 'Contact'];

function PageContent() {
  const [activePageItemIndex] = useContext(PageContext);
  switch (activePageItemIndex) {
    case 0:
      return <PageAbout />;
    case 1:
      return <PageSkills />;
    case 2:
      return <PageProjects />;
    case 3:
      return <PageContact />;
    default:
      break;
  }
}

export function Page() {
  const [activePageItemIndex] = useContext(PageContext);
  return (
    <div className='relative overflow-x-clip'>
      {PageItems.map(
        (pageItem, pageItemIndex) =>
          activePageItemIndex === pageItemIndex && (
            <motion.div
              key={pageItem}
              className='absolute w-screen'
              initial='inactive'
              animate='active'
              variants={{
                inactive: {
                  opacity: 0,
                  translateX: '100%',
                },
                active: {
                  opacity: 1,
                  translateX: '0%',
                  transition: {
                    easings: 'easeIn',
                    duration: 1,
                  },
                },
              }}
            >
              <PageContent />
            </motion.div>
          ),
      )}
    </div>
  );
}

function PageAbout() {
  return null;
}
