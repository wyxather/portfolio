import { motion } from 'framer-motion';

function Image() {
  return <div className=''></div>;
}

function Description() {
  return (
    <div className=''>
      As an aspiring software developer, I'm fueled by a fascination for
      technology and a desire to make a difference. With a fresh perspective and
      a commitment to continuous improvement, I'm embarking on a journey to
      master the art of programming. My goal is to merge creativity with
      technical prowess to craft innovative software solutions that inspire and
      empower others.
    </div>
  );
}

export function PageAbout() {
  return (
    <motion.div
      initial='initial'
      animate='animate'
      variants={{
        animate: {
          transition: {
            staggerChildren: 0.3,
          },
        },
      }}
    >
      <div className=''>
        <Image />
        <Description />
      </div>
    </motion.div>
  );
}
