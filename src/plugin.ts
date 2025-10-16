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

