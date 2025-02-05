import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'afromuseStorage',
  access: (allow) => ({
    'uploads/*': [
      allow.authenticated.to(['read', 'write', 'delete']),
      allow.guest.to(['read'])
    ],
    'processed/*': [
      allow.authenticated.to(['read'])
    ]
  })
});
