type Props = {
  rating: number | null;
  onRate?: (rating: number) => void;
  readOnly?: boolean;
};

export default function RatingStars({ rating, onRate, readOnly = false }: Props) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="rating-stars" data-testid="rating-stars">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          data-testid={`rating-star-${star}`}
          className={rating && star <= rating ? 'star filled' : 'star'}
          disabled={readOnly}
          onClick={() => onRate && onRate(star)}
          aria-label={`Note ${star}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
