# Professional Logs — Marco

Cumulative observations on Marco's decision-making, technical direction, and creative judgment across sessions on this project. Newest session at the top of the Session Log; Cumulative Profile updated at the top.

---

## Cumulative Profile

### Strengths
- **Refuses cargo-cult adoption.** When presented with externally-suggested patterns, he asks for an audit-first analysis instead of letting an AI auto-implement them. Sees the cost of incidental complexity.
- **Open to course-correction mid-conversation.** Will reverse decisions when given new framing (e.g., "sin rostro" → "con rostro" within minutes once tradeoff was named).
- **Modest about technical surface area.** Doesn't lead with capability stack; reveals it in pieces only when relevant. Reduces ego cost of being wrong.
- **Self-aware about feature creep.** Flags own architectural bloat (e.g., "ADR-030 lleva 9 sesiones sin disparar — candidato a retiro narrativo") instead of defending it.

### Areas to develop
- **Commercial muscle dormant.** Has not closed a paying client in ~2 years. Outbound, pricing conversations, and deal mechanics will need deliberate practice, not just publishing content.
- **Narrative discipline across a product portfolio.** Tendency to seed multiple products (engine, SaaS, motion engine, Guardians) before commercial validation of any. The risk is fragmentation — communicating one coherent identity will require active editing of what to mention publicly vs. what to keep in roadmap.
- **Tension between "cero runway" and "lo que sea es bueno".** Without explicit revenue thresholds, hard to know when to pivot tactics. Recommend setting binary checkpoints (e.g., "if no client by week 8, change channel").

---

## Session Log

### Session 001 — 2026-04-26

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
