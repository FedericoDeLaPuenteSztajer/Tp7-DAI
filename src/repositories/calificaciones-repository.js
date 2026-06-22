import pkg from 'pg'
import LogHelper from './../helpers/log-helper.js'
import config from './../configs/db-config.js';      // Traigo la configuracion de la base de datos.

const { Pool } = pkg;

export default class CalificacionesRepository {
    constructor() {
        // Se ejecuta siempre, (al instanciar la clase)
        console.log('Estoy en: CalificacionesRepository.constructor()');
        this.DBPool = null;
    }

    getDBPool = () => {
        if (this.DBPool == null) {
            this.DBPool = new Pool(config);
        }
        return this.DBPool;
    }

    getAllAsync = async () => {
        console.log(`CalificacionesRepository.getAllAsync()`);
        let returnArray = null;

        try {
            const sql = `SELECT c.*, a.nombre AS "nombre_alumno", a.apellido AS "apellido_alumno", m.nombre AS "materia_nombre" FROM calificaciones c JOIN alumnos a ON c.id_alumno=a.id JOIN materias m ON c.id_materia=m.id`;
            const resultPg = await this.getDBPool().query(sql);
            returnArray = resultPg.rows;
        } catch (error) {
            LogHelper.logError(error);
        }
        return returnArray;
    }
    
    getByIdAsync = async (id) => {
        console.log(`CalificacionesRepository.getByIdAsync(${id})`);
        let returnEntity = null;
        try {
            const sql = `SELECT c.*, a.nombre AS "nombre_alumno", a.apellido AS "apellido_alumno", m.nombre AS "materia_nombre" FROM calificaciones c JOIN alumnos a ON c.id_alumno=a.id JOIN materias m ON c.id_materia=m.id WHERE c.id=$1`;
            const values = [id];
            const resultPg = await this.getDBPool().query(sql, values);
            if (resultPg.rows.length > 0) {
                returnEntity = resultPg.rows[0];
            }
        } catch (error) {
            LogHelper.logError(error);
        }
        return returnEntity;
    }

    getByAlumnoIdAsync = async (idAlumno) => {
        console.log(`CalificacionesRepository.getByIdAsync(${idAlumno})`);
        let returnEntity = null;
        try {
            const sql = `SELECT c.*, m.nombre AS "materia_nombre" FROM calificaciones c JOIN materias m ON c.id_materia=m.id WHERE c.id_alumno IN (SELECT id FROM alumnos WHERE id=$1)`;
            const values = [idAlumno];
            const resultPg = await this.getDBPool().query(sql, values);
            if (resultPg.rows.length > 0) {
                returnEntity = resultPg.rows[0];
            }
        } catch (error) {
            LogHelper.logError(error);
        }
        return returnEntity;
    }

    /*
    createAsync = async (entity) => {
        console.log(`AlumnosRepository.createAsync(${JSON.stringify(entity)})`);
        let newId = 0;

        try {
            const sql = ` INSERT INTO alumnos (
                            nombre              , 
                            apellido            , 
                            id_curso            , 
                            fecha_nacimiento    , 
                            hace_deportes
                        ) VALUES (
                            $1, 
                            $2, 
                            $3, 
                            $4, 
                            $5
                        ) RETURNING id`;
            const values = [entity?.nombre ?? '',
            entity?.apellido ?? '',
            entity?.id_curso ?? 0,
            entity?.fecha_nacimiento ?? null,
            entity?.hace_deportes ?? 0
            ];
            const resultPg = await this.getDBPool().query(sql, values);
            newId = resultPg.rows[0].id;
        } catch (error) {
            LogHelper.logError(error);
        }
        return newId;
    }

    updateAsync = async (entity) => {
        console.log(`AlumnosRepository.updateAsync(${JSON.stringify(entity)})`);
        let rowsAffected = 0;
        let id = entity.id;

        try {
            const previousEntity = await this.getByIdAsync(id);
            if (previousEntity == null) return 0;
            const sql = `UPDATE alumnos SET 
                            nombre              = $2, 
                            apellido            = $3, 
                            id_curso            = $4, 
                            fecha_nacimiento    = $5, 
                            hace_deportes       = $6
                        WHERE id = $1`;

            const values = [id,     // $1
                entity?.nombre ?? previousEntity?.nombre,
                entity?.apellido ?? previousEntity?.apellido,
                entity?.id_curso ?? previousEntity?.id_curso,
                entity?.fecha_nacimiento ?? previousEntity?.fecha_nacimiento,
                entity?.hace_deportes ?? previousEntity?.hace_deportes
            ];
            const resultPg = await this.getDBPool().query(sql, values);

            rowsAffected = resultPg.rowCount;
        } catch (error) {
            LogHelper.logError(error);
        }
        return rowsAffected;
    }

    deleteByIdAsync = async (id) => {
        console.log(`AlumnosRepository.deleteByIdAsync(${id})`);
        let rowsAffected = 0;

        try {
            const sql = `DELETE from alumnos WHERE id=$1`;
            const values = [id];
            const resultPg = await this.getDBPool().query(sql, values);
            rowsAffected = resultPg.rowCount;
        } catch (error) {
            LogHelper.logError(error);
        }
        return rowsAffected;
    }
    */
}
