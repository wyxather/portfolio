import { motion } from 'framer-motion';

class SkillItem {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}

const LanguagesItems = [
  new SkillItem('C', 65),
  new SkillItem('C++', 70),
  new SkillItem('C#', 40),
  new SkillItem('HLSL', 25),
  new SkillItem('HTML', 60),
  new SkillItem('CSS', 60),
  new SkillItem('JAVASCRIPT', 45),
  new SkillItem('PYTHON', 55),
  new SkillItem('RUST', 50),
];

const ToolsItems = [
  new SkillItem('VISUAL STUDIO 2022', 70),
  new SkillItem('VISUAL STUDIO CODE', 60),
  new SkillItem('GIT', 40),
  new SkillItem('GITHUB DESKTOP', 50),
  new SkillItem('POSTMAN', 55),
  new SkillItem('FIDDLER CLASSIC', 50),
  new SkillItem('MONGODB', 55),
  new SkillItem('UNITY', 45),
  new SkillItem('UNREAL ENGINE 4', 10),
];

const FrameworksAndLibrariesItems = [
  new SkillItem('DIRECTX 9', 35),
  new SkillItem('DIRECTX 11', 40),
  new SkillItem('IMGUI', 60),
  new SkillItem('REACT JS', 30),
  new SkillItem('TAILWIND CSS', 50),
  new SkillItem('BOOTSTRAP', 35),
];

function Group({ title, children }) {
  return (
    <div className='m-8'>
      <div className='w-fit cursor-default rounded-t-3xl bg-base-200 p-6 font-bold shadow-md'>
        {title}
      </div>
      <motion.div
        className='flex min-w-80 flex-wrap rounded-b-xl rounded-r-xl bg-base-200 p-3 shadow-md'
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
        {children}
      </motion.div>
    </div>
  );
}

function Level({ value }) {
  return (
    <motion.div
      className='radial-progress absolute [--thickness:2px]'
      initial={{
        opacity: 0,
        '--value': 0,
        color: 'rgb(255,0,0)',
      }}
      variants={{
        whileInView: {
          opacity: 1,
          '--value': value,
          color:
            'rgb(' +
            (255 - 255 * (value / 100)) +
            ',' +
            255 * (value / 100) +
            ',' +
            0 +
            ')',
        },
      }}
      transition={{
        duration: 1,
      }}
    >
      {value}
    </motion.div>
  );
}

function Icon() {
  return <div className='w-20'></div>;
}

function Name({ value }) {
  return (
    <div className='cursor-default px-6 text-sm font-bold uppercase'>
      {value}
    </div>
  );
}

function Skill({ children }) {
  return (
    <motion.div
      className='m-4 flex h-20 w-64 items-center overflow-clip rounded-full bg-base-300 shadow-md transition-colors duration-500 hover:bg-base-100'
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
    </motion.div>
  );
}

export function PageSkills() {
  return (
    <>
      <Group title='Languages'>
        {LanguagesItems.map((languagesItem) => (
          <Skill key={languagesItem.name}>
            <Level value={languagesItem.value} />
            <Icon />
            <Name value={languagesItem.name} />
          </Skill>
        ))}
      </Group>
      <Group title='Tools'>
        {ToolsItems.map((toolsItem) => (
          <Skill key={toolsItem.name}>
            <Level value={toolsItem.value} />
            <Icon />
            <Name value={toolsItem.name} />
          </Skill>
        ))}
      </Group>
      <Group title='Frameworks & Libraries'>
        {FrameworksAndLibrariesItems.map((frameworksAndLibrariesItem) => (
          <Skill key={frameworksAndLibrariesItem.name}>
            <Level value={frameworksAndLibrariesItem.value} />
            <Icon />
            <Name value={frameworksAndLibrariesItem.name} />
          </Skill>
        ))}
      </Group>
    </>
  );
}
