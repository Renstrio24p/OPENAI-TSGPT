export default async function GPT4(DOM: HTMLDivElement) {
    try {
      
      // langChain TS
  
      async function fetchData() {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY || 'YOUR_API_KEY'}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
           model: "gpt-4",
           messages: [
            {
                role: "user",
                content: "Hello!"
            },
            {
                role: "apple",
                content: "Hi there"
            }

           ]
          })
        });
  
        if (res.status === 429) {
          throw new Error('Quota exceeded: You have reached your maximum quota.');
        }
  
        if (!res.ok) {
          throw new Error(`Failed to fetch data. Status: ${res.status} - ${res.statusText}`);
        }
  
        const data = await res.json();
        Render(data);
        console.log(data);
      }
  
      await fetchData();
    } catch (error) {
      console.error('Error fetching data from OpenAI:', error);
      RenderError((error as Error).toString());
    }
  
    function Render(dat: {}) {
      DOM.innerHTML = `
        <div>
          <h1>OpenAI TS</h1>
          <pre>${JSON.stringify(dat, null, 2)}</pre>
        </div>
      `;
    }
  
    function RenderError(errorMessage: string) {
      DOM.innerHTML = `
        <div>
          <h1>OpenAI TS</h1>
          <p>${errorMessage}</p>
        </div>
      `;
    }
  }
  