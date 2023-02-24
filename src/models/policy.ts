class Policy {
  id: string | undefined;
  title: string | undefined;
  description: string | undefined;
  level: number | undefined;
}

export default Policy;

export interface ListPolicies {
  policies: Policy[];
}
