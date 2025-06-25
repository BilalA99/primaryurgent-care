import ReviewCard from "./ui/ReviewCard"
import React from "react"
const Reviews = () => {
    return (
        <section className="w-full bg-white py-20 px-4 lg:px-[60px]">
        <div className="max-w-8xl flex flex-col  space-y-24">
          <h2 className="text-5xl md:text-6xl font-bold text-center text-black leading-tight">
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
    )
}

export default Reviews