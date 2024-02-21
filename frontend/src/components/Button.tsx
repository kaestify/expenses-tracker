export const Button: React.FC<{
  id: number;
  handleAction: Function;
  buttonText: string;
}> = (props) => {
  const { id, handleAction, buttonText } = props;

  return (
    <button
      type="button"
      className="btn btn-outline-secondary"
      onClick={() => handleAction(id)}
    >
      {buttonText}
    </button>
  );
};
