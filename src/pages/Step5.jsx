// src/components/Step5.jsx
import React from "react";

const Step5 = () => {
  const sectionStyle = {
    marginBottom: "20px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#fff",
  };

  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>5단계: 이력서 미리보기</h2>

      <div style={sectionStyle}>
        <h3>기본 정보</h3>
        <p><strong>이름:</strong> 홍길동</p>
        <p><strong>이메일:</strong> hong@example.com</p>
        <p><strong>전화번호:</strong> 010-1234-5678</p>
        <p><strong>주소:</strong> 서울시 강남구</p>
      </div>

      <div style={sectionStyle}>
        <h3>학력</h3>
        <p><strong>학교:</strong> OO대학교 / 컴퓨터공학 / 졸업</p>
      </div>

      <div style={sectionStyle}>
        <h3>경력</h3>
        <p><strong>회사:</strong> ABC회사 / 프론트엔드 개발자 (2020~2023)</p>
        <p><strong>업무:</strong> 웹서비스 개발 및 유지보수</p>
      </div>

      <div style={sectionStyle}>
        <h3>자격증</h3>
        <p>정보처리기사 (2022)</p>
      </div>

      <div style={sectionStyle}>
        <h3>외국어</h3>
        <p>영어 / TOEIC 850점</p>
      </div>

      {/* 완료 버튼 */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          style={{
            padding: "12px 30px",
            fontSize: "16px",
            borderRadius: "8px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => alert("이력서 저장이 완료되었습니다!")}
        >
          이력서 완료
        </button>
      </div>
    </div>
  );
};

export default Step5;
