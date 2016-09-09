import { VisibilityFilters } from './actions'

const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  todos: []
}

export default function reducers(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
  return state;
}
