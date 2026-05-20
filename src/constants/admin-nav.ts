import { FiActivity, FiFolder, FiBookOpen, FiCpu, FiBriefcase } from 'react-icons/fi';
import { IconType } from 'react-icons';

export interface TAdminNavItem {
  name: string;
  icon: IconType;
  path?: string;
  children?: {
    name: string;
    icon: IconType;
    path: string;
  }[];
}

export const adminNavItems: TAdminNavItem[] = [
  {
    name: 'Dashboard',
    icon: FiActivity,
    path: '/admin',
  },
  {
    name: 'Projects',
    icon: FiFolder,
    path: '/admin/projects',
  },
  {
    name: 'Blogs',
    icon: FiBookOpen,
    path: '/admin/blogs',
  },
  {
    name: 'Skills',
    icon: FiCpu,
    path: '/admin/skills',
  },
  {
    name: 'Experiences',
    icon: FiBriefcase,
    path: '/admin/experiences',
  },
];
