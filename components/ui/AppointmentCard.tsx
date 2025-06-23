import { Phone } from 'lucide-react';

const AppointmentCard = () => {
    return (
        <div className="bg-red-600 rounded-lg shadow-md p-8 flex flex-col justify-center items-start text-white">
            <h3 className="font-bold text-3xl mb-4">Book an appointment to get the best services</h3>
            <p className="mb-6">
                Fast, reliable care, 24/7. Our expert team is here to handle your urgent health needs, anytime.
            </p>
            <button className="w-full bg-white text-gray-800 font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5 text-red-600" />
                <span>(561) 204-5111</span>
            </button>
        </div>
    );
};

export default AppointmentCard; 