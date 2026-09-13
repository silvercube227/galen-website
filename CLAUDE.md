# Galen — Product Summary for Website (brief for Claude Code)

## One-liner

Galen is an AI regulatory agent that drafts FDA Letter-to-File (LTF) and
510(k)-change assessments for medtech software teams — turning a code change,
ticket, or ECO into a cited, review-ready regulatory decision in minutes
instead of days.

## The problem

Every design or software change to a cleared medical device requires a
decision: does this need a new FDA 510(k) submission, or can it be documented
as a Letter-to-File under 21 CFR 807.81(a)(3)? Getting this wrong in either
direction is expensive — over-file and burn $50K–$250K+ on unnecessary
testing and submission prep; under-file and risk an FDA warning letter or a
recall.

That decision leans on two dense FDA guidance flowcharts (device changes,
software changes, both issued 2017), a company's own change-control SOP, and
QMS records scattered across systems — the design history file, risk files,
prior 510(k)s, V&V reports — plus live context from git, Jira, Polarion, and
similar tools. Today this is manual, slow, and inconsistent: done by RA/QA
staff or outside consultants billing $75–$450/hr, taking many hours per
change.

## What Galen does

- Ingests a company's QMS/DHF documents, prior 510(k)s and LTFs, and risk
  files, and pulls in live change context (git diffs, Jira tickets, ECOs)
  without mirroring those systems into a permanent corpus.
- Runs the FDA decision logic as an explicit, versioned decision tree — not a
  free-form LLM prompt — where every node cites the exact evidence it used.
- Outputs a drafted LTF (or flags that a 510(k) is likely required) as a
  `.docx`, with every field backed by a citation an RA can click through to
  the source excerpt.
- Keeps a human in the loop by design: field-by-field accept/edit/reject, and
  a separate approver signs off. Galen never auto-submits or auto-finalizes a
  regulated record.

## Why it's different / defensible

- **Not RAG-over-documents.** The regulatory logic is an explicit, auditable,
  versioned decision tree built from FDA's own guidance, structured so it can
  be validated the way a customer's QA team validates other quality-system
  software (QMSR §4.1.6 / ISO 13485 §4.1.6).
- **Every field is cited.** Unsupported claims render as flagged placeholders,
  never invented prose. This directly targets the worst realistic failure
  mode for this product: a plausible-sounding but unsupported justification
  landing in a regulated record that an FDA investigator might read years
  later.
- **Assistant, not system of record.** The approved LTF still lives in the
  customer's own QMS/RIM platform (Veeva Vault, MasterControl, Polarion).
  Galen exports a `.docx` plus a machine-readable evidence sidecar for
  write-back. This keeps the compliance burden lighter and matches direct
  feedback from a large device-maker contact, who said their auditability
  preference favors assist-and-write-back tools over standalone
  systems-of-record.

## Who it's for

RA (regulatory affairs) and QA teams at medical device / medtech software
companies with active 510(k)-cleared product lines making frequent
software or design changes — ranging from single-product mid-market
companies to large multi-line device makers. The buyer is typically an RA
manager, QA director, or VP of RA/QA.

## Market context (for internal credibility — use judgment on whether this belongs in public copy)

Roughly 6,500 US FDA-regulated medical device companies. Base-case market
sizing lands around $3.7B/year combined across two pools: routine RA/QA
labor spent on document review and LTF drafting (~$1.5B/yr), and cost
avoided by not over-filing unnecessary 510(k)s when a defensible LTF
justification exists instead (~$2.2B/yr — the larger driver, since a single
misjudged over-filing costs $50K–$250K+).

## Stage / traction

Pre-revenue MVP. Currently building the core pipeline (evidence dossier →
decision tree → cited draft) and validating it with a real RA review before
onboarding design partners. Not yet claiming customers or case studies on
the site — the honest framing is "in development, seeking design partners,"
not "trusted by."

## Tone and brand direction

This sells into a conservative, compliance-minded, engineering-adjacent
buyer — not a consumer SaaS audience. The site should read as serious,
dense-but-clean, enterprise-trustworthy software, closer to how security or
compliance tooling presents itself than a typical startup landing page.
Avoid hype language ("revolutionary," "game-changing"); lead with the
concrete mechanism (a cited, auditable decision tree) and the concrete cost
of getting the 510(k)/LTF call wrong. No emojis, no cutesy copy.

No domain name is finalized yet — build with a placeholder/configurable site
name rather than hardcoding one.

## Suggested site sections

1. **Hero** — the core problem (the LTF-vs-510(k) decision and the cost of
   getting it wrong) plus a one-line statement of what Galen does.
2. **How it works** — ingest → evidence dossier → decision tree → cited
   draft → human review and sign-off. Four or five steps, visual, concrete.
3. **Why trust it** — citations on every field, a versioned/auditable
   decision tree instead of a black-box prompt, the "assistant not
   system-of-record" positioning, an audit trail built for QA validation.
4. **Who it's for** — RA/QA teams at medtech companies, with the specific
   pain point (an ambiguous change-control call) named plainly.
5. **CTA** — since this is pre-revenue, the ask is design partners /
   "talk to us," not self-serve signup.