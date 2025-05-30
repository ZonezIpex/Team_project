import api from './axios';

// 전체 리뷰 (하단)
export const fetchAllReviews = () => api.get('/api/user-reviews/all');

// 특정 이력서 리뷰 (예: 내 리뷰)
export const fetchReviewsByResume = (resumeNo) => api.get(`/api/user-reviews/resume/${resumeNo}`);

// 리뷰 등록
export const submitReview = (data) => api.post('/api/user-reviews/submit', data);

// 리뷰 수정
export const editReview = (id, data) => api.put(`/api/user-reviews/edit/${id}`, data);

// 리뷰 좋아요
export const likeReview = (reviewId) => api.post(`/api/user-reviews/like/${reviewId}`);

// 리뷰 삭제
export const deleteReview = (id) => {
  return api.delete(`/api/user-reviews/delete/${id}`);
};