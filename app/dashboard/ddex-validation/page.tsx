"use client"
import { useAIGeneration } from "@/lib/ai-client";
import { useState } from "react";
import { Dropzone } from "@/components/ui/dropzone";

interface ValidationError {
  message: string;
  line?: number;
}

export default function DDEXValidation() {
  const [{ data: validation }, validate] = useAIGeneration("validateDDEX");
  const [fileContent, setFileContent] = useState("");

  const handleFileRead = (content: string) => {
    setFileContent(content);
    validate({ fileContent: content });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    setFileContent(content);
    validate({ fileContent: content });
  };

  return (
    <div className="space-y-4">
      <Dropzone
        onFileRead={handleFileRead}
        accept={{ ".xml": ["text/xml"], ".txt": ["text/plain"] }} onDrop={function (acceptedFiles: File[]): void {
          throw new Error("Function not implemented.");
        } }      />
      <textarea
        className="w-full p-2 border rounded-md min-h-[200px]"
        value={fileContent}
        onChange={handleTextChange}
        placeholder="Or paste your DDEX XML content here"
      />
      {validation &&
        typeof validation === "object" &&
        "errors" in validation && (
          <div className="text-red-600">
            <h4 className="font-bold">Validation Issues:</h4>
            <ul>
              {(validation.errors as ValidationError[]).map((error, index) => (
                <li key={index}>
                  {error.message} {error.line && `(Line ${error.line})`}
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
} 