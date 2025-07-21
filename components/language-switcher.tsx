'use client';
import { useEffect, useState } from 'react';
import { parseCookies, setCookie } from 'nookies';

const COOKIE_NAME = 'googtrans';

interface LanguageDescriptor {
    name: string;
    title: string;
}

declare global {
    namespace globalThis {
        var __GOOGLE_TRANSLATION_CONFIG__: {
            languages: LanguageDescriptor[];
            defaultLanguage: string;
        };
    }
}

const LanguageSwitcher = () => {
    const [currentLanguage, setCurrentLanguage] = useState<string>();
    const [languageConfig, setLanguageConfig] = useState<any>();
    const [show, setShow] = useState(false);
    const [dismissed, setDismissed] = useState(false);
    const [showReloading, setShowReloading] = useState(false);

    // Show after 5 seconds, only once per session
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (sessionStorage.getItem('languageSwitcherDismissed')) {
                setDismissed(true);
                return;
            }
            const timer = setTimeout(() => setShow(true), 5000);
            return () => clearTimeout(timer);
        }
    }, []);

    // Initialize translation engine
    useEffect(() => {
        const cookies = parseCookies();
        const existingLanguageCookieValue = cookies[COOKIE_NAME];
        let languageValue;
        if (existingLanguageCookieValue) {
            const sp = existingLanguageCookieValue.split('/');
            if (sp.length > 2) {
                languageValue = sp[2];
            }
        }
        if (global.__GOOGLE_TRANSLATION_CONFIG__ && !languageValue) {
            languageValue = global.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage;
        }
        if (languageValue) {
            setCurrentLanguage(languageValue);
        }
        if (global.__GOOGLE_TRANSLATION_CONFIG__) {
            setLanguageConfig(global.__GOOGLE_TRANSLATION_CONFIG__);
        }
    }, []);

    if (!currentLanguage || !languageConfig || !show || dismissed) {
        return null;
    }

    const switchLanguage = (lang: string) => () => {
        setShowReloading(true);
        setCookie(null, COOKIE_NAME, '/auto/' + lang);
        setTimeout(() => {
            window.location.reload();
        }, 900);
    };

    const handleDismiss = () => {
        setShow(false);
        setDismissed(true);
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('languageSwitcherDismissed', '1');
        }
    };

    return (
        <>
            <div
                className="fixed bottom-8 right-8 z-50 animate-fade-in bg-white rounded-2xl shadow-2xl border border-[#A7E3F7] px-6 py-4 flex flex-col items-center gap-2 transition-all duration-500"
                style={{ fontFamily: 'var(--font-inter)', minWidth: 220 }}
            >
                <button
                    onClick={handleDismiss}
                    className="absolute top-2 right-2 text-gray-400 hover:text-[#D52128] text-xl font-bold focus:outline-none"
                    aria-label="Dismiss language switcher"
                >
                    ×
                </button>
                <span className="mb-2 text-base font-semibold text-[#2563eb]">🌐 Select Language</span>
                <div className="flex flex-wrap justify-center gap-2">
                    {languageConfig.languages.map((ld: LanguageDescriptor, i: number) => (
                        currentLanguage === ld.name ||
                            (currentLanguage === 'auto' && languageConfig.defaultLanguage === ld) ? (
                            <span key={`l_s_${ld.name}`} className="px-3 py-1 rounded-lg bg-[#D52128] text-white font-medium shadow">
                                {ld.title}
                            </span>
                        ) : (
                            <button
                                key={`l_s_${ld.name}`}
                                onClick={switchLanguage(ld.name)}
                                className="px-3 py-1 rounded-lg bg-[#F7FAFF] text-[#2563eb] font-medium hover:bg-[#D52128] hover:text-white transition"
                            >
                                {ld.title}
                            </button>
                        )
                    ))}
                </div>
            </div>
            {showReloading && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
                    <div className="bg-black/60 rounded-xl px-8 py-6 text-white text-lg font-semibold animate-fade-in">
                        Refreshing website to apply language...
                    </div>
                </div>
            )}
        </>
    );
};

export { LanguageSwitcher, COOKIE_NAME };