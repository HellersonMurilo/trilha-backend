const moduleController = {
    createModule: async (req, res) =>{
        try {
            
        } catch (error) {
            res.status(500).json({
                msg: 'Ocorreu um erro critico ao criar o modulo',
                error: error.message
            })
        }
    }
}