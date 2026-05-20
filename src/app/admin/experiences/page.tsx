'use client';

import { useEffect, useState } from 'react';
import { experiencesApi } from '@/lib/api';
import { FiPlus, FiBriefcase, FiX, FiLoader, FiCalendar, FiMapPin, FiAward, FiExternalLink } from 'react-icons/fi';
import { toast } from 'sonner';

export default function AdminExperiencesPage() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);

  // Form State
  const [designation, setDesignation] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [dateOfEntry, setDateOfEntry] = useState('');
  const [dateOfDeparture, setDateOfDeparture] = useState('');
  const [office, setOffice] = useState('onsite');
  const [jobType, setJobType] = useState('fulltime');
  const [logo, setLogo] = useState('');
  const [certificate, setCertificate] = useState('');
  const [link, setLink] = useState('');

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const res = await experiencesApi.getAll();
      if (res && res.data) {
        setExperiences(res.data);
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to fetch experience history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!designation || !companyName || !location || !dateOfEntry || !dateOfDeparture) {
      toast.error('All essential fields are required');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        designation,
        companyName,
        location,
        dateOfEntry: new Date(dateOfEntry).toISOString(),
        dateOfDeparture: new Date(dateOfDeparture).toISOString(),
        office,
        jobType,
        logo: logo || undefined,
        certificate: certificate || undefined,
        link: link || undefined,
      };

      await experiencesApi.create(payload);
      toast.success('Experience record added successfully');
      setOpenAddModal(false);
      
      // Reset form
      setDesignation('');
      setCompanyName('');
      setLocation('');
      setDateOfEntry('');
      setDateOfDeparture('');
      setOffice('onsite');
      setJobType('fulltime');
      setLogo('');
      setCertificate('');
      setLink('');
      
      fetchExperiences();
    } catch (err: any) {
      toast.error(err.message || 'Failed to record experience');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-brand">Experiences Module</h1>
          <p className="mt-1 text-sm text-owngray">Manage your employment and professional history timeline.</p>
        </div>
        <button
          onClick={() => setOpenAddModal(true)}
          className="flex items-center gap-2 rounded-xl bg-[#e65f2b] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#e65f2b]/20 hover:bg-[#d44d1a] transition-all hover:scale-102"
        >
          <FiPlus className="h-4 w-4" />
          Add Experience
        </button>
      </div>

      {loading ? (
        <div className="flex h-60 items-center justify-center text-owngray">
          <FiLoader className="h-8 w-8 animate-spin text-[#e65f2b]" />
        </div>
      ) : experiences.length === 0 ? (
        <div className="flex h-60 flex-col items-center justify-center rounded-2xl border border-dashed border-cborder bg-white/50 p-8 text-center text-owngray">
          <FiBriefcase className="h-10 w-10 text-[#e65f2b]/60 mb-3" />
          <h3 className="text-base font-semibold text-brand">No work history found</h3>
          <p className="text-xs max-w-xs mt-1">Populate your history timeline by adding professional roles.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp._id}
              className="rounded-2xl border border-cborder/60 bg-white p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300 hover:shadow-md hover:border-[#e65f2b]/20"
            >
              <div className="flex items-start gap-4">
                {exp.logo ? (
                  <img
                    src={exp.logo}
                    alt={exp.companyName}
                    className="h-12 w-12 object-contain rounded-xl bg-playground p-2 border border-cborder/30 shrink-0"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-xl bg-playground border border-cborder/30 flex items-center justify-center text-[#e65f2b]/80 shrink-0">
                    <FiBriefcase className="h-6 w-6" />
                  </div>
                )}
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-brand">{exp.designation}</h3>
                    <span className="rounded-full bg-playground px-2.5 py-0.5 text-[10px] font-semibold text-[#e65f2b] uppercase tracking-wider border border-[#e65f2b]/10">
                      {exp.jobType}
                    </span>
                    <span className="rounded-full bg-playground px-2.5 py-0.5 text-[10px] font-semibold text-cyan-600 uppercase tracking-wider border border-cyan-500/10">
                      {exp.office}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-brand/80">{exp.companyName}</h4>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-owngray pt-1">
                    <span className="flex items-center gap-1">
                      <FiCalendar className="h-3.5 w-3.5" />
                      {new Date(exp.dateOfEntry).toLocaleDateString()} – {new Date(exp.dateOfDeparture).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiMapPin className="h-3.5 w-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-cborder/30 pt-4 md:border-t-0 md:pt-0 shrink-0">
                {exp.certificate && (
                  <a
                    href={exp.certificate}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-xl border border-cborder px-3.5 py-2 text-xs font-bold text-brand hover:bg-playground transition-colors"
                  >
                    <FiAward className="h-4 w-4 text-[#e65f2b]" />
                    Certificate
                  </a>
                )}
                {exp.link && (
                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-xl bg-playground border border-cborder/50 px-3.5 py-2 text-xs font-bold text-brand hover:bg-white hover:border-[#e65f2b] transition-colors"
                  >
                    Website
                    <FiExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
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
              <h2 className="text-lg font-bold text-brand">Add New Experience</h2>
              <button
                onClick={() => setOpenAddModal(false)}
                className="rounded-lg p-1.5 text-owngray hover:bg-playground hover:text-brand transition-colors"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand">Designation / Role</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Frontend Engineer"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="w-full rounded-xl border border-cborder px-3.5 py-2 text-sm text-brand placeholder-zinc-400 outline-none focus:border-[#e65f2b] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand">Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TechCorp Solutions"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full rounded-xl border border-cborder px-3.5 py-2 text-sm text-brand placeholder-zinc-400 outline-none focus:border-[#e65f2b] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand">Location</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dhaka, Bangladesh"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-xl border border-cborder px-3.5 py-2 text-sm text-brand placeholder-zinc-400 outline-none focus:border-[#e65f2b] transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-brand">Date of Entry</label>
                  <input
                    type="date"
                    required
                    value={dateOfEntry}
                    onChange={(e) => setDateOfEntry(e.target.value)}
                    className="w-full rounded-xl border border-cborder px-3.5 py-2 text-sm text-brand outline-none focus:border-[#e65f2b] transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-brand">Date of Departure</label>
                  <input
                    type="date"
                    required
                    value={dateOfDeparture}
                    onChange={(e) => setDateOfDeparture(e.target.value)}
                    className="w-full rounded-xl border border-cborder px-3.5 py-2 text-sm text-brand outline-none focus:border-[#e65f2b] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-brand">Office Type</label>
                  <select
                    value={office}
                    onChange={(e) => setOffice(e.target.value)}
                    className="w-full rounded-xl border border-cborder px-3.5 py-2 text-sm text-brand outline-none focus:border-[#e65f2b] bg-white transition-colors"
                  >
                    <option value="onsite">On-Site</option>
                    <option value="remote">Remote</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-brand">Job Type</label>
                  <select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    className="w-full rounded-xl border border-cborder px-3.5 py-2 text-sm text-brand outline-none focus:border-[#e65f2b] bg-white transition-colors"
                  >
                    <option value="fulltime">Full-Time</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand">Logo Image URL</label>
                <input
                  type="url"
                  placeholder="https://company-logo.png"
                  value={logo}
                  onChange={(e) => setLogo(e.target.value)}
                  className="w-full rounded-xl border border-cborder px-3.5 py-2 text-sm text-brand placeholder-zinc-400 outline-none focus:border-[#e65f2b] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand">Certificate Link / PDF</label>
                <input
                  type="url"
                  placeholder="https://company.com/certificate.pdf"
                  value={certificate}
                  onChange={(e) => setCertificate(e.target.value)}
                  className="w-full rounded-xl border border-cborder px-3.5 py-2 text-sm text-brand placeholder-zinc-400 outline-none focus:border-[#e65f2b] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand">Company Website URL</label>
                <input
                  type="url"
                  placeholder="https://company.com"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full rounded-xl border border-cborder px-3.5 py-2 text-sm text-brand placeholder-zinc-400 outline-none focus:border-[#e65f2b] transition-colors"
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
                  Add Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
