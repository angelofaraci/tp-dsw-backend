import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

import { fileURLToPath } from 'url';

// Convierte la URL del archivo actual en una ruta de archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mecacritic API",
      version: "1.0.0",
    },
  },
  apis: [`${path.resolve(__dirname, "./**/*.routes.*")}`],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;