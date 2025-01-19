from copy import deepcopy
import json
from dotenv import load_dotenv
from openai import OpenAI
import os
from .utils import get_chatbot_response, check_json_output

load_dotenv()

class OrderAgent:
    def __init__(self, recommendation_agent):
        self.client = OpenAI(
            api_key=os.getenv("RUNPOD_TOKEN"), base_url=os.getenv("RUNPOD_BASE_URL")
        )
        self.model_name = os.getenv("MODEL_NAME")
        self.recommendation_agent = recommendation_agent

    def get_response(self, messages):
        messages = deepcopy(messages)
        system_prompt = """
            You are a customer support Bot for a coffee shop called "Merry's way"

            Here is the menu for this coffee shop.

            Cappuccino - $4.50
            Jumbo Savory Scone - $3.25
            Latte - $4.75
            Chocolate Chip Biscotti - $2.50
            Espresso shot - $2.00
            Hazelnut Biscotti - $2.75
            Chocolate Croissant - $3.75
            Dark chocolate (Drinking Chocolate) - $5.00
            Cranberry Scone - $3.50
            Croissant - $3.25
            Almond Croissant - $4.00
            Ginger Biscotti - $2.50
            Oatmeal Scone - $3.25
            Ginger Scone - $3.50
            Chocolate syrup - $1.50
            Hazelnut syrup - $1.50
            Carmel syrup - $1.50
            Sugar Free Vanilla syrup - $1.50
            Dark chocolate (Packaged Chocolate) - $3.00

            Things to NOT DO:
            * DON't ask how to pay by cash or card.
            * Don't tell the user to go to the counter.
            * Don't tell the user to go to place to get the order.

            You're task is as follows:
            1. Take the user's order.
            2. Validate that all their items are in the menu.
            3. if an item is not in the menu let the user and repeat back the remaining valid order.
            4. Ask them if they need anything else.
            5. If they do then repeat starting from step 3.
            6. If they don't want anything else. Using the "order" object that is in the output. Make sure to hit all three points:
                1. list down all the items and their prices.
                2. calculate the total. 
                3. Thank the user for the order and close the conversation with no more questions.

            The user message will contain a section called memory. This section will contain the following:
            "order"
            "step number"
            Please utilize this information to determine the next step in the process.
            
            Produce the following output without any additions, not a single letter outside of the structure bellow.
            Your output should be in a structured json format like so. Each key is a string and each value is a string. Make sure to follow the format exactly:
            {
            "chain of thought": "Write down your critical thinking about what is the maximum task number the user is on write now. Then write down your critical thinking about the user input and it's relation to the coffee shop process. Then write down your thinking about how you should respond in the response parameter taking into consideration the Things to NOT DO section. and Focus on the things that you should not do. 
            "step number": determine which task you are on based on the conversation."
            "order": "This is going to be a list of jsons like so. [{"item": "Put the item name", "quanitity": "Put the number that the user wants from this item.", "price": "Put the total price of the item }]
            "response": "Write the a response to the user"
            }
            
            """
        
        last_order_taken_status = ""
        asked_for_recommendation = False
        for i in range(len(messages) - 1, 0, -1):
            message = messages[i]
            agent_name = message.get("memory", {}).get("agent", "")
            if message['role'] == "assistant" and agent_name == "order_agent":
                step_number = message['memory']['step number']
                order = message['memory']['order']
                asked_for_recommendation = message['memory']['asked_for_recommendation']
                print(asked_for_recommendation)
                last_order_taken_status = f"""
                    step number = {step_number}
                    order = {order}
                """

        messages[-1]['content'] = last_order_taken_status + "\n" + messages[-1]['content']
        input_messages = [{'role': 'system', 'content': system_prompt}] + messages
        chatbot_response = get_chatbot_response(self.client, self.model_name, input_messages)
        chatbot_response = check_json_output(self.client, self.model_name, chatbot_response)
        output = self.postprocess(chatbot_response, messages, asked_for_recommendation)
        return output
    
    def postprocess(self, output, messages, asked_for_recommendation):
        output = json.loads(output)
        if type(output['order']) == str:
            output['order'] = json.loads(output['order'])
        response = output['response']
        print(asked_for_recommendation)
        if not asked_for_recommendation and len(output['order']) > 0:
            recommendation_output = self.recommendation_agent.get_recommendation_from_order(messages, output['order'])
            response = recommendation_output['content']
            asked_for_recommendation = True
        else:
            response = output['content']
        dict_output = {
            'role': 'assistant',
            'content': response,
            'memory': {
                'agent': 'Orders',
                'asked_for_recommendation': asked_for_recommendation,
                'step number': output.get('step number', 1),
                'order': output['order']
            }
        }

        return dict_output
