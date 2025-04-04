// src/components/Step3.jsx
import React from "react";

const Step3 = () => {
  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center" }}>3단계: 경력 입력</h2>

      {/* 학력 */}
      <h4 style={{ marginTop: "30px" }}>학력</h4>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>졸업일</th>
            <th>학교명</th>
            <th>졸업여부</th>
            <th>성적</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="date" /></td>
            <td><input type="text" /></td>
            <td>
              <select>
                <option>졸업</option>
                <option>미졸업</option>
              </select>
            </td>
            <td><input type="text" placeholder="예: 4.3 / 4.5" /></td>
          </tr>
        </tbody>
      </table>

      {/* 경력 */}
      <h4 style={{ marginTop: "30px" }}>경력</h4>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>회사명</th>
            <th>근무기간</th>
            <th>최종직위</th>
            <th>담당업무</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="text" /></td>
            <td><input type="text" placeholder="예: 2020~2023" /></td>
            <td><input type="text" /></td>
            <td><input type="text" /></td>
          </tr>
        </tbody>
      </table>

      {/* 자격증 */}
      <h4 style={{ marginTop: "30px" }}>자격증</h4>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>종류</th>
            <th>취득일</th>
            <th>발행처</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="text" /></td>
            <td><input type="date" /></td>
            <td><input type="text" /></td>
          </tr>
        </tbody>
      </table>

      {/* 외국어 */}
      <h4 style={{ marginTop: "30px" }}>외국어</h4>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>언어명</th>
            <th>구사정도</th>
            <th>시험명</th>
            <th>점수</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="text" /></td>
            <td>
              <select>
                <option>상</option>
                <option>중</option>
                <option>하</option>
              </select>
            </td>
            <td><input type="text" /></td>
            <td><input type="text" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Step3;
