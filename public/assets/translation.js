function TranslateInit() {
    try {
        if (!window.__GOOGLE_TRANSLATION_CONFIG__) {
            console.warn('Google Translate config not found, retrying...');
            // Retry after a short delay
            setTimeout(() => {
                if (window.__GOOGLE_TRANSLATION_CONFIG__) {
                    TranslateInit();
                }
            }, 1000);
            return;
        }

        if (typeof google === 'undefined' || !google.translate) {
            console.warn('Google Translate API not loaded, retrying...');
            setTimeout(TranslateInit, 1000);
            return;
        }

        new google.translate.TranslateElement({
            pageLanguage: window.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage,
        });

        console.log('Google Translate initialized successfully');
    } catch (error) {
        console.error('Error initializing Google Translate:', error);
    }
}

// Ensure the function is available globally
window.TranslateInit = TranslateInit;