import * as I from '../../interfaces/SortOptions.interfaces';
import Select from '../select/Select';
import { ChangeEvent } from 'react';
import { useGetUrlParams, useSetUrlParams } from '../../hooks/useUrl';

export default function SortBy({ options }: { options: I.SortOptions[] }) {
  const { setParams } = useSetUrlParams();
  const sortBy = useGetUrlParams('sort') || '';
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setParams('sort', value);
  };

  return (
    <Select
      options={options}
      value={sortBy}
      $type="white"
      onChange={handleChange}
    />
  );
}
