"use client";
import Checkbox from "@/components/checkbox";
import { ToastContext } from "@/store/toast-context";
import { useContext } from "react";
import { useFormStatus } from "react-dom";
import { saveFileAction } from "./actions";

const FlagsForm: React.FC<{ flags: Record<string, boolean> | void }> = ({
  flags
}) => {
  const { addToast } = useContext(ToastContext);
  const { pending } = useFormStatus();
  const colorClasses =
    "text-white bg-purple-700 hover:bg-purple-800 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900";
  const dimensionClasses =
    "focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mb-2";
  return (
    <form action={saveFileAction} className='flex flex-col'>
      <h1 className='mb-3'>Turn on/off feature you wish to enable/disable</h1>
      <div className='flex flex-col items-center border-white border-2 p-4 mb-2 rounded-md'>
        <Checkbox
          name='feature1'
          label='Feature #1'
          onValue='Flag1'
          checked={!!flags?.feature1}
        />
        <Checkbox
          name='feature2'
          label='Feature #2'
          onValue='Flag2'
          checked={!!flags?.feature2}
        />
        <Checkbox
          name='feature3'
          label='Feature #3'
          onValue='Flag3'
          checked={!!flags?.feature3}
        />
      </div>
      <button
        type='submit'
        className={`${dimensionClasses} ${colorClasses}`}
        onClick={() =>
          addToast({
            variant: "success",
            message: "Succesfully saved new values"
          })
        }
        disabled={pending}
      >
        Save Values
      </button>
    </form>
  );
};

export default FlagsForm;
