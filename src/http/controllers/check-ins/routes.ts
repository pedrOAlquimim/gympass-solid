import { verifyJwt } from "@/http/middleware/verifyJwt";
import { FastifyInstance } from "fastify";
import { metrics } from "./metrics";
import { history } from "./history";
import { create } from "./create";
import { validate } from "./validate";
import { verifyUserRole } from "@/http/middleware/verifyUserRole";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)

  app.post('/gyms/:gymId/check-ins', create)
  app.patch('/check-ins/:checkInId/validate', { onRequest:[verifyUserRole('ADMIN')] }, validate)
}