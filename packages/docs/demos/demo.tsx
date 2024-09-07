import React, { useState } from 'react';
import styled from '@emotion/styled';

const Button = styled.button`
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  font-size: 14px;
  border-radius: 4px;
  line-height: 20px;
  padding: 4px 16px;
  margin: 12px 0;
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 24px;
`;

export default function Demo() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h4>This is a React counter</h4>
      <ButtonContainer>
        <Button onClick={increment}>+1</Button>
        <Button onClick={decrement}>-1</Button>
      </ButtonContainer>
      <div>Current count: {count}</div>
    </div>
  );
}
