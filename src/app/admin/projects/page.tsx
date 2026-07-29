'use client';

import { useEffect, useState } from 'react';
import { projectsApi } from '@/lib/api';
import { cn } from '@/lib/utils';
import AdminFormDrawer, {
  AdminFormField,
  AdminFormGrid,
  adminFormFieldClass,
} from '@/components/admin/AdminFormDrawer';
import { FiPlus, FiTrash2, FiExternalLink, FiFolder, FiLoader } from 'react-icons/fi';
import { toast } from 'sonner';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [projectType, setProjectType] = useState('fullstack');
  const [des, setDes] = useState('');
  const [bulletsText, setBulletsText] = useState('');
  const [imagesText, setImagesText] = useState('');
  const [techText, setTechText] = useState('');
  const [frontendLive, setFrontendLive] = useState('');
  const [frontCode, setFrontCode] = useState('');
  const [backendLive, setBackendLive] = useState('');
  const [backendCode, setBackendCode] = useState('');

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await projectsApi.getAll();
      if (res && res.data) {
        setProjects(res.data);
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await projectsApi.delete(id);
      toast.success('Project deleted successfully');
      fetchProjects();
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete project');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !des) {
      toast.error('Title and Description are required');
      return;
    }

    try {
      setSubmitting(true);
      const desBullet = bulletsText
        .split('\n')
        .map((b) => b.trim())
        .filter((b) => b.length > 0);
      const images = imagesText
        .split('\n')
        .map((i) => i.trim())
        .filter((i) => i.length > 0);
      const technologies = techText
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const payload = {
        title,
        projectType,
        des,
        desBullet,
        images,
        technologies,
        links: {
          frontendLive: frontendLive || undefined,
          frontCode: frontCode || undefined,
          backendLive: backendLive || undefined,
          backendCode: backendCode || undefined,
        },
      };

      await projectsApi.create(payload);
      toast.success('Project created successfully');
      setOpenAddModal(false);
      
      // Reset form
      setTitle('');
      setProjectType('fullstack');
      setDes('');
      setBulletsText('');
      setImagesText('');
      setTechText('');
      setFrontendLive('');
      setFrontCode('');
      setBackendLive('');
      setBackendCode('');
      
      fetchProjects();
    } catch (err: any) {
      toast.error(err.message || 'Failed to create project');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Projects Module</h1>
          <p className="mt-1 text-sm text-zinc-400">Manage your portfolio project showcases.</p>
        </div>
        <button
          onClick={() => setOpenAddModal(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:scale-102 hover:bg-violet-500 sm:w-auto"
        >
          <FiPlus className="h-4 w-4" />
          Add Project
        </button>
      </div>

      {loading ? (
        <div className="flex h-60 items-center justify-center text-zinc-400">
          <FiLoader className="h-8 w-8 animate-spin text-violet-400" />
        </div>
      ) : projects.length === 0 ? (
        <div className="flex h-60 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 p-8 text-center text-zinc-400">
          <FiFolder className="h-10 w-10 text-violet-400/60 mb-3" />
          <h3 className="text-base font-semibold text-white">No projects found</h3>
          <p className="text-xs max-w-xs mt-1 text-zinc-400">Get started by creating a new project showcase.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects?.map((proj) => (
            <div
              key={proj._id}
              className="flex flex-col rounded-2xl border border-zinc-800/80 bg-zinc-900/60 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:border-violet-500/30"
            >
              {proj.images && proj.images[0] ? (
                <div className="h-48 w-full overflow-hidden bg-zinc-950 relative">
                  <img
                    src={proj.images[0]}
                    alt={proj.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <span className="absolute top-3 right-3 rounded-full bg-black/70 backdrop-blur-md border border-zinc-800 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-violet-300">
                    {proj.projectType}
                  </span>
                </div>
              ) : (
                <div className="h-48 w-full bg-zinc-950 flex items-center justify-center text-zinc-400 relative">
                  <FiFolder className="h-12 w-12 text-zinc-600" />
                  <span className="absolute top-3 right-3 rounded-full bg-black/70 backdrop-blur-md border border-zinc-800 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-violet-300">
                    {proj.projectType}
                  </span>
                </div>
              )}

              <div className="flex-1 p-5 space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white line-clamp-1">{proj.title}</h3>
                  <p className="text-xs text-zinc-400 mt-1.5 line-clamp-2">{proj.des}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {proj.technologies?.slice(0, 5).map((tech: string, i: number) => (
                    <span
                      key={i}
                      className="rounded-lg bg-zinc-950 px-2 py-1 text-[10px] font-medium text-violet-300 border border-zinc-800"
                    >
                      {tech}
                    </span>
                  ))}
                  {proj.technologies?.length > 5 && (
                    <span className="rounded-lg bg-zinc-950 px-2 py-1 text-[10px] font-medium text-zinc-400 border border-zinc-800">
                      +{proj.technologies.length - 5} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-zinc-800/80 pt-4 mt-auto">
                  <div className="flex items-center gap-3">
                    {proj.links?.frontendLive && (
                      <a
                        href={proj.links.frontendLive}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-400 hover:text-violet-400 transition-colors"
                        title="Live Site"
                      >
                        <FiExternalLink className="h-4.5 w-4.5" />
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(proj._id)}
                    className="flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors p-1"
                    title="Delete Project"
                  >
                    <FiTrash2 className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AdminFormDrawer
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        title="Add New Project"
        onSubmit={handleSubmit}
        submitLabel="Create Project"
        submitting={submitting}
      >
        <AdminFormField label="Project Title">
          <input
            type="text"
            required
            placeholder="e.g. Portfolio Platform"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={adminFormFieldClass}
          />
        </AdminFormField>

        <AdminFormField label="Project Type">
          <select
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className={cn(adminFormFieldClass, 'cursor-pointer')}
          >
            <option value="fullstack">Full-Stack</option>
            <option value="frontend">Front-End</option>
            <option value="backend">Back-End</option>
          </select>
        </AdminFormField>

        <AdminFormField label="Overview Description">
          <textarea
            required
            placeholder="Brief description of your project..."
            value={des}
            onChange={(e) => setDes(e.target.value)}
            rows={3}
            className={cn(adminFormFieldClass, 'resize-none')}
          />
        </AdminFormField>

        <AdminFormField label="Key Accomplishments (One per line)">
          <textarea
            placeholder="Designed fast components&#10;Integrated server APIs..."
            value={bulletsText}
            onChange={(e) => setBulletsText(e.target.value)}
            rows={3}
            className={cn(adminFormFieldClass, 'resize-none font-mono text-xs')}
          />
        </AdminFormField>

        <AdminFormField label="Image URLs (One URL per line)">
          <textarea
            placeholder="https://image1.jpg&#10;https://image2.jpg"
            value={imagesText}
            onChange={(e) => setImagesText(e.target.value)}
            rows={2}
            className={cn(adminFormFieldClass, 'resize-none font-mono text-xs')}
          />
        </AdminFormField>

        <AdminFormField label="Technologies Used (Comma-separated)">
          <input
            type="text"
            placeholder="Next.js, Express, TailwindCSS"
            value={techText}
            onChange={(e) => setTechText(e.target.value)}
            className={adminFormFieldClass}
          />
        </AdminFormField>

        <AdminFormGrid className="border-t border-zinc-800 pt-4">
          <AdminFormField label="Live Application URL">
            <input
              type="url"
              placeholder="https://app.live"
              value={frontendLive}
              onChange={(e) => setFrontendLive(e.target.value)}
              className={adminFormFieldClass}
            />
          </AdminFormField>
          <AdminFormField label="GitHub Repository URL">
            <input
              type="url"
              placeholder="https://github.com/code"
              value={frontCode}
              onChange={(e) => setFrontCode(e.target.value)}
              className={adminFormFieldClass}
            />
          </AdminFormField>
        </AdminFormGrid>

        <AdminFormGrid>
          <AdminFormField label="Backend Live URL">
            <input
              type="url"
              placeholder="https://api.live"
              value={backendLive}
              onChange={(e) => setBackendLive(e.target.value)}
              className={adminFormFieldClass}
            />
          </AdminFormField>
          <AdminFormField label="Backend Repo URL">
            <input
              type="url"
              placeholder="https://github.com/api"
              value={backendCode}
              onChange={(e) => setBackendCode(e.target.value)}
              className={adminFormFieldClass}
            />
          </AdminFormField>
        </AdminFormGrid>
      </AdminFormDrawer>
    </div>
  );
}
