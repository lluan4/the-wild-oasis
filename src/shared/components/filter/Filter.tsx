import { useSearchParams } from 'react-router-dom';
import * as S from './Filter.styles';
import { IFilterProps } from './Filter.interfaces';

export function Filter({ filterField, options }: IFilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleFilter(value: string) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }

  return (
    <S.StyledFilter>
      {options.map((option) => (
        <S.FilterButton
          key={option.value}
          $active={searchParams.get(filterField) === option.value}
          disabled={searchParams.get(filterField) === option.value}
          onClick={() => handleFilter(option.value)}
        >
          {option.label}
        </S.FilterButton>
      ))}
    </S.StyledFilter>
  );
}

export default Filter;
