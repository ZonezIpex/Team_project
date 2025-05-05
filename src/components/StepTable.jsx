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

// 컬럼 설정
const columnConfigs = {
  education: {
    ko: ['졸업일', '학교명', '졸업여부', '성적'],
    en: ['Graduation Date', 'School Name', 'Graduation Status', 'Grade'],
  },
  career: {
    ko: ['회사명', '근무기간', '최종직위', '담당업무'],
    en: ['Company Name', 'Employment Period', 'Last Position', 'Responsibilities'],
  },
  certificate: {
    ko: ['종류', '취득일', '발행처'],
    en: ['Certificate Type', 'Acquisition Date', 'Issuer'],
  },
  language: {
    ko: ['언어명', '구사정도', '시험명', '점수'],
    en: ['Language', 'Proficiency', 'Test Name', 'Score'],
  },
  military: {
    ko: ['복무기간', '군별', '계급', '병과', '군필여부', '보훈대상'],
    en: ['Service Period', 'Military Branch', 'Rank', 'Military Occupation', 'Completed Service', 'Veteran Status'],
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

// StyledTable 컴포넌트
const StyledTable = ({
  type = 'military',
  inputComponent: Input = StyledInput,
  selectComponent: Select = StyledSelect,
  language = 'ko',
  showMore = true,
  onMilitaryChange = () => {},
  militaryData = {},
  handleFormDataChange = () => {},
}) => {
  const columns = columnConfigs[type]?.[language] || [];
  const [rows, setRows] = useState(1); // 한 줄만 기본 표시

  const handleAddRow = () => setRows((prev) => prev + 1);

  const handleChange = (name, value) => {
    onMilitaryChange({
      ...militaryData,
      [name]: value,
    });
  
    // formData를 업데이트하여 부모 컴포넌트로 전달
    handleFormDataChange({
      military: {
        ...militaryData,
        [name]: value,
      },
    });
  };
  

  const renderCell = (colName) => {
    const labelMap = {
      [language === 'ko' ? '복무기간' : 'Service Period']: {
        name: 'servicePeriod',
        type: 'text',
        placeholder: language === 'ko' ? '예: 2018~2020' : 'e.g. 2018~2020',
        component: Input,
      },
      [language === 'ko' ? '군별' : 'Military Branch']: {
        name: 'branch',
        type: 'text',
        component: Input,
      },
      [language === 'ko' ? '계급' : 'Rank']: {
        name: 'rank',
        type: 'text',
        component: Input,
      },
      [language === 'ko' ? '병과' : 'Military Occupation']: {
        name: 'occupation',
        type: 'text',
        component: Input,
      },
      [language === 'ko' ? '군필여부' : 'Completed Service']: {
        name: 'completed',
        options: ['', '필', '미필', '면제'],
        labels: language === 'ko' ? ['선택', '필', '미필', '면제'] : ['Select', 'Completed', 'Not Completed', 'Exempt'],
        component: Select,
      },
      [language === 'ko' ? '보훈대상' : 'Veteran Status']: {
        name: 'veteranStatus',
        options: ['', '대상', '비대상'],
        labels: language === 'ko' ? ['선택', '대상', '비대상'] : ['Select', 'Eligible', 'Not Eligible'],
        component: Select,
      },
    };

    const field = labelMap[colName];

    if (field) {
      if (field.component === Select) {
        return (
          <Select
            name={field.name}
            value={militaryData[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
          >
            {field.options.map((val, i) => (
              <option key={val} value={val}>
                {field.labels[i]}
              </option>
            ))}
          </Select>
        );
      }

      return (
        <Input
          name={field.name}
          value={militaryData[field.name] || ''}
          type={field.type}
          placeholder={field.placeholder || ''}
          onChange={(e) => handleChange(field.name, e.target.value)}
        />
      );
    }

    // fallback
    return (
      <Input
        name={colName}
        value={militaryData[colName] || ''}
        onChange={(e) => handleChange(colName, e.target.value)}
      />
    );
  };

  return (
    <>
      <Table>
        <thead>
          <tr>
            {columns.map((col) => (
              <Th key={col}>{col}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(rows)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col) => (
                <Td key={col}>{renderCell(col)}</Td>
              ))}
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
