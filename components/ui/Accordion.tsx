'use client';
import { useState } from 'react';

interface AccordionSection {
    title: string;
    content: React.ReactNode;
}

interface AccordionProps {
    sections: AccordionSection[];
    defaultOpen?: number;
}

const Accordion: React.FC<AccordionProps> = ({ sections, defaultOpen = 0 }) => {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="w-full">
            {sections.map((section, i) => (
                <div key={section.title} className="border-b border-gray-200">
                    <button
                        className="w-full flex justify-between items-center py-4 sm:py-5 text-lg font-semibold focus:outline-none hover:bg-gray-50 transition-colors touch-manipulation"
                        onClick={() => setOpen(open === i ? -1 : i)}
                        aria-expanded={open === i}
                    >
                        <span>{section.title}</span>
                        <span className={`transition-transform duration-200 ${open === i ? 'rotate-90' : ''}`}>▶</span>
                    </button>
                    <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            open === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                    >
                        <div className="pb-4 sm:pb-5 text-base text-gray-700 leading-relaxed">
                            {section.content}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Accordion; 