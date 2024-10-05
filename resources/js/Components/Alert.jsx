import { Transition } from "@headlessui/react";
import { useState } from "react";

export default function Alert({ alert, ...props }) {
    let [isShown, setIsShown] = useState(true);
    const type = alert.type ?? "alert-success";
    const body = alert.body ?? "Successfully";

    setTimeout(() => {
        setIsShown(false);
    }, 2000);

    return (
        <Transition
            show={isShown}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
        >
            <div {...props} role="alert" className={`rounded-lg alert ${type}`}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <span>{body}</span>
            </div>
        </Transition>
    );
}
