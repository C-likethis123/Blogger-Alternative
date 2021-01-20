import React from 'react';
import { Spinner } from 'reactstrap';
import styled from 'styled-components';

export default function Loading() {
  const SpinnerContainer = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `
  return (
    <SpinnerContainer>
      <Spinner color="primary" size="xl" />
    </SpinnerContainer>
  )
};
