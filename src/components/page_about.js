import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import turtle from '../images/turtle.jpg';
import { useEffect } from 'react';

const Messages = [
  'first message',
  'second message',
  'third message',
  'fourth message',
];

function Image() {
  return (
    <div className='flex w-full min-w-64 justify-center sm:w-fit'>
      <motion.img
        className='w-full max-w-80 rounded-full border-4 shadow'
        src={turtle}
        variants={{
          initial: {
            scale: 0,
          },
          animate: {
            scale: 1,
          },
        }}
      ></motion.img>
    </div>
  );
}

function Description() {
  return (
    <motion.div
      className='flex max-h-80 min-w-64 flex-1 cursor-default items-center p-8 text-justify font-bold'
      variants={{
        initial: {
          scale: 0,
        },
        animate: {
          scale: 1,
        },
      }}
    >
      From a curious gamer tinkering with scripts to a computer science graduate
      proficient in C and C++, I now passionately pursue a career in software
      development. Eager for fresh challenges, I aim to apply the hands-on
      expertise gained from my backend developer internship.
    </motion.div>
  );
}

function About() {
  return (
    <motion.div
      initial='initial'
      whileInView='animate'
      variants={{
        animate: {
          transition: {
            staggerChildren: 0.3,
          },
        },
      }}
      viewport={{
        once: false,
      }}
      className='flex flex-wrap bg-base-300 p-8'
    >
      <Image />
      <Description />
    </motion.div>
  );
}

function Cursor(props) {
  return (
    <motion.div
      animate={{
        opacity: [0, 0, 1, 1],
        transition: {
          repeat: Infinity,
          repeatDelay: 0,
          duration: 1,
          ease: 'linear',
          times: [0, 0.5, 0.5, 1],
        },
      }}
      {...props}
    >
      {props.children}
    </motion.div>
  );
}

function Message(props) {
  const index = useMotionValue(0);
  const value = useTransform(index, (latest) => Messages[latest] || '');
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const text = useTransform(rounded, (latest) => value.get().slice(0, latest));
  const update = useMotionValue(true);
  useEffect(() => {
    animate(count, 60, {
      type: 'tween',
      repeat: Infinity,
      repeatType: 'reverse',
      repeatDelay: 2,
      delay: 2,
      duration: 1,
      ease: 'easeIn',
      onUpdate(latest) {
        if (update.get() === true && latest > 0) {
          return update.set(false);
        }
        if (update.get() !== false || latest !== 0) {
          return;
        }
        if (index.get() === Messages.length - 1) {
          index.set(0);
        } else {
          index.set(index.get() + 1);
        }
        update.set(true);
      },
    });
  }, [count, index, update, Messages.length]);
  return <motion.span {...props}>{text}</motion.span>;
}

function Home() {
  return (
    <div className='h-screen min-w-80 p-8'>
      <div className='cursor-default text-3xl font-bold'>Hi, I'm</div>
      <div className='mt-6 cursor-default text-5xl font-bold'>
        William Sebastian Candra
      </div>
      <div className='mt-3 flex w-fit flex-row rounded-full bg-black p-3 shadow-md'>
        <div className='inline cursor-default px-3 text-xl font-bold'>
          {'>'}
        </div>
        <div>
          <Message className='inline cursor-default text-xl font-bold text-primary' />
          <Cursor className='inline cursor-default pr-3 text-xl font-bold'>
            _
          </Cursor>
        </div>
      </div>
    </div>
  );
}

export function PageAbout() {
  return (
    <>
      <Home />
      <About />
    </>
  );
}
