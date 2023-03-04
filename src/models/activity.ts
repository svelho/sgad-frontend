class Activity {
  id: string | undefined;
  title: string | undefined;
  description: string | undefined;
  classification: string | undefined;
  level: number | undefined;
}

export default Activity;

export interface ListActivities {
  activities: Activity[];
}
