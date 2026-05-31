type CategoryKey = "necessary" | "analytics" | "functional" | "marketing";
type CategoryState = Record<CategoryKey, boolean>;
interface ConsentRecord {
    schemaVersion: number;
    version: number;
    timestamp: string;
    categories: CategoryState;
}
type ConsentSignal = "ad_storage" | "ad_user_data" | "ad_personalization" | "analytics_storage" | "functionality_storage" | "personalization_storage" | "security_storage";

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
type BannerPosition = "bottom" | "top";
type ButtonPosition = "bottom-left" | "bottom-right" | "top-left" | "top-right";
interface Position {
    banner: BannerPosition;
    button: ButtonPosition;
}
interface CookieConsentConfig {
    cookieName: string;
    cookieDomain?: string;
    consentVersion: number;
    expiryDays: number;
    policyUrl?: string;
    honorGpc: boolean;
    position: Position;
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
    /**
     * Re-render with a new config without tearing down the shadow host. The theme
     * swaps live (CSS variables), the banner/modal/button DOM is rebuilt in place,
     * and the slide-in animation does not replay. Cheap enough for live editing.
     */
    update(config: Partial<CookieConsentConfig>): void;
}
declare function init(input: Partial<CookieConsentConfig>): CookieConsentInstance;

export { type BannerPosition, type ButtonPosition, type CategoryConfig, type CategoryKey, type CategoryState, type ConsentRecord, type ConsentSignal, type CookieConsentConfig, type CookieConsentInstance, type CookieDef, type Labels, type Position, init };
