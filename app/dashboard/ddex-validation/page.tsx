"use client"
import { useAIGeneration } from "../../../lib/ai-client";
import { Dropzone } from "@/components/ui/dropzone"

interface ValidationError {
  message: string
  line?: number
}

export default function DDEXValidation() {
  const [{ data: validation }, validate] = useAIGeneration("validateDDEX");
  
  const handleValidate = (content: string) => {
    validate({ fileContent: content });
  };

  return (
    <div className="space-y-4">
      <textarea 
        className="w-full p-2 border rounded-md min-h-[200px]"
        onChange={(e) => handleValidate(e.target.value)}
        placeholder="Paste DDEX content here"
      />
      
      {validation && typeof validation === 'object' && 'errors' in validation && (
        <div className="text-red-600">
          <h4 className="font-bold">Validation Issues:</h4>
          <ul>
            {(validation.errors as ValidationError[]).map((error, index) => (
              <li key={index}>{error.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 