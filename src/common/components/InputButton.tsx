import React from "react";

function InputButton({ children }) {
  return (
    <button
      type="submit"
      className="w-full bg-[var(--secondary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--secondary)] font-semibold py-2 px-4 rounded-lg shadow transition-colors border border-[var(--secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:ring-offset-2"
    >
      <span className="tracking-widest text-base">{children}</span>
    </button>
  );
}

export default InputButton;
