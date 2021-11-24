import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Curso from 'App/Models/Curso'

export default class CursoSeederSeeder extends BaseSeeder {
  public async run() {
    const cursos = [{ nome: "Informática" }, { nome: "Mecatronica" }, { nome: "Edificações" }, { nome: "Moda" }];
    await Curso.createMany(cursos);
  }
}
