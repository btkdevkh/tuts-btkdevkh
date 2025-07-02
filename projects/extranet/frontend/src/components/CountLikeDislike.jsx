import useGetVotes from "../hooks/useGetVotes";

const CountLikeDislike = ({ id_acteur, submit }) => {
  const { count } = useGetVotes(id_acteur, submit);
  return <>{count && <span>{count}</span>}</>;
};

export default CountLikeDislike;
