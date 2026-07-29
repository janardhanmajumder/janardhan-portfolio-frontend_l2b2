'use client';

import { useEffect, useState } from 'react';
import { blogsApi } from '@/lib/api';
import { cn } from '@/lib/utils';
import AdminFormDrawer, {
  AdminFormField,
  adminFormFieldClass,
} from '@/components/admin/AdminFormDrawer';
import { FiPlus, FiTrash2, FiBookOpen, FiLoader } from 'react-icons/fi';
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Blogs Module</h1>
          <p className="mt-1 text-sm text-zinc-400">Manage your portfolio articles and tutorials.</p>
        </div>
        <button
          onClick={() => setOpenAddModal(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:scale-102 hover:bg-violet-500 sm:w-auto"
        >
          <FiPlus className="h-4 w-4" />
          Add Blog
        </button>
      </div>

      {loading ? (
        <div className="flex h-60 items-center justify-center text-zinc-400">
          <FiLoader className="h-8 w-8 animate-spin text-violet-400" />
        </div>
      ) : blogs.length === 0 ? (
        <div className="flex h-60 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 p-8 text-center text-zinc-400">
          <FiBookOpen className="h-10 w-10 text-violet-400/60 mb-3" />
          <h3 className="text-base font-semibold text-white">No blogs found</h3>
          <p className="text-xs max-w-xs mt-1 text-zinc-400">Share your knowledge by creating a new blog post.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="flex flex-col rounded-2xl border border-zinc-800/80 bg-zinc-900/60 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:border-violet-500/30"
            >
              {blog.images && blog.images[0] ? (
                <div className="h-48 w-full overflow-hidden bg-zinc-950 relative">
                  <img
                    src={blog.images[0]}
                    alt={blog.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ) : (
                <div className="h-48 w-full bg-zinc-950 flex items-center justify-center text-zinc-400">
                  <FiBookOpen className="h-12 w-12 text-zinc-600" />
                </div>
              )}

              <div className="flex-1 p-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white line-clamp-1">{blog.title}</h3>
                  <p className="text-xs font-semibold text-violet-400 line-clamp-1">{blog.subTitle}</p>
                  <p className="text-xs text-zinc-400 line-clamp-3">{blog.des}</p>
                </div>

                <div className="flex items-center justify-between border-t border-zinc-800/80 pt-4 mt-4">
                  <span className="text-[10px] font-mono text-zinc-500">
                    {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ''}
                  </span>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors p-1"
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

      <AdminFormDrawer
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        title="Add New Blog Post"
        onSubmit={handleSubmit}
        submitLabel="Create Post"
        submitting={submitting}
      >
        <AdminFormField label="Blog Title">
          <input
            type="text"
            required
            placeholder="e.g. Advanced State Management"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={adminFormFieldClass}
          />
        </AdminFormField>

        <AdminFormField label="Subtitle / Tagline">
          <input
            type="text"
            placeholder="e.g. A comprehensive guide into modern React architecture..."
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            className={adminFormFieldClass}
          />
        </AdminFormField>

        <AdminFormField label="Cover Image URLs (One URL per line, at least one required)">
          <textarea
            required
            placeholder="https://image1.jpg"
            value={imagesText}
            onChange={(e) => setImagesText(e.target.value)}
            rows={2}
            className={cn(adminFormFieldClass, 'resize-none font-mono text-xs')}
          />
        </AdminFormField>

        <AdminFormField label="Article Body Text">
          <textarea
            placeholder="Share the full blog content here..."
            value={des}
            onChange={(e) => setDes(e.target.value)}
            rows={6}
            className={cn(adminFormFieldClass, 'resize-none')}
          />
        </AdminFormField>

        <AdminFormField label="Bullet Point Highlights (One per line)">
          <textarea
            placeholder="Key takeaway 1&#10;Key takeaway 2..."
            value={bulletsText}
            onChange={(e) => setBulletsText(e.target.value)}
            rows={3}
            className={cn(adminFormFieldClass, 'resize-none font-mono text-xs')}
          />
        </AdminFormField>
      </AdminFormDrawer>
    </div>
  );
}
