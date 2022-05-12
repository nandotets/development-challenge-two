const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'medcloud-challenge.cybiwg003awg.sa-east-1.rds.amazonaws.com',
    user: 'admin',
    port: "3306",
    password: 'Senha123',
    database: 'medcloud',
});

exports.handler = async (event) => {
    try {
        const data = await new Promise((resolve, reject) => {
            const sql = `DELETE FROM patient WHERE id=${event.pathParameters.id}`;
            con.query(sql, (err, res) => {
                if (err) {
                    reject(event);
                }
                resolve(res);
            });
        });
        return {
            "statusCode": 200,
            "body": JSON.stringify(data),
            "isBase64Encoded": false,
            "headers": {}
        };
    } catch (error) {
        return {
            "statusCode": 400,
            "body": JSON.stringify(error),
            "isBase64Encoded": false,
            "headers": {}
        };
    }
};