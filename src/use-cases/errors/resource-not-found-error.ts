export class ResourceNotFoundError extends Error {
  constructor() {
    super('Method not found')
  }
}