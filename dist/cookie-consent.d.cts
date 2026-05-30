type CategoryKey = "necessary" | "analytics" | "functional" | "marketing";
type CategoryState = Record<CategoryKey, boolean>;
interface ConsentRecord {
    schemaVersion: number;
    version: number;
    timestamp: string;
    categories: CategoryState;
}

interface CookieDef {
    name: string;
    provider?: string;
    domain?: string;
    purpose?: string;
    duration?: string;
}
interface CategoryConfig {
    enabled?: boolean;
    locked?: boolean;
    description?: string;
    cookies: CookieDef[];
}
interface Labels {
    bannerText: string;
    acceptAll: string;
    rejectAll: string;
    preferences: string;
    modalTitle: string;
    rejectNonEssential: string;
    savePreferences: string;
    reopenButton: string;
    alwaysActive: string;
    close: string;
    viewCookies: string;
    backToCategories: string;
    searchPlaceholder: string;
    exportLabel: string;
    printLabel: string;
    resetToDefault: string;
    confirmChoices: string;
    policyLinkText: string;
    gpcNotice: string;
    gpcHonored: string;
    noCookies: string;
    notAvailable: string;
    columns: {
        name: string;
        provider: string;
        domain: string;
        expiry: string;
    };
    categoryNames: Record<CategoryKey, string>;
    categoryDescriptions: Record<CategoryKey, string>;
}
interface CookieConsentConfig {
    cookieName: string;
    cookieDomain?: string;
    consentVersion: number;
    expiryDays: number;
    policyUrl?: string;
    honorGpc: boolean;
    categories: Record<CategoryKey, CategoryConfig>;
    gtm: {
        consentMode: boolean;
        dataLayerEvent: string;
    };
    labels: Labels;
    theme?: Record<string, string>;
    onConsent?: (categories: Record<CategoryKey, boolean>) => void;
}

interface CookieConsentInstance {
    destroy(): void;
    openPreferences(): void;
    getConsent(): CategoryState | null;
}
declare function init(input: Partial<CookieConsentConfig>): CookieConsentInstance;

export { type CategoryKey, type CategoryState, type ConsentRecord, type CookieConsentConfig, type CookieConsentInstance, init };
