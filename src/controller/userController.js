const userController = {
  create: async (req, res) => {
    try {
        const {nome, idade, anoNascimento} = req.body;

        return res.status(200).json({
            msg: `usuario criado com sucesso`
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocorreu um erro ao criar um usuario'
        })
    }
  },

  listenUser: async (req, res) =>{
    try {
        
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocorreu um erro ao listar os usuarios'
        })
    }
  }
};

module.exports = userController;