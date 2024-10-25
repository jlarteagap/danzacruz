export type Subscriber = {
  id: string
  name: string
  phone: string
  email: string
  workshop: string
  status: boolean
}

export type Unsubscribe = () => void
