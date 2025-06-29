import Phone from '../icons/phone';

const AppointmentCard = ({height = 'h-full'}: {height?: string}) => {
    return (
        <div className={`bg-[#D52128] rounded-lg shadow-md p-8 flex flex-col justify-between items-start hover:cursor-pointer group ${height} text-white`}>
            <h3 className="font-[600] text-3xl mb-4">Book an appointment to get the best services</h3>
            <div className='flex flex-col justify-center items-start'>
                <p className="mb-6 text-[#EEA6A9] font-[500] text-sm">
                    Fast, reliable care, 24/7. Our expert team is here to handle your urgent health needs, anytime.
                </p>
                <button className="w-full bg-white text-gray-800 font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2">
                    <div className='group-hover:-translate-x-2 transition-transform duration-300'><Phone /></div>
                    <span className='text-[#D52128] font-[500] '> (561) 204-5111</span>
                </button>
            </div>
        </div>
    );
};

export default AppointmentCard; 