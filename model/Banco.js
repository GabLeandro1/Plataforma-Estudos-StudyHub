const mysql = require('mysql2/promise');

class Banco {
    static HOST = '127.0.0.1';
    static USER = 'root';
    static PWD = '';
    static DB = 'studyhub';
    static PORT = 3306;
    static CONEXAO = null;

    // Método privado para estabelecer uma conexão com o banco de dados
    static async conectar() {
        if (Banco.CONEXAO === null) {
            try {
                Banco.CONEXAO = await mysql.createConnection({
                    host: Banco.HOST,
                    user: Banco.USER,
                    password: Banco.PWD,
                    database: Banco.DB,
                    port: Banco.PORT
                });

                console.log("Conectado ao banco de dados com sucesso!");
            } catch (err) {
                const objResposta = {
                    cod: 1,
                    msg: "Erro ao conectar no banco",
                    erro: err.message
                };
                console.error(JSON.stringify(objResposta));
                process.exit(1); // Encerra o script em caso de erro
            }
        }
    }

    // Método público para obter a conexão com o banco de dados
    static async getConexao() {
        if (Banco.CONEXAO === null) {
            await Banco.conectar();
        }
        return Banco.CONEXAO;
    }
}

module.exports = Banco;
