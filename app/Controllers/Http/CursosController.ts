import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Curso from 'App/Models/Curso';

export default class CursosController {
  public async index ({}: HttpContextContract) {
    const cursos = await Curso.all();
    return cursos;
  }

  public async store ({request, response}: HttpContextContract) {
    try {
      const data = request.only(["nome"])
      const curso = await Curso.create(data);
      return curso
    } catch (error) {
      response.status(500).send("Erro ao cadastrar o curso!")
    }
  }

  public async show ({params}: HttpContextContract) {
    const curso = await Curso.findOrFail(params.id)
    return curso
  }

  public async update ({params, request, response}: HttpContextContract) {
    try {
      const curso = await Curso.findOrFail(params.id)
      const { nome } = request.only(["nome"])
      curso.nome = nome
      await curso.save()
      return curso
    } catch (error) {
      response.status(500).send("Erro ao atualizar o curso!")
    }
  }

  public async destroy ({params, response}: HttpContextContract) {
    try {
      const curso = await Curso.findOrFail(params.id)
      await curso.delete()
      return curso
    } catch (error) {
      response.status(500).send("Erro ao apagar o curso!")
    }
  }

}
