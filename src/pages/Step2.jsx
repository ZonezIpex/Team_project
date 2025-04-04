// src/components/Step2.jsx
import React from "react";

const Step2 = () => {
  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center" }}>2단계: 신상 정보 입력</h2>

      {/* 사진 및 기본 정보 */}
      <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
        {/* 사진 업로드 박스 */}
        <div
          style={{
            width: "150px",
            height: "200px",
            border: "2px dashed #aaa",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0,
            cursor: "pointer",
          }}
        >
          + 사진 추가
        </div>

        {/* 이름 입력들 */}
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: "10px" }}>
            <input type="text" placeholder="이름" style={{ flex: 1 }} />
            <input type="text" placeholder="영문 이름" style={{ flex: 1 }} />
          </div>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <input type="text" placeholder="성" style={{ flex: 1 }} />
            <input type="text" placeholder="영문 성" style={{ flex: 1 }} />
          </div>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <input type="email" placeholder="이메일 주소" style={{ flex: 1 }} />
            <input type="tel" placeholder="전화번호" style={{ flex: 1 }} />
          </div>
        </div>
      </div>

      {/* 생년월일 & 주소 */}
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <select style={{ flex: 1 }}>
          <option>년</option>
          {/* 년도 옵션 추가 가능 */}
        </select>
        <select style={{ flex: 1 }}>
          <option>월</option>
        </select>
        <select style={{ flex: 1 }}>
          <option>일</option>
        </select>
        <input type="text" placeholder="주소" style={{ flex: 2 }} />
      </div>

      {/* 병역사항 */}
      <div style={{ marginTop: "30px" }}>
        <h4>병역 사항</h4>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
          <thead>
            <tr>
              <th>복무기간</th>
              <th>군별</th>
              <th>계급</th>
              <th>병과</th>
              <th>군필여부</th>
              <th>보훈대상</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="text" placeholder="예: 2018~2020" /></td>
              <td><input type="text" /></td>
              <td><input type="text" /></td>
              <td><input type="text" /></td>
              <td>
                <select>
                  <option>필</option>
                  <option>미필</option>
                  <option>면제</option>
                </select>
              </td>
              <td>
                <select>
                  <option>대상</option>
                  <option>비대상</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Step2;
