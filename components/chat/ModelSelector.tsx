"use client"

import { useState } from "react"

interface ModelSelectorProps {
  currentModel: string
  onModelChange: (model: string) => void
}

export const ModelSelector = ({ currentModel, onModelChange }: ModelSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const models = [
    {
      id: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
      name: "Llama 3.1 (8B)",
      description: "Fast, efficient model for general chat",
    },
    {
      id: "deepseek-ai/DeepSeek-R1",
      name: "DeepSeek R1",
      description: "Reasoning-focused model with step-by-step thinking",
    },
    {
      id: "mistralai/Mixtral-8x22B-Instruct-v0.1",
      name: "Mixtral 8x22B",
      description: "Powerful model for theological and complex topics",
    },
  ]

  return (
    <div className="relative">
      <label className="text-sm text-gray-300 block mb-1">AI Model</label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-input-bg text-white p-2 rounded border border-[#555] flex justify-between items-center"
      >
        <span>{models.find((m) => m.id === currentModel)?.name || "Select a model"}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-card-bg border border-[#555] rounded shadow-lg">
          {models.map((model) => (
            <button
              key={model.id}
              onClick={() => {
                onModelChange(model.id)
                setIsOpen(false)
              }}
              className={`w-full text-left p-3 hover:bg-input-bg transition-colors ${
                currentModel === model.id ? "bg-input-bg" : ""
              }`}
            >
              <div className="font-medium">{model.name}</div>
              <div className="text-sm text-gray-400">{model.description}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
