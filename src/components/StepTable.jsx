// src/components/StyledTable.jsx
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
  education: ['졸업일', '학교명', '졸업여부', '성적'],
  career: ['회사명', '근무기간', '최종직위', '담당업무'],
  certificate: ['종류', '취득일', '발행처'],
  language: ['언어명', '구사정도', '시험명', '점수'],
  military: ['복무기간', '군별', '계급', '병과', '군필여부', '보훈대상'],
};

const StyledTable = ({
  type = 'military',
  inputComponent: Input,
  selectComponent: Select,
  showMore = true,
}) => {
  const [rows, setRows] = useState(4);
  const columns = columnConfigs[type];

  const handleAddRow = () => {
    setRows(prev => prev + 1);
  };

  if (!columns) {
    return <div>올바르지 않은 type입니다: {type}</div>;
  }

  // 🔹 신상정보(military)는 사용자 커스텀 컴포넌트 그대로 사용
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
              <Input type="text" placeholder="예: 2018~2020" style={{ width: '120px' }} />
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
                <option>필</option>
                <option>미필</option>
                <option>면제</option>
              </Select>
            </Td>
            <Td>
              <Select style={{ width: '80px' }}>
                <option>대상</option>
                <option>비대상</option>
              </Select>
            </Td>
          </tr>
        </tbody>
      </Table>
    );
  }

  // 🔹 그 외 테이블은 공통 스타일 컴포넌트 사용
  const renderCell = (colName) => {
    if (type === 'education') {
      switch (colName) {
        case '졸업일':
          return <StyledInput type="date" />;
        case '졸업여부':
          return (
            <StyledSelect>
              <option>졸업</option>
              <option>미졸업</option>
            </StyledSelect>
          );
        case '성적':
          return <StyledInput type="text" placeholder="예: 4.3 / 4.5" />;
        default:
          return <StyledInput type="text" />;
      }
    }

    if (type === 'career') {
      return (
        <StyledInput
          type="text"
          placeholder={colName === '근무기간' ? '예: 2020~2023' : ''}
        />
      );
    }

    if (type === 'certificate') {
      return <StyledInput type={colName === '취득일' ? 'date' : 'text'} />;
    }

    if (type === 'language') {
      if (colName === '구사정도') {
        return (
          <StyledSelect>
            <option>상</option>
            <option>중</option>
            <option>하</option>
          </StyledSelect>
        );
      }
      return <StyledInput type="text" />;
    }

    return null;
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
        <AddRowButton onClick={handleAddRow}>+ 더 쓰기</AddRowButton>
      )}
    </>
  );
};

export default StyledTable;
