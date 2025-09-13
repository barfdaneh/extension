import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import {
  Link,
  useRouteLoaderData,
  Form,
  useSubmit,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { KeyPair } from "../../common/model/KeyPair";
import { readProfile } from "../../common/common";
import { Profile } from "../../common/model/Profile";


function ProfileNav() {
  const keypairs = useRouteLoaderData("root") as KeyPair[];
  const navigate = useNavigate();
  const [profileColors, setProfileColors] = useState<{[key: string]: string}>({});
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const curProfile = keypairs.find((profile) => profile.isCurrent);
  let otherProfiles = keypairs.filter((profile) => !profile.isCurrent);

  const hideDropdownPaths = ["/popup", "/profiles/create", "/options"];
  const pathname = useLocation().pathname;
  let hideDropdown = false;
  hideDropdownPaths.map((path) => {
    if (pathname.includes(path)) hideDropdown = true;
  });

  useEffect(() => {
    const loadProfileColors = async () => {
      const colors: {[key: string]: string} = {};
      for (const profile of keypairs) {
        const profileData = await readProfile(profile.public_key) as Profile;
        colors[profile.public_key] = profileData.color;
      }
      setProfileColors(colors);
    };
    loadProfileColors();
  }, [keypairs]);

  let submit = useSubmit();

  // Handler for selecting a profile from dropdown
  const handleProfileSelect = (profileKey: string) => {
    const hiddenInput = document.querySelector("#selectedPubkey") as any;
    hiddenInput.value = profileKey;
    const form = document.querySelector("#profileForm") as any;
    submit(form);
    setDropdownOpen(false);
  };

  // Handler for Add new profile
  const handleAddNewProfile = () => {
    setDropdownOpen(false);
    navigate("/profiles/create");
  };

  return (
    <nav className="bg-[var(--background)] shadow-sm">
      <div className="max-w-6xl mx-auto h-10 px-4 py-2">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <Link to="/">
              <div className="flex items-center">
                <img src="logo.svg" alt="Logo" className="h-4 w-4 mr-2" />
                <span className="text-[var(--foreground)] font-semibold text-lg">
                  Barfdaneh
                </span>
              </div>
            </Link>
          </div>
          <div className={`py-[0.1rem] ${hideDropdown ? "hidden" : ""}`}>
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  className="h-5 w-40 bg-[var(--primary)] text-[var(--secondary)] font-medium rounded-lg text-sm text-center inline-flex items-center border border-[var(--secondary)]"
                >
                  <div className="flex-1 flex items-center gap-2 pl-2">
                    {curProfile && (
                      <>
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: profileColors[curProfile.public_key] }}
                        />
                        {curProfile.name}
                      </>
                    )}
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
                {otherProfiles.map((profile) => (
                  <DropdownMenuItem
                    key={profile.public_key}
                    onSelect={() => handleProfileSelect(profile.public_key)}
                    className="px-4 py-1 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: profileColors[profile.public_key] }}
                      />
                      {profile.name}
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem
                  key="add_new"
                  onSelect={handleAddNewProfile}
                  className="italic px-4 py-1 cursor-pointer"
                >
                  Add new profile...
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Form id="profileForm" action="/" method="post">
              <input
                type="hidden"
                id="selectedPubkey"
                name="selectedPubkey"
                value="test"
              />
            </Form>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default ProfileNav;
