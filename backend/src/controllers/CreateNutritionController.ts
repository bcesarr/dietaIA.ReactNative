import { FastifyRequest, FastifyReply } from "fastify";
import { CreateNutritionService } from "../services/CreateNutritionService";

export interface DataProps {
    name: string;
    age: string;
    weight: string;
    height: string;
    gender: string;
    level: string;
    objective: string;
}

class CreateNutritionController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { name, age, weight, height, gender, level, objective } = request.body as DataProps

        const createNutrition = new CreateNutritionService()

        const nutrition = await createNutrition.execute({name, age, weight, height, gender, level, objective})

        reply.send(nutrition)

    }
}

export { CreateNutritionController }