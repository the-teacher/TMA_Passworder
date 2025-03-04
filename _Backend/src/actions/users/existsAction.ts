import { Request, Response } from 'express'

// Here we could connect a service to check user existence
// import { userService } from '../../services/userService'

export const perform = (req: Request, res: Response) => {
  try {
    const { login } = req.params

    // Simulating user existence check
    // In a real application, this would be a database query
    const userExists = checkIfUserExists(login)

    res.json({
      status: 'success',
      exists: userExists,
      login,
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

// Stub function for checking user existence
// In a real application, this would be a database query
function checkIfUserExists(login: string): boolean {
  // Example logic: user exists if login is longer than 3 characters
  // and doesn't contain special characters
  const validLoginPattern = /^[a-zA-Z0-9_]+$/
  return login.length > 3 && validLoginPattern.test(login)
}
