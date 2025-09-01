
import React from "react";
import { FileText } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";

const WorkspaceHeader = ({ filename, fileId, editorRef }) => {
  const router = useRouter();
  const { user } = useUser();
  
  const SaveNotes = useMutation(api.notes.AddNotes);

  const goToDashboard = () => {
    redirect("/dashboard");
  }

  const saveButtonClicked = async () => {
    try {
      if (!editorRef?.current) {
        toast.error("Editor not ready");
        return;
      }

      const content = editorRef.current.getContent();
      
      if (!content || content === "<p>Start Taking Your Notes Here...</p>") {
        toast.error("No content to save");
        return;
      }

      await SaveNotes({
        fileId: fileId,
        notes: content,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });

      toast.success("Notes saved successfully!");
    } catch (error) {
      console.error("Error saving notes:", error);
      toast.error("Failed to save notes");
    }
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
