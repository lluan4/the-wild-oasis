import { ChangeEvent } from 'react';
import { SortOptions } from '../../interfaces/SortOptions.interfaces';

export interface StyledSelectProps {
  $type: 'white' | undefined | null | string;
  value: string | null;
}

export type SelectProps = {
  options: SortOptions[];
  value: string | null;
  $type: StyledSelectProps['$type'];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};
