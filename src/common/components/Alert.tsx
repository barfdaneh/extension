import React from "react";

function Alert({ children }) {
  return (
    <>
      <div
        id="alert-4"
        className="flex px-2 py-2 mb-4 text-[var(--secondary)] rounded-lg bg-[var(--primary)] border border-[var(--secondary)]"
        role="alert"
      >
        <span className="sr-only">Info</span>
        <div className="ml-3 text-sm font-medium">{children}</div>
        <button
          type="button"
          className="ml-auto -mx-1.5 -my-1.5 bg-[var(--primary)] text-[var(--secondary)] rounded-lg focus:ring-2 focus:ring-[var(--secondary)] p-1.5 hover:bg-[var(--secondary)] hover:text-[var(--primary)] inline-flex h-8 w-8"
          aria-label="Close"
          onClick={(e) => close()}
        >
          <span className="sr-only">Close</span>
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="#234e70"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </>
  );

  function close() {
    const component = document.querySelector("#alert-4");
    component.classList.toggle("hidden");
  }
}

export default Alert;
