import { useSearchParams } from "react-router-dom";
import * as S from "../styles/SFilter";
import { IFilterProps } from "../interfaces/IFilter";

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
          $active={Boolean(searchParams.get(filterField) === option.value)}
          onClick={() => handleFilter(option.value)}
        >
          {option.label}
        </S.FilterButton>
      ))}
    </S.StyledFilter>
  );
}

export default Filter;
