export type ProjectsMyAllResponseQuery = {
  id: string,
  creatorId: string,
  plan: 'personal' | 'business',
  name: string,
  currency: string,
  businessActivity?: string,
  createdAt: Date,
  updatedAt: Date,
};
