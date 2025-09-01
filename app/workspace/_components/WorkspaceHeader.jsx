
import React, { useState } from "react";
import { FileText, Download, ChevronDown } from "lucide-react";
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
  const [showDownloadDropdown, setShowDownloadDropdown] = useState(false);
  
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

  const downloadAsText = () => {
    try {
      if (!editorRef?.current) {
        toast.error("Editor not ready");
        return;
      }

      const content = editorRef.current.getContent();
      
      if (!content || content === "<p>Start Taking Your Notes Here...</p>") {
        toast.error("No content to download");
        return;
      }

      // Convert HTML content to plain text
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      const plainText = tempDiv.textContent || tempDiv.innerText || '';

      // Create and download file
      const blob = new Blob([plainText], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename || 'notes'}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast.success("Notes downloaded as text successfully!");
      setShowDownloadDropdown(false);
    } catch (error) {
      console.error("Error downloading notes:", error);
      toast.error("Failed to download notes");
    }
  }

  const downloadAsWord = () => {
    try {
      if (!editorRef?.current) {
        toast.error("Editor not ready");
        return;
      }

      const content = editorRef.current.getContent();
      
      if (!content || content === "<p>Start Taking Your Notes Here...</p>") {
        toast.error("No content to download");
        return;
      }

      // Convert HTML to Word document format
      const htmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset='utf-8'><title>Notes</title></head>
        <body>
          ${content}
        </body>
        </html>
      `;

      // Create and download file
      const blob = new Blob([htmlContent], { type: 'application/msword' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename || 'notes'}.doc`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast.success("Notes downloaded as Word document successfully!");
      setShowDownloadDropdown(false);
    } catch (error) {
      console.error("Error downloading notes:", error);
      toast.error("Failed to download notes");
    }
  }

  const downloadAsPDF = () => {
    try {
      if (!editorRef?.current) {
        toast.error("Editor not ready");
        return;
      }

      const content = editorRef.current.getContent();
      
      if (!content || content === "<p>Start Taking Your Notes Here...</p>") {
        toast.error("No content to download");
        return;
      }

      // For PDF, we'll use the browser's print functionality
      // Create a new window with the content and trigger print
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>${filename || 'Notes'}</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; }
              h1, h2, h3 { color: #333; }
              p { margin-bottom: 10px; }
              @media print { body { margin: 0; } }
            </style>
          </head>
          <body>
            ${content}
          </body>
        </html>
      `);
      printWindow.document.close();
      
      // Wait for content to load then print
      printWindow.onload = () => {
        printWindow.print();
        printWindow.close();
      };

      toast.success("Opening PDF download dialog...");
      setShowDownloadDropdown(false);
    } catch (error) {
      console.error("Error downloading notes:", error);
      toast.error("Failed to download notes");
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
         
         {/* Download Dropdown */}
         <div className="relative">
           <Button 
             className=' bg-green-600 hover:bg-green-700 cursor-pointer flex items-center gap-2'
             onClick={() => setShowDownloadDropdown(!showDownloadDropdown)}
           >
             <Download size={16} />
             Download
             <ChevronDown size={16} />
           </Button>
           
           {showDownloadDropdown && (
             <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
               <div className="py-1">
                 <button
                   onClick={downloadAsText}
                   className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                 >
                   📄 Download as Text (.txt)
                 </button>
                 <button
                   onClick={downloadAsWord}
                   className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                 >
                   📝 Download as Word (.doc)
                 </button>
                 <button
                   onClick={downloadAsPDF}
                   className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                 >
                   📊 Download as PDF
                 </button>
               </div>
             </div>
           )}
         </div>

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
      
      {/* Click outside to close dropdown */}
      {showDownloadDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowDownloadDropdown(false)}
        />
      )}
    </div>
  );
};

export default WorkspaceHeader;
