from copy import deepcopy
import json
from dotenv import load_dotenv
import pandas as pd
from openai import OpenAI
import os

load_dotenv()


class RecommendationAgent:
    def __init__(self, apriori_recommendation_path, popular_recommendation_path):
        self.client = OpenAI(
            api_key=os.getenv("RUNPOD_TOKEN"), base_url=os.getenv("RUNPOD_BASE_URL")
        )
        self.model_name = os.getenv("MODEL_NAME")

        with open(apriori_recommendation_path, "r") as file:
            self.apriori_recommendations = json.load(file)

        self.popular_recommendations = pd.read_csv(popular_recommendation_path)
        self.products = self.popular_recommendations["product"].tolist()
        self.product_categories = self.popular_recommendations[
            "product_category"
        ].tolist()

    def get_apriori_recommendation(self, products, top_k=5):
        recommendation_list = []
        for product in products:
            if product in self.apriori_recommendations:
                recommendation_list += self.apriori_recommendations[product]

        # sort recommendation list by confidence
        recommendation_list = sorted(
            recommendation_list, key=lambda x: x["confidence"], reverse=True
        )

        # limit recommendation to 2 per category
        recommendations = []
        recommendation_per_category = {}
        for recommendation in recommendation_list:
            if recommendation in recommendations:
                continue
            product_category = recommendation["product_category"]
            if product_category not in recommendation_per_category:
                recommendation_per_category[product_category] = 0
            if recommendation_per_category[product_category] >= 2:
                continue
            recommendation_per_category[product_category] += 1
            recommendations.append(recommendation["product"])

            if len(recommendations) >= top_k:
                return recommendations

        return recommendations

    def get_popular_recommendation(self, product_categories=None, top_k=5):
        recommendations_df = self.popular_recommendations
        if type(product_categories) == str:
            product_categories = [product_categories]

        if product_categories is not None:
            recommendations_df = self.popular_recommendations[
                self.popular_recommendations["product_category"].isin(
                    product_categories
                )
            ]

        recommendations_df = recommendations_df.sort_values(
            "num_of_transactions", ascending=False
        )

        if recommendations_df.shape[0] == 0:
            return []
        return recommendations_df["product"].tolist()[:top_k]
