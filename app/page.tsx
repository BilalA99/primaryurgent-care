import Image from "next/image";
import { ChevronDown } from "lucide-react";
import homeLanding from "@/public/homelanding.png";
import AppointmentCard from "@/components/ui/AppointmentCard";
import ServiceCard from "@/components/ui/ServiceCard";

const services = [
  {
    imageSrc: "/services/mri.png",
    title: "1.5T MRI",
    description: "High-resolution images for spine, brain & joint injuries—in and out in under 30 min.",
  },
  {
    imageSrc: "/services/ct-scan.png",
    title: "CT Scan",
    description: "Fast, low-dose scans for trauma, chest pain, or abdominal concerns—results same day.",
  },
  {
    imageSrc: "/services/x-ray.png",
    title: "Digital X-Ray",
    description: "Crisp images in seconds to diagnose fractures, pneumonia, and more—no ER visit required.",
  },
  {
    imageSrc: "/services/ultrasound.png",
    title: "Ultrasound",
    description: "Real-time imaging for soft-tissue, OB/GYN, and vascular evaluations—performed bedside.",
  },
  {
    imageSrc: "/services/nuclear-medicine.png",
    title: "Nuclear medicine",
    description: "Functional imaging to detect thyroid, bone, and cardiac issues—hospital-level tech without the hospital bill.",
  },
];

export default function Home() {
  return (
    <main className="h-full w-full flex flex-col text-white">

      <section className="flex items-center w-full h-full justify-center relative py-20">
        <Image
          src={homeLanding}
          alt="Hero background"
          priority
          className="-z-10 object-cover object-center@a w-full h-full absolute border-2 border-red-500"
        />
        <div className="absolute inset-0 bg-[#1B1819]/60 -z-10 border-red-500"></div>
        <div className="flex flex-col md:flex-row justify-between max-w-7xl w-full px-2">
          <div className="flex flex-col justify-center space-y-6">
            <div className="backdrop-blur-3xl bg-white/20 text-white text-sm px-4 py-2 rounded-full self-start">
              Call for any emergency: (561) 204-5111
            </div>
            <h1 className="text-6xl font-bold ">
              Immediate medical care when you need it most
            </h1>
            <p className="text-lg">
              Fast, reliable care. Our expert team is here to handle your urgent health needs, anytime.
            </p>
          </div>

          <div className="backdrop-blur-3xl p-8 rounded-2xl w-full md:w-[55%]">
            <h2 className="text-3xl font-bold mb-6">Request an appointment</h2>
            <form className="space-y-5">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-2">Full Name</label>
                <input type="text" id="fullName" placeholder="Enter your full name" className="w-full bg-white text-gray-800 px-4 py-3 rounded-lg border-none" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone Number</label>
                <input type="tel" id="phone" placeholder="Enter your phone number" className="w-full bg-white text-gray-800 px-4 py-3 rounded-lg border-none" />
              </div>
              <div>
                <label htmlFor="accidentType" className="block text-sm font-medium mb-2">Type of Accident</label>
                <div className="relative">
                  <select id="accidentType" className="w-full bg-white text-gray-800 px-4 py-3 rounded-lg appearance-none">
                    <option>Select</option>
                    <option>Workplace Accident</option>
                    <option>Car Accident</option>
                    <option>Personal Injury</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea id="message" placeholder="Write your message" rows={4} className="w-full bg-white text-gray-800 px-4 py-3 rounded-lg border-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
                Submit
              </button>
            </form>
          </div>

        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <h2 className="text-5xl font-bold text-black leading-tight">
              Hospital-Level Diagnostic & Imaging Services
            </h2>
            <p className="text-gray-600 text-xl px-5">
              Skip the crowded emergency room and get hospital-grade imaging right inside our urgent care center. With a 1.5 T MRI, multi-slice CT scanner, digital X-ray, ultrasound, and nuclear medicine suite all under one roof, we deliver STAT reads within 3 hours and same-day scan results for most studies. Walk in anytime or book a same-day appointment—our board-certified providers give you fast, accurate answers when minutes matter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10">
            {services.map((service,index) => (
              <ServiceCard
                key={service.title}
                imageSrc={service.imageSrc}
                title={service.title}
                description={service.description}
              />
            ))}
            <div className="lg:col-span-1 md:col-span-2">
              <AppointmentCard />
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
