const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Kin Pizza Express API with Swagger",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Wisdom Robotics",
          url: "https://wisdomrobotics.com",
          email: "info.wisdomsoftware@gmail.com",
        },
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT || 8081}`,
        },
      ],
    },
    apis: ["./src/routes/*.js"],
  };
  
  const specs = swaggerJsdoc(options);

  module.exports = specs