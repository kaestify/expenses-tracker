export const UpdateButton: React.FC<{
  id: number;
  handleUpdate: Function;
}> = (props) => {
  const { id, handleUpdate } = props;

  return (
    <button
      type="button"
      className="btn btn-outline-secondary"
      onClick={() => handleUpdate(id)}
    >
      UPDATE
    </button>
  );
};
