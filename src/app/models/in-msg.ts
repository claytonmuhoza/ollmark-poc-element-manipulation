export type InMsg =  | { type: 'SELECTION_CHANGED'; selection: { id: string; name: string; type: string }[] }
  | { type: string; [k: string]: any }


