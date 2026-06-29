import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const userReviewsPath = join(__dirname, '..', 'data', 'user-reviews.json');

function formatDateTR(dateStr) {
  return new Date(dateStr).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function loadUserReviews() {
  if (!existsSync(userReviewsPath)) return [];
  return JSON.parse(readFileSync(userReviewsPath, 'utf-8'));
}

export function saveUserReviews(reviews) {
  writeFileSync(userReviewsPath, JSON.stringify(reviews, null, 2));
}

export function mergeReviews(staticReviews, userReviews) {
  const normalizedStatic = staticReviews.map((r) => ({
    ...r,
    source: 'static',
    createdAt: r.createdAt || null,
  }));

  const normalizedUser = userReviews.map((r) => ({
    ...r,
    date: formatDateTR(r.createdAt),
    source: 'visitor',
  }));

  return [...normalizedUser, ...normalizedStatic].sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
    const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
    if (dateB - dateA !== 0) return dateB - dateA;
    return b.id - a.id;
  });
}

export function calculateStats(reviews) {
  if (reviews.length === 0) {
    return { rating: 0, reviewCount: 0 };
  }
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  const rating = Math.round((total / reviews.length) * 10) / 10;
  return { rating, reviewCount: reviews.length };
}

export function getAllReviews(staticReviews) {
  const userReviews = loadUserReviews();
  const reviews = mergeReviews(staticReviews, userReviews);
  const stats = calculateStats(reviews);
  return { reviews, ...stats };
}

export function addUserReview({ author, rating, text }) {
  const userReviews = loadUserReviews();
  const review = {
    id: Date.now(),
    author: author.trim(),
    rating: Number(rating),
    text: text.trim(),
    createdAt: new Date().toISOString(),
    source: 'visitor',
  };
  userReviews.unshift(review);
  saveUserReviews(userReviews);
  return {
    ...review,
    date: formatDateTR(review.createdAt),
  };
}
