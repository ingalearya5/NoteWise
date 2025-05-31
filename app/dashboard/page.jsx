"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { File } from "lucide-react";

const Dashboard = () => {
  const { user } = useUser();

  const fileList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });

  console.log("fileList", fileList);
  return (
    <div>
      <h2 className="font-medium text-3xl">WorkSpace</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        {fileList &&
          fileList?.map((file, index) => (
            <div
              key={index}
              className="flex  gap-4 p-5 shadow-md rounded-b-md  flex-col justify-center items-center border cursor-pointer hover:scale-105 transition-all"
            >
              <File width={50} height={50} className="text-blue-600" />
              <h2 className="mt-3 font-medium text-lg ">{file?.fileName}</h2>
              {/* <h2>{file?.createdBy}</h2> */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
