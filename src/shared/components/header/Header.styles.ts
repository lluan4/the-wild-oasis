import styled from 'styled-components';

export const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.grey[0]};
  padding: 1.2rem 4.8rem;
  border-right: 1px solid var(--color-grey-100);
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
`;
