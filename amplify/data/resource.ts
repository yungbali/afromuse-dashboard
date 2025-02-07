import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { generateClient } from "aws-amplify/data";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.guest()]),

  // AI Agent for music metadata analysis
  analyzeMetadata: a.generation({
    aiModel: a.ai.model('Claude 3.5 Haiku'),
    systemPrompt: 'You are a music metadata expert. Analyze audio files for BPM, key, genre, and mood.',
  })
  .arguments({
    fileId: a.string(),
    description: a.string()
  })
  .returns(a.json())
  .authorization(allow => allow.authenticated()),

  // AI Agent for DSP recommendations
  recommendDSPs: a.generation({
    aiModel: a.ai.model('Claude 3.5 Haiku'),
    systemPrompt: 'Recommend DSP platforms based on music metadata and target markets.',
  })
  .arguments({
    metadata: a.json(),
    targetMarkets: a.string().array()
  })
  .returns(a.json())
  .authorization(allow => allow.authenticated()),
  
  // AI Agent for DDEX validation
  validateDDEX: a.generation({
    aiModel: a.ai.model('Claude 3.5 Haiku'),
    systemPrompt: 'Validate DDEX files against industry standards and return structured errors.',
  })
  .arguments({
    fileContent: a.string()
  })
  .returns(a.json())
  .authorization((allow) => allow.authenticated()),

  // AI Agent for chat
  createChat: a.generation({
    aiModel: a.ai.model('Claude 3.5 Haiku'),
    systemPrompt: 'You are a music distribution assistant. Help users with platform questions.',
  })
  .arguments({
    message: a.string()
  })
  .returns(a.string())
  .authorization((allow) => allow.authenticated()),

  chat: a.conversation({
    aiModel: a.ai.model('Claude 3.5 Haiku'),
    systemPrompt: 'You are a helpful assistant',
  })
  .authorization((allow) => allow.owner()),

  CatalogItem: a
    .model({
      id: a.id(),
      title: a.string(),
      artist: a.string(),
      status: a.string(),
      lastSync: a.datetime(),
      metadata: a.json(),
    })
    .authorization((allow) => [allow.authenticated()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'iam',
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

const client = generateClient<Schema>() // use this Data client for CRUDL requests

export { client };

