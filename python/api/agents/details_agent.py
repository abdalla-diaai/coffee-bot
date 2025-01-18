from copy import deepcopy
import json
from dotenv import load_dotenv
from openai import OpenAI
import os
from .utils import get_chatbot_response, get_embedding
from pinecone import Pinecone

load_dotenv()


class DetailsAgent:
    def __init__(self):
        self.client = OpenAI(
            api_key=os.getenv("RUNPOD_TOKEN"), base_url=os.getenv("RUNPOD_BASE_URL")
        )
        self.model_name = os.getenv("MODEL_NAME")
        self.embedding_client = OpenAI(
            api_key=os.getenv("RUNPOD_TOKEN"),
            base_url=os.getenv("RUNPOD_EMBEDDING_URL"),
        )

        self.pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
        self.index_name = os.getenv("PINECONE_INDEX_NAME")

    def get_closest_results(self, index_name, input_embeddings, top_k=2):
        index = self.pc.Index(index_name)
        results = index.query(
            namespace="ns1",
            vector=input_embeddings,
            top_k=top_k,
            include_values=False,
            include_metadata=True,
        )
        return results

    def get_response(self, messages):
        messages = deepcopy(messages)
        user_message = messages[-1]['content']
        embeddings = get_embedding(
            self.embedding_client, self.model_name, user_message
        )[0]
        result = self.get_closest_results(self.index_name, embeddings)
        source_knowledge = "\n".join([x['metadata']['text'].strip() for x in result['matches']])
        prompt = f"""
        Using the contexts below, answer the query.

        Contexts:
        {source_knowledge}

        Query: {user_message}
        """

        system_prompt = """ You are a customer support agent for a coffee shop called Merry's way. You should answer every question as if you are waiter and provide the neccessary information to the user regarding their orders """

        messages[-1]['content'] = prompt
        input_messages = [{'role': 'system', 'content': system_prompt}] + messages[-3:]
        chatbot_output = get_chatbot_response(
            self.client, self.model_name, input_messages
        )
        output = self.postprocess(chatbot_output)
        return output

    def postprocess(self, output):
        output = {
            'role': 'assistant',
            'content': output,
            'memory': {'agent': 'Details'},
        }
        return output
