// src/components/Step4.jsx
import React from "react";

const Step4 = () => {
  const sectionStyle = {
    marginBottom: "30px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "800px",
        margin: "0 auto",
        height: "80vh",           // ✅ 높이 제한
        overflowY: "auto",        // ✅ 세로 스크롤
        backgroundColor: "#fff",
        borderRadius: "10px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>4단계: 최종 수정</h2>

      {/* 기본 정보 */}
      <div style={sectionStyle}>
        <h3>기본 정보</h3>
        <input type="text" placeholder="이름" style={inputStyle} />
        <input type="email" placeholder="이메일" style={inputStyle} />
        <input type="tel" placeholder="전화번호" style={inputStyle} />
        <input type="text" placeholder="주소" style={inputStyle} />
      </div>

      {/* 학력 */}
      <div style={sectionStyle}>
        <h3>학력</h3>
        <input type="text" placeholder="학교명" style={inputStyle} />
        <input type="text" placeholder="전공" style={inputStyle} />
        <input type="text" placeholder="졸업 여부" style={inputStyle} />
      </div>

      {/* 경력 */}
      <div style={sectionStyle}>
        <h3>경력</h3>
        <input type="text" placeholder="회사명" style={inputStyle} />
        <input type="text" placeholder="직책" style={inputStyle} />
        <input type="text" placeholder="근무기간" style={inputStyle} />
        <textarea placeholder="담당업무 설명" rows={4} style={inputStyle}></textarea>
      </div>

      {/* 자격증 */}
      <div style={sectionStyle}>
        <h3>자격증</h3>
        <input type="text" placeholder="자격증명" style={inputStyle} />
        <input type="date" placeholder="취득일" style={inputStyle} />
      </div>

      {/* 외국어 */}
      <div style={sectionStyle}>
        <h3>외국어</h3>
        <input type="text" placeholder="언어명" style={inputStyle} />
        <input type="text" placeholder="시험명 / 점수" style={inputStyle} />
      </div>
    </div>
  );
};

export default Step4;
