import './assets/css/app.css'
import Render from './assets/render/render';

export default async function Start(start: HTMLElement): Promise<void> {
  
    start.innerHTML = (`
        <div>
            <div id='TS'></div>
        </div>
    `)
  
    // Dynamically import and execute the Render function
    Render();
  }
  