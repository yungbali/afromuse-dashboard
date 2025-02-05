import { defineStorage } from '@aws-amplify/backend';
import { processFile } from '../functions/process-file/resource';

export const storage = defineStorage({
  name: 'afromuseStorage',
  access: (allow) => ({
    'uploads/*': [
      allow.resource(processFile).to(['read']),
      allow.authenticated.to(['write', 'delete'])
    ],
    'processed/*': [
      allow.resource(processFile).to(['write'])
    ]
  })
});
