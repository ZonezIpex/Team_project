// src/pages/GeneratingPage.jsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AiGeneratingLoader from '../loadings/AiGeneratingLoader';

const GeneratingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const resumeData = location.state; // Step4Page에서 전달한 데이터

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/step5Page', { state: resumeData }); // 데이터와 함께 Step5로 이동
    }, 3000); // 3초 후 이동

    return () => clearTimeout(timer); // 클린업
  }, [navigate, resumeData]);

  return <AiGeneratingLoader />;
};

export default GeneratingPage;
