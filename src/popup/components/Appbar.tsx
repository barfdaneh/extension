
import * as React from "react";
import { Form } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";

function AppBar({ currentKey, keypairs, onKeyChange }) {
  const curProfile = keypairs.find(
    (keypair) => keypair.public_key === currentKey
  );

  // on dropdown select, send selected dropdown pubkey to root action
  const profileItemClick = (selectedPubkey: string) => {
    onKeyChange(selectedPubkey);
  };

  // Theme toggle logic
  const [isDark, setIsDark] = React.useState(() =>
    typeof window !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  );

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      setIsDark(false);
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add("dark");
      setIsDark(true);
      localStorage.setItem("theme", "dark");
    }
  };

  React.useEffect(() => {
    // On mount, set theme from localStorage
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  return (
    <nav className="bg-[var(--background)] shadow-sm">
      <div className="max-w-6xl mx-auto h-10 px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex space-x-7">
            <div className="flex items-center h-8">
              <span className="text-[var(--foreground)] font-semibold text-lg">
                Options
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={toggleTheme}
              className="h-8 w-8 p-0 rounded-full border border-[var(--secondary)] flex items-center justify-center bg-[var(--primary)] text-[var(--secondary)] hover:bg-[var(--secondary)] hover:text-[var(--primary)] transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="h-5 w-40 bg-[var(--primary)] text-[var(--secondary)] font-medium rounded-lg text-sm text-center inline-flex items-center border border-[var(--secondary)]"
                >
                  <div className="flex-1">
                    {curProfile && curProfile.name + " "}
                  </div>
                  <svg
                    className="w-4 h-4 ml-2 mr-1"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 bg-[var(--primary)] text-[var(--secondary)]">
                {keypairs
                  .filter((keypair) => keypair.public_key != currentKey)
                  .map((profile) => (
                    <DropdownMenuItem
                      key={profile.public_key}
                      onSelect={() => profileItemClick(profile.public_key)}
                      className="px-4 py-1 hover:bg-[var(--secondary)] hover:text-[var(--primary)] cursor-pointer"
                    >
                      {profile.name}
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AppBar;
