from agents import (
    AgentProtocol,
    ClassificationAgent,
    DetailsAgent,
    GuardAgent,
    RecommendationAgent,
)
import os
from typing import Dict


def main():
    guard_agent = GuardAgent()
    class_agent = ClassificationAgent()
    agent_dict: Dict[str, AgentProtocol] = {
        'Details': DetailsAgent(),
        'Recommendation': RecommendationAgent(
            "recommendation_dataset/apriori_recommendations.json",
            "recommendation_dataset/popularity_recommendation.csv",
        ),
    }

    messages = []
    while True:
        os.system("cls" if os.name == "nt" else "clear")
        print("\nPrint Messages ...... ")
        for message in messages:
            print(f"{message['role']}: {message['content']}")

        # get user input
        prompt = input("User: ")
        messages.append({'role': 'User', 'content': prompt})

        # get guard agent response
        guard_agent_response = guard_agent.get_response(messages)
        # print(f"GUARD AGENT OUTPUT: {guard_agent_response}")

        if guard_agent_response['memory']['guard_decision'] == "not allowed":
            messages.append(guard_agent_response)
            continue

        class_agent_response = class_agent.get_response(messages)
        chosen_agent = class_agent_response['memory']['classification_decision']
        print(f"Chosen agent: {chosen_agent}")

        # get chosen agent response
        agent = agent_dict[chosen_agent]
        response = agent.get_response(messages)
        messages.append(response)

    # recommendation_agent = RecommendationAgent(
    #     "recommendation_dataset/apriori_recommendations.json",
    #     "recommendation_dataset/popularity_recommendation.csv",
    # )

    # print(recommendation_agent.get_apriori_recommendation(products=["Latte"]))


if __name__ == "__main__":
    main()