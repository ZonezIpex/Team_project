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
  background-color: rgb(255, 255, 255);
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

const StyledTable = ({
  type = 'military',
  inputComponent: Input,
  selectComponent: Select,
  language = 'ko',
  showMore = true,
}) => {
  const columns = columnConfigs[type]?.[language];

  const [rows, setRows] = useState(4);

  const handleAddRow = () => {
    setRows(prev => prev + 1);
  };

  if (!columns) {
    return <div>Invalid type or language: type="{type}", language="{language}"</div>;
  }

  if (type === 'military') {
    return (
      <Table>
        <thead>
          <tr>
            {columns.map(col => (
              <Th key={col}>{col}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <Td>
              <Input type="text" placeholder={language === 'ko' ? '예: 2018~2020' : 'e.g. 2018~2020'} style={{ width: '120px' }} />
            </Td>
            <Td>
              <Input type="text" style={{ width: '100px' }} />
            </Td>
            <Td>
              <Input type="text" style={{ width: '100px' }} />
            </Td>
            <Td>
              <Input type="text" style={{ width: '100px' }} />
            </Td>
            <Td>
              <Select style={{ width: '80px' }}>
                <option>{language === 'ko' ? '필' : 'Completed'}</option>
                <option>{language === 'ko' ? '미필' : 'Not Completed'}</option>
                <option>{language === 'ko' ? '면제' : 'Exempt'}</option>
              </Select>
            </Td>
            <Td>
              <Select style={{ width: '80px' }}>
                <option>{language === 'ko' ? '대상' : 'Eligible'}</option>
                <option>{language === 'ko' ? '비대상' : 'Not Eligible'}</option>
              </Select>
            </Td>
          </tr>
        </tbody>
      </Table>
    );
  }

  const renderCell = (colName) => {
    if (type === 'education') {
      switch (colName) {
        case language === 'ko' ? '졸업일' : 'Graduation Date':
          return <StyledInput type="date" />;
        case language === 'ko' ? '졸업여부' : 'Graduation Status':
          return (
            <StyledSelect>
              <option>{language === 'ko' ? '졸업' : 'Graduated'}</option>
              <option>{language === 'ko' ? '미졸업' : 'Not Graduated'}</option>
            </StyledSelect>
          );
        case language === 'ko' ? '성적' : 'Grade':
          return <StyledInput type="text" placeholder={language === 'ko' ? '예: 4.3 / 4.5' : 'e.g. 4.3 / 4.5'} />;
        default:
          return <StyledInput type="text" />;
      }
    }

    if (type === 'career') {
      return (
        <StyledInput
          type="text"
          placeholder={colName === (language === 'ko' ? '근무기간' : 'Employment Period') ? (language === 'ko' ? '예: 2020~2023' : 'e.g. 2020~2023') : ''}
        />
      );
    }

    if (type === 'certificate') {
      return <StyledInput type={colName === (language === 'ko' ? '취득일' : 'Acquisition Date') ? 'date' : 'text'} />;
    }

    if (type === 'language') {
      if (colName === (language === 'ko' ? '구사정도' : 'Proficiency')) {
        return (
          <StyledSelect>
            <option>{language === 'ko' ? '상' : 'High'}</option>
            <option>{language === 'ko' ? '중' : 'Medium'}</option>
            <option>{language === 'ko' ? '하' : 'Low'}</option>
          </StyledSelect>
        );
      }
      return <StyledInput type="text" />;
    }

    // 기타 테이블은 모두 기본 인풋
    return <StyledInput type="text" />;
  };

  return (
    <>
      <Table>
        <thead>
          <tr>
            {columns.map(col => (
              <Th key={col}>{col}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(rows)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map(col => (
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
