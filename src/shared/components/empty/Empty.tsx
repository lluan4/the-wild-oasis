import { IEmpty } from './Empty.interfaces';

function Empty({ resource }: IEmpty) {
  return <p>No {resource} could be found.</p>;
}

export default Empty;
