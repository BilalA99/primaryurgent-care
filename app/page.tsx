import Image from "next/image";
import { ChevronDown } from "lucide-react";
import homeLanding from "@/public/homelanding.png";
import GradientImage from '@/components/ui/GradientImage';
import CareCard from '@/components/ui/CareCard';
import ReviewCard from '@/components/ui/ReviewCard';
import Ambulance from "@/components/icons/ambulance";
import Waittimes from "@/components/icons/waittimes";
import ShieldUser from "@/components/icons/shielduser";
import LocationCard from '@/components/ui/LocationCard';
import Services from "@/components/Services";
import LocationsRow from "@/components/LocationsRow";

export default function Home() {
  return (
    <main className="h-full w-full flex flex-col text-white">
      <section className="flex items-center w-full h-full justify-center relative py-20">
        <Image
          src={'/homelanding.png'}
          alt="Hero background"
          priority
          fill
          className="-z-10 w-full h-full absolute object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#1B1819]/60 -z-10 "></div>
        <div className="flex flex-col xl:flex-row xl:space-y-0 space-y-10 justify-between max-w-8xl w-full xl:px-[60px] px-6">
          <div className="flex flex-col justify-center space-y-6">
            <div className="backdrop-blur-3xl bg-white/20 text-white text-sm px-4 py-2 rounded-full self-start">
              Call for any emergency: (561) 204-5111
            </div>
            <h1 className="text-6xl font-bold ">
              Immediate medical care when you need it most
            </h1>
            <p className="text-lg xl:w-[45%]">
              Fast, reliable care. Our expert team is here to handle your urgent health needs, anytime.
            </p>
          </div>

          <div className="backdrop-blur-3xl p-8 rounded-2xl w-full xl:w-[50%]">
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

      <Services />

      {/* State of the Art Technology Section */}
      <section className="w-full max-w-8xl bg-white mx-auto py-10 grid grid-cols-1 gap-12 px-[60px]">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-8">

          <div className="w-full">
            <GradientImage
              src="/femaledoctor.jpg"
              alt="Doctor with MRI and X-ray"
              className="w-full h-[50%]"
              priority
            />
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              State of the Art Technology,<br />Right Inside Our Urgent Care
            </h2>
            <p className="text-gray-700 text-base md:text-lg">
              Healthcare has entered the fast lane—and so have we. Primary & Urgent Care Centers pairs hospital-level care with true emergency-room equipment: 1.5 T MRI, multi-slice CT, high-definition digital X-ray, ultrasound, and lab analyzers. Every image is read STAT—often within three hours—so you leave with same-day answers and a clear plan, not more questions.
            </p>
          </div>
        </div>
        {/* Bottom row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Seen in 15 minutes or less!
            </h2>
            <p className="text-gray-700 text-base md:text-lg">
              Now cold, unfriendly waiting rooms and interminable wait times to be seen are a nightmare of the past! Come to a Primary and Urgent Care Center and step into the new age of health care, where you will feel welcome while also knowing you will be seen by a knowledgeable medical professional IN LESS THAN 15 MINUTES.
            </p>
          </div>
          <GradientImage
            src="/doctorwithpatient.jpg"
            alt="Doctor with patient"
            className="w-full "
            direction="left"
            priority={false}
          />
        </div>
      </section>

      {/* Urgent, Accident, Emergency Room Care Section */}
      <section className="w-full bg-white py-20 px-4 lg:px-[60px]">
        <div className="max-w-8xl mx-auto grid grid-cols-1 gap-8">
          {/* Top row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            <div className=" col-span-1">
              <CareCard
                imageSrc="/urgent.jpg"
                title="Injury Care"
                description="From sprains, strains, and simple fractures to minor burns and cuts, our clinicians deliver rapid treatment using hospital-grade splints and on-site X-ray—no referral, no delay."
                buttonText="Explore Urgent Care"
                buttonLink="/urgentinjurycare"
              />
            </div>
            <div className="col-span-2">
              <CareCard
                imageSrc="/accident.jpg"
                title="Comprehensive Accident & Pain Care"
                description="Car crash? Sports mishap? We evaluate whiplash, neck and back pain, headaches, migraines and more. On-site imaging plus pain-management therapy speed your recovery—without an ER wait."
                buttonText="Explore Pain care"
                buttonLink="/paincare"
              />
            </div>
          </div>
          {/* Bottom row */}
          <CareCard
            imageSrc="/emergencyroomlevelcare.jpg"
            title="Emergency Room Level Care"
            description="Why battle long waits at a hospital ER? Our urgent care centers deliver true hospital-level care with emergency-room equipment from on-site imaging so you get the right treatment fast. For non-life- or limb-threatening emergencies, simply walk in or book a same-day appointment and be seen in 15 minutes or less. Enjoy STAT imaging reads within 3 hours and same-day scan results."
            buttonText="Explore Emergency Care"
            horizontal
            className=""
            buttonLink="/emergencyroom"
          />
        </div>
      </section>

      {/* Reviews Section */}
      <section className="w-full bg-white py-10 pb-32 px-4 lg:px-[60px]">
        <div className="max-w-8xl flex flex-col  space-y-24">
          <h2 className="text-5xl md:text-5xl font-bold text-center text-black leading-tight">
            Trusted and Loved by<br />Our Community
          </h2>
          <div className="flex flex-row space-x-32 px-20 w-full">
            <ReviewCard
              text="This office has an incredible and amazing customer service team who taking care all patients. Based on my experience with this Primary &Urgent Care I really do recommend it to anyone. Doctors and nurses are really care and gentle. I can say you will be in good hands."
              avatarSrc="https://randomuser.me/api/portraits/women/25.jpg"
              name="Ernst"
              role="Business Analytic at Opndoo"
            />
            <ReviewCard
              text="The Primary & Urgent Care Center in RPB has been my primary care provider for nearly 2 years. The staff are kind and attentive. Many diagnostics can be ran right here in their facilities, so no having to drive to another place back and forth for a test to be administered."
              avatarSrc="https://randomuser.me/api/portraits/men/40.jpg"
              name="Gail Hilpert"
              role="Business Analytic at Domino"
            />
          </div>
        </div>
      </section>

      {/* Accessible Urgent Care Section */}
      <section className="w-full bg-[#FAFAFA] py-24 px-4 lg:px-[60px]">
        <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left: Text and Cards */}
          <div className="lg:col-span-3 flex flex-col gap-10">
            <div>
              <h2 className="text-6xl font-bold text-black mb-6 leading-tight">Accessible Urgent Care Across Palm Beach County</h2>
              <p className="text-lg text-gray-700 mb-10">
                With four walk-in urgent care clinics—Royal Palm Beach, Lake Worth, Palm Springs, and Lantana— we make it easy to see a provider close to home, on your schedule. Enjoy short wait times, hospital-level diagnostics, and broad insurance acceptance at every location.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <div className="grid grid-cols-1 md:grid-cols-2 col-span-2 ">
                {/* Top left card */}
                <div className="bg-[#F2F6FC] rounded-t-2xl p-8 flex flex-col space-y-20 py-10 relative pb-20">
                  <div className="absolute top-6 right-6 bg-white rounded-full p-3 ">
                    <Ambulance />
                  </div>
                  <h3 className="text-4xl font-bold text-black mb-8">Urgent Care</h3>
                  <p className="text-gray-700 text-lg">Primary & Urgent Care Centers deliver local, personal treatment for everything from colds to fractures—no referral needed.</p>
                </div>
                {/* Top right card */}
                <div className="bg-[#FDF4F4] rounded-t-2xl p-8 flex flex-col space-y-20 py-10  relative">
                  <div className="absolute top-6 right-6 bg-white rounded-full p-3 ">
                    <Waittimes />
                  </div>
                  <h3 className="text-4xl font-bold text-black mb-8">Short Wait Times</h3>
                  <p className="text-gray-700 text-lg">Our digital queue guarantees you'll be seen in 15 minutes or less. Book a same-day appointment or walk in anytime.</p>
                </div>
                {/* Bottom card (spans both columns) */}
                <div className="bg-white rounded-b-2xl p-8 flex flex-col space-y-20 md:col-span-2 justify-between  relative">
                  <div className="absolute top-6 right-6 bg-white rounded-full p-3 ">
                    <ShieldUser />
                  </div>
                  <h3 className="text-4xl font-bold text-black mb-8">Most Insurance Accepted</h3>
                  <p className="text-gray-700 text-lg">Our co-pays are less than hospital emergency room fees and we will work with you to process your insurance</p>
                </div>
              </div>
              {/* Right: Map Placeholder */}
              <div className="w-full h-[420px] col-span-1 bg-gray-200 rounded-2xl flex items-center justify-center">
                <span className="text-gray-400 text-lg">[Map Placeholder]</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Locations Row Section */}
      <LocationsRow />
    </main>
  );
}
