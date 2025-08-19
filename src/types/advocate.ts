export interface Advocate {
    city: string
    firstName: string
    lastName: string
    phoneNumber: number
    degree: string
    specialties: string[]
    yearsOfExperience: number
  }

export interface AdvocatesResponse {
  data: Advocate[]
}