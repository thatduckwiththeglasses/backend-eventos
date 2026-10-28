export function sendMsg(res, code, fallbackMessage) {
    const statusCode = code.statusCode ?? 200;

    if (statusCode === 200) console.log(code)
        return res.status(statusCode).json({
            status: "success",
            message: statusCode === 200 ? fallbackMessage : code.message,
        })
};

export function sendError(res, error, fallbackMessage) {
    const statusCode = error.statusCode ?? 500;

    if (statusCode === 500) console.log(error)
        return res.status(statusCode).json({
            status: "ERROR",
            message: statusCode === 500 ? fallbackMessage : error.message,
        })
};