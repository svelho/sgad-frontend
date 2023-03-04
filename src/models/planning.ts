import Activity from "./activity";
import policy from "./policy";

class Planning {
  id: string | undefined;
  name: string | undefined;
  activity: Activity | undefined;
  objective: string | undefined;
  goal1: string | undefined;
  goal2: string | undefined;
  goal3: string | undefined;
  policies: policy[] | undefined;
  stakeholders: Credential[] | undefined;
  initialData: Date | undefined;
}

export default Planning;

export interface ListPlanning {
  activities: Planning[];
}
