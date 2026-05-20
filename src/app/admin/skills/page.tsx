'use client';

import { useEffect, useState } from 'react';
import { skillsApi } from '@/lib/api';
import { FiPlus, FiCpu, FiX, FiLoader, FiSliders } from 'react-icons/fi';
import { toast } from 'sonner';

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [logo, setLogo] = useState('');
  const [level, setLevel] = useState(80);

  // Editing State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editLevel, setEditLevel] = useState(80);
  const [updating, setUpdating] = useState(false);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await skillsApi.getAll();
      if (res && res.data) {
        setSkills(res.data);
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to fetch skills');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleUpdateLevel = async (id: string) => {
    try {
      setUpdating(true);
      await skillsApi.update(id, { level: editLevel });
      toast.success('Skill proficiency updated successfully');
      setEditingId(null);
      fetchSkills();
    } catch (err: any) {
      toast.error(err.message || 'Failed to update skill proficiency');
    } finally {
      setUpdating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      toast.error('Skill title is required');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        title,
        logo: logo || undefined,
        level: Number(level),
      };

      await skillsApi.create(payload);
      toast.success('Skill registered successfully');
      setOpenAddModal(false);
      
      // Reset form
      setTitle('');
      setLogo('');
      setLevel(80);
      
      fetchSkills();
    } catch (err: any) {
      toast.error(err.message || 'Failed to register skill');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-brand">Skills Module</h1>
          <p className="mt-1 text-sm text-owngray">Manage your technology stack proficiency levels.</p>
        </div>
        <button
          onClick={() => setOpenAddModal(true)}
          className="flex items-center gap-2 rounded-xl bg-[#e65f2b] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#e65f2b]/20 hover:bg-[#d44d1a] transition-all hover:scale-102"
        >
          <FiPlus className="h-4 w-4" />
          Add Skill
        </button>
      </div>

      {loading ? (
        <div className="flex h-60 items-center justify-center text-owngray">
          <FiLoader className="h-8 w-8 animate-spin text-[#e65f2b]" />
        </div>
      ) : skills.length === 0 ? (
        <div className="flex h-60 flex-col items-center justify-center rounded-2xl border border-dashed border-cborder bg-white/50 p-8 text-center text-owngray">
          <FiCpu className="h-10 w-10 text-[#e65f2b]/60 mb-3" />
          <h3 className="text-base font-semibold text-brand">No skills registered</h3>
          <p className="text-xs max-w-xs mt-1">Add technologies to display on your skills charts.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {skills.map((skill) => (
            <div
              key={skill._id}
              className="rounded-2xl border border-cborder/60 bg-white p-5 shadow-sm space-y-4 transition-all duration-300 hover:shadow-md hover:border-[#e65f2b]/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {skill.logo ? (
                    <img
                      src={skill.logo}
                      alt={skill.title}
                      className="h-9 w-9 object-contain rounded-lg bg-playground p-1.5 border border-cborder/30"
                    />
                  ) : (
                    <div className="h-9 w-9 rounded-lg bg-playground border border-cborder/30 flex items-center justify-center text-[#e65f2b]/80">
                      <FiCpu className="h-5 w-5" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-bold text-brand">{skill.title}</h3>
                    <span className="text-[10px] text-zinc-400 font-mono">
                      Level: <span className="font-semibold text-brand">{skill.level}%</span>
                    </span>
                  </div>
                </div>

                {editingId === skill._id ? (
                  <button
                    onClick={() => setEditingId(null)}
                    className="rounded-lg p-1.5 text-owngray hover:bg-playground hover:text-brand transition-colors"
                  >
                    <FiX className="h-4.5 w-4.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(skill._id);
                      setEditLevel(skill.level);
                    }}
                    className="rounded-lg p-1.5 text-owngray hover:bg-playground hover:text-[#e65f2b] transition-colors"
                    title="Edit level"
                  >
                    <FiSliders className="h-4.5 w-4.5" />
                  </button>
                )}
              </div>

              {editingId === skill._id ? (
                <div className="space-y-3 bg-playground/50 rounded-xl p-3.5 border border-cborder/40">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-owngray">
                      <span>Proficiency</span>
                      <span className="font-bold text-[#e65f2b]">{editLevel}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={editLevel}
                      onChange={(e) => setEditLevel(Number(e.target.value))}
                      className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-[#e65f2b]"
                    />
                  </div>
                  <div className="flex gap-2.5">
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex-1 rounded-lg border border-cborder bg-white py-1.5 text-[10px] font-bold text-brand hover:bg-playground transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleUpdateLevel(skill._id)}
                      disabled={updating}
                      className="flex-1 rounded-lg bg-[#e65f2b] py-1.5 text-[10px] font-bold text-white shadow-md shadow-[#e65f2b]/15 hover:bg-[#d44d1a] disabled:bg-zinc-300 transition-all flex items-center justify-center gap-1"
                    >
                      {updating && <FiLoader className="h-3 w-3 animate-spin" />}
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full bg-zinc-100 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-violet-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal / Drawer backdrop */}
      {openAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-300">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-cborder/50 pb-4 mb-6">
              <h2 className="text-lg font-bold text-brand">Add New Skill</h2>
              <button
                onClick={() => setOpenAddModal(false)}
                className="rounded-lg p-1.5 text-owngray hover:bg-playground hover:text-brand transition-colors"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand">Skill Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TypeScript"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-cborder px-3.5 py-2 text-sm text-brand placeholder-zinc-400 outline-none focus:border-[#e65f2b] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand">Logo / Icon URL</label>
                <input
                  type="url"
                  placeholder="https://logo.png"
                  value={logo}
                  onChange={(e) => setLogo(e.target.value)}
                  className="w-full rounded-xl border border-cborder px-3.5 py-2 text-sm text-brand placeholder-zinc-400 outline-none focus:border-[#e65f2b] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-brand">
                  <label>Proficiency Level</label>
                  <span className="font-bold text-[#e65f2b]">{level}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={level}
                  onChange={(e) => setLevel(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-[#e65f2b]"
                />
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
                  Register Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
