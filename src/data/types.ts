export interface Project {
  id: number
  title: string
  company: string
  rating: number
  client: string
  feedback: string
  category: string
  tags: string
  deliveredPath: string
  featured: boolean
}

export interface Card {
  id: number
  serial: number
  title: string
  company: string
  rating: number
  clientName: string
  clientPhoto: string
  feedback: string
  category: string
  delivered: string
  allImages: string[]
}
