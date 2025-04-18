import { UserButton } from "@clerk/nextjs";
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-end p-5 shadow-sm">
      <div className="scale-125">
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: "h-20 w-20", // Increased from h-16 w-16 to h-20 w-20
              userButtonTrigger: "rounded-full hover:shadow-md transition-shadow",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Header;