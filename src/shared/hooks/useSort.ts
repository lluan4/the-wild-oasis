import toast from 'react-hot-toast';

export function useSort<T>(items: T[], sortBy: string | null | undefined): T[] {
  try {
    if (!sortBy) {
      throw new Error('No sorting criteria provided');
    }

    const [field, direction] = sortBy.split('-');

    if (!field || (!(direction === 'asc') && !(direction === 'desc'))) {
      throw new Error('Invalid sorting criteria');
    }

    const typedField = field as keyof T;
    const modifier = direction === 'asc' ? 1 : -1;

    return items.sort(
      (a, b) => (Number(a[typedField]) - Number(b[typedField])) * modifier
    );
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error('An unknown error occurred');
    }
    return items;
  }
}
