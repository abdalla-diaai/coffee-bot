from agents import (
    AgentProtocol,
    ClassificationAgent,
    DetailsAgent,
    GuardAgent,
    OrderAgent,
    RecommendationAgent,
)
from typing import Dict

class AgentController:
    def __init__(self):
        self.guard_agent = GuardAgent()
        self.class_agent = ClassificationAgent()
        self.recommendation_agent = RecommendationAgent(
            "recommendation_dataset/apriori_recommendations.json",
            "recommendation_dataset/popularity_recommendation.csv",
        )
        self.agent_dict: Dict[str, AgentProtocol] = {
            "Details": DetailsAgent(),
            "Recommendation": self.recommendation_agent,
            "Orders": OrderAgent(self.recommendation_agent),
        }

    def get_response(self, user_input):
        # extract user input
        job_input = user_input['input']
        messages = job_input['messages']

        # get guard agent response
        guard_agent_response = self.guard_agent.get_response(messages)
        # print(f"GUARD AGENT OUTPUT: {guard_agent_response}")

        if guard_agent_response['memory']['guard_decision'] == "not allowed":
            return guard_agent_response

        class_agent_response = self.class_agent.get_response(messages)
        chosen_agent = class_agent_response['memory']['classification_decision']

        # get chosen agent response
        agent = self.agent_dict[chosen_agent]
        response = agent.get_response(messages)

        return response
