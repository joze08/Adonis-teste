import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AlunosController {
  public async index({ }: HttpContextContract) {
    const alunos = await User.query().preload('curso');
    return alunos;
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = request.only(["curso_id", "nome", "descricao"]);
      const aluno = await User.create(data);
      return aluno
    } catch (error) {
      response.status(500).send("Erro ao cadastrar o aluno!")
    }
  }

  public async show({ params }: HttpContextContract) {
    const aluno = await User.findOrFail(params.id);
    return aluno;
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const aluno = await User.findOrFail(params.id)
      const { curso_id, nome } = request.only(["curso_id", "nome"])
      aluno.cursoId = curso_id
      aluno.nome = nome
      await aluno.save()
      return aluno
    } catch (error) {
      response.status(500).send("Erro ao atualizar o aluno!")
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const curso = await User.findOrFail(params.id)
      await curso.delete()
      return curso
    } catch (error) {
      response.status(500).send("Erro ao apagar o aluno!")
    }
  }
}
