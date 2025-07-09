import Image from "next/image"
import { LocationsScreens } from "../locationsscreens"

interface UserEmailProps {
    name: string,
    email: string,
    phone: string,
}

const textSizes = {
    xs: { fontSize: '12px', lineHeight: '16px' },
    sm: { fontSize: '14px', lineHeight: '20px' },
    base: { fontSize: '16px', lineHeight: '24px' },
    lg: { fontSize: '18px', lineHeight: '28px' },
    xl: { fontSize: '20px', lineHeight: '28px' },
    '2xl': { fontSize: '24px', lineHeight: '32px' },
};

export const UserEmailTemplate: React.FC<Readonly<UserEmailProps>> = ({ name, email, phone }) => {
    return (
        <div style={{ width: "100%", fontFamily: 'Arial, sans-serif', background: '#FAFAFA', padding: 0 }}>
            {/* Email Preview */}
            <div style={{
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                overflow: 'hidden',
                maxWidth: 600,
                margin: '32px auto',
                boxShadow: '0 2px 12px 0 rgba(213,33,40,0.08)'
            }}>
                {/* Header with Logo */}
                <div style={{
                    background: 'linear-gradient(90deg, #D52128 0%, #1B1819 100%)',
                    padding: '32px 0 16px 0',
                    textAlign: 'center',
                }}>
                    <img
                        src="https://primaryuc.com/WebsiteLogoTrans.png"
                        alt="Primary & Urgent Care Centers Logo"
                        style={{ width: 64, height: 64, objectFit: 'contain', borderRadius: 12, marginBottom: 8 }}
                    />
                    <h1 style={{ color: '#fff', fontWeight: 700, fontSize: 28, margin: 0, letterSpacing: 0.5 }}>Primary & Urgent Care Centers</h1>
                    <p style={{ color: '#fff', fontSize: 16, margin: '8px 0 0 0', fontWeight: 500 }}>Palm Beach County, FL</p>
                </div>

                {/* Main Content */}
                <div style={{ background: '#fff', padding: '32px 32px 24px 32px' }}>
                    <h2 style={{
                        fontSize: textSizes['2xl'].fontSize,
                        lineHeight: textSizes['2xl'].lineHeight,
                        fontWeight: 700,
                        color: '#D52128',
                        marginBottom: 16
                    }}>Thank You for Reaching Out!</h2>

                    <p style={{ color: '#374151', marginBottom: 16 }}>Hi {name},</p>

                    <p style={{ color: '#374151', marginBottom: 16 }}>
                        We've received your information and our care team is reviewing your request. Whether you need urgent care, a primary care doctor, or help with an injury or illness, we're here to help you feel better—fast.
                    </p>

                    {/* Info Box */}
                    <div style={{
                        background: '#FFF5F5',
                        borderLeft: '4px solid #D52128',
                        padding: 16,
                        borderRadius: 6,
                        marginBottom: 24
                    }}>
                        <h3 style={{ fontWeight: 700, color: '#D52128', marginBottom: 8 }}>What Happens Next?</h3>
                        <ul style={{ color: '#374151', paddingLeft: 20, margin: 0 }}>
                            <li>Our team will review your details and match you with the right provider</li>
                            <li>We'll contact you soon to confirm your appointment or answer your questions</li>
                            <li>Walk-ins are always welcome at any of our locations</li>
                        </ul>
                    </div>

                    <p style={{ color: '#374151', marginBottom: 16 }}>
                        <b>Need care right away?</b> Call us at <a href="tel:5612310250" style={{ color: '#D52128', textDecoration: 'underline', fontWeight: 600 }}>(561) 231-0250‬</a> for immediate assistance, or simply walk in during business hours.
                    </p>

                    <hr style={{ borderColor: '#e5e7eb', margin: '24px 0' }} />

                    {/* Locations Section */}
                    <div style={{ marginBottom: 24 }}>
                        <h3 style={{
                            fontSize: textSizes['xl'].fontSize,
                            fontWeight: 700,
                            color: '#D52128',
                            marginBottom: 12,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8
                        }}>
                            <img src="https://primaryuc.com/WebsiteLogoTrans.png" alt="Location" style={{ width: 20, height: 20, objectFit: 'contain' }} />
                            Our Locations
                        </h3>
                        {LocationsScreens.slice(0, 3).map((clinic) => (
                            <div key={clinic.name} style={{ marginBottom: 12, background: '#FAFAFA', borderRadius: 8, padding: '12px 16px' }}>
                                <h4 style={{ fontWeight: 700, color: '#1f2937', fontSize: textSizes['lg'].fontSize, margin: 0 }}>{clinic.name}</h4>
                                <p style={{ color: '#374151', fontSize: 14, margin: '4px 0 0 0' }}>{clinic.clinic}</p>
                                <p style={{ color: '#374151', fontSize: 14, margin: '2px 0 0 0' }}>{clinic.address}</p>
                                <p style={{ color: '#374151', fontSize: 14, margin: '2px 0 0 0' }}><span style={{ fontWeight: 500 }}>Phone:</span> {clinic.phone}</p>
                                <p style={{ color: '#374151', fontSize: 14, margin: '2px 0 0 0' }}><span style={{ fontWeight: 500 }}>Hours:</span> Mon-Fri: 8am-5pm</p>
                            </div>
                        ))}
                        <a href="https://primaryuc.com/locations" style={{
                            background: '#FFF5F5',
                            padding: '12px 16px',
                            display: 'block',
                            borderRadius: 8,
                            color: '#D52128',
                            fontWeight: 700,
                            fontSize: textSizes['lg'].fontSize,
                            textDecoration: 'underline',
                            textAlign: 'center',
                            marginTop: 8
                        }}>View All Locations</a>
                    </div>

                    <p style={{ color: '#374151', marginBottom: 8 }}>We look forward to providing you with fast, affordable, and compassionate care.</p>
                    <p style={{ color: '#374151', marginBottom: 4 }}>Yours in good health,</p>
                    <p style={{ color: '#374151', fontWeight: 500 }}>The Primary & Urgent Care Centers Team</p>
                </div>

                {/* Footer */}
                <div style={{
                    textAlign: 'center',
                    color: '#6b7280',
                    fontSize: textSizes.xs.fontSize,
                    lineHeight: textSizes.xs.lineHeight,
                    background: '#1B1819',
                    padding: '16px 0',
                }}>
                    <p style={{ marginBottom: 8, color: '#fff' }}>© {new Date().getFullYear()} Primary & Urgent Care Centers. All rights reserved.</p>
                    <div style={{ marginBottom: 0 }}>
                        <a href="https://primaryuc.com" style={{ color: '#D52128', textDecoration: 'underline', marginRight: 8 }}>Website</a>
                        <a href="https://primaryuc.com/locations" style={{ color: '#D52128', textDecoration: 'underline', marginLeft: 8, marginRight: 8 }}>Locations</a>
                        <a href="tel:5612310250" style={{ color: '#D52128', textDecoration: 'underline', marginLeft: 8 }}>Contact Us</a>
                    </div>
                </div>
            </div>
        </div>
    )
}