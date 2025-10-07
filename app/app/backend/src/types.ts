export type AIProvider = 'perplexity' | 'ollama'
export type AIPersona = 'co-founder' | 'cmo' | 'cfo' | 'coo' | 'cto' | 'cpo' | 'cso'
export type LearningPhase = 'observation' | 'analysis' | 'optimization' | 'autonomous'
export interface AIMessage {
  id: string
  role: string
  content: string
  timestamp: Date
  sessionId: string
  userId: string
  metadata?: any
}
