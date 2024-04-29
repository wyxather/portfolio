import { AnimatePresence, motion, useCycle } from 'framer-motion';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createContext, useContext, useEffect, useState } from 'react';
import { PageContext } from './page';

export const SearchContext = createContext();

export function Search() {
  const [activePageItemIndex] = useContext(PageContext);
  const [, setSearchInputText] = useContext(SearchContext);
  const [isSearchOpen, toggleSearchOpen] = useCycle(false, true);
  const [inputText, setInputText] = useState('');
  useEffect(() => {
    const debounceFn = setTimeout(() => setSearchInputText(inputText), 600);
    return () => clearTimeout(debounceFn);
  }, [inputText, setSearchInputText]);
  return (
    <AnimatePresence>
      {activePageItemIndex === 2 && (
        <motion.div
          key='SearchContainer'
          animate='animate'
          exit='exit'
          className='navbar-end'
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.2,
                staggerDirection: -1,
              },
            },
            exit: {
              transition: {
                staggerChildren: 0.3,
                staggerDirection: 1,
              },
            },
          }}
        >
          <AnimatePresence>
            {isSearchOpen && (
              <motion.input
                key='SearchInput'
                initial={{
                  scale: 0,
                }}
                exit={{
                  scale: 0,
                }}
                variants={{
                  animate: { scale: 1 },
                  exit: {
                    scale: 0,
                  },
                }}
                className='input mx-2 w-auto'
                onChange={(e) => setInputText(e.target.value)}
              ></motion.input>
            )}
          </AnimatePresence>
          <motion.button
            key='SearchButton'
            onClick={() => toggleSearchOpen()}
            className='btn btn-circle btn-ghost'
            initial={{
              scale: 0,
            }}
            variants={{
              animate: { scale: 1 },
              exit: {
                scale: 0,
              },
            }}
          >
            <FontAwesomeIcon
              className='text-md'
              icon={faSearch}
            ></FontAwesomeIcon>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
