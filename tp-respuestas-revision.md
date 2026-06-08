# Preguntas sobre el TP — De server-noob a arquitectura en capas

Las siguientes preguntas evalúan la comprensión del recorrido completo del proyecto: desde `server-noob.js` (V1), pasando por `server-noob-mejorada.js` (V2), hasta `server.js` con capas (V3) y la clase `DbPg` (V4).

---

### V1 — server-noob.js 

**1.** Por cada request crea un nuevo cliente y luego lo borra, esto no solo ralentiza programa sino que al recibir muchos request se puede alcanzar el límite de conexciones simultáneas de pgAdmin y fallar.

**2.** En el caso que no se haya creado un cliente nuevo exitosamente salta el siguiente error: "Error: Called end on a client that was never connected".

**3.** Cuanto más grande es la API más cuesta encontrar un método específico y modificarlo, además si varias personas quieren realizar cambios, como está todo en un solo archivo daría conflictos el merge.

**4.** Esto prevee la inyección del usuario en SQL, limitando que envíe querys de forma libre, lo que sería un error grave.

---

### V2 — server-noob-mejorada.js

**5.** En la versión mejorada se reemplazó `Client` por `Pool`. Explicá la diferencia entre ambos: ¿cómo maneja las conexiones cada uno? ¿Cuándo conviene usar `Client` y cuándo `Pool`?

**6.** ¿Qué es un `Router` de Express y qué problema resuelve en esta versión? ¿Por qué las rutas dentro del router no incluyen `/api/alumnos` y solo definen `''` o `'/:id'`?

**7.** En `server-noob-mejorada.js`, el archivo principal tiene solo ~26 líneas. ¿Qué responsabilidad tiene ese archivo ahora? ¿Dónde está la lógica de los endpoints?

**8.** En la versión mejorada desaparece el bloque `finally`. ¿Por qué ya no es necesario cerrar la conexión manualmente al usar `Pool`?

---

### V3 — server.js (arquitectura en capas)

**9.** Nombrá las tres capas de la arquitectura y explicá con tus palabras qué responsabilidad tiene cada una. ¿Cuál conoce los `req` y `res` de Express? ¿Cuál conoce el SQL? ¿Cuál tiene las reglas de negocio?

**10.** En `alumnos-service.js`, la edad del alumno se calcula en el service con una función JavaScript, en vez de calcularla en la query SQL. ¿Por qué se eligió calcularla en el service y no en la base de datos?

**11.** Cuando se crea un alumno con un `id_curso` que no existe, `AlumnosService` llama a `CursosService` para verificarlo. ¿Por qué llama al service de cursos y no directamente al repository de cursos?

**12.** ¿Para qué sirve el archivo `.env` y la librería `dotenv`? ¿Qué problema de las versiones anteriores resuelve? ¿Por qué el archivo `.env` no se sube al repositorio de Git?

**13.** ¿Qué hace `LogHelper` y por qué es mejor que usar `console.log(error)` suelto en cada lugar del código?

---

### V4 — DbPg y DbMssql

**14.** Mirá `alumnos-repository.js` (versión original) y `alumnos-repository-new.js` (versión refactorizada). ¿Qué código repetido (boilerplate) se eliminó al extraer la clase `DbPg`? Mencioná al menos 3 cosas que ya no aparecen en el repository nuevo.

**15.** La clase `DbPg` tiene 4 métodos: `queryAll`, `queryOne`, `queryReturnId` y `queryRowCount`. ¿Qué devuelve cada uno y en qué tipo de operación SQL se usa cada uno?

**16.** En los repositories nuevos, la clase se importa como `import Db from './db-pg.js'` (con el nombre `Db`, no `DbPg`). ¿Por qué se usa ese nombre genérico? ¿Qué pasa si mañana querés cambiar de PostgreSQL a SQL Server — cuántas líneas del repository tenés que modificar?

---

### "¿Dónde lo pondrías?" — Situaciones prácticas

En cada situación, indicá en qué capa lo pondrías (controller, service o repository) y explicá por qué.

**17.** Necesitás agregar un nuevo endpoint `GET /api/alumnos/curso/:idCurso` que devuelva todos los alumnos de un curso. La query sería `SELECT * FROM alumnos WHERE id_curso = $1`. ¿Dónde pondrías esa query? ¿Dónde pondrías la ruta del endpoint? ¿Agregarías algo en el service?

**18.** El cliente pide que al crear un alumno, si no se manda `fecha_nacimiento`, el sistema ponga la fecha de hoy por defecto. ¿En qué capa pondrías esa lógica y por qué? ¿Es una regla de negocio o es algo de la base de datos?

**19.** Necesitás que al eliminar un curso, se verifique primero que no tenga alumnos asociados, y si tiene, devolver un error `400` con el mensaje "No se puede eliminar el curso porque tiene alumnos asociados". ¿Dónde pondrías la verificación (la consulta de si tiene alumnos)? ¿Dónde pondrías el `throw new Error(...)`? ¿Y dónde se atraparía ese error para devolver el `400`?

**20.** Te piden agregar un endpoint que devuelva un resumen por curso: nombre del curso, cantidad de alumnos, y el promedio de edad de esos alumnos. ¿Qué parte resolvés con SQL (en el repository) y qué parte resolvés con lógica (en el service)? ¿O se puede resolver todo en una sola capa?
