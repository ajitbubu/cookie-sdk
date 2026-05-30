// Global Privacy Control detection. GPC is a browser-level "do not sell/share"
// opt-out signal (CCPA/CPRA recognize it as a valid opt-out request). When present
// and honored, the SDK defaults marketing/ad-targeting to denied and surfaces the
// "Opt-Out Request Honored" notice in the preferences modal.
// Spec: https://globalprivacycontrol.github.io/gpc-spec/

export function isGpcActive(nav: Navigator | undefined = typeof navigator !== "undefined" ? navigator : undefined): boolean {
  if (!nav) return false;
  // navigator.globalPrivacyControl is the standard DOM property when GPC is on.
  return (nav as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}
