// src/api/reviewApi.js
import { reviews } from '../testUserProfile/reviews';

export const fetchReviews = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(reviews);
    }, 300);
  });
};
