import Activity from "./activity";
import Credentials from "./credentials";
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
  stakeholders: Credentials[] | undefined;
  initialDate: Date | undefined;
}

export default Planning;

export interface ListPlanning {
  arrayPlanning: Planning[];
}
