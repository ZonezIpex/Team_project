import React, { useState } from 'react';
import styled from 'styled-components';

// 공통 스타일 Input / Select
const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 0.95rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 8px;
  font-size: 0.95rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  box-sizing: border-box;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 10px;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  background-color: #fff;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const AddRowButton = styled.button`
  margin-top: 10px;
  padding: 6px 12px;
  background-color: #146c94;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #0d5477;
  }
`;

const Input = React.memo((props) => {
  return <StyledInput {...props} />;
});

const Select = React.memo((props) => {
  return (
    <StyledSelect {...props}>
      <option value="">선택</option>
      <option value="예">예</option>
      <option value="아니오">아니오</option>
    </StyledSelect>
  );
});

export { Input, Select };

// 컬럼 정의
const columnConfigs = {
  education: {
    ko: ['졸업일', '학교명', '졸업여부', '성적'],
    en: ['Graduation Date', 'School Name', 'Graduation Status', 'Grade'],
    keys: ['Graduation Date', 'School Name', 'Graduation Status', 'Grade'],
  },
  career: {
    ko: ['회사명', '근무기간', '최종직위', '담당업무'],
    en: ['Company Name', 'Employment Period', 'Final Position', 'Responsibilities'],
    keys: ['Company Name', 'Employment Period', 'Final Position', 'Responsibilities'],
  },
  certificate: {
    ko: ['종류', '취득일', '발행처'],
    en: ['Type', 'Date of Acquisition', 'Issuer'],
  },
  languageSkills: {
    ko: ['언어명', '구사정도', '시험명', '점수'],
    en: ['Language', 'Proficiency', 'Test Name', 'Score'],
  },
  military: {
    ko: ['복무기간', '군별', '계급', '병과', '병역여부', '보훈대상'],
    en: ['Service Period', 'Branch', 'Rank', 'Military Specialty', 'Service Status', 'Veteran Status'],
  },
  skills: {
    ko: ['기술명', '수준', '설명'],
    en: ['Skill Name', 'Level', 'Description'],
  },
  awards: {
    ko: ['수상명', '일자', '기관'],
    en: ['Award Name', 'Date', 'Organization'],
  },
  reference: {
    ko: ['이름', '연락처', '관계'],
    en: ['Name', 'Contact', 'Relation'],
  },
};

// 메인 컴포넌트
const StyledTable = ({
  type,
  inputComponent,
  selectComponent,
  showMore = false,
  language = 'ko',
  value = [],
  onChange,
}) => {
  const [rows, setRows] = useState(value.length || 1); // 기본 1줄
  const safeValue = Array.isArray(value) ? value : [];
  const labels = Array.isArray(columnConfigs[type]?.[language])
    ? columnConfigs[type][language]
    : [];

  const handleAddRow = () => {
    const newData = [...value, Array(labels.length).fill("")]; // 새 행 추가
    setRows((prev) => prev + 1);
    onChange?.(newData); // 상위에 전달
  };

  const handleCellChange = (rowIndex, colIndex, newValue) => {
    const currentData = Array.isArray(value) ? value : [];

    const updatedData = currentData.map((row, r) =>
      r === rowIndex
        ? row.map((cell, c) => (c === colIndex ? newValue : cell))
        : row
    );

    while (updatedData.length <= rowIndex) {
      updatedData.push(Array(labels.length).fill(""));
    }

    onChange?.(updatedData);
  };

  return (
    <>
      <Table>
        <thead>
          <tr>
            {labels.map((label, index) => (
              <Th key={index}>{label}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(rows)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {labels.map((_, colIndex) => {
                const name = `${type}_${rowIndex}_${colIndex}`;
                let Component = inputComponent;

                // 조건: 특정 열만 select로 처리
                if (
                  (type === 'languageSkills' && colIndex === 2) ||
                  (type === 'military' && (colIndex === 4 || colIndex === 5))
                ) {
                  Component = selectComponent;
                }

                return (
                  <Td key={colIndex}>
                    <Component
                      name={name}
                      value={safeValue[rowIndex]?.[colIndex] || ""}
                      onChange={(e) =>
                        handleCellChange(rowIndex, colIndex, e.target.value)
                      }
                    />
                  </Td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>

      {showMore && (
        <AddRowButton onClick={handleAddRow}>
          {language === 'ko' ? '+ 더 쓰기' : '+ Add More'}
        </AddRowButton>
      )}
    </>
  );
};

export default StyledTable;
