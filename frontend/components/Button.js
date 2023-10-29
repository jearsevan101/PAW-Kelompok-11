const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-c-primary font-semibold text-white px-5 py-3 rounded-md hover:opacity-90 focus:outline-none focus:ring"
    >
      {children}
    </button>
  );
};

export default Button;
