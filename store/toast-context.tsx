"use client";
//TODO: add animations for dissappearing

import errorIcon from "@/public/svgs/error.svg";
import infoIcon from "@/public/svgs/info.svg";
import successIcon from "@/public/svgs/success.svg";
import warningIcon from "@/public/svgs/warning.svg";
import Image from "next/image";
import { PropsWithChildren, createContext, useReducer } from "react";
import { v4 as uuid } from "uuid";

const defaultCloseTimeInSeconds = 10;
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

type State = ({
  id: string;
  message: string;
  duration?: number;
} & Toast)[];
type Action =
  | {
      type: "addToast";
      payload: {
        id: string;
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
      const id = uuid();
      setTimeout(() => {}, (payload.duration ?? 5) * 1000);
      return selectedToast
        ? [...state, { ...payload, ...selectedToast }]
        : state;
    case "removeToast":
      return state.filter((toast) => toast.id !== payload.id);
  }
};

type IncomingPayload = Omit<
  Extract<Action, { type: "addToast" }>["payload"],
  "id"
>;
type Context = {
  addToast: (args: IncomingPayload) => void;
};
const initialContext = {
  addToast: () => {}
};
export const ToastContext = createContext<Context>(initialContext);

export const ToastProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [toastsState, toastsDispatch] = useReducer(toastsReducer, []);
  const positionClasses =
    "flex items-center w-full max-w-xs space-x-4 p-4 rounded-lg rtl:space-x-reverse";
  const closeIconColorClasses =
    "bg-transparent text-black hover:text-gray-500 hover:bg-gray-800";
  const closeIconPositionClasses =
    "ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex items-center justify-center h-8 w-8";
  const addToastHandler = (payload: IncomingPayload) => {
    const id = uuid();
    toastsDispatch({ type: "addToast", payload: { id, ...payload } });
    setTimeout(
      () => {
        toastsDispatch({ type: "removeToast", payload: { id } });
      },
      (payload.duration ?? defaultCloseTimeInSeconds) * 1000
    );
  };
  return (
    <ToastContext.Provider
      value={{
        addToast: (payload) => {
          addToastHandler(payload);
        }
      }}
    >
      {children}
      <div className='fixed bottom-0 end-0'>
        {toastsState.map((toast) => (
          <div className='me-2 mb-2' key={toast.id}>
            <div
              id='toast-simple'
              className={`${positionClasses} ${toast.colorClasses}`}
              role='alert'
            >
              <Image
                src={toast.icon}
                width={25}
                alt={`${toast.variant} icon`}
              />
              <div className='ps-2 pe-4 text-sm font-normal'>
                {toast.message}
              </div>
              <button
                type='button'
                className={`${closeIconPositionClasses} ${closeIconColorClasses}`}
                onClick={() =>
                  toastsDispatch({
                    type: "removeToast",
                    payload: { id: toast.id }
                  })
                }
                aria-label='Close'
              >
                <span className='sr-only'>Close Message</span>
                <svg
                  className='w-3 h-3'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 14'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
