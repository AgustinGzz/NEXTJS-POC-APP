"use client";
import Checkbox from "@/components/checkbox";
import { useFormState } from "react-dom";
import { saveFileAction } from "./actions";
import SubmitButton from "./submit-button";

const FlagsForm: React.FC<{ flags: Record<string, boolean> | void }> = ({
  flags
}) => {
  const [state, formAction] = useFormState(saveFileAction, undefined);

  return (
    <form action={formAction} className='flex flex-col'>
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
      <SubmitButton formState={state} />
    </form>
  );
};

export default FlagsForm;
