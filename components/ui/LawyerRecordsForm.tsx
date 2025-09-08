'use client';
import { useState } from 'react';
import Image from 'next/image';
import { trackEvent } from '../../lib/gtag';
import { sendLawyerRecordsEmail, sendLawyerRecordsThankYouEmail } from '../email/SendEmail';

interface FormData {
    lawFirm: string;
    email: string;
    phone: string;
    patientName: string;
    dob: string;
    dos: string;
    records: string[];
    confirm: boolean;
    files: {
        file: File,
        content: string
    }[];
}

export default function LawyerRecordsForm() {
    const [form, setForm] = useState<FormData>({
        lawFirm: '',
        email: '',
        phone: '',
        patientName: '',
        dob: '',
        dos: '',
        records: [],
        confirm: false,
        files: [],
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [fileError, setFileError] = useState('');

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setForm(f => ({ ...f, [name]: checked }));
        } else if (type === 'select-multiple') {
            const options = (e.target as HTMLSelectElement).options;
            const selected = Array.from(options).filter(o => o.selected).map(o => o.value);
            setForm(f => ({ ...f, [name]: selected }));
        } else {
            setForm(f => ({ ...f, [name]: value }));
        }
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = Array.from(e.target.files || []);
        // Calculate total size: existing + new
        const existingSize = form.files.reduce((sum, f) => sum + (f.file?.size || 0), 0);
        const newSize = files.reduce((sum, f) => sum + f.size, 0);
        const totalSize = existingSize + newSize;
        if (totalSize > 5 * 1024 * 1024) {
            setFileError('The total size of all uploaded files must be less than 5MB. Please remove some files and try again.');
            e.target.value = "";
            return;
        } else {
            setFileError('');
        }
        if (files) {
            Promise.all(
                files.map(async (file) => ({
                    filename: file.name,
                    content: Buffer.from(await file.arrayBuffer()).toString('base64'),
                }))
            ).then(files => {
                setForm(f => ({ ...f, files: [...f.files, ...files.map(file => ({ file: new File([file.content], file.filename), content: file.content }))] }));
            });
        }
    }

    function removeFile(index: number) {
        setForm(f => ({ ...f, files: f.files.filter((_, i) => i !== index) }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // Simple validation
        if (!form.lawFirm || !form.email || !form.phone || !form.patientName || !form.dob || !form.dos || form.records.length === 0 || !form.confirm) {
            setError('Please fill all fields and confirm authorization.');
            return;
        }
        if (form.files.length === 0) {
            setError('Please upload at least one authorization document.');
            return;
        }
        setSubmitting(true);
        const result = await sendLawyerRecordsEmail({
            lawFirm: form.lawFirm,
            email: form.email,
            phone: form.phone,
            patientName: form.patientName,
            dob: form.dob,
            dos: form.dos,
            records: form.records.join(', '),
            files: form.files
        });
        if (result.error) {
            setError(result.error.message);
            setSubmitting(false);
            return;
        }
        const thankYouResult = await sendLawyerRecordsThankYouEmail({
            lawFirm: form.lawFirm,
            email: form.email,
            patientName: form.patientName
        });
        if (thankYouResult.error) {
            setError(thankYouResult.error.message);
            setSubmitting(false);
            return;
        }
        setError('');
        setSubmitted(true);
        setSubmitting(false);
        setForm({
            lawFirm: '',
            email: '',
            phone: '',
            patientName: '',
            dob: '',
            dos: '',
            records: [],
            confirm: false,
            files: [],
        })
        // Google Analytics event
        trackEvent({ action: 'form_submit', category: 'engagement', label: 'LawyerRecordsForm' });
        // Here you would handle the actual submission (API call, etc)
    }

    return (
        <section className="w-full bg-[#FAFAFA] lg:py-20 py-10 px-4 lg:px-[60px] relative">
            {submitting && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl px-8 py-6 flex flex-col items-center gap-4 animate-fade-in">
                        <svg className="animate-spin h-8 w-8 text-[#D52128]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                        </svg>
                        <span className="text-lg font-semibold text-[#D52128]">Submitting your request...</span>
                    </div>
                </div>
            )}
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
                            <select
                                name="records"
                                value={form.records}
                                onChange={handleChange}
                                className="rounded-lg min-h-25 border border-gray-200 px-4 py-2 bg-white"
                                multiple
                                size={5}
                            >
                                <option value="all">All Records</option>
                                <option value="Visit Summary">Visit Summary</option>
                                <option value="Lab Results">Lab Results</option>
                                <option value="Imaging Reports">Imaging Reports</option>
                                <option value="Billing Records">Billing Records</option>
                            </select>
                            <span className="text-xs text-gray-500">Hold Ctrl (Windows) or Command (Mac) to select multiple options.</span>
                            {form.records.length > 0 && (
                                <div className="text-xs text-gray-600 mt-1">
                                    Selected: {form.records.includes('all') ? 'All Records' : form.records.map(r => {
                                        if (r === 'Visit Summary') return 'Visit Summary';
                                        if (r === 'Lab Results') return 'Lab Results';
                                        if (r === 'Imaging Reports') return 'Imaging Reports';
                                        if (r === 'Billing Records') return 'Billing Records';
                                        return r;
                                    }).join(', ')}
                                </div>
                            )}
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
                                // No need to disable input, just block in handler
                                />
                                <label htmlFor="file-upload" className="cursor-pointer">
                                    <div className="flex flex-col items-center gap-2">
                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <span className="text-sm text-gray-600">
                                            <span className="font-medium text-blue-600 hover:text-blue-500">Click to upload</span> or drag and drop
                                        </span>
                                        <span className="text-xs text-gray-500">PDF, DOC, DOCX, JPG, PNG</span>
                                        <span className="text-xs text-red-500 mt-1">The total size of all uploaded files must be less than 5MB.</span>
                                    </div>
                                </label>
                            </div>
                            {fileError && <div className="text-xs text-red-600 mt-2">{fileError}</div>}

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
                                                    <span className="text-sm text-gray-700">{file.file.name}</span>
                                                    <span className="text-xs text-gray-500">({(file.file.size / 1024 / 1024).toFixed(2)} MB)</span>
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