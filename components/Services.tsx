import React from 'react'
import ServiceCard from '@/components/ui/ServiceCard'
import AppointmentCard from '@/components/ui/AppointmentCard'
const services = [
    {
      imageSrc: "/HomeCards/15TMRI.jpg",
      title: "1.5T MRI",
      description: "High-resolution images for spine, brain & joint injuries—in and out in under 30 min.",
    },
    {
      imageSrc: "/HomeCards/CTScan.jpg",
      title: "CT Scan",
      description: "Fast, low-dose scans for trauma, chest pain, or abdominal concerns—results same day.",
    },
    {
      imageSrc: "/HomeCards/DigitalXray.jpg",
      title: "Digital X-Ray",
      description: "Crisp images in seconds to diagnose fractures, pneumonia, and more—no ER visit required.",
    },
    {
      imageSrc: "/HomeCards/Ultrasound.jpg",
      title: "Ultrasound",
      description: "Real-time imaging for soft-tissue, OB/GYN, and vascular evaluations—performed bedside.",
    },
    {
      imageSrc: "/HomeCards/NuclearMedicine.jpg",
      title: "Nuclear medicine",
      description: "Functional imaging to detect thyroid, bone, and cardiac issues—hospital-level tech without the hospital bill.",
    },
  ];
const Services = ({header = "Hospital-Level Diagnostic & Imaging Services", description = "Skip the crowded emergency room and get hospital-grade imaging right inside our urgent care center. With a 1.5 T MRI, multi-slice CT scanner, digital X-ray, ultrasound, and nuclear medicine suite all under one roof, we deliver STAT reads within 3 hours and same-day scan results for most studies. Walk in anytime or book a same-day appointment—our board-certified providers give you fast, accurate answers when minutes matter."}: {header?: string, description?: string}) => {
  return (
    <section className="py-20 xl:px-[60px] px-6">
    <div className="max-w-8xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 gap-6 items-center mb-16">
        <h2 className="text-5xl font-bold text-black leading-tight">
          {header.split('br').map((item, index) => (
            <span key={index}>
              {item}
              {index < header.split('br').length - 1 && <br />}
            </span>
          ))}
        </h2>
        <p className="text-[#494647] lg:text-xl text-base lg:px-5">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10">
        {services.slice(0, 3).map((service, index) => (
          <ServiceCard
            key={service.title}
            imageSrc={service.imageSrc}
            title={service.title}
            description={service.description}
          />
        ))}
        <ServiceCard
          imageSrc="/HomeCards/Ultrasound.jpg"
          title="Ultrasound"
          description="Real-time imaging for soft-tissue, OB/GYN, and vascular evaluations—performed bedside."
        />
        <div className="col-span-1 ">
          <AppointmentCard />
        </div>
        <ServiceCard
          imageSrc="/HomeCards/NuclearMedicine.jpg"
          title="Nuclear Medicine"
          description="Functional imaging to detect thyroid, bone, and cardiac issues—hospital-level tech without the hospital bill."
        />
      </div>
    </div>
  </section>
  )
}

export default Services