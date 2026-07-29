'use client';

import { useEffect, useState } from 'react';
import { skillsApi } from '@/lib/api';
import AdminFormDrawer, {
  AdminFormField,
  adminFormFieldClass,
} from '@/components/admin/AdminFormDrawer';
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Skills Module</h1>
          <p className="mt-1 text-sm text-zinc-400">Manage your technology stack proficiency levels.</p>
        </div>
        <button
          onClick={() => setOpenAddModal(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:scale-102 hover:bg-violet-500 sm:w-auto"
        >
          <FiPlus className="h-4 w-4" />
          Add Skill
        </button>
      </div>

      {loading ? (
        <div className="flex h-60 items-center justify-center text-zinc-400">
          <FiLoader className="h-8 w-8 animate-spin text-violet-400" />
        </div>
      ) : skills.length === 0 ? (
        <div className="flex h-60 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 p-8 text-center text-zinc-400">
          <FiCpu className="h-10 w-10 text-violet-400/60 mb-3" />
          <h3 className="text-base font-semibold text-white">No skills registered</h3>
          <p className="text-xs max-w-xs mt-1 text-zinc-400">Add technologies to display on your skills charts.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {skills.map((skill) => (
            <div
              key={skill._id}
              className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5 shadow-sm space-y-4 transition-all duration-300 hover:shadow-md hover:border-violet-500/30"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {skill.logo ? (
                    <img
                      src={skill.logo}
                      alt={skill.title}
                      className="h-9 w-9 object-contain rounded-lg bg-zinc-950 p-1.5 border border-zinc-800"
                    />
                  ) : (
                    <div className="h-9 w-9 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-violet-400">
                      <FiCpu className="h-5 w-5" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-bold text-white">{skill.title}</h3>
                    <span className="text-[10px] text-zinc-400 font-mono">
                      Level: <span className="font-semibold text-violet-400">{skill.level}%</span>
                    </span>
                  </div>
                </div>

                {editingId === skill._id ? (
                  <button
                    onClick={() => setEditingId(null)}
                    className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                  >
                    <FiX className="h-4.5 w-4.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(skill._id);
                      setEditLevel(skill.level);
                    }}
                    className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-violet-400 transition-colors"
                    title="Edit level"
                  >
                    <FiSliders className="h-4.5 w-4.5" />
                  </button>
                )}
              </div>

              {editingId === skill._id ? (
                <div className="space-y-3 bg-zinc-950/60 rounded-xl p-3.5 border border-zinc-800">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                      <span>Proficiency</span>
                      <span className="font-bold text-violet-400">{editLevel}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={editLevel}
                      onChange={(e) => setEditLevel(Number(e.target.value))}
                      className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
                    />
                  </div>
                  <div className="flex gap-2.5">
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex-1 rounded-lg border border-zinc-800 bg-zinc-900 py-1.5 text-[10px] font-bold text-zinc-300 hover:bg-zinc-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleUpdateLevel(skill._id)}
                      disabled={updating}
                      className="flex-1 rounded-lg bg-violet-600 py-1.5 text-[10px] font-bold text-white shadow-md shadow-violet-500/15 hover:bg-violet-500 disabled:bg-zinc-800 transition-all flex items-center justify-center gap-1"
                    >
                      {updating && <FiLoader className="h-3 w-3 animate-spin" />}
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full bg-zinc-800 rounded-full h-2">
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

      <AdminFormDrawer
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        title="Add New Skill"
        onSubmit={handleSubmit}
        submitLabel="Register Skill"
        submitting={submitting}
      >
        <AdminFormField label="Skill Name">
          <input
            type="text"
            required
            placeholder="e.g. TypeScript"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={adminFormFieldClass}
          />
        </AdminFormField>

        <AdminFormField label="Logo / Icon URL">
          <input
            type="url"
            placeholder="https://logo.png"
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            className={adminFormFieldClass}
          />
        </AdminFormField>

        <AdminFormField label="Proficiency Level">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-zinc-300">
              <span>Level</span>
              <span className="font-bold tabular-nums text-violet-400">{level}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={level}
              onChange={(e) => setLevel(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-800/80 accent-violet-500"
            />
          </div>
        </AdminFormField>
      </AdminFormDrawer>
    </div>
  );
}
