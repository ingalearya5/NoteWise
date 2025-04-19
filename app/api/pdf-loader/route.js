import { NextResponse } from "next/server";
import fs from "fs/promises";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

// const pdfUrl =
//   "https://decisive-mastiff-753.convex.cloud/api/storage/a9dde1bd-9b8f-4a73-96e7-b8f12b088a43";

export async function GET(req) {

  const reqUrl = req.url;
  const { searchParams } = new URL(reqUrl);

  const pdfUrl = searchParams.get("pdfUrl");

  console.log(pdfUrl);

  const response = await fetch(pdfUrl);
  const data = await response.blob();
  const loader = new WebPDFLoader(data);
  const docs = await loader.load();

  let pdfTextContent = "";
  docs.forEach((doc) => {
    pdfTextContent += doc.pageContent;
  })


  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 20,
  });

  const output = await splitter.createDocuments([pdfTextContent]);

  let splitterList = [];
  output.forEach((doc) => {
    splitterList.push(doc.pageContent);
  });

  return NextResponse.json({
    result: splitterList,
  });
}
