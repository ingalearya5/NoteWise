"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAction, useMutation } from "convex/react";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import { Loader2, Upload } from "lucide-react";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

const UploadPdfDialog = ({ children }) => {
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const addFileEntry = useMutation(api.fileStorage.AddFileEntryToDb);
  const getFileUrl = useMutation(api.fileStorage.getFileUrl);
  const embeddDocument = useAction(api.myActions.ingest);

  const { user } = useUser();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState();
  const [open, setOpen] = useState(false);

  const onFileSelect = (event) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const onUpload = async () => {
    setLoading(true);

    const postUrl = await generateUploadUrl();

    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file?.type },
      body: file,
    });
    const { storageId } = await result.json();
    console.log(storageId);
    const fileId = uuid4();
    const fileUrl = await getFileUrl({ storageId: storageId });

    const resp = await addFileEntry({
      fileId: fileId,
      storageId: storageId,
      fileName: fileName ?? "Untitled",
      createdBy: user?.primaryEmailAddress?.emailAddress,
      fileUrl: fileUrl,
    });
    console.log(resp);

    const ApiResp = await axios.get("/api/pdf-loader?pdfUrl=" + fileUrl);

    console.log(ApiResp.data.result);
    await embeddDocument({
      splitText: ApiResp.data.result,
      fileId: fileId,
    });
    // console.log(embeddedResult);
    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 font-medium py-2 flex items-center justify-center gap-2 shadow-sm"
          onClick={() => setOpen(true)}
        >
          <span className="text-lg font-bold">+</span> Upload PDF
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Upload size={20} className="text-blue-500" />
            Upload PDF File
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Upload your PDF document for processing
          </DialogDescription>
        </DialogHeader>

        <div className="my-4 space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium mb-1">Select PDF</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                accept="application/pdf"
                onChange={(event) => onFileSelect(event)}
                className="w-full cursor-pointer"
              />
              <p className="text-xs text-gray-500 mt-2">
                {file ? file.name : "PDF files only (max 10MB)"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">File Name</label>
            <Input
              placeholder="Enter a name for your file"
              onChange={(e) => setFileName(e.target.value)}
              className="focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-2 pt-2">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="w-24" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={onUpload}
            className="w-24 bg-blue-600 hover:bg-blue-700"
            disabled={!file || loading || !fileName}
          >
            {loading ? (
              <Loader2 className="animate-spin mr-1" size={16} />
            ) : (
              <Upload size={16} className="mr-1" />
            )}
            {loading ? "Uploading" : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadPdfDialog;
