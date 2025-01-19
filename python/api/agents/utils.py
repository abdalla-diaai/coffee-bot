def get_chatbot_response(client, model_name, messages, temperature=0):
    input_messages = []
    for message in messages:
        input_messages.append({'role': message['role'], 'content': message['content']})
    # Create a chat completion
    response = client.chat.completions.create(
        model=model_name,
        messages=input_messages,
        temperature=temperature,
        max_tokens=2000,
    )
    return response.choices[0].message.content


def get_embedding(embedding_client, model_name, text_input):
    output = embedding_client.embeddings.create(
    input=text_input,
    model=model_name
)
    
    embeddings = []
    for embedding in output.data:
        embeddings.append(embedding.embedding)

    return embeddings

def check_json_output(client, model_name, json_string):
    prompt = f""" You will check this json string and correct any mistakes that will make it invalid. Then you will return the corrected json string. Nothing else. 
    If the Json is correct just return it.
    If there is a any text before order after the json string, remove it. 

    Do NOT return a single letter outside of the json string.
    The first character you write should be the open curly brace of the json and the last character you write should be the closing curly brace.

    You should check the json string for the following text between triple backticks:

    ```
    {json_string}
    ```
    """

    messages = [{'role': 'user', 'content': prompt}]
    response = get_chatbot_response(client,model_name,messages)
    response = response.replace("`", "")
    return response