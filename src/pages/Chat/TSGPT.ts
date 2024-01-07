import { GPT_types } from './types/GPT_types';
import './TSGPT.css';

export default function TSGPT(DOM: HTMLDivElement) {
  Render();

  function Render() {
    DOM.innerHTML = `
      <div class='body'>
        <div id='dim' class='dim'></div>
        
        <section class='sidebar' id='side'>
          <div class='sbars' id='sbars'>
            <i class='fa-solid fa-bars'></i>
          </div>
          <button>
            <div class='new'>
               <img src='Types.png' alt='ts' />
            </div>
              New chat
              <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <div class='history'>
            <p>Hello World</p>
            <p>What is 1 + 1</p>
          </div>
          <div class='nav'>
            <p>Made by. Renstrio24p</p>
          </div>
        </section>
        <section class='main'>
          <div class='key-div' id='keydiv'>
           <div class='flex'>
              <p class='text'>OPEN AI key</p>
              <div class='right'>
                <input type='text' id='keys' class='keys'/>
                <button class='submit-key' id='sendkey'>Submit</button>
              </div>
              <p class='desc'>TS GPT. Please enter your API Key</p>
            </div>
          </div>
          <div class='scroll'>
            <div class='logo'>
              <h1>TS GPT</h1>
              <div class='icon'>
                <img src='Types.png' alt='ts' />
              </div>
            </div>
          </div>
          <div class='bottom-section'>
            <p id='output'>Test</p>
            <div class='input-container'>
              <input class='send' />
              <div id='submit'>➣</div>
            </div>
          </div>
          <p class='info'>
            Chat GPT Mar 14 vers. Free Research Preview.
            Our goal is to make AI systems more natural and safe to interact with.
            Your feedback will help us improve.
          </p>
        </section>
      </div>
    `;
  }

  const submitBtn = document.getElementById('submit') as HTMLButtonElement | null;
  const outputEl = document.getElementById('output') as HTMLParagraphElement | null;
  const inputEl = document.querySelector('input') as HTMLInputElement;
  const historyEl = document.querySelector('.history') as HTMLDivElement | null;
  const buttonEl = document.querySelector('button') as HTMLButtonElement | null;
  const sbarBtn = document.getElementById('sbars') as HTMLDivElement;
  const sidebarEL = document.getElementById('side') as HTMLDivElement;
  const dimEl = document.getElementById('dim') as HTMLDivElement;
  const keyEl = document.getElementById('keydiv') as HTMLDivElement;

  const inputkeyEl = document.getElementById('keys') as HTMLInputElement;
  const submitkeyEl = document.getElementById('sendkey') as HTMLButtonElement | null;

  submitkeyEl?.addEventListener('click', () => {
    const sanitizeInput = inputkeyEl.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const apikey = sanitizeInput;
    getMessage(apikey);
  });

  sbarBtn.addEventListener('click', (): void => {
    sidebarEL.classList.toggle('active');
    dimEl.classList.toggle('active');
  });

  function changeInput(value: string): void {
    const inputEl = document.querySelector('input') as HTMLInputElement | null;
    inputEl!.value = value;
  }

  async function getMessage(key?: string): Promise<void> {
    console.log("clicked.");
    const sanitizeInput = inputEl.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const gptOptions: GPT_types = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: sanitizeInput,
            max_tokens: 100,
          },
        ],
      },
    };

    const requestOptions: RequestInit = {
      method: gptOptions.method,
      headers: gptOptions.headers,
      body: JSON.stringify(gptOptions.body),
    };

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', requestOptions);
      const data = await res.json();
      console.log(data);
      if (data.choices && data.choices[0] && data.choices[0].message && sanitizeInput) {
        const pEl = document.createElement('p');
        pEl.textContent = sanitizeInput;
        pEl.addEventListener('click', () => changeInput(pEl.textContent = sanitizeInput));
        historyEl?.append(pEl);
        keyEl.style.display = 'none';
      } else if (data.error) {
        outputEl!.textContent = data.error.message;
        outputEl!.classList.add('error');
      } else {
        outputEl!.textContent = 'Unexpected response format.';
      }
    } catch (error) {
      console.error(`Error: ${(error as Error).message}`);
    }
  }

  const clearInput = () => {
    inputEl.value = '';
  };

  submitBtn?.addEventListener('click', () => getMessage());
  buttonEl?.addEventListener('click', clearInput);
}
