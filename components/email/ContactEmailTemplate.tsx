import React from 'react'
import { LocationsScreens } from "../locationsscreens"

interface ContactEmailProps {
    name: string,
    email: string,
    phone: string,
    accidentType: string,
    reason: string,
}

const textSizes = {
    xs: { fontSize: '12px', lineHeight: '16px' },
    sm: { fontSize: '14px', lineHeight: '20px' },
    base: { fontSize: '16px', lineHeight: '24px' },
    lg: { fontSize: '18px', lineHeight: '28px' },
    xl: { fontSize: '20px', lineHeight: '28px' },
    '2xl': { fontSize: '24px', lineHeight: '32px' },
};

export const ContactEmailTemplate: React.FC<Readonly<ContactEmailProps>> = ({
    name,
    email,
    phone,
    accidentType,
    reason,
}) => {
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
                    }}>Thank You for Your Appointment Request!</h2>

                    <p style={{ color: '#374151', marginBottom: 16 }}>Dear {name},</p>

                    <p style={{ color: '#374151', marginBottom: 16 }}>
                        Thank you for reaching out to Primary & Urgent Care Centers! We're here to provide you with fast, affordable, and compassionate care. Whether you need urgent care, primary care, or help with an injury or illness, our experienced team is ready to help you feel better.
                    </p>

                    <p style={{ color: '#374151', marginBottom: 16 }}>
                        We have received your appointment request and our care team is reviewing your information. We'll be in contact with you soon to confirm the date and time of your visit.
                    </p>

                    {/* Patient Information Table */}
                    <div style={{
                        background: '#FFF5F5',
                        border: '1px solid #FECACA',
                        borderRadius: 8,
                        padding: 20,
                        marginBottom: 24
                    }}>
                        <h3 style={{
                            fontWeight: 700,
                            color: '#D52128',
                            marginBottom: 16,
                            fontSize: textSizes.lg.fontSize
                        }}>Patient Information</h3>

                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid #FECACA' }}>
                                    <td style={{
                                        padding: '12px 0',
                                        fontWeight: 600,
                                        color: '#374151',
                                        width: '40%',
                                        verticalAlign: 'top',
                                        fontSize: textSizes.sm.fontSize
                                    }}>Accident Type:</td>
                                    <td style={{
                                        padding: '12px 0',
                                        color: '#374151',
                                        fontSize: textSizes.sm.fontSize
                                    }}>{accidentType}</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid #FECACA' }}>
                                    <td style={{
                                        padding: '12px 0',
                                        fontWeight: 600,
                                        color: '#374151',
                                        verticalAlign: 'top',
                                        fontSize: textSizes.sm.fontSize
                                    }}>Email Address:</td>
                                    <td style={{
                                        padding: '12px 0',
                                        color: '#374151',
                                        fontSize: textSizes.sm.fontSize
                                    }}>{email}</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid #FECACA' }}>
                                    <td style={{
                                        padding: '12px 0',
                                        fontWeight: 600,
                                        color: '#374151',
                                        verticalAlign: 'top',
                                        fontSize: textSizes.sm.fontSize
                                    }}>Phone Number:</td>
                                    <td style={{
                                        padding: '12px 0',
                                        color: '#374151',
                                        fontSize: textSizes.sm.fontSize
                                    }}>{phone}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Consultation Reason Section */}
                    {reason && (
                        <div style={{
                            background: '#F8FAFC',
                            border: '1px solid #E2E8F0',
                            borderRadius: 8,
                            padding: 20,
                            marginBottom: 24
                        }}>
                            <h3 style={{
                                fontWeight: 700,
                                color: '#D52128',
                                marginBottom: 12,
                                fontSize: textSizes.lg.fontSize
                            }}>Consultation Reason:</h3>
                            <div style={{
                                maxHeight: '150px',
                                maxWidth: '100%',
                                overflowY: 'auto',
                                padding: '12px',
                                border: '1px solid #E2E8F0',
                                borderRadius: '6px',
                                backgroundColor: '#fff',
                                fontSize: textSizes.sm.fontSize,
                                lineHeight: '1.5',
                                color: '#374151'
                            }}>
                                {reason}
                            </div>
                        </div>
                    )}

                    <p style={{ color: '#374151', marginBottom: 16 }}>
                        <b>Need care right away?</b> Call us at <a href="tel:5612238024" style={{ color: '#D52128', textDecoration: 'underline', fontWeight: 600 }}>(561) 223-8024
                            </a> for immediate assistance, or simply walk in during business hours.
                    </p>

                    <p style={{ color: '#374151', marginBottom: 16 }}>
                        If you have any immediate questions, please don't hesitate to contact us at <a href="tel:5612238024
‬" style={{ color: '#D52128', textDecoration: 'underline', fontWeight: 600 }}>(561) 223-8024
                            ‬</a> or reply to this email.
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
                            <img src="https://pwucc.com/WebsiteLogoTrans.png" alt="Location" style={{ width: 20, height: 20, objectFit: 'contain' }} />
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
                        <a href="https://pwucc.com/locations" style={{
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
                    <p style={{ color: '#374151', marginBottom: 4 }}>Sincerely,</p>
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
                        <a href="tel:5612238024" style={{ color: '#D52128', textDecoration: 'underline', marginLeft: 8 }}>Contact Us</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
