'use client';

import { useEffect, useState } from 'react';
import { projectsApi } from '@/lib/api';
import { FiPlus, FiTrash2, FiExternalLink, FiFolder, FiX, FiLoader } from 'react-icons/fi';
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-brand">Projects Module</h1>
          <p className="mt-1 text-sm text-owngray">Manage your portfolio project showcases.</p>
        </div>
        <button
          onClick={() => setOpenAddModal(true)}
          className="flex items-center gap-2 rounded-xl bg-[#e65f2b] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#e65f2b]/20 hover:bg-[#d44d1a] transition-all hover:scale-102"
        >
          <FiPlus className="h-4 w-4" />
          Add Project
        </button>
      </div>

      {loading ? (
        <div className="flex h-60 items-center justify-center text-owngray">
          <FiLoader className="h-8 w-8 animate-spin text-[#e65f2b]" />
        </div>
      ) : projects.length === 0 ? (
        <div className="flex h-60 flex-col items-center justify-center rounded-2xl border border-dashed border-cborder bg-white/50 p-8 text-center text-owngray">
          <FiFolder className="h-10 w-10 text-[#e65f2b]/60 mb-3" />
          <h3 className="text-base font-semibold text-brand">No projects found</h3>
          <p className="text-xs max-w-xs mt-1">Get started by creating a new project showcase.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((proj) => (
            <div
              key={proj._id}
              className="flex flex-col rounded-2xl border border-cborder/60 bg-white shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:border-[#e65f2b]/20"
            >
              {proj.images && proj.images[0] ? (
                <div className="h-48 w-full overflow-hidden bg-playground relative">
                  <img
                    src={proj.images[0]}
                    alt={proj.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <span className="absolute top-3 right-3 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                    {proj.projectType}
                  </span>
                </div>
              ) : (
                <div className="h-48 w-full bg-playground flex items-center justify-center text-owngray relative">
                  <FiFolder className="h-12 w-12 text-zinc-300" />
                  <span className="absolute top-3 right-3 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                    {proj.projectType}
                  </span>
                </div>
              )}

              <div className="flex-1 p-5 space-y-4">
                <div>
                  <h3 className="text-base font-bold text-brand line-clamp-1">{proj.title}</h3>
                  <p className="text-xs text-owngray mt-1.5 line-clamp-2">{proj.des}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {proj.technologies?.slice(0, 5).map((tech: string, i: number) => (
                    <span
                      key={i}
                      className="rounded-lg bg-playground px-2 py-1 text-[10px] font-medium text-brand border border-cborder/30"
                    >
                      {tech}
                    </span>
                  ))}
                  {proj.technologies?.length > 5 && (
                    <span className="rounded-lg bg-playground px-2 py-1 text-[10px] font-medium text-owngray border border-cborder/30">
                      +{proj.technologies.length - 5} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-cborder/40 pt-4 mt-auto">
                  <div className="flex items-center gap-3">
                    {proj.links?.frontendLive && (
                      <a
                        href={proj.links.frontendLive}
                        target="_blank"
                        rel="noreferrer"
                        className="text-owngray hover:text-[#e65f2b] transition-colors"
                        title="Live Site"
                      >
                        <FiExternalLink className="h-4.5 w-4.5" />
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(proj._id)}
                    className="flex items-center gap-1 text-red-500 hover:text-red-600 transition-colors p-1"
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

      {/* Modal / Drawer backdrop */}
      {openAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm transition-all duration-300">
          {/* Drawer container */}
          <div className="h-full w-full max-w-lg bg-white p-6 shadow-2xl flex flex-col overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between border-b border-cborder/50 pb-4 mb-6">
              <h2 className="text-lg font-bold text-brand">Add New Project</h2>
              <button
                onClick={() => setOpenAddModal(false)}
                className="rounded-lg p-1.5 text-owngray hover:bg-playground hover:text-brand transition-colors"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Portfolio Platform"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-cborder px-3.5 py-2 text-sm text-brand placeholder-zinc-400 outline-none focus:border-[#e65f2b] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand">Project Type</label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full rounded-xl border border-cborder px-3.5 py-2 text-sm text-brand outline-none focus:border-[#e65f2b] bg-white transition-colors"
                >
                  <option value="fullstack">Full-Stack</option>
                  <option value="frontend">Front-End</option>
                  <option value="backend">Back-End</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand">Overview Description</label>
                <textarea
                  required
                  placeholder="Brief description of your project..."
                  value={des}
                  onChange={(e) => setDes(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-cborder px-3.5 py-2 text-sm text-brand placeholder-zinc-400 outline-none focus:border-[#e65f2b] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand">
                  Key Accomplishments (One per line)
                </label>
                <textarea
                  placeholder="Designed fast components&#10;Integrated server APIs..."
                  value={bulletsText}
                  onChange={(e) => setBulletsText(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-cborder px-3.5 py-2 text-sm text-brand placeholder-zinc-400 outline-none focus:border-[#e65f2b] font-mono text-xs transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand">
                  Image URLs (One URL per line)
                </label>
                <textarea
                  placeholder="https://image1.jpg&#10;https://image2.jpg"
                  value={imagesText}
                  onChange={(e) => setImagesText(e.target.value)}
                  rows={2}
                  className="w-full rounded-xl border border-cborder px-3.5 py-2 text-sm text-brand placeholder-zinc-400 outline-none focus:border-[#e65f2b] font-mono text-xs transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand">
                  Technologies Used (Comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="Next.js, Express, TailwindCSS"
                  value={techText}
                  onChange={(e) => setTechText(e.target.value)}
                  className="w-full rounded-xl border border-cborder px-3.5 py-2 text-sm text-brand placeholder-zinc-400 outline-none focus:border-[#e65f2b] transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-cborder/40 pt-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-brand">Live Application URL</label>
                  <input
                    type="url"
                    placeholder="https://app.live"
                    value={frontendLive}
                    onChange={(e) => setFrontendLive(e.target.value)}
                    className="w-full rounded-xl border border-cborder px-3 py-1.5 text-xs text-brand placeholder-zinc-400 outline-none focus:border-[#e65f2b] transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-brand">GitHub Repository URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/code"
                    value={frontCode}
                    onChange={(e) => setFrontCode(e.target.value)}
                    className="w-full rounded-xl border border-cborder px-3 py-1.5 text-xs text-brand placeholder-zinc-400 outline-none focus:border-[#e65f2b] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-brand">Backend Live URL</label>
                  <input
                    type="url"
                    placeholder="https://api.live"
                    value={backendLive}
                    onChange={(e) => setBackendLive(e.target.value)}
                    className="w-full rounded-xl border border-cborder px-3 py-1.5 text-xs text-brand placeholder-zinc-400 outline-none focus:border-[#e65f2b] transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-brand">Backend Repo URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/api"
                    value={backendCode}
                    onChange={(e) => setBackendCode(e.target.value)}
                    className="w-full rounded-xl border border-cborder px-3 py-1.5 text-xs text-brand placeholder-zinc-400 outline-none focus:border-[#e65f2b] transition-colors"
                  />
                </div>
              </div>

              <div className="flex gap-4 border-t border-cborder/50 pt-4 mt-6">
                <button
                  type="button"
                  onClick={() => setOpenAddModal(false)}
                  className="flex-1 rounded-xl border border-cborder py-2.5 text-xs font-bold text-brand hover:bg-playground transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 rounded-xl bg-[#e65f2b] py-2.5 text-xs font-bold text-white shadow-lg shadow-[#e65f2b]/15 hover:bg-[#d44d1a] disabled:bg-zinc-300 transition-all flex items-center justify-center gap-1.5"
                >
                  {submitting && <FiLoader className="h-3.5 w-3.5 animate-spin" />}
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
