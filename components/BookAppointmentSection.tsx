import BookAppointmentForm from "./ui/BookAppointmentForm";

const BookAppointmentSection = () => {
  return (
    <section className="w-full bg-[#FAFAFA] lg:py-20 py-10 px-6 lg:px-[60px] relative">
        <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative z-10">
          {/* Left: Heading, subheading, image */}
          <div className="flex flex-col gap-4 justify-start">
            <h2 className="text-5xl font-bold text-black leading-tight mb-2">Your Health Matters — Book an Appointment Today</h2>
            <p className="text-lg text-gray-700 mb-4">
              Secure hospital-level urgent care in minutes. Complete the form and our board-certified team will confirm your same-day or walk-in guaranteed appointment at the location closest to you. Expect STAT imaging reads within 3 hours and same-day scan results, plus transparent pricing and most insurance accepted.
            </p>
            <div className="w-full rounded-2xl overflow-hidden mt-4">
              <img src="/form.jpg" alt="Doctors talking" className="w-full  object-cover rounded-2xl" />
            </div>
          </div>
          {/* Right: Form */}
          <div className="flex justify-center items-start w-full h-full">
            <BookAppointmentForm />
          </div>
        </div>
      </section>    
  )
};

export default BookAppointmentSection;