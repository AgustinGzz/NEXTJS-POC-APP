"use client";
import { ToastContext } from "@/store/toast-context";
import { useContext } from "react";

const SubmitButton: React.FC = () => {
  const { addToast } = useContext(ToastContext);
  const colorClasses =
    "text-white bg-purple-700 hover:bg-purple-800 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900";
  const dimensionClasses =
    "focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mb-2";
  return (
    <button
      type='submit'
      className={`${dimensionClasses} ${colorClasses}`}
      onClick={() =>
        addToast({
          variant: "success",
          message: "Succesfully saved new values"
        })
      }
    >
      Save Values
    </button>
  );
};

export default SubmitButton;
