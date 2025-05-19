export type ProjectsMyAllResponseQuery = {
  id: string, // uuid
  creatorId: string, // uuid
  plan: 'personal' | 'business',
  name: string, // max 100 letters
  currency: string,
  businessActivity?: string,
  createdAt: Date,
  updatedAt: Date,
};

export type ProjectsBillsResponseQuery = {
  id: string, // uuid
  projectId: string, // uuid
  name: string, // max 100 letters
  isGlobal: boolean, // default false
}
