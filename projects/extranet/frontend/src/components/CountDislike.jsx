import useGetDislikes from "../hooks/useGetDislikes";

const CountDislike = ({ id_acteur, submit }) => {
  const { count } = useGetDislikes(id_acteur, submit);

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

export default CountDislike;
