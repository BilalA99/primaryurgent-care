import React from 'react'
import Reveal from './RevealAnimation'
import NeckPain from './icons/neckpain'
import BackPain from './icons/backpain'
import HandPain from './icons/handpain'
import ShoulderPain from './icons/shoulderpain'
import KneePain from './icons/kneepain'
import Headaches from './icons/headaches'
import Link from 'next/link'

export interface PainCareWeTreatData {
    title: string;
    icon: string;
    description: string;
    whatItIs: string;
    symptoms: string;
    causes: string;
    whenToSeekCare: string;
    treatment: string;
    urgentCareAdvantage: string;
    costAdvantage: string;
    slug: string;
    img? : string;
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
}

export const PainCareWeTreatData : PainCareWeTreatData[] = [
    {
        title: "Neck Pain",
        icon: "NeckPain",
        description: "Whiplash and neck pain treatment after car accidents, falls, or work injuries. We provide same-day evaluation, X-ray, and documentation for insurance or legal claims.",
        whatItIs: "Neck pain is a common result of car accidents, especially rear-end collisions, and can range from mild discomfort to severe, debilitating pain. Whiplash injuries often involve the cervical spine and surrounding muscles, with symptoms sometimes appearing hours or days after the accident. Our urgent care centers specialize in diagnosing and treating whiplash and neck pain after accidents, using advanced imaging and expert protocols.",
        symptoms: "Neck pain symptoms after an accident may include stiffness, limited range of motion, sharp or dull pain, muscle spasms, and radiating pain to the shoulders, arms, or head. Whiplash often causes headaches, dizziness, and difficulty concentrating. Numbness or tingling in the arms may indicate nerve involvement.",
        causes: "Most commonly caused by car accidents, whiplash can also result from sports injuries, falls, or sudden trauma. The rapid back-and-forth motion of the neck can damage soft tissues, ligaments, and nerves.",
        whenToSeekCare: "Seek immediate care for neck pain after a car accident, especially if accompanied by numbness, tingling, or weakness. Early evaluation and documentation are crucial for insurance or legal claims under Florida's PIP 14-day rule.",
        treatment: "Treatment for whiplash and neck pain includes physical examination, X-rays or MRI, pain management, muscle relaxants, and physical therapy referrals. Our urgent care providers ensure you receive the right care and documentation for your case.",
        urgentCareAdvantage: "We provide immediate access to whiplash and neck pain evaluation after car accidents, with on-site X-ray and same-day documentation for insurance or legal claims. Our board-certified providers are experienced in managing accident-related neck injuries.",
        costAdvantage: "Receiving neck pain treatment at our urgent care centers offers significant cost savings compared to emergency room visits or specialist consultations. Typical urgent care costs for neck pain evaluation range from $100-300, compared to $500-1,500 for emergency room visits. Our centers accept most insurance plans with lower copays and deductibles, and we can work with patients to establish affordable payment plans. The immediate availability of diagnostic imaging and treatment means patients can avoid multiple appointments and associated costs, while receiving comprehensive care in a single visit.",
        slug: "neck-pain",
        img : '/neckpain.png',
        metaTitle: "Whiplash & Neck Pain Treatment After Car Accidents | PrimaryUC",
        metaDescription: "Walk-in urgent care for whiplash and neck pain after car accidents in Palm Beach County. Same-day X-ray, diagnosis, and documentation for insurance or legal claims.",
        keywords: [
          "whiplash treatment west palm beach",
          "neck pain after car accident",
          "stiff neck after car accident",
          "car accident neck sprain",
          "whiplash doctor",
          "neck pain urgent care",
          "walk-in neck pain clinic",
          "PIP doctor near me"
        ]
    },
    {
        title: "Back Pain",
        icon: "BackPain",
        description: "Back pain treatment after car accidents, falls, or work injuries. We diagnose herniated discs, sciatica, and lower back pain with on-site X-ray and provide documentation for insurance or legal claims.",
        whatItIs: "Back pain is a frequent result of car accidents, slip and falls, or workplace injuries. It can involve the muscles, ligaments, discs, or nerves in the spinal column. Our urgent care centers specialize in diagnosing and treating back pain after PI events, including rear-end collisions and workplace accidents.",
        symptoms: "Back pain after an accident may present as sharp, stabbing pain, dull aching, muscle spasms, or radiating pain down the legs (sciatica). Herniated discs and lower back pain are common after car accidents or falls.",
        causes: "Back pain can result from rear-end collisions, slip and falls, lifting injuries at work, or sports trauma. Herniated discs, muscle strain, and nerve compression are common causes in PI cases.",
        whenToSeekCare: "Seek immediate care for back pain after a car accident or fall, especially if you have numbness, tingling, or weakness in the legs, or if pain prevents standing or walking. Early evaluation and documentation are crucial for insurance or legal claims.",
        treatment: "Treatment includes physical examination, X-rays or MRI, pain management, muscle relaxants, and physical therapy referrals. We provide immediate stabilization and ensure proper documentation for your PI case.",
        urgentCareAdvantage: "Our urgent care centers offer same-day evaluation and treatment for back pain after accidents, with on-site imaging and documentation for insurance or legal claims. Our providers are experienced in managing accident-related back injuries.",
        costAdvantage: "Back pain treatment at our urgent care centers provides significant cost savings compared to emergency room visits or specialist consultations. Typical urgent care costs for back pain evaluation range from $150-400, compared to $800-2,000 for emergency room visits. Our centers accept most insurance plans with lower copays and deductibles, and we offer transparent pricing for patients without insurance. The immediate availability of diagnostic imaging and treatment means patients can avoid multiple appointments and associated costs while receiving comprehensive care in a single visit.",
        slug: "back-pain",
        img : '/backpain.png',
        metaTitle: "Back Pain Treatment After a Car Accident or Fall | PrimaryUC",
        metaDescription: "Walk-in urgent care for back pain after car accidents, falls, or work injuries in Palm Beach County. On-site X-ray, diagnosis, and documentation for insurance or legal claims.",
        keywords: [
          "back pain after car accident doctor",
          "herniated disc from car accident",
          "lower back pain after slip and fall",
          "back injury at work",
          "sciatica after accident",
          "back pain urgent care",
          "walk-in back pain doctor",
          "spinal injury urgent care"
        ]
    },
    {
        title: "Hand Pain",
        icon: "HandPain",
        description: "Specialized care for hand injuries and pain conditions",
        whatItIs: "Hand pain encompasses a wide range of conditions affecting the hands, wrists, and fingers, including injuries, repetitive strain conditions, and degenerative disorders. The hand is a complex structure with multiple joints, tendons, ligaments, and nerves that can be affected by various conditions. Hand pain can significantly impact daily activities, work performance, and quality of life. Our urgent care centers provide comprehensive evaluation and treatment for hand pain using advanced diagnostic imaging and specialized treatment protocols designed for hand and wrist conditions.",
        symptoms: "Hand pain symptoms can include aching, throbbing, sharp pain, stiffness, swelling, and reduced grip strength. Patients may experience difficulty performing fine motor tasks, writing, typing, or grasping objects. Carpal tunnel syndrome often causes numbness, tingling, and pain in the thumb, index, and middle fingers. Arthritis-related hand pain typically includes joint stiffness, swelling, and deformity. Tendon injuries may cause pain with movement and audible clicking or snapping sensations. Nerve compression can result in burning pain, numbness, and muscle weakness.",
        causes: "Hand pain can result from various causes including traumatic injuries, repetitive strain, sports accidents, work-related activities, and degenerative conditions. Carpal tunnel syndrome from repetitive computer use, arthritis from aging or injury, and tendonitis from overuse are common causes. Traumatic injuries such as fractures, dislocations, and ligament tears can occur from falls, sports activities, or accidents. Work-related injuries from repetitive motions, heavy lifting, or vibration exposure can also contribute to hand pain conditions.",
        whenToSeekCare: "Seek immediate medical attention for severe hand pain, especially if accompanied by visible deformity, inability to move fingers, severe swelling, or signs of infection such as redness, warmth, or pus. Emergency care is needed if hand pain occurs after a fall, crush injury, or other trauma. Visit our urgent care center if hand pain persists for more than a few days, interferes with daily activities, or is accompanied by numbness, tingling, or weakness. Our centers can provide same-day evaluation and treatment for most hand pain conditions including splinting and wound care.",
        treatment: "Treatment for hand pain begins with a comprehensive evaluation including physical examination and diagnostic imaging such as X-rays or ultrasound to identify the underlying cause. Our urgent care providers can offer immediate pain relief through medications, splinting, and therapeutic interventions. Treatment may include anti-inflammatory medications, pain management techniques, immobilization with splints or braces, and physical therapy referrals. For severe injuries, we can provide immediate stabilization and arrange referrals to hand specialists.",
        urgentCareAdvantage: "Our urgent care centers provide immediate access to hand pain evaluation and treatment without the long waits typically associated with emergency rooms or specialist appointments. We can perform on-site diagnostic imaging including X-rays and ultrasound to quickly identify the cause of hand pain and begin treatment immediately. Our providers are experienced in managing acute hand injuries and can provide same-day care including splinting, wound care, and pain management. The convenience of urgent care means patients can receive prompt attention for hand pain without lengthy appointment scheduling.",
        costAdvantage: "Hand pain treatment at our urgent care centers offers significant cost savings compared to emergency room visits or specialist consultations. Typical urgent care costs for hand pain evaluation range from $100-300, compared to $500-1,500 for emergency room visits. Our centers accept most insurance plans with lower copays and deductibles, and we can work with patients to establish affordable payment plans. The immediate availability of diagnostic imaging and treatment means patients can avoid multiple appointments and associated costs while receiving comprehensive care in a single visit.",
        slug: "hand-pain",
        img : '/handpain.png',
        metaTitle: "Hand Pain & Injury Treatment | Palm Beach County Urgent Care",
        metaDescription: "Walk-in urgent care for hand pain, wrist injuries, and fractures in Palm Beach County. Same-day X-ray, splinting, and expert care for work, sports, or accident injuries. No appointment needed.",
        keywords: [
          "hand pain urgent care",
          "wrist injury clinic Palm Beach",
          "walk-in hand pain doctor",
          "hand fracture urgent care",
          "hand pain after accident",
          "urgent care for hand pain",
          "hand pain Palm Beach County"
        ]
    },
    {
        title: "Shoulder Pain",
        icon: "ShoulderPain",
        description: "Expert care for shoulder injuries and pain management",
        whatItIs: "Shoulder pain is a common condition that can affect the shoulder joint, surrounding muscles, tendons, and ligaments, often resulting from injuries, overuse, or degenerative conditions. The shoulder is the most mobile joint in the body, making it susceptible to various injuries and conditions that can significantly impact daily activities and quality of life. Shoulder pain can range from mild discomfort to severe, debilitating pain that limits mobility and function. Our urgent care centers provide comprehensive evaluation and treatment for shoulder pain using advanced diagnostic imaging and specialized treatment protocols.",
        symptoms: "Shoulder pain symptoms can include aching, sharp pain, stiffness, reduced range of motion, and weakness in the affected arm. Patients may experience difficulty lifting objects, reaching overhead, or performing daily activities such as dressing or grooming. Rotator cuff injuries often cause pain with specific movements and may result in weakness when lifting or rotating the arm. Frozen shoulder can cause severe stiffness and limited mobility. Shoulder instability may cause a feeling of the shoulder popping out or giving way during certain activities.",
        causes: "Shoulder pain can result from various causes including sports injuries, motor vehicle accidents, falls, repetitive strain, and degenerative conditions. Rotator cuff tears, shoulder dislocations, and tendonitis are common causes of shoulder pain. Work-related injuries from repetitive lifting, reaching, or overhead activities can contribute to shoulder problems. Sports injuries from throwing, swimming, or contact sports can cause acute or chronic shoulder conditions. Age-related degenerative changes and arthritis can also contribute to shoulder pain.",
        whenToSeekCare: "Seek immediate medical attention for severe shoulder pain, especially if accompanied by visible deformity, inability to move the arm, severe swelling, or pain that prevents normal activities. Emergency care is needed if shoulder pain occurs after a fall, car accident, or other trauma. Visit our urgent care center if shoulder pain persists for more than a few days, interferes with daily activities, or is accompanied by weakness, numbness, or tingling in the arm. Our centers can provide same-day evaluation and treatment for most shoulder pain conditions including immobilization.",
        treatment: "Treatment for shoulder pain begins with a comprehensive evaluation including physical examination and diagnostic imaging such as X-rays or ultrasound to identify the underlying cause. Our urgent care providers can offer immediate pain relief through medications, therapeutic interventions, and immobilization when necessary. Treatment may include anti-inflammatory medications, pain management techniques, sling immobilization, and physical therapy referrals. For severe injuries, we can provide immediate stabilization and arrange referrals to orthopedic specialists.",
        urgentCareAdvantage: "Our urgent care centers provide immediate access to shoulder pain evaluation and treatment without the long waits typically associated with emergency rooms or specialist appointments. We can perform on-site diagnostic imaging including X-rays and ultrasound to quickly identify the cause of shoulder pain and begin treatment immediately. Our providers are experienced in managing acute shoulder injuries and can provide same-day care including immobilization, pain management, and rehabilitation guidance. The convenience of urgent care means patients can receive prompt attention for shoulder pain without lengthy appointment scheduling.",
        costAdvantage: "Shoulder pain treatment at our urgent care centers offers significant cost savings compared to emergency room visits or specialist consultations. Typical urgent care costs for shoulder pain evaluation range from $150-400, compared to $800-2,000 for emergency room visits. Our centers accept most insurance plans with lower copays and deductibles, and we offer transparent pricing for patients without insurance. The immediate availability of diagnostic imaging and treatment means patients can avoid multiple appointments and associated costs while receiving comprehensive care in a single visit.",
        slug: "shoulder-pain",
        img : '/shoulderpain.png',
        metaTitle: "Shoulder Pain & Injury Care | Palm Beach County Urgent Care",
        metaDescription: "Get expert care for shoulder pain, rotator cuff injuries, and dislocations at our Palm Beach County urgent care. Walk-in evaluation, X-ray, and same-day relief. No appointment needed.",
        keywords: [
          "shoulder pain urgent care",
          "rotator cuff injury Palm Beach",
          "walk-in shoulder pain doctor",
          "shoulder dislocation urgent care",
          "shoulder pain after accident",
          "urgent care for shoulder pain",
          "shoulder pain Palm Beach County"
        ]
    },
    {
        title: "Knee & Foot Pain",
        icon: "KneePain",
        description: "Comprehensive care for knee and foot injuries",
        whatItIs: "Knee and foot pain encompasses a wide range of conditions affecting the lower extremities, including injuries, degenerative conditions, and overuse syndromes that can significantly impact mobility and quality of life. These conditions can result from sports injuries, accidents, repetitive strain, or age-related changes. Knee and foot pain can affect walking, standing, exercise, and daily activities. Our urgent care centers provide comprehensive evaluation and treatment for knee and foot pain using advanced diagnostic imaging and specialized treatment protocols designed for lower extremity conditions.",
        symptoms: "Knee pain symptoms can include aching, sharp pain, swelling, stiffness, instability, and difficulty bearing weight. Patients may experience clicking, popping, or grinding sensations during movement. Foot pain can manifest as arch pain, heel pain, toe pain, or generalized foot discomfort. Plantar fasciitis often causes sharp heel pain, especially in the morning or after prolonged standing. Knee injuries may cause locking, buckling, or giving way sensations. Both conditions can result in altered gait patterns and difficulty with daily activities.",
        causes: "Knee and foot pain can result from various causes including sports injuries, motor vehicle accidents, falls, repetitive strain, and degenerative conditions. Common knee conditions include ligament tears, meniscal injuries, patellar tendonitis, and arthritis. Foot pain can result from plantar fasciitis, stress fractures, bunions, and nerve compression. Work-related injuries from prolonged standing, walking, or repetitive movements can contribute to both knee and foot problems. Sports injuries from running, jumping, or contact sports are also common causes.",
        whenToSeekCare: "Seek immediate medical attention for severe knee or foot pain, especially if accompanied by inability to bear weight, visible deformity, severe swelling, or signs of infection. Emergency care is needed if pain occurs after a fall, car accident, or other trauma. Visit our urgent care center if knee or foot pain persists for more than a few days, interferes with walking or daily activities, or is accompanied by locking, buckling, or giving way sensations. Our centers can provide same-day evaluation and treatment for most lower extremity pain conditions including bracing.",
        treatment: "Treatment for knee and foot pain begins with a comprehensive evaluation including physical examination and diagnostic imaging such as X-rays or MRI to identify the underlying cause. Our urgent care providers can offer immediate pain relief through medications, therapeutic interventions, and immobilization when necessary. Treatment may include anti-inflammatory medications, pain management techniques, bracing, orthotic recommendations, and physical therapy referrals. For severe injuries, we can provide immediate stabilization and arrange referrals to orthopedic specialists.",
        urgentCareAdvantage: "Our urgent care centers provide immediate access to knee and foot pain evaluation and treatment without the long waits typically associated with emergency rooms or specialist appointments. We can perform on-site diagnostic imaging including X-rays and MRI to quickly identify the cause of pain and begin treatment immediately. Our providers are experienced in managing acute lower extremity injuries and can provide same-day care including bracing, pain management, and rehabilitation guidance. The convenience of urgent care means patients can receive prompt attention for knee and foot pain without lengthy appointment scheduling.",
        costAdvantage: "Knee and foot pain treatment at our urgent care centers offers significant cost savings compared to emergency room visits or specialist consultations. Typical urgent care costs for evaluation range from $150-400, compared to $800-2,000 for emergency room visits. Our centers accept most insurance plans with lower copays and deductibles, and we can work with patients to establish affordable payment plans. The immediate availability of diagnostic imaging and treatment means patients can avoid multiple appointments and associated costs while receiving comprehensive care in a single visit.",
        slug: "knee-foot-pain",
        img : '/kneepain.png',
        metaTitle: "Knee & Foot Pain Treatment | Palm Beach County Urgent Care",
        metaDescription: "Walk-in urgent care for knee and foot pain, injuries, and sprains in Palm Beach County. Same-day X-ray, bracing, and expert care for sports, work, or accident injuries. No appointment needed.",
        keywords: [
          "knee pain urgent care",
          "foot pain clinic Palm Beach",
          "walk-in knee pain doctor",
          "ankle injury urgent care",
          "knee pain after accident",
          "urgent care for foot pain",
          "knee pain Palm Beach County"
        ]
    },
    {
        title: "Headaches & Migraines",
        icon: "Headaches",
        description: "Expert care for headache and migraine management",
        whatItIs: "Headaches and migraines are common neurological conditions that can range from mild discomfort to severe, debilitating pain that significantly impacts daily activities and quality of life. These conditions can result from various causes including stress, injury, medical conditions, and environmental factors. Headaches can be primary conditions or secondary symptoms of other medical problems. Our urgent care centers provide comprehensive evaluation and treatment for headaches and migraines using advanced diagnostic technology and evidence-based treatment protocols designed to provide immediate relief and long-term management.",
        symptoms: "Headache symptoms can vary widely and may include throbbing pain, pressure, tightness, or sharp pain in various areas of the head. Migraine symptoms often include severe, one-sided pain, nausea, vomiting, sensitivity to light and sound, and visual disturbances such as auras. Tension headaches typically cause band-like pressure around the head, while cluster headaches cause severe, stabbing pain around the eye. Associated symptoms can include dizziness, fatigue, difficulty concentrating, and mood changes. Some headaches may be accompanied by neck pain, shoulder tension, or other physical symptoms.",
        causes: "Headaches and migraines can result from various causes including stress, muscle tension, dehydration, poor sleep, eye strain, and dietary factors. Post-traumatic headaches can occur after head injuries, whiplash, or other trauma. Migraines may be triggered by hormonal changes, certain foods, environmental factors, or stress. Tension headaches often result from muscle tension in the neck and shoulders. Secondary headaches can be caused by underlying medical conditions such as high blood pressure, sinus problems, or medication side effects.",
        whenToSeekCare: "Seek immediate medical attention for severe, sudden headaches, especially if accompanied by confusion, difficulty speaking, weakness on one side of the body, or the worst headache of your life. Emergency care is needed if headaches occur after head injury, trauma, or are accompanied by fever and stiff neck. Visit our urgent care center if headaches are severe, persistent, or interfere with daily activities, or if you experience new or worsening headache patterns. Our centers can provide same-day evaluation and treatment for most headache conditions including migraine relief.",
        treatment: "Treatment for headaches and migraines begins with a comprehensive evaluation to identify the underlying cause and determine the most appropriate treatment approach. Our urgent care providers can offer immediate pain relief through medications, therapeutic interventions, and lifestyle recommendations. Treatment may include pain medications, anti-nausea medications, migraine-specific medications, and intravenous therapy for severe cases. We can also provide education on trigger identification, lifestyle modifications, and preventive strategies.",
        urgentCareAdvantage: "Our urgent care centers provide immediate access to headache and migraine evaluation and treatment without the long waits typically associated with emergency rooms or specialist appointments. We can perform rapid evaluation and begin treatment immediately, often providing relief within minutes. Our providers are experienced in managing acute headache and migraine episodes and can provide same-day care that prevents complications and promotes faster recovery. The convenience of urgent care means patients can receive prompt attention for severe headaches without lengthy appointment scheduling.",
        costAdvantage: "Headache and migraine treatment at our urgent care centers offers significant cost savings compared to emergency room visits or specialist consultations. Typical urgent care costs for evaluation and treatment range from $100-300, compared to $500-1,500 for emergency room visits. Our centers accept most insurance plans with lower copays and deductibles, and we offer transparent pricing for patients without insurance. The immediate availability of treatment means patients can avoid multiple appointments and associated costs while receiving comprehensive care in a single visit.",
        slug: "headaches-migraines",
        img : '/headaches.png',
        metaTitle: "Headache & Migraine Relief | Palm Beach County Urgent Care",
        metaDescription: "Get fast relief for headaches and migraines at our Palm Beach County urgent care. Walk-in evaluation, same-day treatment, and expert care for post-accident or chronic headaches. No appointment needed.",
        keywords: [
          "headache urgent care",
          "migraine clinic Palm Beach",
          "walk-in headache doctor",
          "post-accident headache",
          "urgent care for migraines",
          "headache relief Palm Beach County"
        ]
    }
];
const PainCareWeTreat = () => {
    return (
        <section className="w-full bg-[#FAFAFA] py-20 px-4 md:px-[60px]">
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-6">Pain & Injuries We Treat After Accidents –<br />Palm Beach</h2>
            <div className="md:text-lg text-base text-[#494647] text-center mb-12">Seen in less then 15 min for whiplash, nerve pain, headaches, or joint injuries—on-site X-ray, MRI, and direct PIP billing.</div>
            <Reveal className='w-full overflow-hidden'>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-2 max-w-5xl mx-auto">
                    <Link href="/paincare/neck-pain" className="bg-white hover:scale-105 transition-all duration-300 rounded-2xl p-10 flex flex-col items-start justify-between h-60 shadow-sm">
                        <NeckPain />
                        <div className="text-2xl font-bold text-black mt-6">Neck Pain</div>
                    </Link>
                    <Link href="/paincare/back-pain" className="bg-white hover:scale-105 transition-all duration-300  rounded-2xl p-10 flex flex-col items-start justify-between h-60 shadow-sm">
                        <BackPain />
                        <div className="text-2xl font-bold text-black mt-6">Back Pain</div>
                    </Link>
                    <Link href="/paincare/hand-pain" className="bg-white hover:scale-105 transition-all duration-300 rounded-2xl p-10 flex flex-col items-start justify-between h-60 shadow-sm">
                        <HandPain />
                        <div className="text-2xl font-bold text-black mt-6">Hand Pain</div>
                    </Link>
                    <Link href="/paincare/shoulder-pain" className="bg-white hover:scale-105 transition-all duration-300 rounded-2xl p-10 flex flex-col items-start justify-between h-60 shadow-sm">
                        <ShoulderPain />
                        <div className="text-2xl font-bold text-black mt-6">Shoulder Pain</div>
                    </Link>
                    <Link href='/paincare/knee-foot-pain' className="bg-white hover:scale-105 transition-all duration-300 rounded-2xl p-10 flex flex-col items-start justify-between h-60 shadow-sm">
                        <KneePain />
                        <div className="text-2xl font-bold text-black mt-6">Knee & Foot Pain</div>
                    </Link>
                    <Link href='/paincare/headaches-migraines' className="bg-white hover:scale-105 transition-all duration-300  rounded-2xl p-10 flex flex-col items-start justify-between h-60 shadow-sm">
                        <Headaches />
                        <div className="text-2xl font-bold text-black mt-6">Headaches & Migraines</div>
                    </Link>
                </div>
            </Reveal>
        </section>
    )
}

export default PainCareWeTreat