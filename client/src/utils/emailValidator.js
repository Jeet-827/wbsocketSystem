import validator from 'validator';

let disposableSet = null;
let loadingPromise = null;

// Common disposable domains for instantaneous check before full chunk loads
const commonDisposableDomains = new Set([
    'mailinator.com',
    '10minutemail.com',
    'guerrillamail.com',
    'trashmail.com',
    'yopmail.com',
    'tempmail.com',
    'tempmail.net',
    'throwawaymail.com',
    'sharklasers.com',
    'getairmail.com',
    'dispostable.com',
    'fakemailgenerator.com',
    'maildrop.cc',
    'mohmal.com'
]);

export const loadDisposableSet = async () => {
    if (disposableSet) return disposableSet;
    if (!loadingPromise) {
        loadingPromise = import('disposable-email-domains').then((mod) => {
            const list = mod.default || mod;
            disposableSet = new Set(Array.isArray(list) ? list : Object.keys(list));
            return disposableSet;
        }).catch((err) => {
            console.error('Failed to load disposable domains list', err);
            return commonDisposableDomains;
        });
    }
    return loadingPromise;
};

// Preload domains in idle time in browser
if (typeof window !== 'undefined') {
    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => loadDisposableSet());
    } else {
        setTimeout(() => loadDisposableSet(), 1000);
    }
}

const checkDomain = (domain, set) => {
    if (!set) return false;
    if (set.has(domain)) return true;
    const subParts = domain.split('.');
    for (let i = 1; i < subParts.length - 1; i++) {
        const parent = subParts.slice(i).join('.');
        if (set.has(parent)) return true;
    }
    return false;
};

/**
 * Synchronous validation for instant typing feedback.
 * @param {string} email
 * @returns {{ isValid: boolean, error?: string }}
 */
export const validateEmailSync = (email) => {
    if (!email || typeof email !== 'string') {
        return { isValid: false, error: 'Email is required' };
    }

    const trimmed = email.trim();

    if (!validator.isEmail(trimmed)) {
        return { isValid: false, error: 'Please enter a valid email address' };
    }

    const parts = trimmed.toLowerCase().split('@');
    if (parts.length !== 2) {
        return { isValid: false, error: 'Invalid email structure' };
    }

    const domain = parts[1];

    const activeSet = disposableSet || commonDisposableDomains;
    if (checkDomain(domain, activeSet)) {
        return {
            isValid: false,
            error: 'Temporary or disposable email domains are not allowed. Please use a permanent email address.'
        };
    }

    return { isValid: true };
};

/**
 * Asynchronous validation with full 120,000+ domain check.
 * @param {string} email
 * @returns {Promise<{ isValid: boolean, error?: string }>}
 */
export const validateEmailAsync = async (email) => {
    const syncResult = validateEmailSync(email);
    if (!syncResult.isValid) return syncResult;

    const parts = email.trim().toLowerCase().split('@');
    const domain = parts[1];

    const fullSet = await loadDisposableSet();
    if (checkDomain(domain, fullSet)) {
        return {
            isValid: false,
            error: 'Temporary or disposable email domains are not allowed. Please use a permanent email address.'
        };
    }

    return { isValid: true };
};

export const validateEmail = validateEmailSync;
