import { useEffect, useRef, useState } from 'react';
import { searchPlaces } from '../api/places';
import type { PlaceResult } from '../types';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSelect: (place: PlaceResult) => void;
  placeholder?: string;
};

export default function PlaceSearchInput({ value, onChange, onSelect, placeholder }: Props) {
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!value || value.trim().length < 2) {
      setResults([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await searchPlaces(value.trim());
        setResults(res);
        setOpen(true);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value]);

  function handleSelect(place: PlaceResult) {
    onSelect(place);
    setOpen(false);
    setResults([]);
  }

  return (
    <div className="place-search">
      <input
        type="text"
        data-testid="place-search-input"
        value={value}
        placeholder={placeholder || 'Rechercher un lieu...'}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => results.length > 0 && setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        autoComplete="off"
      />
      {loading && <div className="place-search-loading">Recherche...</div>}
      {open && results.length > 0 && (
        <ul className="place-search-results">
          {results.map((r, idx) => (
            <li key={`${r.name}-${idx}`}>
              <button
                type="button"
                data-testid="place-search-result"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(r)}
              >
                {r.displayName}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
