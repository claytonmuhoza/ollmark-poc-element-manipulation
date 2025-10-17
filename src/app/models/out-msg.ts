export type OutMsg =
  { type: 'UI_READY' }
  | { type: 'REQUEST_SELECTION' }
  | { type: 'PING'; id: string }
  |{type:'CREATE_TEXT', text: string}
  |{type:'EDIT_SELECTED_TEXT', text: string}
  |{type:'SET_SELECTED_TEXT_COLOR', color: string}
  | { type: string; [k: string]: any}
