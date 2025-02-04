import React, { useState, DragEvent, ChangeEvent } from "react";

interface DropzoneProps {
  onDrop: (acceptedFiles: File[]) => void;
  accept?: { [key: string]: string[] };
  maxSize?: number;
  children?: React.ReactNode;
}

export function Dropzone({ onDrop, accept, maxSize, children }: DropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter(
      (file) => !maxSize || file.size <= maxSize
    );
    onDrop(files);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
      ? Array.from(e.target.files).filter((file) => !maxSize || file.size <= maxSize)
      : [];
    onDrop(files);
  };

  return (
    <div
      className={`border-2 border-dashed p-4 rounded-md cursor-pointer transition-colors ${
        isDragging ? "bg-gray-100" : "hover:bg-gray-50"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById("hidden-file-input")?.click()}
    >
      <input
        id="hidden-file-input"
        type="file"
        multiple
        className="hidden"
        onChange={handleChange}
        accept={accept ? Object.keys(accept).join(",") : undefined}
      />
      {children}
    </div>
  );
}