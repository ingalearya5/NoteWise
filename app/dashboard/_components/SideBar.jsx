import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Layout, Shield, FileText, ChevronRight } from "lucide-react";
import React from "react";
import UploadPdfDialog from "./UploadPdfDialog";

const SideBar = () => {
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
          <UploadPdfDialog>
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
          <span className="text-sm font-semibold text-blue-600">2/10</span>
        </div>
        <Progress value={20} className="h-2 bg-gray-200" />
        <div className="mt-3">
          <p className="text-xs text-gray-500">
            You've used 2 out of 10 uploads
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