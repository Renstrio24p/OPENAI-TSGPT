"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // <define:process.env>
  var init_define_process_env = __esm({
    "<define:process.env>"() {
    }
  });

  // src/assets/css/app.css
  var init_app = __esm({
    "src/assets/css/app.css"() {
    }
  });

  // src/pages/Chat/TSGPT.css
  var init_TSGPT = __esm({
    "src/pages/Chat/TSGPT.css"() {
    }
  });

  // src/pages/Chat/TSGPT.ts
  function TSGPT(DOM2) {
    Render2();
    function Render2() {
      DOM2.innerHTML = `
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
              <div id='submit'>\u27A3</div>
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
    const submitBtn = document.getElementById("submit");
    const outputEl = document.getElementById("output");
    const inputEl = document.querySelector("input");
    const historyEl = document.querySelector(".history");
    const buttonEl = document.querySelector("button");
    const sbarBtn = document.getElementById("sbars");
    const sidebarEL = document.getElementById("side");
    const dimEl = document.getElementById("dim");
    const keyEl = document.getElementById("keydiv");
    const inputkeyEl = document.getElementById("keys");
    const submitkeyEl = document.getElementById("sendkey");
    submitkeyEl?.addEventListener("click", () => {
      const sanitizeInput = inputkeyEl.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const apikey = sanitizeInput;
      getMessage(apikey);
    });
    sbarBtn.addEventListener("click", () => {
      sidebarEL.classList.toggle("active");
      dimEl.classList.toggle("active");
    });
    function changeInput(value) {
      const inputEl2 = document.querySelector("input");
      inputEl2.value = value;
    }
    async function getMessage(key) {
      console.log("clicked.");
      const sanitizeInput = inputEl.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const gptOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json"
        },
        body: {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: sanitizeInput,
              max_tokens: 100
            }
          ]
        }
      };
      const requestOptions = {
        method: gptOptions.method,
        headers: gptOptions.headers,
        body: JSON.stringify(gptOptions.body)
      };
      try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", requestOptions);
        const data = await res.json();
        console.log(data);
        if (data.choices && data.choices[0] && data.choices[0].message && sanitizeInput) {
          const pEl = document.createElement("p");
          pEl.textContent = sanitizeInput;
          pEl.addEventListener("click", () => changeInput(pEl.textContent = sanitizeInput));
          historyEl?.append(pEl);
          keyEl.style.display = "none";
        } else if (data.error) {
          outputEl.textContent = data.error.message;
          outputEl.classList.add("error");
        } else {
          outputEl.textContent = "Unexpected response format.";
        }
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    }
    const clearInput = () => {
      inputEl.value = "";
    };
    submitBtn?.addEventListener("click", () => getMessage());
    buttonEl?.addEventListener("click", clearInput);
  }
  var init_TSGPT2 = __esm({
    "src/pages/Chat/TSGPT.ts"() {
      "use strict";
      init_define_process_env();
      init_TSGPT();
    }
  });

  // src/assets/render/render.ts
  function Render() {
    const TSDOM = document.querySelector("#TS");
    {
      TSDOM && TSGPT(TSDOM);
    }
  }
  var init_render = __esm({
    "src/assets/render/render.ts"() {
      "use strict";
      init_define_process_env();
      init_TSGPT2();
    }
  });

  // src/start.ts
  var start_exports = {};
  __export(start_exports, {
    default: () => Start
  });
  async function Start(start) {
    start.innerHTML = `
        <div>
            <div id='TS'></div>
        </div>
    `;
    Render();
  }
  var init_start = __esm({
    "src/start.ts"() {
      "use strict";
      init_define_process_env();
      init_app();
      init_render();
    }
  });

  // src/assets/security/hashes.ts
  var hashes_exports = {};
  __export(hashes_exports, {
    default: () => UniqueHash
  });
  function UniqueHash() {
    let hash;
    do {
      hash = Math.random().toString(36).substring(2);
    } while (GenerateHashes.has(hash));
    GenerateHashes.add(hash);
    return hash;
  }
  var GenerateHashes;
  var init_hashes = __esm({
    "src/assets/security/hashes.ts"() {
      "use strict";
      init_define_process_env();
      GenerateHashes = /* @__PURE__ */ new Set();
    }
  });

  // src/index.ts
  init_define_process_env();
  var loadStart = async () => {
    const module = await Promise.resolve().then(() => (init_start(), start_exports));
    return module.default;
  };
  var loadUniqueHash = async () => {
    const module = await Promise.resolve().then(() => (init_hashes(), hashes_exports));
    return module.default;
  };
  var DOM = document.querySelector("#app");
  Promise.all([loadStart(), loadUniqueHash()]).then(([Start2, UniqueHash2]) => {
    DOM.id = UniqueHash2();
    Start2(DOM);
  });
})();
