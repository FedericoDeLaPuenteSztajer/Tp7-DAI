import CalificacionesRepository from '../repositories/calificaciones-repository.js';
import AlumnosService from './alumnos-service.js';
import MateriasService from './materias-service.js';

function validarNota(nota) {
    if (!nota) return; // Early return
    let existe = false;

    if (nota >= 0 || nota <= 10) {
        existe = true;
    }
    
    return existe;
}

export default class CalificacionesService {
    constructor() {
        console.log('Estoy en: CalificacionesService.constructor()');
        this.CalificacionesRepository = new CalificacionesRepository();
        this.AlumnosService = new AlumnosService();
        this.MateriasService = new MateriasService();
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

        if (await this.validarAlumnoExiste(idAlumno)) {
            throw new Error(`El alumno con id ${idAlumno} no existe.`);
        } else {
            const returnEntity = await this.CalificacionesRepository.getByAlumnoIdAsync(idAlumno);
            return returnEntity;
        }
    }

    validarAlumnoExiste = async (idAlumno) => {
        if (!idAlumno) return; // Early return
        let exists = false;

        const alumno = await this.AlumnosService.getByIdAsync(idAlumno);
        if (alumno == null) {
            exists = true;
        }
        return exists;
    }

    validarMateriaExiste = async (idMateria) => {
        if (!idMateria) return; // Early return
        let exists = false;

        const materia = await this.MateriasService.getByIdAsync(idMateria);
        if (materia == null) {
            exists = true;
        }
        return exists;
    }

    createAsync = async (entity) => {
        console.log(`CalificacionesService.createAsync(${JSON.stringify(entity)})`);

        if (!(await this.validarAlumnoExiste(entity.id_alumno))) {
            throw new Error(`El alumno con id ${entity.id_alumno} no existe.`);
        } else if (!(await this.validarMateriaExiste(entity.id_materia))) {
            throw new Error(`La materia con id ${entity.id_materia} no existe.`);
        } else if (!(validarNota(entity.nota))) {
            throw new Error(`Nota ${entity.nota} inválida.`);
        } else if (await getByAlumnoIdAsync(entity.id_alumno).id_materia==entity.id_materia) {
            throw new Error(`La calificacion del alumno con id ${entity.id_alumno} y materia con id ${entity.id_materia} ya existe.`);
        } else {
            const rowsAffected = await this.AlumnosRepository.createAsync(entity);
            return rowsAffected;
        }
    }

    /*
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
