import { EditorViewType } from '../store/EditorsStore'
export interface EditorsState {
    viewType: EditorViewType,
    element: any
}
export interface AppState {
    editorsState: EditorsState
}
