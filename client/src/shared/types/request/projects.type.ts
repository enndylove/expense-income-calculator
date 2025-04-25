export type ProjectCreateRequestQuery = {
  plan: 'personal' | 'business';
  name: string;
  currency: string;
  businessActivity?: string;
};

export type ProjecEditRequestQuery = {
  id: string;
  name: string;
  businessActivity?: string;
};

export type ProjecDeleteRequestQuery = {
  id: string;
};
