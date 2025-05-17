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
const Select = React.memo(({ options = [], ...props }) => {
  return (
    <StyledSelect {...props}>
      <option value="">선택</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
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
    ko: ['근무기간', '회사명', '최종직위', '담당업무'],
    en: ['Employment Period', 'Company Name', 'Final Position', 'Responsibilities'],
    keys: ['Employment Period', 'Company Name', 'Final Position', 'Responsibilities'],
  },
  certificate: {
    ko: ['취득일', '자격명', '발행처'],
    en: ['Date of Acquisition', 'Eertificate Name', 'Issuer'],
  },
  languageSkills: {
    ko: ['언어명', '구사정도', '시험명', '점수'],
    en: ['Language', 'Proficiency', 'Test Name', 'Score'],
  },
  military: {
    ko: ['복무기간', '군별', '계급', '병과', '병역여부', '보훈대상'],
    en: ['Service Period', 'Branch', 'Rank', 'Military Specialty', 'Service Status', 'Veteran Status'],
  },
  // skills: {
  //   ko: ['기술명', '수준', '설명'],
  //   en: ['Skill Name', 'Level', 'Description'],
  // },
  // awards: {
  //   ko: ['수상명', '일자', '기관'],
  //   en: ['Award Name', 'Date', 'Organization'],
  // },
  // reference: {
  //   ko: ['이름', '연락처', '관계'],
  //   en: ['Name', 'Contact', 'Relation'],
  // },
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
                let options = [];

                // 조건: 특정 열만 select로 처리
 
                if (type === 'languageSkills' && colIndex === 1){
                  Component = selectComponent;
                  options = ['상', '중', '하'];
                } else if(type === 'military' && (colIndex === 4 || colIndex === 5))
                 {
                  Component = selectComponent;
                  options = ['예', '아니오'];
                } else if (type === 'education' && colIndex === 2) {
                  Component = selectComponent;
                  options = ['졸업', '졸업예정', '수료', '중퇴', '휴학', '재학'];
                }

                return (
                  <Td key={colIndex}>
                    <Component
                      name={name}
                      value={safeValue[rowIndex]?.[colIndex] || ""}
                      onChange={(e) => {
                        let newValue = e.target.value;

                        if(type === 'education' && colIndex===3){
                          newValue = newValue.replace(/[^0-9./]/g, '');
                        }
                        else if((type === 'education' && colIndex===0)||
                          (type === 'certificate' && colIndex===0)
                        ){
                          newValue = newValue.replace(/[^0-9]/g, '');
                          
                          // 숫자가 4개 이상이면 4번째 뒤에 온점 추가
                          if (newValue.length > 4) {
                            newValue = newValue.slice(0, 4) + '.' + newValue.slice(4);
                          }

                          // 최대 7글자 제한
                          newValue = newValue.slice(0, 7);

                        }
                        else if (type === 'career' && colIndex === 0) {
                          newValue = newValue.replace(/[^0-9]/g, '').slice(0, 12); // 최대 12자리 (YYYYMMYYYYMM)

                          if (newValue.length >= 4 && newValue.length <= 6) {
                            // 시작 년도 뒤에 점 추가
                            newValue = newValue.slice(0, 4) + '.' + newValue.slice(4);
                          } else if (newValue.length > 6) {
                            // 시작: YYYYMM, 종료: YYYYMM
                            const start = newValue.slice(0, 6);
                            const end = newValue.slice(6, 12);
                            newValue =
                              start.slice(0, 4) + '.' + start.slice(4, 6) +
                              ' ~ ' +
                              (end.length >= 4 ? end.slice(0, 4) + '.' + end.slice(4, 6) : end);
                          }
                        }

                        handleCellChange(rowIndex, colIndex, newValue)
                      }}
                      options={options}  // 여기 옵션 전달 꼭!
                      placeholder={
                      type === 'education' && colIndex === 0
                        ? (language === 'ko' ? '예: 2025.02' : 'e.g. 2025.02')
                        : type === 'education' && colIndex === 3
                        ? (language === 'ko' ? '4.5/4.5' : '4.5/4.5')
                        : type === 'career' && colIndex === 0
                        ? (language === 'ko' ? '예: 2020.02 ~ 2025.02' : 'e.g. 2020.02 ~ 2025.02')
                        : type === 'certificate' && colIndex === 0
                        ? (language === 'ko' ? '예: 2020.02' : 'e.g. 2020.02')
                        :undefined
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
