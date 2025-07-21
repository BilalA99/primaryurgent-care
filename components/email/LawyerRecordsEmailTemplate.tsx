import React from 'react';

interface LawyerRecordsEmailProps {
    lawFirm: string;
    email: string;
    phone: string;
    patientName: string;
    dob: string;
    dos: string;
    records: string;
     files: {
        file: File,
        content: string
    }[]; // Array of file names
}

const textSizes = {
    xs: { fontSize: '12px', lineHeight: '16px' },
    sm: { fontSize: '14px', lineHeight: '20px' },
    base: { fontSize: '16px', lineHeight: '24px' },
    lg: { fontSize: '18px', lineHeight: '28px' },
    xl: { fontSize: '20px', lineHeight: '28px' },
    '2xl': { fontSize: '24px', lineHeight: '32px' },
};

export const LawyerRecordsEmailTemplate: React.FC<Readonly<LawyerRecordsEmailProps>> = ({
    lawFirm,
    email,
    phone,
    patientName,
    dob,
    dos,
    records,
    files,
}) => {
    return (
        <div style={{ width: "100%", fontFamily: 'Arial, sans-serif', background: '#FAFAFA', padding: 0 }}>
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
                    }}>New Medical Records Request from Attorney</h2>

                    <p style={{ color: '#374151', marginBottom: 16 }}>
                        <b>Law Firm / Attorney:</b> {lawFirm}
                    </p>
                    <p style={{ color: '#374151', marginBottom: 16 }}>
                        <b>Email:</b> {email}
                    </p>
                    <p style={{ color: '#374151', marginBottom: 16 }}>
                        <b>Phone:</b> {phone}
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
                                    <td style={{ padding: '12px 0', fontWeight: 600, color: '#374151', width: '40%', verticalAlign: 'top', fontSize: textSizes.sm.fontSize }}>Patient Name:</td>
                                    <td style={{ padding: '12px 0', color: '#374151', fontSize: textSizes.sm.fontSize }}>{patientName}</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid #FECACA' }}>
                                    <td style={{ padding: '12px 0', fontWeight: 600, color: '#374151', verticalAlign: 'top', fontSize: textSizes.sm.fontSize }}>Date of Birth:</td>
                                    <td style={{ padding: '12px 0', color: '#374151', fontSize: textSizes.sm.fontSize }}>{dob}</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid #FECACA' }}>
                                    <td style={{ padding: '12px 0', fontWeight: 600, color: '#374151', verticalAlign: 'top', fontSize: textSizes.sm.fontSize }}>Date of Service:</td>
                                    <td style={{ padding: '12px 0', color: '#374151', fontSize: textSizes.sm.fontSize }}>{dos}</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid #FECACA' }}>
                                    <td style={{ padding: '12px 0', fontWeight: 600, color: '#374151', verticalAlign: 'top', fontSize: textSizes.sm.fontSize }}>Records Requested:</td>
                                    <td style={{ padding: '12px 0', color: '#374151', fontSize: textSizes.sm.fontSize }}>{records}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Uploaded Files Section */}
                    {files && files.length > 0 && (
                        <div style={{
                            background: '#F8FAFC',
                            border: '1px solid #E2E8F0',
                            borderRadius: 8,
                            padding: 20,
                            marginBottom: 24
                        }}>
                            <h3 style={{
                                fontWeight: 700,
                                color: '#2563eb',
                                marginBottom: 12,
                                fontSize: textSizes.lg.fontSize
                            }}>Uploaded Authorization Documents</h3>
                            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                                {files.map((file, idx) => (
                                    <li key={idx} style={{ color: '#374151', fontSize: textSizes.sm.fontSize, marginBottom: 6 }}>
                                        <span style={{ color: '#D52128', fontWeight: 600, marginRight: 8 }}>•</span>{file.file.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <p style={{ color: '#374151', marginBottom: 16 }}>
                        <b>Note:</b> This request was submitted via the secure online form for legal representatives. Please verify all authorizations before releasing any records.
                    </p>

                    <hr style={{ borderColor: '#e5e7eb', margin: '24px 0' }} />

                    <p style={{ color: '#374151', marginBottom: 8 }}>Thank you for your prompt attention to this request.</p>
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
    );
}; 