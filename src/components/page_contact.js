import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedin,
  faLine,
  faInstagram,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

class ContactItem {
  constructor(icon, name, link, style) {
    this.icon = icon;
    this.name = name;
    this.link = link;
    this.style = style;
  }
}

const ContactItems = [
  new ContactItem(
    faLinkedin,
    'LinkedIn',
    'https://www.linkedin.com/in/william-candra-329a66223/',
    {
      background: 'rgb(18,136,225)',
    },
  ),
  new ContactItem(faLine, 'Line', 'https://line.me/ti/p/~williamsebastianc', {
    background: 'rgb(80,170,80)',
  }),
  new ContactItem(
    faInstagram,
    'Instagram',
    'https://www.instagram.com/wyxather/',
    {
      background:
        'radial-gradient(circle farthest-corner at 35% 90%, #fec564, transparent 50%), radial-gradient(circle farthest-corner at 0 140%, #fec564, transparent 50%), radial-gradient(ellipse farthest-corner at 0 -25%, #5258cf, transparent 50%), radial-gradient(ellipse farthest-corner at 20% -50%, #5258cf, transparent 50%), radial-gradient(ellipse farthest-corner at 100% 0, #893dc2, transparent 50%), radial-gradient(ellipse farthest-corner at 60% -20%, #893dc2, transparent 50%), radial-gradient(ellipse farthest-corner at 100% 100%, #d9317a, transparent), linear-gradient(#6559ca, #bc318f 30%, #e33f5f 50%, #f77638 70%, #fec66d 100%)',
    },
  ),
  new ContactItem(faGithub, 'GitHub', 'https://github.com/wyxather/', {
    background: 'rgb(32,32,32)',
  }),
];

function Contact({ style, href, children }) {
  return (
    <motion.a
      className='m-4 flex h-20 w-48 cursor-pointer items-center justify-evenly rounded-xl shadow-md'
      style={style}
      href={href}
      target='_blank'
      rel='noreferrer'
      initial={{
        scale: 0,
        opacity: 0,
      }}
      whileHover={{
        scale: 1.1,
      }}
      variants={{
        whileInView: {
          scale: 1,
          opacity: 1,
        },
      }}
    >
      {children}
    </motion.a>
  );
}

export function PageContact() {
  return (
    <motion.div
      className='m-8 flex min-w-80 flex-wrap justify-center rounded-xl bg-base-200 p-3 shadow-md'
      whileInView='whileInView'
      viewport={{
        once: false,
      }}
      variants={{
        whileInView: {
          transition: {
            staggerChildren: 0.3,
          },
        },
      }}
    >
      {ContactItems.map((contactItem) => (
        <Contact
          key={contactItem.name}
          style={contactItem.style}
          href={contactItem.link}
        >
          <FontAwesomeIcon icon={contactItem.icon} className='text-5xl' />
          <div className='font-bold'>{contactItem.name}</div>
        </Contact>
      ))}
    </motion.div>
  );
}
