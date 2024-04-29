import { motion, useCycle } from 'framer-motion';
import { createContext, useContext } from 'react';
import { PageContext, PageItems } from './page';
import { Search } from './search';

const NavbarContext = createContext();

function Container({ children }) {
  const [isMenuOpen] = useContext(NavbarContext);
  return (
    <>
      <motion.div
        initial='closed'
        animate={isMenuOpen ? 'open' : 'closed'}
        className='navbar fixed z-50 min-w-48 bg-base-300/80 shadow-md backdrop-blur'
      >
        {children}
      </motion.div>
      <div className='navbar'></div>
    </>
  );
}

function Path(props) {
  return (
    <motion.path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      {...props}
    />
  );
}

function Button() {
  const [, toggleMenuOpen] = useContext(NavbarContext);
  return (
    <button
      className='btn btn-square btn-ghost'
      onClick={() => toggleMenuOpen()}
    >
      <svg
        className='stroke-current'
        viewBox='0 0 24 24'
        width='24'
        height='24'
      >
        <Path
          variants={{
            closed: { d: 'M 4 6 L 20 6' },
            open: { d: 'M 4 20 L 20 6' },
          }}
        />
        <Path
          d='M 4 12 h16'
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: 'M 4 18 L 20 18' },
            open: { d: 'M 4 6 L 20 20' },
          }}
        />
      </svg>
    </button>
  );
}

function Label() {
  return <div className='px-2 text-xl'>William S. C.</div>;
}

function MenuItem({ pageItemIndex, children }) {
  const [activePageItemIndex, setActivePageItemIndex] = useContext(PageContext);
  const isActive = pageItemIndex === activePageItemIndex;
  return (
    <motion.div
      className='m-5 flex justify-center'
      variants={{
        closed: { opacity: 0, translateX: '-100%' },
        open: {
          opacity: 1,
          translateX: '0%',
        },
      }}
      transition={{
        type: 'spring',
        bounce: 0.2,
      }}
    >
      {isActive && (
        <motion.div
          className='absolute left-0 h-full w-1 bg-primary'
          layoutId='isActiveIndicator'
          initial={{
            scaleY: 4,
          }}
          animate={{
            scaleY: 0.5,
          }}
          transition={{
            type: 'spring',
            stiffness: 50,
          }}
        ></motion.div>
      )}
      <motion.button
        animate={isActive ? 'active' : 'inactive'}
        className={
          isActive
            ? 'h-12 w-full rounded pl-6 text-left font-bold uppercase text-primary transition-colors duration-300 hover:bg-base-300'
            : 'h-12 w-full rounded pl-6 text-left font-bold uppercase transition-colors duration-300 hover:bg-base-300'
        }
        variants={{
          inactive: { translateX: '0%' },
          active: { translateX: '5%' },
        }}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'instant' });
          setActivePageItemIndex(pageItemIndex);
        }}
      >
        {children}
      </motion.button>
    </motion.div>
  );
}

function Menu({ children }) {
  const [isMenuOpen] = useContext(NavbarContext);
  return (
    <motion.div
      className='fixed z-50 h-full w-64 bg-base-300/60 shadow-md backdrop-blur'
      initial='closed'
      animate={isMenuOpen ? 'open' : 'closed'}
      variants={{
        closed: {
          opacity: 0,
          translateX: '-100%',
          transition: {
            duration: 0.2,
            easings: 'easeIn',
            when: 'afterChildren',
            staggerDirection: -1,
            staggerChildren: 0.1,
          },
        },
        open: {
          opacity: 1,
          translateX: '0%',
          transition: {
            duration: 0.2,
            easings: 'easeOut',
            when: 'beforeChildren',
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function Navbar() {
  const [isMenuOpen, toggleMenuOpen] = useCycle(false, true);
  return (
    <NavbarContext.Provider value={[isMenuOpen, toggleMenuOpen]}>
      <Container>
        <div className='navbar-start'>
          <Button />
          <Label />
        </div>
        <Search />
      </Container>
      <Menu>
        {PageItems.map((pageItem, pageItemIndex) => (
          <MenuItem key={pageItem} pageItemIndex={pageItemIndex}>
            {pageItem}
          </MenuItem>
        ))}
      </Menu>
    </NavbarContext.Provider>
  );
}
