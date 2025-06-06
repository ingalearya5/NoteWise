"use client";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Layout, Shield, FileText, ChevronRight } from "lucide-react";
import React from "react";
import UploadPdfDialog from "./UploadPdfDialog";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";

const SideBar = () => {
    const { user } = useUser();

  const fileList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });
  return (
    <div className="shadow-md h-screen bg-white flex flex-col border-r">
      {/* Logo Header */}
      <div className="p-6">
        <h1 className="font-bold text-blue-600 text-center text-3xl flex items-center justify-center gap-2">
          <FileText size={28} />
          NoteWise
        </h1>
      </div>

      {/* Main Sidebar Content */}
      <div className="flex-1 flex flex-col p-4">
        {/* Upload Button */}
        <div className="my-4">
          <UploadPdfDialog isMaxFile={fileList?.length >= 5? true : false}>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 font-medium py-2 flex items-center justify-center gap-2 shadow-sm">
              <span className="text-lg font-bold">+</span> Upload PDF
            </Button>
          </UploadPdfDialog>
        </div>

        {/* Navigation Items */}
        <nav className="mt-6 space-y-1">
          <div className="flex items-center justify-between p-3 hover:bg-blue-50 rounded-lg cursor-pointer transition-all group">
            <div className="flex items-center gap-3">
              <Layout className="text-blue-600" size={18} />
              <h2 className="font-medium text-gray-800">Workspace</h2>
            </div>
            <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
          </div>
          
          <div className="flex items-center justify-between p-3 hover:bg-blue-50 rounded-lg cursor-pointer transition-all group">
            <div className="flex items-center gap-3">
              <Shield className="text-blue-600" size={18} />
              <h2 className="font-medium text-gray-800">Upgrade</h2>
            </div>
            <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
          </div>
        </nav>
      </div>

      {/* Usage Stats Panel */}
      <div className="p-4 mx-4 mb-6 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Storage Usage</span>
          <span className="text-sm font-semibold text-blue-600"></span>
        </div>
        <Progress value={(fileList?.length/5)*100} className="h-2 bg-gray-200" />
        <div className="mt-3">
          <p className="text-xs text-gray-500">
            You've used {fileList?.length} out of 5 uploads
          </p>
          <div className="mt-2 flex items-center gap-1">
            <Shield className="text-blue-600" size={14} />
            <p className="text-xs text-blue-600 font-medium">
              Upgrade to upload more PDFs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;