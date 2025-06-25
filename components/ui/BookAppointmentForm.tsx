'use client';
import { useState } from 'react';

const BookAppointmentForm = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        type: '',
        message: '',
    });

    return (
        <div className="bg-[#F2F6FC] rounded-2xl p-8 w-full h-full max-w-xl mx-auto flex flex-col gap-6 shadow-sm">
            <h2 className="text-3xl font-bold text-black ">Book An Appointment</h2>
            <form className="flex flex-col gap-5">
                <div>
                    <label htmlFor="name" className="block mb-2 font-semibold text-black text-base">Full Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full rounded-lg px-5 py-3 bg-white text-black text-base outline-none border-none"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2 font-semibold text-black text-base">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full rounded-lg px-5 py-3 bg-white text-black text-base outline-none border-none"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block mb-2 font-semibold text-black text-base">Phone Number</label>
                    <input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        className="w-full rounded-lg px-5 py-3 bg-white text-black text-base outline-none border-none"
                        value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    />
                </div>
                <div>
                    <label htmlFor="type" className="block mb-2 font-semibold text-black text-base">Type of Accident</label>
                    <select
                        id="type"
                        className="w-full rounded-lg px-5 py-3 bg-white text-black text-base outline-none border-none appearance-none"
                        value={form.type}
                        onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                    >
                        <option value="">Select</option>
                        <option value="Workplace Accident">Workplace Accident</option>
                        <option value="Car Accident">Car Accident</option>
                        <option value="Personal Injury">Personal Injury</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="message" className="block mb-2 font-semibold text-black text-base">Message</label>
                    <textarea
                        id="message"
                        placeholder="Write your message"
                        rows={4}
                        className="w-full rounded-lg px-5 py-3 bg-white text-black text-base outline-none border-none"
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#D52128] hover:bg-[#b81b22] text-white font-bold py-3 px-4 rounded-xl text-lg transition duration-300 mt-2"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default BookAppointmentForm; 