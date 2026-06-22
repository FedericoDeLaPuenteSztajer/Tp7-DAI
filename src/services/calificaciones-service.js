import CalificacionesRepository from '../repositories/calificaciones-repository.js';
import AlumnosService from './alumnos-service.js';

export default class CalificacionesService {
    constructor() {
        console.log('Estoy en: CalificacionesService.constructor()');
        this.CalificacionesRepository = new CalificacionesRepository();
        this.AlumnosService = new AlumnosService();
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

    getByAlumnoIdAsync = async (idAlumno) => {
        console.log(`CalificacionesService.getByAlumnoIdAsync(${idAlumno})`);
        
        await this.validarAlumnoExiste(idAlumno);

        const returnEntity = await this.CalificacionesRepository.getByAlumnoIdAsync(idAlumno);
        return returnEntity;
    }

    validarAlumnoExiste = async (idAlumno) => {
        if (!idAlumno) return; // Early return

        const alumno = await this.AlumnosService.getByIdAsync(idAlumno);
        if (alumno == null) {
            throw new Error(`El alumno con id ${idAlumno} no existe.`);
        }
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
    */
}
