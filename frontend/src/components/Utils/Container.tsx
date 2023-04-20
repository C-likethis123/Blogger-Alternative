import React from 'react';
import { Container as BootstrapContainer } from 'reactstrap';
import styled from 'styled-components';

const Container = styled(({ className, children }) => (
  <BootstrapContainer className={className} fluid="xl">
    {children}
  </BootstrapContainer>))`
  margin-top: 24px;
  margin-bottom: 24px;
`
export default Container;
