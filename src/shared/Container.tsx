'use client';

import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.containerWidth};
  margin-inline: auto;
  padding-inline: ${({ theme }) => theme.layout.gutter};

  ${({ theme }) => theme.media.lg} {
    padding-inline: ${({ theme }) => theme.space.lg};
  }
`;

export default Container;
