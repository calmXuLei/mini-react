// v01
const app = document.querySelector('#app');

const oDiv = document.createElement('div');
oDiv.id = 'app-id';

const oText = document.createTextNode('');
oText.nodeValue = 'mini-react';

oDiv.append(oText);

app.append(oDiv);