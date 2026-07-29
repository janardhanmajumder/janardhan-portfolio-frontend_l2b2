'use client';

import { useEffect, useState } from 'react';
import { experiencesApi } from '@/lib/api';
import { cn } from '@/lib/utils';
import AdminFormDrawer, {
  AdminFormField,
  AdminFormGrid,
  adminFormFieldClass,
} from '@/components/admin/AdminFormDrawer';
import { FiPlus, FiBriefcase, FiLoader, FiCalendar, FiMapPin, FiAward, FiExternalLink } from 'react-icons/fi';
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Experience History</h1>
          <p className="mt-1 text-sm text-zinc-400">Manage your professional career timeline.</p>
        </div>
        <button
          onClick={() => setOpenAddModal(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:scale-102 hover:bg-violet-500 sm:w-auto"
        >
          <FiPlus className="h-4 w-4" />
          Add Experience
        </button>
      </div>

      {loading ? (
        <div className="flex h-60 items-center justify-center text-zinc-400">
          <FiLoader className="h-8 w-8 animate-spin text-violet-400" />
        </div>
      ) : experiences.length === 0 ? (
        <div className="flex h-60 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 p-8 text-center text-zinc-400">
          <FiBriefcase className="h-10 w-10 text-violet-400/60 mb-3" />
          <h3 className="text-base font-semibold text-white">No work history found</h3>
          <p className="text-xs max-w-xs mt-1 text-zinc-400">Populate your history timeline by adding professional roles.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp._id}
              className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300 hover:shadow-md hover:border-violet-500/30"
            >
              <div className="flex items-start gap-4">
                {exp.logo ? (
                  <img
                    src={exp.logo}
                    alt={exp.companyName}
                    className="h-12 w-12 object-contain rounded-xl bg-zinc-950 p-2 border border-zinc-800 shrink-0"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-violet-400 shrink-0">
                    <FiBriefcase className="h-6 w-6" />
                  </div>
                )}
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-white">{exp.designation}</h3>
                    <span className="rounded-full bg-violet-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-violet-400 uppercase tracking-wider border border-violet-500/20">
                      {exp.jobType}
                    </span>
                    <span className="rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-cyan-400 uppercase tracking-wider border border-cyan-500/20">
                      {exp.office}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-zinc-300">{exp.companyName}</h4>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-zinc-400 pt-1">
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

              <div className="flex items-center gap-3 border-t border-zinc-800/80 pt-4 md:border-t-0 md:pt-0 shrink-0">
                {exp.certificate && (
                  <a
                    href={exp.certificate}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-xs font-bold text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                  >
                    <FiAward className="h-4 w-4 text-violet-400" />
                    Certificate
                  </a>
                )}
                {exp.link && (
                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-xl bg-zinc-950 border border-zinc-800 px-3.5 py-2 text-xs font-bold text-zinc-300 hover:bg-zinc-800 hover:text-violet-400 transition-colors"
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

      <AdminFormDrawer
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        title="Add New Experience"
        onSubmit={handleSubmit}
        submitLabel="Add Record"
        submitting={submitting}
      >
        <AdminFormField label="Designation / Role">
          <input
            type="text"
            required
            placeholder="e.g. Senior Frontend Engineer"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className={adminFormFieldClass}
          />
        </AdminFormField>

        <AdminFormField label="Company Name">
          <input
            type="text"
            required
            placeholder="e.g. TechCorp Solutions"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className={adminFormFieldClass}
          />
        </AdminFormField>

        <AdminFormField label="Location">
          <input
            type="text"
            required
            placeholder="e.g. Dhaka, Bangladesh"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={adminFormFieldClass}
          />
        </AdminFormField>

        <AdminFormGrid>
          <AdminFormField label="Date of Entry">
            <input
              type="date"
              required
              value={dateOfEntry}
              onChange={(e) => setDateOfEntry(e.target.value)}
              className={cn(adminFormFieldClass, '[color-scheme:dark]')}
            />
          </AdminFormField>
          <AdminFormField label="Date of Departure">
            <input
              type="date"
              required
              value={dateOfDeparture}
              onChange={(e) => setDateOfDeparture(e.target.value)}
              className={cn(adminFormFieldClass, '[color-scheme:dark]')}
            />
          </AdminFormField>
        </AdminFormGrid>

        <AdminFormGrid>
          <AdminFormField label="Office Type">
            <select
              value={office}
              onChange={(e) => setOffice(e.target.value)}
              className={cn(adminFormFieldClass, 'cursor-pointer')}
            >
              <option value="onsite">On-Site</option>
              <option value="remote">Remote</option>
            </select>
          </AdminFormField>
          <AdminFormField label="Job Type">
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className={cn(adminFormFieldClass, 'cursor-pointer')}
            >
              <option value="fulltime">Full-Time</option>
              <option value="internship">Internship</option>
            </select>
          </AdminFormField>
        </AdminFormGrid>

        <AdminFormField label="Logo Image URL">
          <input
            type="url"
            placeholder="https://company-logo.png"
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            className={adminFormFieldClass}
          />
        </AdminFormField>

        <AdminFormField label="Certificate Link / PDF">
          <input
            type="url"
            placeholder="https://company.com/certificate.pdf"
            value={certificate}
            onChange={(e) => setCertificate(e.target.value)}
            className={adminFormFieldClass}
          />
        </AdminFormField>

        <AdminFormField label="Company Website URL">
          <input
            type="url"
            placeholder="https://company.com"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className={adminFormFieldClass}
          />
        </AdminFormField>
      </AdminFormDrawer>
    </div>
  );
}
