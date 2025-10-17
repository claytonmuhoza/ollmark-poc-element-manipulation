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

  // Supprimer les éléments sélectionnés
  if(msg.type === 'DELETE_SELECTED_ELEMENTS'){
    console.log("Deleting selection");
    penpot.selection.forEach(element => element.remove());
    console.log("Deleted selection");
  }

  // Modifier le texte
  if (msg.type === 'EDIT_SELECTED_TEXT') {
    penpot.selection.forEach((element: any) => {
      if (element.type === 'text') {
        console.log(`Modifying text for element ID: ${element.id}`);
        element.characters = msg.text;
        console.log(`Text updated to: "${msg.text}"`);
      }
    });
  }

  // Modifier la couleur du texte
  if (msg.type === 'SET_SELECTED_TEXT_COLOR') {
    console.log('Changing color to:', msg.color);

    penpot.selection.forEach((element: any) => {
      if (element.type === 'text') {
        console.log(`Applying color to element ID: ${element.id}`);

        element.fills = [{
          fillColor: msg.color,
          fillOpacity: 1
        }];

        console.log('Color applied successfully!');
      } else {
        console.warn(`Element is not text, it's: ${element.type}`);
      }
    });
  }

  // Créer un nouveau texte
  if (msg.type === 'CREATE_TEXT') {
    let textNode = penpot.createText(msg.text);
    if(textNode) {
      textNode.fontSize = '14';
      textNode.x = 100;
      textNode.y = 100;
    }
    penpot.ui.sendMessage({ type: 'INCREMENTED' });
  }

})
