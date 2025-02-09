import axios from 'axios';
import { MessageInterface } from '@/types/types';
import { API_KEY, API_URL } from '@/config/runPodConfig';

async function callChatBotAPI(messages: MessageInterface[]): Promise<MessageInterface> {
    try {
        const response = await axios.post(API_URL, {
            input: { messages }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            }
        });
        console.log('API response data:', response); // Log the response data

        const output = response.data;
        console.log('API response data:', output); // Log the response data

        if (output && output.output && output.status === "COMPLETED") {
            let outputMessage: MessageInterface = output.output;
            return outputMessage;
        } else {
            throw new Error('Unexpected response structure');
        } 
    } catch (error) {
        console.error('Error calling the API:', error);
        throw error;
    };
};

export { callChatBotAPI }; 

// async function callChatBotAPI(messages: MessageInterface[]): Promise<MessageInterface> {
//     const url = API_URL;
  
//     const requestConfig = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${API_KEY}`
//       },
//       body: JSON.stringify({"input":{"prompt": messages }})
//     };
  
//     try {
//       const response = await fetch(url, requestConfig);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();
//       console.log(data.output);
//       return data;
//     } catch (error) {
//       console.error('Error:', error);
//       throw error;
//     }
//   }


// export { callChatBotAPI };