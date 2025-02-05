import { defineFunction } from "@aws-amplify/backend";

export const processFile = defineFunction({
  name: "process-file",
  entry: "./handler.ts"
}); 