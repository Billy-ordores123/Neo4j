Proyecto Neo4j
Programas Utilizados React JS, Node JS y Neo4j
-Dependencias Client
	"@testing-library/jest-dom": "^5.12.0",
    	"@testing-library/react": "^11.2.6",
    	"@testing-library/user-event": "^12.8.3",
    	"axios": "^0.21.1",
    	"bootstrap": "^5.0.1",
    	"react": "^17.0.2",
    	"react-dom": "^17.0.2",
    	"react-router-dom": "^5.2.0",
    	"react-scripts": "^4.0.3",
    	"semantic-ui-css": "^2.4.1",
    	"semantic-ui-react": "^2.0.3",
    	"uuidv4": "^6.2.8",
    	"web-vitals": "^1.1.2"
-Dependencias Api
    "body-parser": "^1.19.0",
    "cookie-parser": "~1.4.4",
    "cors": "^2.8.5",
    "debug": "~2.6.9",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "jade": "~1.11.0",
    "morgan": "~1.9.1",
    "neo4j-driver": "^4.2.3",
    "nodemon": "^2.0.7"


-Realizar tener instalado Apoc en Neo4j.
-Agregar un archivo apoc.conf a la carpeta de  la base de datos.
-Comando del archivo apoc.conf
	apoc.import.file.enabled=true
	apoc.import.file.use_neo4j_config=true
-Para iniciar el proyecto, se levanta primero la base de datos Neo4j, después de inicia el servidor que se encuentra en carpeta api se corre  el comando "npm run dev", después de inicia el cliente, que se encuentra en la carpeta de client con el comando "npm run start".

-Con esto el proyecto "La Clínica" estaría funcionando  correctamente