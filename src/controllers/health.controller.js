export const getHealth = async (req,res) => {
    return res.status(200).json({
        status: "success",
        message: "El Servidor esta activo",
        version: "0.0.1",
    });
}