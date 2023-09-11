import { FastifyInstance } from "fastify";
import { register } from "./register";
import { refresh } from "./refresh";
import { profile } from "./profile";
import { verifyJwt } from "../../middleware/verifyJwt";
import { authenticate } from "./authenticate";

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  /* Authenticated */
  app.get('/me', {onRequest: [verifyJwt]}, profile)
}