import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Layout, Shield } from "lucide-react";
import React from "react";
import UploadPdfDialog from "./UploadPdfDialog";

const SideBar = () => {
  return (
    <div className="shadow-md h-screen p-7 bg-white">
      <h1 className=" font-bold text-blue-600 text-center text-4xl">
        NoteWise
      </h1>

      <div className="mt-10">
        <UploadPdfDialog>
          <Button className="w-ful">+ Upload PDF</Button>
        </UploadPdfDialog>
        <div className="flex items-center gap-2 mt-5 p-3 hover:bg-gray-100 rounded-md cursor-pointer transition-colors">
          <Layout className="text-gray-600" />
          <h2 className="font-medium">Workspace</h2>
        </div>
        <div className="flex items-center gap-2 mt-1 p-3 hover:bg-gray-100 rounded-md cursor-pointer transition-colors">
          <Shield className="text-gray-600" />
          <h2 className="font-medium">Upgrade</h2>
        </div>
        <div className="absolute bottom-24 w-[80%]">
          <Progress value={33} className="h-2 bg-gray-200" />
          <p className="text-sm mt-2 text-gray-600">2 out of 10 uploads</p>
          <p className="text-xs text-gray-500 mt-2">
            Upgrade to upload more pdf
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
