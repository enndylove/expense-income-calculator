export type ProjectCreateRequestQuery = {
  plan: 'personal' | 'business';
  name: string;
  currency: string;
  businessActivity?: string;
};
