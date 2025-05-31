import React from "react";
import { FileText,  } from "lucide-react";
import { UserButton } from "@clerk/nextjs";


const WorkspaceHeader = ({filename}) => {
  return (
    <div className="flex items-center justify-between p-4 shadow-md ">
      <h1 className="font-bold text-blue-600 flex items-center text-3xl gap-2">
        <FileText size={28} />
        NoteWise
      </h1>
      <h2 className="font-bold">{filename}</h2>
      <UserButton
  appearance={{
    elements: {
      userButtonAvatarBox: {
        width: "38px",
        height: "38px"
      },
      userButtonTrigger: "rounded-full hover:shadow-md transition-shadow",
    },
  }}
/>
    </div>
  );
};

export default WorkspaceHeader;
