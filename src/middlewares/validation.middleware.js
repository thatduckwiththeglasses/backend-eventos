export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Error de validación",
      details: result.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message
      }))
    });
  }

  // Reemplazamos req.body con los datos parseados/tipados por Zod
  req.body = result.data;
  next();
};
