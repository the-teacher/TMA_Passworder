import { Request, Response } from 'express'

// Define allowed service types
export const ALLOWED_SERVICES = ['telegram', 'gmail', 'github'] as const
export type ServiceType = (typeof ALLOWED_SERVICES)[number]

// Here we could connect a service to check user existence
// import { userService } from '../../services/userService'

export const perform = (req: Request, res: Response) => {
  try {
    const { service, id } = req.params

    // Validate that service has an allowed value
    if (!isValidService(service)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid service type',
        error: `Service must be one of: ${ALLOWED_SERVICES.join(', ')}. Received: ${service}`,
      })
    }

    // Now service is typed as ServiceType
    const validatedService: ServiceType = service as ServiceType

    // Simulate user existence check
    const userExists = checkIfUserExists(id)

    res.json({
      status: 'success',
      exists: userExists,
      data: { service: validatedService, id },
    })
  } catch (error) {
    console.error('Error checking user existence:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to check if user exists',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

// Function to validate service type
const isValidService = (service: string): service is ServiceType => {
  return ALLOWED_SERVICES.includes(service as ServiceType)
}

// Function to check if user exists
const checkIfUserExists = (id: string): boolean => {
  // Example logic: user exists if id is longer than 3 characters
  // and doesn't contain special characters
  const validLoginPattern = /^[a-zA-Z0-9_]+$/
  return id.length > 3 && validLoginPattern.test(id)
}
