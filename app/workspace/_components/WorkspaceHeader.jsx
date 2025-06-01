
import React from "react";
import { FileText } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
const WorkspaceHeader = ({ filename }) => {
  const router = useRouter();
  const goToDashboard = () => {
    redirect("/dashboard");
  }

  const saveButtonClicked = () => {
    toast("PDF saved successfully!");
  }

  return (
    <div className="flex items-center justify-between p-4 shadow-md ">
      <h1 className="font-bold text-blue-600 flex items-center text-3xl gap-2">
        <FileText size={28} />
        NoteWise
      </h1>
      <h2 className="font-bold">{filename}</h2>
      <div className="flex items-center gap-4">
         <Button className=' bg-blue-600 hover:bg-blue-700 cursor-pointer' onClick={goToDashboard}>Dashboard</Button>
         <Button className=' bg-blue-600 hover:bg-blue-700 cursor-pointer' onClick={saveButtonClicked}>Save</Button>
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: {
                width: "38px",
                height: "38px",
              },
              userButtonTrigger:
                "rounded-full hover:shadow-md transition-shadow",
            },
          }}
        />
      </div>
    </div>
  );
};

export default WorkspaceHeader;
