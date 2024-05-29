class Usuario {
    // Constructor
    constructor(usuarioid, email, senha, nome, dataRegistro) {
        this._usuarioid = usuarioid;
        this._email = email;
        this._senha = senha;
        this._nome = nome;  // Correção: Usando nome, não tipo
        // Convertendo a data de registro para um objeto Date
        this._dataRegistro = new Date(dataRegistro);
    }

    // Getters
    get usuarioid() {
        return this._usuarioid;
    }

    get email() {
        return this._email;
    }

    get nome() {
        return this._nome;
    }

    get senha() {
        return this._senha;
    }

    get dataRegistro() {
        return this._dataRegistro;
    }

    // Additional method to format dataRegistro as a string (optional)
    get formattedDataRegistro() {
        return this._dataRegistro.toISOString();
    }
}

module.exports = Usuario;
