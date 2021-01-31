export default function level(state = {}, action) {
    switch (action.type) {
      case `@integration/ADD_INTEGRATION`: {
        return action;
      }
      /*       case `@user/SIGN_OUT`: {
            return {};
          } */
      default:
        return state;
    }
  }
  