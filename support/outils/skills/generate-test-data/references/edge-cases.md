# Edge-case catalog

Select only cases relevant to the discovered schema and validation rules. Cover both accepted and rejected behavior.

## Strings and identity

- empty string, whitespace-only, absent, and null when distinct;
- one character; exact minimum and maximum; one below and one above;
- one extremely long unbroken token;
- leading/trailing whitespace and repeated internal whitespace;
- apostrophe, quote, backslash, slash, ampersand, angle brackets, and newline;
- accents, non-Latin scripts, right-to-left text, emoji, and mixed scripts;
- composed and decomposed Unicode forms; zero-width and combining characters;
- case variants that may collide under case-insensitive uniqueness;
- visually similar characters and normalization collisions.

## Numbers, money, and quantities

- zero, negative, minimum, maximum, and values adjacent to boundaries;
- decimals requiring rounding and values with maximum supported precision;
- very large integers and overflow candidates;
- NaN and infinities only where the transport or language can represent them;
- currencies with zero, two, or three minor-unit digits when applicable.

## Dates and time

- leap day; month and year boundaries;
- daylight-saving gaps and repeated local times;
- UTC offsets near date changes;
- dates before an epoch, far future dates, and expired values;
- equal start/end, end before start, and overlapping intervals;
- fixed “now” boundary: just before, exactly at, and just after.

## Collections and files

- empty, singleton, exact maximum, and one over maximum;
- duplicates, stable ordering, and reordered equivalents;
- missing, empty, malformed, and unsupported file types;
- zero-byte and exact/over size-limit files;
- unusual but legal filenames, multiple dots, and mismatched extension/content type.

## Relationships and state

- absent optional relation and every required relation present;
- orphan reference presented to the public boundary;
- one-to-many at zero, one, and maximum cardinality;
- duplicate relation attempts and self-reference;
- cyclic relationships where the model permits graph structures;
- every legal lifecycle state plus prohibited transitions;
- soft-deleted, archived, suspended, expired, and concurrently updated records;
- tenant isolation and authorization ownership boundaries.

## Addresses and contact fields

- one-word address, very long building name, missing optional components;
- apartment/unit, PO box, rural route, non-Latin address, and emoji;
- postal codes containing letters, leading zeros, or variable lengths;
- international phone numbers, extensions, and formatting variants;
- email with plus tag, subdomain, long labels, mixed case, and IDN where supported.

## Security and resilience

Keep payloads inert and local. Test correct rejection, encoding, or storage rather than exploitation.

- strings resembling SQL, HTML, script, template, shell, and path traversal input;
- CSV cells beginning with formula characters;
- duplicate idempotency keys and replayed requests;
- truncated, malformed, or structurally unexpected serialized input;
- unexpected additional fields and conflicting representations;
- rate, pagination, and batch-size boundaries.

## Coverage rule

For each selected case, record:

- stable scenario ID;
- entity and field;
- input class;
- valid or invalid expectation;
- expected behavior or error code;
- test or invariant that consumes it.

Avoid claiming “exhaustive” coverage. State the covered partitions and known gaps precisely.
