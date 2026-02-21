# 📜 Imperial HVAC — Project Constitution (`gemini.md`)

> **This file is LAW.** Only update when a schema changes, a rule is added, or architecture is modified.

---

## Project Identity

- **Name:** Imperial HVAC
- **Protocol:** B.L.A.S.T. v1
- **Created:** 2026-02-19
- **Status:** Complete (v1.0)

---

## Discovery Answers

1. **North Star:** Build a beautiful, unique web website using Stitch skills.
2. **Integrations:** N/A (None required initially)
3. **Source of Truth:** Web / Static Content (To be generated)
4. **Delivery Payload:** A completed, live website.
5. **Behavioral Rules:** Must be UNIQUE. Must NOT look cookie-cutter.

---

## Data Schemas

Since this is primarily a frontend/design generation project using Stitch, the "Data Schema" represents the prompt structure we will feed into Stitch and the expected output artifact.

### Input Schema (Stitch Prompt Payload)
```json
{
  "project_name": "Imperial HVAC",
  "industry": "HVAC (Heating, Ventilation, Air Conditioning)",
  "aesthetic_requirements": [
    "Unique",
    "Not cookie-cutter",
    "Premium",
    "Modern"
  ],
  "core_pages": [
    "Home",
    "Services",
    "Contact/Booking"
  ]
}
```

### Output Schema (Stitch Generation Result)
```json
{
  "artifact_type": "react_components | html_css",
  "design_system": "DESIGN.md",
  "status": "completed"
}
```

---

## Behavioral Rules

1. **Aesthetic Supremacy:** Reject standard, boring templates. Use striking typography, modern layouts, and premium color palettes.
2. **Skill Utilization:** Leverage `enhance-prompt`, `stitch-loop`, and `design-md` from the installed Stitch skills.

---

## Architectural Invariants

1. No code in `tools/` until Discovery is complete and Blueprint is approved
2. All intermediate files go in `.tmp/`
3. Business logic must be deterministic — no LLM guessing
4. If logic changes → update Architecture SOPs first, then code

---

## Maintenance Log

| Date | Change | Author |
|------|--------|--------|
| 2026-02-19 | Project initialized | System Pilot |
| 2026-02-20 | Discovery completed, schema defined | System Pilot |
| 2026-02-21 | Site Skeleton 1.0 deployed to Netlify | System Pilot |
