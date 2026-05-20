'use client';

import { useEffect, useState } from 'react';
import { blogsApi } from '@/lib/api';
import { FiPlus, FiTrash2, FiBookOpen, FiX, FiLoader } from 'react-icons/fi';
import { toast } from 'sonner';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [imagesText, setImagesText] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [des, setDes] = useState('');
  const [bulletsText, setBulletsText] = useState('');

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await blogsApi.getAll();
      if (res && res.data) {
        setBlogs(res.data);
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      await blogsApi.delete(id);
      toast.success('Blog deleted successfully');
      fetchBlogs();
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete blog');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imagesText) {
      toast.error('Title and Cover Image URL are required');
      return;
    }

    try {
      setSubmitting(true);
      const images = imagesText
        .split('\n')
        .map((i) => i.trim())
        .filter((i) => i.length > 0);
      const desBullet = bulletsText
        .split('\n')
        .map((b) => b.trim())
        .filter((b) => b.length > 0);

      const payload = {
        title,
        images,
        subTitle: subTitle || undefined,
        des: des || undefined,
        desBullet: desBullet.length > 0 ? desBullet : undefined,
      };

      await blogsApi.create(payload);
      toast.success('Blog created successfully');
      setOpenAddModal(false);
      
      // Reset form
      setTitle('');
      setImagesText('');
      setSubTitle('');
      setDes('');
      setBulletsText('');
      
      fetchBlogs();
    } catch (err: any) {
      toast.error(err.message || 'Failed to create blog');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-brand">Blogs Module</h1>
          <p className="mt-1 text-sm text-owngray">Manage your portfolio articles and tutorials.</p>
        </div>
        <button
          onClick={() => setOpenAddModal(true)}
          className="flex items-center gap-2 rounded-xl bg-[#e65f2b] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#e65f2b]/20 hover:bg-[#d44d1a] transition-all hover:scale-102"
        >
          <FiPlus className="h-4 w-4" />
          Add Blog
        </button>
      </div>

      {loading ? (
        <div className="flex h-60 items-center justify-center text-owngray">
          <FiLoader className="h-8 w-8 animate-spin text-[#e65f2b]" />
        </div>
      ) : blogs.length === 0 ? (
        <div className="flex h-60 flex-col items-center justify-center rounded-2xl border border-dashed border-cborder bg-white/50 p-8 text-center text-owngray">
          <FiBookOpen className="h-10 w-10 text-[#e65f2b]/60 mb-3" />
          <h3 className="text-base font-semibold text-brand">No blogs found</h3>
          <p className="text-xs max-w-xs mt-1">Share your knowledge by creating a new blog post.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="flex flex-col rounded-2xl border border-cborder/60 bg-white shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:border-[#e65f2b]/20"
            >
              {blog.images && blog.images[0] ? (
                <div className="h-48 w-full overflow-hidden bg-playground relative">
                  <img
                    src={blog.images[0]}
                    alt={blog.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ) : (
                <div className="h-48 w-full bg-playground flex items-center justify-center text-owngray">
                  <FiBookOpen className="h-12 w-12 text-zinc-300" />
                </div>
              )}

              <div className="flex-1 p-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-brand line-clamp-1">{blog.title}</h3>
                  <p className="text-xs font-semibold text-[#e65f2b] line-clamp-1">{blog.subTitle}</p>
                  <p className="text-xs text-owngray line-clamp-3">{blog.des}</p>
                </div>

                <div className="flex items-center justify-between border-t border-cborder/40 pt-4 mt-4">
                  <span className="text-[10px] font-mono text-zinc-400">
                    {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ''}
                  </span>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="flex items-center gap-1 text-red-500 hover:text-red-600 transition-colors p-1"
                    title="Delete Blog"
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
          <div className="h-full w-full max-w-lg bg-white p-6 shadow-2xl flex flex-col overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between border-b border-cborder/50 pb-4 mb-6">
              <h2 className="text-lg font-bold text-brand">Add New Blog Post</h2>
              <button
                onClick={() => setOpenAddModal(false)}
                className="rounded-lg p-1.5 text-owngray hover:bg-playground hover:text-brand transition-colors"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand">Blog Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Advanced State Management"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-cborder px-3.5 py-2 text-sm text-brand placeholder-zinc-400 outline-none focus:border-[#e65f2b] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand">Subtitle / Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. A comprehensive guide into modern React architecture..."
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                  className="w-full rounded-xl border border-cborder px-3.5 py-2 text-sm text-brand placeholder-zinc-400 outline-none focus:border-[#e65f2b] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand">
                  Cover Image URLs (One URL per line, at least one required)
                </label>
                <textarea
                  required
                  placeholder="https://image1.jpg"
                  value={imagesText}
                  onChange={(e) => setImagesText(e.target.value)}
                  rows={2}
                  className="w-full rounded-xl border border-cborder px-3.5 py-2 text-sm text-brand placeholder-zinc-400 outline-none focus:border-[#e65f2b] font-mono text-xs transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand">Article Body Text</label>
                <textarea
                  placeholder="Share the full blog content here..."
                  value={des}
                  onChange={(e) => setDes(e.target.value)}
                  rows={6}
                  className="w-full rounded-xl border border-cborder px-3.5 py-2 text-sm text-brand placeholder-zinc-400 outline-none focus:border-[#e65f2b] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand">
                  Bullet Point Highlights (One per line)
                </label>
                <textarea
                  placeholder="Key takeaway 1&#10;Key takeaway 2..."
                  value={bulletsText}
                  onChange={(e) => setBulletsText(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-cborder px-3.5 py-2 text-sm text-brand placeholder-zinc-400 outline-none focus:border-[#e65f2b] font-mono text-xs transition-colors"
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
                  Create Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
