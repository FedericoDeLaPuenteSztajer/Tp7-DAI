import Db from './db-pg.js';

export default class MateriassRepository {
    constructor() {
        console.log('Estoy en: MateriassRepository.constructor()');
        this.db = new Db();
    }

    getAllAsync = async () => {
        console.log(`MateriassRepository.getAllAsync()`);
        const sql = `SELECT * FROM materias`;
        return await this.db.queryAll(sql);
    }

    getByIdAsync = async (id) => {
        console.log(`MateriassRepository.getByIdAsync(${id})`);
        const sql = `SELECT * FROM materias WHERE id=$1`;
        return await this.db.queryOne(sql, [id]);
    }

    createAsync = async (entity) => {
        console.log(`MateriassRepository.createAsync(${JSON.stringify(entity)})`);
        const sql = `INSERT INTO materias (nombre) VALUES ($1) RETURNING id`;
        const values = [entity?.nombre ?? ''];
        return await this.db.queryReturnId(sql, values);
    }

    updateAsync = async (entity) => {
        console.log(`MateriassRepository.updateAsync(${JSON.stringify(entity)})`);
        const sql = `UPDATE materias SET nombre = $2 WHERE id = $1`;
        const values =  [   entity.id, 
                            entity?.nombre ?? ''
                        ];
        return await this.db.queryRowCount(sql, values);
    }

    deleteByIdAsync = async (id) => {
        console.log(`MateriassRepository.deleteByIdAsync(${id})`);
        const sql = `DELETE FROM materias WHERE id=$1`;
        return await this.db.queryRowCount(sql, [id]);
    }
}
