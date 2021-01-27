export default function level(state = {}, action) {
  switch (action.type) {
    case `@level/ADD_LEVEL`: {
      return action.level;
    }
    /*       case `@user/SIGN_OUT`: {
          return {};
        } */
    default:
      return state;
  }
}
