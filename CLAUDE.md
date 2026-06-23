# CLAUDE.md — IAG x UTS Hackathon

> Running context for the hackathon. Update as decisions are made.

## Event Details

| Item | Value |
|------|-------|
| Event | IAG x UTS Tech Fest Hackathon |
| Dates | Day 1: Mon 23 June 2026, Day 2: Tue 24 June 2026 |
| Team | Immanuel, Boris, + others TBD |
| Prizes | $800 (1st), $400 (2nd) |
| Format | Design thinking: Empathize → Define → Ideate → Prototype → Test → Pitch |
| Prototype tools suggested | Lovable, Marvel App, Justinmind |

## Judging Criteria (IMPORTANT — drives all decisions)

| Criterion | Weight | What judges look for |
|-----------|--------|---------------------|
| **Customer Value & Impact** | **/20** | Real problem, strong value, easy to understand, **clear contribution to making the world a safer place** (IAG hero value) |
| Creative & Responsible Use of Technology | /10 | Thoughtful, creative, responsible, original |
| Pitch & Communication | /5 | Clear, engaging, well-structured, easy to follow |
| Thinking & Iteration | /5 | Tested with others, improved based on feedback |

**Key insight:** Customer Value & Impact is DOUBLE weighted. The "safer place" framing rewards prevention and protection, not just convenience.

## Problem Statement

**Narrow focus: Home insurance. Address-level risk transparency.**

> When someone buys or owns a home, they have no easy way to see what has actually happened at or near that address — floods, storms, bushfires, burst pipes, break-ins. The insurer knows (they've paid claims there for decades), but the customer is buying blind. They find out their area floods when their living room is underwater.

**HMW:** "How might we give homeowners transparent, data-backed risk information about their property so they can protect themselves before something goes wrong?"

## Customer Pain Points

| # | Pain Point | What actually happens |
|---|-----------|----------------------|
| 1 | **Buying blind** | You buy a house, you don't know it floods every 3 years. The insurer knows — they priced your premium on it — but you never see the data. |
| 2 | **No context for premiums** | Premium goes up 30%. You don't know why. Is it your area? Your roof? A claim 5 years ago? No explanation, just a bigger bill. |
| 3 | **Risks are invisible until they hit** | You don't know your suburb has had 47 hail claims in the last 2 years until your car is dented. The pattern was there — nobody showed you. |
| 4 | **Prevention is guesswork** | Should you clear gutters? Get a roof inspection? Install a sump pump? Without knowing what actually goes wrong at properties like yours, you're guessing. |
| 5 | **Data exists but is locked away** | Flood maps, bushfire ratings, claims density, weather event history — it all exists in government and insurer databases. None of it is presented to the customer in a useful way. |

**Root cause:** Risk data is used to price policies (insurer benefit) but never shared with the customer to help them act (customer benefit).

## The Core Insight

> The data already exists. Flood records, storm damage history, bushfire zones, claims patterns by postcode — all public or insurer-held. The problem isn't generating new data. The problem is that nobody puts it in front of the homeowner in a clear, address-specific, actionable way.

## Chosen Direction

### Concept: "SafeAhead"
> *See what's happened. Know what's coming. Protect your home.*

**What it is:** You enter your home address. The tool pulls together historical incident data for that location and surrounding area (5–20 year window) and shows you:

1. **What has happened here** — flood events, storm damage, bushfire proximity, recorded break-ins, hail events, subsidence. Sourced from public data (BOM, SES, RFS, ABS, council records, catastrophe databases).
2. **How often** — frequency and recency. "This area flooded 3 times in the last 10 years" is different from "once, 18 years ago."
3. **What that means for your home** — plain-language risk summary. Not a score. Not a chatbot. Just: "Your area has high storm exposure. The most common damage type here is roof/gutter damage from hail."
4. **What you can do** — specific, practical prevention steps backed by the data. "Properties in this area with cleaned gutters had 60% fewer water ingress claims." Not generic tips — steps tied to what actually goes wrong here.

### What this is NOT
- Not a chatbot
- Not "AI-powered" marketing fluff
- Not personalised recommendations based on profiling
- Not a policy comparison tool
- Not real-time alerts (stretch feature, not core)

**It's a data transparency tool.** You look up your address, you see what's happened, you know what to watch for.

### Data Sources (public, real)
| Source | What it provides |
|--------|-----------------|
| BOM (Bureau of Meteorology) | Historical weather events, storm/cyclone records, rainfall extremes |
| SES incident data | Flood rescues, storm callouts by area |
| RFS (Rural Fire Service) | Bushfire history, BAL (Bushfire Attack Level) ratings |
| Council flood maps | Flood zone classification, historical flood levels |
| ABS / police stats | Break-in rates by area |
| ICA (Insurance Council of Australia) | Declared catastrophe events, claims data by region |
| CSIRO / Geoscience Australia | Soil data (subsidence risk), coastal erosion, earthquake zones |

### MVP Features (for demo)
1. **Address input** — enter an address, get a risk profile for that location
2. **Incident timeline** — visual history of what's happened in the area (last 5–20 years)
3. **Risk breakdown** — categorised: flood, storm, fire, theft, subsidence. With frequency data.
4. **Action list** — "Based on what happens here, these are the top 3 things to do to protect your property." Data-backed, not generic.

### Stretch Features
- Compare two addresses (useful when house hunting)
- Seasonal warnings based on historical patterns ("Storms peak here in November — last 5 years had events in Nov/Dec")
- Connect to policy to highlight coverage gaps relevant to your actual risks
- Neighbourhood-level heatmap view

### Why This Wins

**Customer Value & Impact (/20):**
- Solves "buying blind" — the #1 complaint from homeowners post-disaster ("why didn't anyone tell me?")
- Directly enables prevention = safer homes, safer families
- Empowers informed decisions (buy, renovate, prepare)
- Data-backed, not opinions

**Creative & Responsible Use of Technology (/10):**
- Aggregates existing public data into a single useful view (the tech is integration + presentation, not hype)
- Responsible by design — uses public data, no surveillance, no profiling, no discrimination
- Thoughtful: shows data transparently rather than hiding it behind a premium calculation

**Pitch & Communication (/5):**
- Dead simple to explain: "Enter your address, see what's happened here, know what to do about it."
- Demo is visual and immediate — type an address, get results

**Thinking & Iteration (/5):**
- Testable on Day 1: show people their own address, ask "is this useful? what's missing?"
- Iterate on what data people actually care about vs. what overwhelms them

### Target Persona: Mike

**Demographics:** Man, 29. Employed, six-figure salary. First-time homebuyer. Lives in his parents' basement (Eastern Creek, western Sydney). Has a car. Humble, careful with money. Atomic Habits reader. Listens to Clairo on wired earbuds.

**Backstory:** Mike's parents' basement flooded in a major western Sydney downpour. He lost his laptop, records, clothes. The insurer barely paid out — argued the basement wasn't a "habitable room." Mike had lived there his entire life and never knew the area was flood-prone. The insurer knew (they'd been pricing the premium on that risk for years), but nobody told the family. That flood changed him.

