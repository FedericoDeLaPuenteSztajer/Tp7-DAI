# Preguntas sobre el TP — De server-noob a arquitectura en capas

Las siguientes preguntas evalúan la comprensión del recorrido completo del proyecto: desde `server-noob.js` (V1), pasando por `server-noob-mejorada.js` (V2), hasta `server.js` con capas (V3) y la clase `DbPg` (V4).

---

### V1 — server-noob.js 

**1.** + Por cada request crea un nuevo cliente y luego lo borra, esto no solo ralentiza programa sino que al recibir muchos request se puede alcanzar el límite de conexciones simultáneas de pgAdmin y fallar.

**2.** + En el caso que no se haya creado un cliente nuevo exitosamente salta el siguiente error: "Error: Called end on a client that was never connected".

**3.** + Cuanto más grande es la API más cuesta encontrar un método específico y modificarlo, además si varias personas quieren realizar cambios, como está todo en un solo archivo daría conflictos el merge.

**4.** + Esto prevee la inyección del usuario en SQL, limitando que envíe querys de forma libre, lo que sería un error grave.

---

### V2 — server-noob-mejorada.js

**5.** + Pool a diferencia de client genera varias conexiones que puede ser usadas sin crearlas cada vez. Esto es beneficioso en grandes programas (Varios endpoints) pero excesivo cuando solo se necesitan algunos endpoints.

**6.** + En Express, un router permite designar rutas modulares e independientes y permite que en este proyecto se definan únicamente si se pide todo ('') o un id específico ('/:id') dentro de router, ya que el resto se ingreso desde el server.

**7.** + El server únicamente recibe la url y decide si es un alumno o curso y llama al router para que se ocupe de la lógica y de la conexión con la DB.

**8.** + Al usar pool ya no hace falta borrar el cliente y el finally no hace falta (Un cambio muy bueno porque podía dar error).

---

### V3 — server.js (arquitectura en capas)

**9.** + Controller: Recibe res y req y llama un servico; Service: Maneja la lógica de negocio y el procesamiento de datos; Repository: Se conecta con la DB y pide/modifica sus datos.

**10.** + La lógica de negocio debe estar contenida en service, no en SQL. Si se quisiera modificar es mejor hacerlo en JS que meterse en SQL.

**11.** + Se lama al servico de cursos poruqe es un asunto de lógica el comporbar si existe, no debe hacerse en repositorio porque es meramente la conexion con la DB.

**12.** + .env carga la información de la DB y dotenv permite separar esos datos del código fuente (Mayor seguridad y permite no pushear .env) y hace que el puerto no sea harcodeado (Modificable).

**13.** + LogHelper muestra el error exacto y personalizado sin exponer datos internos del sistema, como si pasa con console.log(error).

---

### V4 — DbPg y DbMssql

**14.** + Métodos y variables repetidas: try/catch, Pool, LogHelper. Estos desaparecieron del repositorio y fuerpon a parar a DbPg que ahora se ocupa de la conexión con DB.

**15.** + queryAll: select que devuelve array con los alumnos/cursos o null; queryOne: select que devuelve un objeto alumno/curso o null; queryReturnId: insert que devuelve el id del nuevo objeto alumno/curso o 0 si fallo; queryRowCount: update o delete que devuelve la cantidad de filas modificadas.

**16.** + Se importa la conexión con la DB elegida, sea PostgreSQL o SQL server. Si se quiere usar uno u otro solo se debe modificar la conexion desde config y no hace falta modificar nada de código (Puede hacerlo alguien que no sepa programar por ejemplo).

---

### "¿Dónde lo pondrías?" — Situaciones prácticas

**17.** + La ruta genérica iría en el server, el endpoint específico iría en el controller, en service se procesa si existe el curso, y la query en repository que se conecte con la DB.

**18.** + Se pondría en service porque es parte de la lógica de negocio, ya que se esta calculando e igualando y eso excede las responsabilidades de la DB (Las responsabilidades que le asignamos nosotros).

**19.** + Tanto la verificación como el error manual residirían en Service, ya que se enfoca en la lógica de negocio, y el catcheo del error en router porque trata sobre conexión.

**20.** + En repository se solicitaría el nombre del curso, una lista las edades de los alumnos. Por otro lado, en service se calcularía la cantidad con esa lista y se calcularía el promedio de edades.

