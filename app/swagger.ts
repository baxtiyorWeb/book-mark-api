import type { Express } from "express";
import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerUiDistPath from "swagger-ui-dist";

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Birthmark API",
      version: "1.0.0",
      description: "API documentation using swagger for Birthmark API",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./app/routes/**/*.ts", "./app/routes/**/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export function setupSwagger(app: Express) {
  const swaggerDistPath = swaggerUiDistPath.getAbsoluteFSPath();

  app.use("/swagger-assets", express.static(swaggerDistPath));

  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
      customCssUrl: "/swagger-assets/swagger-ui.css", // Faqat customCssUrl ni qoldiramiz
      swaggerOptions: {
        url: "/swagger.json",
      },
    })
  );

  app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}
