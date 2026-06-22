import CalificacionesRepository from '../repositories/calificaciones-repository.js';

export default class CalificacionesService {
    constructor() {
        console.log('Estoy en: CalificacionesService.constructor()');
        this.CalificacionesRepository = new CalificacionesRepository();
    }

    getAllAsync = async () => {
        console.log(`CalificacionesService.getAllAsync()`);
        const returnArray = await this.CalificacionesRepository.getAllAsync();
        if (returnArray == null) return null;
        return returnArray;
    }

    getByIdAsync = async (id) => {
        console.log(`CalificacionesService.getByIdAsync(${id})`);
        const returnEntity = await this.CalificacionesRepository.getByIdAsync(id);
        return returnEntity;
    }

    getByAlumnoIdAsync = async (id) => {
        console.log(`CalificacionesService.getByAlumnoIdAsync(${id})`);
        const returnEntity = await this.CalificacionesRepository.getByAlumnoIdAsync(id);
        return returnEntity;
    }

    /*
    createAsync = async (entity) => {
        console.log(`AlumnosService.createAsync(${JSON.stringify(entity)})`);
        // Regla de negocio!!!
        await this.validarCursoExiste(entity.id_curso);
        // Si llegue aca es que no hubo un error.
        const rowsAffected = await this.AlumnosRepository.createAsync(entity);
        return rowsAffected;
    }

    updateAsync = async (entity) => {
        console.log(`AlumnosService.updateAsync(${JSON.stringify(entity)})`);
        // Regla de Negocio!
        if (entity.id_curso) {
            await this.validarCursoExiste(entity.id_curso);
        }
        
        const rowsAffected = await this.AlumnosRepository.updateAsync(entity);
        return rowsAffected;
    }

    deleteByIdAsync = async (id) => {
        console.log(`AlumnosService.deleteByIdAsync(${id})`);
        const rowsAffected = await this.AlumnosRepository.deleteByIdAsync(id);
        return rowsAffected;
    }

    validarCursoExiste = async (idCurso) => {
        if (!idCurso) return; // Early return

        const curso = await this.CursosService.getByIdAsync(idCurso);
        if (curso == null) {
            throw new Error(`El curso con id ${idCurso} no existe.`);
        }
    }
    */
}
