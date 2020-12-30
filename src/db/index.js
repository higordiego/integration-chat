require('saslprep')

const { MongoClient } = require("mongodb")

let db = null


/**
 * @returns {Proimise} Connect - Retornando conexão de banco de dados.
 */
exports.clientConnect = (uri) => {
    if (db == null) return MongoClient.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    return db
}

