// src/components/Table.js
import styled from 'styled-components';

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
  font-size: 14px;

  th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }

  th {
    background-color: #f8f8f8;
    font-weight: normal;
  }

  input, select {
    width: 100%;
    border: none;
    font-size: 14px;
    text-align: center;
    background-color: transparent;
    outline: none;
  }
`;

export default StyledTable;