import { verifyJwt } from "@/http/middleware/verifyJwt";
import { FastifyInstance } from "fastify";
import { metrics } from "./metrics";
import { history } from "./history";
import { create } from "./create";
import { validate } from "./validate";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/checkIns/history', history)
  app.get('/checkIns/metrics', metrics)

  app.post('gyms/:gymId/check-ins', create)
  app.patch('check-ins/:checkInId/validate', validate)
}