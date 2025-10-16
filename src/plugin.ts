// plugin.ts (TypeScript)
// npm i -D @penpot/plugin-types  (typages officiels)

import {OutMsg} from './app/models/out-msg';

penpot.ui.open('Text tools', '', { width: 420, height: 560 })
penpot.on('selectionchange', () => {
  const selection = penpot.selection.map((n: any) => ({
    id: n.id,
    name: n.name,
    type: n.type,
  }))
  penpot.ui.sendMessage({
    type: 'SELECTION_CHANGED',
    selection,
  })
})
penpot.ui.onMessage((msg: OutMsg) => {
  if(msg.type === 'DELETE_SELECTED_ELEMENTS'){
    penpot.selection.forEach(element=>
    element.remove());
    console.log("Deleted selection");
  }
  //logique pour la modification
  if(msg.type === 'EDIT_SELECTED_TEXT')
  {
    // on recuperer le permier texte selectionner dans penpot
    const first = penpot.selection.find(n => n.type === 'text')
    /*
    //on vérifie s'il y a au moin un text qui est séléctionner
    if(first){
      first.characters = msg.text
    }
    else {
      alert("il n'y a pas de texte séléctionner")
    }*/
  }
  if (msg.type === 'CREATE_TEXT') {

    let textNode = penpot.createText(msg.text);
    if(textNode)
    {
      textNode.fontSize = '14';
      textNode.x = 100;
      textNode.y = 100;
    }
    // Sends a message back to the plugin
    penpot.ui.sendMessage({ type: 'INCREMENTED' });
  }
})

