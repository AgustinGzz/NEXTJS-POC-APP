"use client";

const Button: React.FC = () => {
  const clickHandler = async (): Promise<void> => {
    await fetch("/inspire?tag=displayedQuote");
  };
  return (
    <button
      onClick={clickHandler}
      className='block py-2 px-3 text-gray-200 rounded bg-purple-700 hover:bg-purple-800 mt-2'
    >
      Fetch another quote (after reload, invalidating cache)
    </button>
  );
};

export default Button;
