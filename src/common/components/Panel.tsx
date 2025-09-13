import React from "react";

function Panel({ children }) {
  return (
    <div className="bg-[var(--primary)] text-[var(--secondary)] w-full rounded-lg px-4 py-4 ring-1 ring-slate-900/5 shadow-xl">
      {children}
    </div>
  );
}

export default Panel;
