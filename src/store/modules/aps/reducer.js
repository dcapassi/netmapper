export default function aps(state = [], action) {
  switch (action.type) {
    case `@aps/ADD_APS`: {
      return [action.aps];
    }
    /*       case `@user/SIGN_OUT`: {
        return {};
      } */
    default:
      return state;
  }
}
