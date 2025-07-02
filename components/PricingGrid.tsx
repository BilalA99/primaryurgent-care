import AppointmentCard from "./ui/AppointmentCard";
import PricingCard from "./ui/PricingCard";
import { pricingData } from "@/app/pricing/page";
const PricingGrid = () => {
    return (
        <div className="max-w-8xl mx-auto grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-8 pb-8">
        {/* Top row */}
        <PricingCard {...pricingData[0]} />
        <PricingCard {...pricingData[1]} />
        <PricingCard {...pricingData[2]} />
        {/* Second row */}
        <PricingCard {...pricingData[3]} />
        <AppointmentCard height='auto' />
        <PricingCard {...pricingData[4]} />
        {/* Third row */}
        <PricingCard {...pricingData[5]} />
        <PricingCard {...pricingData[6]} />
        <PricingCard {...pricingData[7]} />
    </div>
    )
}

export default PricingGrid;