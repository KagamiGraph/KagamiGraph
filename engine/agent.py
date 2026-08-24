from typing import TypedDict, Annotated, Sequence
import operator
from langchain_core.messages import BaseMessage
from langgraph.graph import StateGraph, START, END
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
import os

# Set a dummy API key for local LLM testing (can be pointed to Ollama)
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY", "sk-local-dummy")

# Define the Agent State
class AgentState(TypedDict):
    persona_id: str
    persona_context: str
    question: str
    reflection: str
    response: str
    messages: Annotated[Sequence[BaseMessage], operator.add]

# Point this to any LLM (e.g., local Ollama via base_url)
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.7)

def retrieve_context(state: AgentState):
    """
    In production, this queries Qdrant for past behaviors of this persona.
    For now, we return a mock retrieved memory.
    """
    retrieved_memory = f"Retrieved past behavioral data for {state['persona_id']}: They prefer high-contrast UIs and hate glassmorphism."
    return {"persona_context": retrieved_memory}

def reflect(state: AgentState):
    """
    The 'Smallville' reflection step. The agent thinks about its context before answering.
    """
    prompt = ChatPromptTemplate.from_template(
        "You are simulating a persona: {persona_id}. "
        "Context from past data: {persona_context}\n"
        "The user asked: {question}\n"
        "Write a brief internal monologue (1-2 sentences) about how you feel about this question based on your context."
    )
    chain = prompt | llm
    result = chain.invoke({
        "persona_id": state["persona_id"],
        "persona_context": state["persona_context"],
        "question": state["question"]
    })
    return {"reflection": result.content}

def generate_response(state: AgentState):
    """
    Generates the final response based on the reflection.
    """
    prompt = ChatPromptTemplate.from_template(
        "You are {persona_id}. "
        "Your internal thought: {reflection}\n"
        "Respond directly to the user's question as if you are this persona. Do not mention that you are an AI. "
        "Question: {question}"
    )
    chain = prompt | llm
    result = chain.invoke({
        "persona_id": state["persona_id"],
        "reflection": state["reflection"],
        "question": state["question"]
    })
    return {"response": result.content}

# Build the Graph
workflow = StateGraph(AgentState)

workflow.add_node("retrieve", retrieve_context)
workflow.add_node("reflect", reflect)
workflow.add_node("respond", generate_response)

workflow.add_edge(START, "retrieve")
workflow.add_edge("retrieve", "reflect")
workflow.add_edge("reflect", "respond")
workflow.add_edge("respond", END)

# Compile the graph
agent_app = workflow.compile()
