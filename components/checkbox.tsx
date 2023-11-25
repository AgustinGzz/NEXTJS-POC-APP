"use client";
import { useState } from "react";

type Props = {
  name: string;
  label: string;
  onValue?: string;
  checked?: boolean;
};

const Checkbox: React.FC<Props> = ({
  name,
  label,
  onValue,
  checked = false
}) => {
  const [checkedState, setCheckedState] = useState(checked);
  return (
    <label className='relative inline-flex items-center me-5 cursor-pointer m-1'>
      <input
        type='checkbox'
        value={onValue}
        className='sr-only peer'
        name={name}
        checked={checkedState}
        onChange={() => setCheckedState((prev) => !prev)}
      />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-400"></div>
      <span className='ms-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
        {label}
      </span>
    </label>
  );
};

export default Checkbox;
