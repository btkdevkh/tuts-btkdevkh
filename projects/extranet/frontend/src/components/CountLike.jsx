import useGetLikes from "../hooks/useGetLikes";

const CountLike = ({ id_acteur, submit }) => {
  const { count } = useGetLikes(id_acteur, submit);
  return (
    <>
      {count && count > 0 ? (
        <span className="font-semibold">{count}</span>
      ) : (
        <span className="font-semibold">{0}</span>
      )}
    </>
  );
};

export default CountLike;