**Current situation:** Mike's finally moving out. Buying his first home — a townhouse in Eastern Creek. He's excited but terrified. The flood taught him: you can live somewhere for years and not know what risks are underneath you. Now he's looking at listings and thinking:
- Does this area flood too?
- Has this property had damage before?
- Why is this quote $400 more than the place two streets over?
- What am I actually paying for — and what's NOT covered?

He's googling "Eastern Creek flood history" and getting nothing useful. Council flood maps are buried in 200-page planning docs. BOM data is raw. Real estate agents say "it's fine."

**Says:**
- "Why can't I get coverage?"
- "Why did my premium jump 30%?"
- "I must get insurance to cover my house"
- "I wish they would tell me what's wrong with the property"
- "There must be a way for me to be secure in my insurance decisions"

**Thinks:**
- Is there flooding in Eastern Creek? The listing doesn't say.
- How does insurance work?
- I hope I'm not missing anything important.
- I don't know how risk, premiums, and coverage actually work for my property.

**Does:**
- Pays higher premiums without understanding why
- Guesses at home maintenance without a targeted plan
- Discovers historical risks only after damage happens
- Relies on real estate agent or broker suggestions
- Chooses policies based on price rather than coverage understanding

**Feels:**
- Scared — doesn't want his parents' story to repeat
- Worried about insurance policies
- Low confidence interpreting insurance information
- Confused by exclusions and fine print
- Apprehensive about financial future
- Anxious about making a wrong financial decision

**Goals:**
- Buy in Eastern Creek with open eyes
- Get insurance quickly so settlement isn't delayed
- Save money
- Choose a policy that's "good enough" and affordable
- Feel confident to be properly protected

**Pain points:**
- Buying blind — purchasing property without visibility into historical risk
- Doesn't know what historical events mean for his policy
- Unexplained costs — premium hikes passed onto him without context about area/roof/history
- Invisible risks — localised threat patterns (hail, flood claims) are hidden from him
- He knows insurers have access to crucial data but they don't share it with him
- Sudden emergencies that would drain savings

**His journey with SafeAhead:**
1. Mike's browsing listings. Finds the Eastern Creek townhouse.
2. Opens SafeAhead, types the address.
3. Sees: flood zone (moderate), 2 flood events in 10 years within 1km, hail claims (high — 34 nearby in 3 years), bushfire (low), break-ins (average).
4. Sees a timeline: "March 2022 — flash flooding affected 12 properties on this street." "November 2023 — severe hailstorm, 4cm hailstones."
5. Sees actions: "Add flood cover (not included by default in this area). Clean gutters before November. Consider hail-rated roofing if renovating."
6. Buys the property with open eyes. Adds flood cover. Cleans the gutters in October. Moves in prepared, not paranoid.

Mike doesn't get blindsided. His parents' story doesn't repeat.

### Business Case (for IAG)
- Informed customers make fewer claims (prevention works)
- Transparency builds trust → retention
- Reduces "surprise" claim denials (customer already knows gaps)
- Differentiator: no other insurer shows you this data plainly
- Could drive upsell: "Your area has high flood risk — your current policy doesn't include flood cover. Add it?"

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-06-22 | Chose proactive risk concept | Strongest alignment with /20 "safer outcomes" criterion |
| 2026-06-22 | Narrowed to home insurance, address-level data | Specificity > breadth. Tangible demo. Solves "buying blind." |
| 2026-06-22 | Stripped "AI-powered" framing | The value is data transparency, not AI. Tech is a means, not the point. |

## Open Questions
- [ ] Which IAG brand to frame the demo under? (NRMA most recognisable in NSW)
- [ ] Tech stack for prototype?
- [ ] Which data sources to simulate vs. pull live for demo?
- [ ] How far back for incident history? (5yr? 10yr? 20yr?)
- [ ] Do we show a "risk score" or avoid reductive scoring?

## Resources
- `IAG Hackathon.pdf` — Miro board export with full hackathon structure
- `team-brief.pdf` — 1-page team brief (needs updating to reflect new direction)
- `team-brief.html` — editable source for brief
