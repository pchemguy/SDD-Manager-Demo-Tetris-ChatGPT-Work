/** Real application with a failing collaborator, served only by the isolated fixture server. */
import shell from '../../index.html?raw';
import '../../src/styles.css';
import {mount} from '../../src/browser/app';
const parsed=new DOMParser().parseFromString(shell,'text/html');parsed.querySelectorAll('script').forEach(node=>node.remove());document.body.innerHTML=parsed.body.innerHTML;
let fail=true;
const dispose=mount(document,()=>{let n=0;return()=>{if(++n===3&&fail){fail=false;throw Error('fixture source failure');}return 'O';};});
const button=document.createElement('button');button.textContent='Dispose test app';button.addEventListener('click',dispose);document.body.append(button);
