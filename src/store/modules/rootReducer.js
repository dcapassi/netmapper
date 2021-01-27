import { combineReducers } from "redux";

import user from "../modules/user/reducer";
import aps from "../modules/aps/reducer";
import level from "../modules/level/reducer";

export default combineReducers({
  user,
  aps,
  level,
});
