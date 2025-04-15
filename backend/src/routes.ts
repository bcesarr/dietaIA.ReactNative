import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateNutritionController } from "./controllers/CreateNutritionController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get("/teste", (request: FastifyRequest, reply: FastifyReply) => {
        
        let responseText = "```json\n{\n  \"nome\": \"Bruno\",\n  \"sexo\": \"Masculino\",\n  \"idade\": 27,\n  \"altura\": 1.67,\n  \"peso\": 53,\n  \"objetivo\": \"Hipertrofia\",\n  \"refeicoes\": [\n    {\n      \"horario\": \"7:00\",\n      \"nome\": \"Cafe da manha\",\n      \"alimentos\": [\n        \"2 ovos inteiros\",\n        \"1 fatia de pao integral\",\n        \"1 colher de sopa de pasta de amendoim\",\n        \"1 copo de leite desnatado\"\n      ]\n    },\n    {\n      \"horario\": \"10:00\",\n      \"nome\": \"Lanche da manha\",\n      \"alimentos\": [\n        \"1 fruta (maça, banana ou laranja)\",\n        \"1 punhado de castanhas\"\n      ]\n    },\n    {\n      \"horario\": \"13:00\",\n      \"nome\": \"Almoço\",\n      \"alimentos\": [\n        \"150g de frango grelhado ou peixe\",\n        \"1 concha de arroz integral\",\n        \"1 concha de feijao\",\n        \"Salada verde a vontade\"\n      ]\n    },\n    {\n      \"horario\": \"16:00\",\n      \"nome\": \"Lanche da tarde\",\n      \"alimentos\": [\n        \"1 copo de iogurte desnatado com granola\",\n        \"1 fruta\"\n      ]\n    },\n    {\n      \"horario\": \"19:00\",\n      \"nome\": \"Jantar\",\n      \"alimentos\": [\n        \"150g de carne magra (patinho, alcatra)\",\n        \"1 concha de batata doce cozida\",\n        \"Salada verde a vontade\"\n      ]\n    },\n    {\n      \"horario\": \"21:00\",\n      \"nome\": \"Ceia (opcional)\",\n      \"alimentos\": [\n        \"Caseina (30g)\"\n      ]\n    }\n  ],\n  \"suplementos\": [\n    \"Whey protein\",\n    \"Creatina\",\n    \"BCAA\"\n  ]\n}\n```"

        try {
            // Extrair o JSON
            let jsonString = responseText.replace(/```\w*\n/g, '').replace(/\n```/g, '').trim();

            let jsonObject = JSON.parse(jsonString)

            return reply.send({ data: jsonObject })

        } catch(error) {
            console.log(error)
        }

        reply.send({ ok:true })
    })

    fastify.post("/create", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateNutritionController().handle(request, reply)
    })
}