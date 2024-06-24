import styled from 'styled-components';

interface FormRowProps {
  orientation?: 'vertical' | 'horizontal';
}

export const FormRow = styled.div<FormRowProps>`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  grid-template-columns: ${(props) =>
    props.orientation === 'vertical' ? '1fr' : '24rem 1fr 1.2fr'};
  gap: ${(props) => (props.orientation === 'vertical' ? '0.8rem' : '2.4rem')};

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

export const Label = styled.label`
  font-weight: 500;
`;

export const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;
