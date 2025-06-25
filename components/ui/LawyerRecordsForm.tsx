'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function LawyerRecordsForm() {
    const [form, setForm] = useState({
        lawFirm: '',
        email: '',
        phone: '',
        patientName: '',
        dob: '',
        dos: '',
        records: '',
        confirm: false,
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        // Simple validation
        if (!form.lawFirm || !form.email || !form.phone || !form.patientName || !form.dob || !form.dos || !form.records || !form.confirm) {
            setError('Please fill all fields and confirm authorization.');
            return;
        }
        setError('');
        setSubmitted(true);
        // Here you would handle the actual submission (API call, etc)
    }

    return (
        <section className="w-full bg-[#FAFAFA] py-20 px-4 lg:px-[60px] relative">
        <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-stretch relative z-10">
            {/* Left: Heading, subheading, image */}
            <div className="flex flex-col gap-4 justify-start">
                <h2 className="text-5xl font-bold text-black leading-tight mb-2">For Attorneys and Legal Representatives</h2>
                <p className="text-lg text-gray-700 mb-4">
                Please complete the form below to request medical records on behalf of your client. All submissions are processed securely and in accordance with HIPAA guidelines. Ensure all required fields are filled out accurately, and upload the necessary authorization or subpoena for timely processing.
                </p>
                <div className="w-full rounded-2xl overflow-hidden h-full border mt-4 relative">
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