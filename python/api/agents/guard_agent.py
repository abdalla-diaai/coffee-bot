from copy import deepcopy
import json
from dotenv import load_dotenv
from openai import OpenAI
import os
from .utils import get_chatbot_response, check_json_output

load_dotenv()


class GuardAgent():
    def __init__(self):
        self.client = OpenAI(
            api_key=os.getenv("RUNPOD_TOKEN"), base_url=os.getenv("RUNPOD_BASE_URL")
        )
        self.model_name = os.getenv("MODEL_NAME")

    def get_response(self, messages):
        messages = deepcopy(messages)
        system_prompt = """
            You are a helper AI assistant for a coffee shop application which serves drinks and pastries.
            
            Your task is to determine whether the user is asking something relevant to the coffee shop or not. 
            
            The user is allowed to:
            1. Ask questions about coffee shop like location, working hours, menu items and coffee shop related questions. 
            2. Ask questions about menu items, they can ask for ingredients of an item and more details about the item. 
            3. Make an order. 
            4. Ask for recommendations of what to buy. 

            The user is not allowed to:
            1. Ask questions about anything else other than our coffee shop. 
            2. Ask questions about staff or how to make a certain menu item.

            Your output should be in a structured json format like so. Each key is a string and each value is a string. Make sure to follow the format exactly:

            {
            "chain of thought": "go over each of the points above and see if the message meet these points or not. Then you write some thought about what point is this relevant to."
            "decision": "allowed or not allowed. Pick one of those and only write the word." 
            "message": "leave the message empty if it is allowed otherwise write Sorry, I can not help with that. Can I help you with your order!"
            
            }
        """
        input_messages = [{'role': 'system', 'content': system_prompt}] + messages[-3:]
        chatbot_output = get_chatbot_response(self.client, self.model_name, input_messages)
        chatbot_output = check_json_output(self.client, self.model_name, chatbot_output)
        output = self.postprocess(chatbot_output)
        return output
    
    def postprocess(self, output):
        output = json.loads(output)
        dict_ouput = {
            'role': 'Assistant',
            'content': output['message'],
            'memory': {
                'agent': 'Guard',
                'guard_decision': output['decision']
            }
        }
        return dict_ouput


