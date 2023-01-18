const addBodyValidation = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: error.details });
        }
        return next();
    }
}

module.exports = {
    addBodyValidation,
}