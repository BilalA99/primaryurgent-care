'use client';
import { useState } from 'react';
import Image from 'next/image';
import { trackEvent } from '../../lib/gtag';

interface FormData {
    lawFirm: string;
    email: string;
    phone: string;
    patientName: string;
    dob: string;
    dos: string;
    records: string;
    confirm: boolean;
    files: File[];
}

export default function LawyerRecordsForm() {
    const [form, setForm] = useState<FormData>({
        lawFirm: '',
        email: '',
        phone: '',
        patientName: '',
        dob: '',
        dos: '',
        records: '',
        confirm: false,
        files: [],
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = Array.from(e.target.files || []);
        setForm(f => ({ ...f, files }));
    }

    function removeFile(index: number) {
        setForm(f => ({ ...f, files: f.files.filter((_, i) => i !== index) }));
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // Simple validation
        if (!form.lawFirm || !form.email || !form.phone || !form.patientName || !form.dob || !form.dos || !form.records || !form.confirm) {
            setError('Please fill all fields and confirm authorization.');
            return;
        }
        if (form.files.length === 0) {
            setError('Please upload at least one authorization document.');
            return;
        }
        setError('');
        setSubmitted(true);
        // Google Analytics event
        trackEvent({ action: 'form_submit', category: 'engagement', label: 'LawyerRecordsForm' });
        // Here you would handle the actual submission (API call, etc)
    }

    return (
        <section className="w-full bg-[#FAFAFA] lg:py-20 py-10 px-4 lg:px-[60px] relative">
            <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-16 gap-10 items-stretch relative z-10">
                {/* Left: Heading, subheading, image */}
                <div className="flex flex-col gap-4 justify-start">
                    <h2 className="text-5xl font-bold text-black leading-tight mb-2">For Attorneys and Legal Representatives</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Please complete the form below to request medical records on behalf of your client. All submissions are processed securely and in accordance with HIPAA guidelines. Ensure all required fields are filled out accurately, and upload the necessary authorization or subpoena for timely processing.
                    </p>
                    <div className="w-full rounded-2xl overflow-hidden lg:h-full h-100 border mt-4 relative">
                        <Image src="/lawyerform.jpg" alt="Doctors talking" fill className="w-full  object-cover rounded-2xl" />
                    </div>
                </div>
                {/* Right: Form */}
                <div className="flex-1 flex justify-center items-start">
                    <form onSubmit={handleSubmit} className="w-full  bg-[#F7FAFC] rounded-2xl shadow p-8 flex flex-col gap-5">
                        <h2 className="text-2xl font-bold mb-2">Request Medical Records</h2>
                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-medium">Law Firm / Attorney Name</label>
                            <input name="lawFirm" value={form.lawFirm} onChange={handleChange} className="rounded-lg border border-gray-200 px-4 py-2 bg-white" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-medium">Email</label>
                            <input name="email" type="email" value={form.email} onChange={handleChange} className="rounded-lg border border-gray-200 px-4 py-2 bg-white" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-medium">Phone Number</label>
                            <input name="phone" type="tel" value={form.phone} onChange={handleChange} className="rounded-lg border border-gray-200 px-4 py-2 bg-white" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-medium">Patient Name</label>
                            <input name="patientName" value={form.patientName} onChange={handleChange} className="rounded-lg border border-gray-200 px-4 py-2 bg-white" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-medium">Patient Date of Birth</label>
                            <input name="dob" type="date" value={form.dob} onChange={handleChange} className="rounded-lg border border-gray-200 px-4 py-2 bg-white" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-medium">Approximate Date of Service</label>
                            <input name="dos" type="date" value={form.dos} onChange={handleChange} className="rounded-lg border border-gray-200 px-4 py-2 bg-white" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-medium">Records</label>
                            <select name="records" value={form.records} onChange={handleChange} className="rounded-lg border border-gray-200 px-4 py-2 bg-white">
                                <option value="">Select</option>
                                <option value="all">All Records</option>
                                <option value="visit">Visit Summary</option>
                                <option value="labs">Lab Results</option>
                                <option value="imaging">Imaging Reports</option>
                                <option value="billing">Billing Records</option>
                            </select>
                        </div>

                        {/* File Upload Section */}
                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-medium">Upload Authorization Documents *</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                                <input
                                    type="file"
                                    multiple
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="file-upload"
                                />
                                <label htmlFor="file-upload" className="cursor-pointer">
                                    <div className="flex flex-col items-center gap-2">
                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <span className="text-sm text-gray-600">
                                            <span className="font-medium text-blue-600 hover:text-blue-500">Click to upload</span> or drag and drop
                                        </span>
                                        <span className="text-xs text-gray-500">PDF, DOC, DOCX, JPG, PNG (Max 10MB each)</span>
                                    </div>
                                </label>
                            </div>

                            {/* File List */}
                            {form.files.length > 0 && (
                                <div className="mt-3">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</h4>
                                    <div className="space-y-2">
                                        {form.files.map((file, index) => (
                                            <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg border">
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span className="text-sm text-gray-700">{file.name}</span>
                                                    <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFile(index)}
                                                    className="text-red-500 hover:text-red-700 text-sm"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex items-start gap-2">
                            <input name="confirm" type="checkbox" checked={form.confirm} onChange={handleChange} className="mt-1" />
                            <label className="text-xs text-gray-700">I confirm I am legally authorized to request these records and understand no PHI will be emailed unsecured</label>
                        </div>
                        {error && <div className="text-red-600 text-sm">{error}</div>}
                        {submitted && <div className="text-green-600 text-sm">Request submitted!</div>}
                        <button type="submit" className="w-full bg-[#D52128] text-white font-semibold py-3 rounded-lg text-lg mt-2 hover:bg-[#b81b22] transition">Submit</button>
                    </form>
                </div>
            </div>
        </section>
    );
} 