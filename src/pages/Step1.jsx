// src/components/Step1.jsx
import React from "react";

const Step1 = () => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>이력서 양식 선택</h2>

      {/* 진행 단계 표시 */}
      <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
        {["이력서 양식", "신상 정보", "경력", "수정", "완성"].map((step, index) => (
          <div
            key={index}
            style={{
              margin: "0 10px",
              padding: "10px 15px",
              borderRadius: "20px",
              backgroundColor: index === 0 ? "#007bff" : "#ccc",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {step}
          </div>
        ))}
      </div>

      {/* 양식 예시 */}
      <h3>이력서 양식 예시</h3>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            style={{
              width: "150px",
              height: "200px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "14px",
            }}
          >
            양식 {n}
          </div>
        ))}
        <div
          style={{
            width: "150px",
            height: "200px",
            border: "2px dashed #aaa",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "24px",
            color: "#aaa",
            cursor: "pointer",
          }}
        >
          +
        </div>
      </div>

      {/* 최근 사용 */}
      <h3 style={{ marginTop: "40px" }}>최근 사용</h3>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            style={{
              width: "120px",
              height: "160px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              backgroundColor: "#f1f1f1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "14px",
            }}
          >
            최근 {n}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step1;
