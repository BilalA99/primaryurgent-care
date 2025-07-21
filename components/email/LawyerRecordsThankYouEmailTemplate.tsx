import React from 'react';

interface LawyerRecordsThankYouEmailProps {
    lawFirm: string;
    email: string;
    patientName: string;
}

const textSizes = {
    xs: { fontSize: '12px', lineHeight: '16px' },
    sm: { fontSize: '14px', lineHeight: '20px' },
    base: { fontSize: '16px', lineHeight: '24px' },
    lg: { fontSize: '18px', lineHeight: '28px' },
    xl: { fontSize: '20px', lineHeight: '28px' },
    '2xl': { fontSize: '24px', lineHeight: '32px' },
};

export const LawyerRecordsThankYouEmailTemplate: React.FC<Readonly<LawyerRecordsThankYouEmailProps>> = ({
    lawFirm,
    email,
    patientName,
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
                    }}>Thank You for Your Medical Records Request</h2>

                    <p style={{ color: '#374151', marginBottom: 16 }}>
                        Dear {lawFirm},
                    </p>

                    <p style={{ color: '#374151', marginBottom: 16 }}>
                        Thank you for submitting a medical records request for your client, <b>{patientName}</b>.
                    </p>

                    <p style={{ color: '#374151', marginBottom: 16 }}>
                        We have received your request and our records team will review the information provided. If we need any additional documentation or clarification, we will reach out to you at <b>{email}</b>.
                    </p>

                    <p style={{ color: '#374151', marginBottom: 16 }}>
                        Once your request has been processed, you will receive a follow-up email with the status or next steps. We strive to handle all requests promptly and securely, in accordance with HIPAA guidelines.
                    </p>

                    <p style={{ color: '#374151', marginBottom: 16 }}>
                        If you have any questions or need immediate assistance, please contact our office at <a href="tel:5612238024" style={{ color: '#D52128', textDecoration: 'underline', fontWeight: 600 }}>(561) 223-8024</a>.
                    </p>

                    <hr style={{ borderColor: '#e5e7eb', margin: '24px 0' }} />

                    <p style={{ color: '#374151', marginBottom: 8 }}>Thank you for choosing Primary & Urgent Care Centers for your client’s care needs.</p>
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