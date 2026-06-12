# Professional Logs — Marco

Cumulative observations on Marco's decision-making, technical direction, and creative judgment across sessions on this project. Newest session at the top of the Session Log; Cumulative Profile updated at the top.

---

## Cumulative Profile

### Strengths
- **Refuses cargo-cult adoption.** When presented with externally-suggested patterns, he asks for an audit-first analysis instead of letting an AI auto-implement them. Sees the cost of incidental complexity.
- **Open to course-correction mid-conversation.** Will reverse decisions when given new framing (e.g., "sin rostro" → "con rostro" within minutes once tradeoff was named).
- **Modest about technical surface area.** Doesn't lead with capability stack; reveals it in pieces only when relevant. Reduces ego cost of being wrong.
- **Self-aware about feature creep.** Flags own architectural bloat (e.g., "ADR-030 lleva 9 sesiones sin disparar — candidato a retiro narrativo") instead of defending it.
- **Exceptional visual direction vocabulary.** Directs UI craft using motion-designer language ("blureálo 200%", "fusión de layer tipo Add", "que se queme como After Effects Glow", "filament detrás del botón, no debajo"). Translates a felt visual target into precise, iterable adjustments. This is his deepest competitive moat — the AI executes, but the eye is his.
- **Iterates toward a target rather than accepting first output.** Rejected 2 CTA approaches before landing the dark-mode LED concept, then drove ~6 micro-iterations on the glow alone. Knows the difference between "works" and "right".

### Areas to develop
- **Commercial muscle dormant.** Has not closed a paying client in ~2 years. Outbound, pricing conversations, and deal mechanics will need deliberate practice, not just publishing content.
- **Narrative discipline across a product portfolio.** Tendency to seed multiple products (engine, SaaS, motion engine, Guardians) before commercial validation of any. The risk is fragmentation — communicating one coherent identity will require active editing of what to mention publicly vs. what to keep in roadmap.
- **Tension between "cero runway" and "lo que sea es bueno".** Without explicit revenue thresholds, hard to know when to pivot tactics. Recommend setting binary checkpoints (e.g., "if no client by week 8, change channel").

---

## Session Log

### Session 002 — 2026-05-28

#### Direction & Decision-Making
- Ran the session as a structured ingestion before any code: fed 13 strategic docs one-by-one and explicitly required "no plan until you've integrated each document." Disciplined sequencing — refused to let the AI jump to execution before context was complete. This is the antidote to the fragmentation risk flagged in S001.
- Made a clean, irreversible call (full Next.js wipe → Vite rebuild) but only after the AI surfaced the coherence argument (the site should run the stack it sells). Accepts bold moves when the rationale is structural, not cosmetic.
- Corrected scope creep in real time: when the AI over-engineered a CTA into a "Facebook ad card", he rejected it twice and redirected with a concrete reference and a new concept (dark-mode sandwich). Doesn't tolerate drift from the visual target.
- Deferred the admin panel explicitly after the AI argued it was premature ("construir el armario antes de tener la ropa"). Heard the feature-creep warning and acted on it — direct evidence the S001 "seed features before validation" pattern is now being actively managed.
- Kept commercial discipline: reaffirmed no public pricing in v1, anchored to a real future client (university) rather than theoretical rate tables.

#### Technical Strategy
- Insisted on a single source of truth for design (`tokens.css`, oklch) so "cambiar 3 valores → cambia el sitio". Optimizes for modulation speed over premature polish.
- Caught a real production hazard himself (almost connected R2 bucket to `www.renderdevo.com`, which would have killed the site) — paused and asked "¿continúo?" instead of clicking through. Good instinct to stop at irreversible infra steps.
- Pragmatic codec call: abandoned WebM when HandBrake's VP9 underperformed, shipped MP4-only for v1. Chose workflow simplicity over marginal compression gains.

