---
name: generate-test-data
description: Inspect an application and create or update a safe, reproducible test dataset with normal records, boundary values, invalid inputs, unusual Unicode, relationship states, and a replay manifest. Use when preparing fixtures, factories, seeds, demo data, integration-test data, database test data, or an edge-case corpus, especially when AI-assisted generation must remain debuggable and repeatable.
---

# Generate Test Data

Build test data that is varied during authoring and deterministic during execution. Treat generated data as versioned test code.

## Gather context

Inspect the repository before editing:

1. Read `CLAUDE.md`, relevant package manifests, migrations, schemas, model definitions, validation rules, factories, fixtures, seeders, and tests.
2. Identify the test command, data-loading mechanism, database constraints, locale, supported encodings, and project naming conventions.
3. Infer nothing that can be verified from code. Ask one focused question only when a missing product rule would materially change the dataset.
4. Preserve unrelated changes and never target a shared, staging, or production database.

## Establish the data contract

Write a compact dataset plan before implementation. For every entity, record:

- required and optional fields;
- types, formats, bounds, uniqueness, and normalization rules;
- relationships and allowed lifecycle states;
- sensitive fields that require clearly fictional values;
- expected record count and covered scenarios.

Read [edge-cases.md](references/edge-cases.md) and select applicable cases. Do not add random oddities without a named behavior or invariant to test.

## Make generation reproducible

Use these rules:

1. Accept one explicit seed from the user or existing project configuration. Otherwise use `424242`.
2. Seed every pseudo-random source, including Faker instances. Avoid clocks, unseeded UUIDs, unordered collections, machine locale, and environment-dependent defaults.
3. Derive timestamps from a fixed UTC instant, defaulting to `2025-01-15T12:00:00Z`. Derive IDs deterministically or use stable checked-in IDs.
4. Sort emitted records and object keys where ordering is not semantically meaningful.
5. Pin the generator dependency and record its version.
6. If an LLM helps author values, never invoke it during ordinary test execution. Commit the accepted output as a fixture or snapshot.
7. If a test specifically exercises an LLM integration, record the exact provider, model/version, system prompt, user prompt, parameters, seed when supported, and raw response. Replay the recorded response by default. A seed alone does not guarantee identical LLM output.

Create a machine-readable manifest next to the dataset using project-appropriate syntax. Include at least:

```json
{
  "dataset_version": 1,
  "seed": 424242,
  "reference_time": "2025-01-15T12:00:00Z",
  "generator": {"name": "project generator", "version": "pinned"},
  "locale": "project locale",
  "scenarios": [],
  "expected_counts": {}
}
```

## Design the dataset

Separate records into named scenario groups:

- `baseline`: common valid workflows;
- `boundaries`: minimum, maximum, just-inside, and just-outside values;
- `relationships`: missing optional relations, multiple relations, duplicates where forbidden, and lifecycle combinations;
- `unicode_and_format`: accents, non-Latin scripts, emoji, combining marks, whitespace, punctuation, and normalization;
- `invalid`: one deliberate violation per record when the loader can represent invalid inputs;
- `security_strings`: inert strings resembling injection payloads, used only to verify escaping and validation;
- `volume`: a deterministic larger set only when performance or pagination matters.

Give each handcrafted record a stable scenario ID such as `username-emoji-valid`. Include the scenario ID in fixture metadata or an adjacent case map so a failed test identifies the generating case immediately.

Keep valid and intentionally invalid data in separate files or loaders. Never let invalid fixtures break the standard test bootstrap.

## Implement

Use the repository's existing language, factory library, fixture format, and test conventions. Prefer a small deterministic generator plus reviewed checked-in output when the dataset is large; prefer plain fixtures when the dataset is small.

Ensure:

- referential integrity and uniqueness for valid data;
- no real personal data, secrets, tokens, or production-derived identifiers;
- deterministic cleanup and idempotent loading;
- explicit encoding, timezone, and locale;
- comments only where intent is not clear from scenario names.

Do not weaken application validation merely to load invalid cases. Exercise invalid inputs through the same boundary under test, such as an API request, form submission, parser, or validator.

## Verify

Run the narrowest relevant checks, then the normal test command when practical:

1. Generate twice with the same seed and confirm byte-for-byte identical output.
2. Generate with a different seed and confirm only intended stochastic records change; handcrafted edge cases must remain stable.
3. Load the valid dataset into an isolated test environment.
4. Verify manifest counts, unique constraints, foreign keys, scenario IDs, and expected invalid outcomes.
5. Ensure logs and failure messages report the seed and scenario ID.

Report the created files, seed, reference time, covered scenario groups, verification commands, and any gaps caused by missing product rules.

## Invocation examples

- “Use `generate-test-data` to prepare fixtures for this application.”
- “Create 200 reproducible users with edge cases for names, addresses, and account states.”
- “Reproduce the failed dataset with seed 91827 and add the discovered case permanently.”
