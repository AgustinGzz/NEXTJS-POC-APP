import LoadingSpinner from "@/components/loading-spinner";
import { ToastContext } from "@/store/toast-context";
import { useContext, useEffect } from "react";
import { useFormStatus } from "react-dom";

type Props = { formState: { message: string } | undefined };

const SubmitButton: React.FC<Props> = ({ formState }) => {
  const { pending } = useFormStatus();
  const { addToast } = useContext(ToastContext);
  useEffect(() => {
    if (formState?.message === "Successfully saved data" && !pending) {
      addToast({ variant: "success", message: formState.message, duration: 5 });
    } else if (formState?.message === "Failed to save data" && !pending) {
      addToast({ variant: "error", message: formState.message });
    }
  }, [addToast, formState?.message, pending]);

  const colorClasses =
    "text-white bg-purple-700 hover:bg-purple-800 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900";
  const disabledColorClasses = "text-white bg-gray-500";
  const dimensionClasses =
    "focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mb-2";
  return (
    <button
      type='submit'
      className={`${dimensionClasses} ${
        !pending ? colorClasses : disabledColorClasses
      }`}
      disabled={pending}
    >
      <span>{!pending ? "Save Values" : "Saving..."}</span>
      {pending && (
        <span className='relative w-0'>
          <span className='absolute start-4 bottom-0'>
            <LoadingSpinner color='white' />
          </span>
        </span>
      )}
    </button>
  );
};

export default SubmitButton;