#### Creative
- Defined and locked the visual dialect ("Neo-Tactile + Warm/Cool Light") as an explicit anti-positioning move against generic dark+cyan AI-agency aesthetics. The warm-then-cool pivot was deliberate, not indecision.
- Designed the page rhythm as a dark/light sandwich (dark header + dark CTA framing a light body, light footer closing) — a compositional instinct that reads as intentional, not template-driven.
- The LED-glow direction (hot white core that "burns" + lush blue body + atmospheric halo) is a motion-designer's mental model applied to CSS. Produced a result CSS-blur-alone could not.

#### Areas of Opportunity
- **The site is shipped but empty of proof.** Hero still, case studies, profile photo, and the two empty WorkGrid tabs are all pending Marco-produced assets. The structural work is done; momentum now depends on him producing visual content, which is his strength — but it's a different work mode than directing iteration. Risk: the scaffolding sits unfilled for weeks. Recommend time-boxing asset production (e.g., "hero + 4 case frames by end of week").
- **Still zero commercial motion.** Two productive build sessions, no outbound, no discovery call booked, Calendly not yet created. The site existing changes nothing commercially until it has a CTA destination and a pipeline. Next session should prioritize the `/contacto` + Calendly path over more polish.
- **Pricing remains deferred indefinitely.** "Anchor en universidad" is sound, but if that client doesn't materialize, there's no fallback trigger. Recommend a binary: if no university anchor signed by a set date, validate pricing with 2 cold conversations instead.

#### Direction & Decision-Making
- Pushed back on a suggested AI-pattern (Pre-Deploy Automation Triangle) before letting it execute. Asked for audit. Accepted the "abort + document why" recommendation when the audit showed no fit. Strong signal that he treats AI suggestions as proposals, not directives.
- Set durable workflow rule mid-session ("commitea a main, siempre"). Concise, opinionated, unambiguous. Communicates strong preference for low-ceremony solo-dev flow.
- Disclosed restrictions openly (zero runway, zero clients in 2 years, zero current marketing presence). No ego protection — operates as if the strategy doc must work given real constraints, not aspirational ones.
- Revised the "renderdevo sin rostro" decision to "con rostro" once the creator-economy tradeoff was named. Decision was provisional, not identity-bound.

#### Technical Strategy
- Stack reality is significantly more sophisticated than initial framing suggested: own 3D engine on R3F, ~20 D1 migrations, monorepo with reusable packages, 234 tests passing, full Cloudflare integration. Solo-built.
- Self-flagged the ADR-030 (Guardians) as candidate for narrative retirement. Recognizes that designed-but-not-shipped features become dead weight.
- Engine is portable across domains (eljardinperdido + defensadepuebla already share `@ashur/engine`). This portability is the asset that justifies a B2B serious-games pitch — bigger than any single product.

#### Creative
- Brand architecture decision: renderdevo (umbrella, with face) vs marcomotion (CV/recruiter destination) vs product domains. Clean separation of audiences, no overlap.
- Anti-positioning instinct is sharp ("no quiero ser otra agencia de marketing", "no consultor IA opinando"). Knows what to avoid before knowing what to be.

#### Areas of Opportunity
- **Validate pricing in the real world before committing to the strategy doc's rates.** The $25K–$35K MXN/month motion pack is anchored to Envato history (creator-economy pricing), not LATAM B2B sales. Three discovery calls within Q2 should confirm or reset that range.
- **Build outbound discipline as a daily habit, not a campaign.** "20 marcas/semana" written in a doc is different from execution. Track in a spreadsheet visible to himself; review weekly.
- **Make the Guardians decision binary and time-boxed.** The "9 sessions without execution" pattern repeats across other features unless interrupted. Recommend writing the kill/simplify/spike decision into the next session's first agenda item, not deferring it.
- **Bridge ES-native to EN-conversational gap deliberately.** If LATAM cap is real, accept it; if EN markets are part of 2027 plan, start practicing pitch language now (not waiting until language is "ready").
