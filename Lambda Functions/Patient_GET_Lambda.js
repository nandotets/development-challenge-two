const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'medcloud-challenge.cybiwg003awg.sa-east-1.rds.amazonaws.com',
    user: 'admin',
    port: "3306",
    password: 'Senha123',
    database: 'medcloud',
});

exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const sql = "SELECT * FROM patient";
    con.query(sql, (err, res) => {
        if (err) {
            throw new Error(err);
        }
        callback(null, res);
    });
};
