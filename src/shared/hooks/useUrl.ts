import { useSearchParams } from 'react-router-dom';

export function useSetUrlParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  function setParams(id: string, value: string) {
    searchParams.set(id, value);
    setSearchParams(searchParams);
  }

  return { setParams };
}

export function useGetUrlParams(id: string) {
  const [searchParams] = useSearchParams();

  return searchParams.get(id || '');
}
