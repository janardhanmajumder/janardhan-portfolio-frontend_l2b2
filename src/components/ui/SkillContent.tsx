"use client";
import { TSkill } from '@/types/skills.type';
import { motion } from 'framer-motion';

const SkillContent = ({ skills }: { skills: TSkill[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      {skills.map((skill, index) => (
        <div key={skill._id || index} className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="font-semibold text-white tracking-wide font-heading">{skill.title}</span>
            <span className="font-mono text-violet-400 font-semibold">{skill.level}%</span>
          </div>
          <div className="h-2 w-full bg-zinc-800/80 rounded-full overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.05 }}
              className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-400 rounded-full shadow-[0_0_8px_rgba(139,92,246,0.3)]"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillContent;