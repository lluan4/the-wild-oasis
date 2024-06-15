import { IEmpty } from "../interfaces/IEmpty";

function Empty({ resource }: IEmpty) {
  return <p>No {resource} could be found.</p>;
}

export default Empty;
