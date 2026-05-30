# TODOS — cookie-banner-sdk

## Post-v1

### Optional consent-record / audit export (proof-of-consent)
- **What:** A documented hook to export consent events (categories chosen, ISO
  timestamp, policy version, user agent) so integrators can demonstrate consent
  per GDPR Art. 7(1).
- **Why:** Proof-of-consent is the real differentiator between a "consent UI" and a
  usable CMP. Strongest strategic point from the eng-review outside voice.
- **Current state:** v1 ships client-only. `onConsent(categories)` already fires the
  event in-memory; this TODO adds a documented record schema + an example sink
  (callback or POST endpoint).
- **Where to start:** Extend `onConsent` payload with timestamp + version + schemaVersion;
  document a reference sink. Needs a storage story (backend) to be useful, which is why
  it's deferred from the drop-in client-only v1.
- **Depends on:** v1 shipped. No blockers.
