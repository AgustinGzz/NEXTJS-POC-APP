"use client";

//TODO: use context to send dispatch to children
//TODO: add useToast hook

import errorIcon from "@/public/svgs/error.svg";
import infoIcon from "@/public/svgs/info.svg";
import successIcon from "@/public/svgs/success.svg";
import warningIcon from "@/public/svgs/warning.svg";
import { randomUUID } from "crypto";
import Image from "next/image";
import { PropsWithChildren, createContext, useReducer } from "react";

const toastVariants = [
  {
    variant: "info",
    colorClasses: "shadow text-black divide-gray-700 bg-blue-400",
    icon: infoIcon
  },
  {
    variant: "success",
    colorClasses: "shadow text-black divide-gray-700 bg-green-500",
    icon: successIcon
  },
  {
    variant: "warning",
    colorClasses: "shadow text-black divide-gray-700 bg-yellow-500",
    icon: warningIcon
  },
  {
    variant: "error",
    colorClasses: "shadow text-black divide-gray-700 bg-red-500",
    icon: errorIcon
  }
] as const;
type Variants = (typeof toastVariants)[number]["variant"];
type Toast = (typeof toastVariants)[number];

type Context = {}[];
const ToastContext = createContext<Context>([]);

type State = ({
  id: string;
  message: string;
  duration?: number;
} & Toast)[];
type Action =
  | {
      type: "addToast";
      payload: {
        variant: Variants;
        message: string;
        duration?: number;
      };
    }
  | {
      type: "removeToast";
      payload: {
        id: string;
      };
    };
const toastsReducer = (state: State, action: Action): State => {
  const { type, payload } = action;
  switch (type) {
    case "addToast":
      const selectedToast = toastVariants.find(
        (toast) => toast.variant === payload.variant
      );
      return selectedToast
        ? [
            ...state,
            { id: randomUUID() as string, ...payload, ...selectedToast }
          ]
        : state;
    case "removeToast":
      return state.filter((toast) => toast.id !== payload.id);
  }
};

export const ToastProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [toastsState, toastsDispatch] = useReducer(toastsReducer, []);
  const toastVariant = toastVariants[0];
  const positionClasses =
    "flex items-center w-full max-w-xs space-x-4 p-4 divide-x rounded-lg rtl:space-x-reverse rtl:divide-x-reverse";
  return (
    <>
      {children}
      <div className='fixed bottom-0 end-0'>
        <div className='me-2 mb-2'>
          <div
            id='toast-simple'
            className={`${positionClasses} ${toastVariant.colorClasses}`}
            role='alert'
          >
            <Image
              src={toastVariant.icon}
              width={25}
              alt={`${toastVariant.variant} icon`}
            />
            <div className='ps-4 text-sm font-normal'>
              Message sent successfully also this is a longer message.
            </div>
          </div>
        </div>
        <div className='me-2 mb-2'>
          <div
            id='toast-simple'
            className={`${positionClasses} ${toastVariant.colorClasses}`}
            role='alert'
          >
            <Image
              src={toastVariant.icon}
              width={25}
              alt={`${toastVariant.variant} icon`}
            />
            <div className='ps-4 text-sm font-normal'>
              Message sent successfully.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
