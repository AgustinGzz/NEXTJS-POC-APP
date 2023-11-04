"use client";

const Button: React.FC = () => {
  const clickHandler = async (): Promise<void> => {
    await fetch("/inspire?tag=displayedQuote");
  };
  return (
    <button
      onClick={clickHandler}
      style={{
        border: "1px solid white",
        paddingInline: "1rem",
        margin: "0.5rem 0.1rem"
      }}
    >
      Fetch another quote (after reload, invalidating cache)
    </button>
  );
};

export default Button;
