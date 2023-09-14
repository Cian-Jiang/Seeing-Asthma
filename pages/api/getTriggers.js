import mysql from 'mysql';

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    connectionLimit: 5
});

export default async function handler(req, res) {
    pool.getConnection((err, connection) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error1' });
            return;
        }

        const query = (sql) => {
            return new Promise((resolve, reject) => {
                connection.query(sql, (error, results) => {
                    if (error) reject(error);
                    resolve(results);
                });
            });
        };

        Promise.all([
            query('SELECT * FROM Cat'),
            query('SELECT * FROM Dog'),
            query('SELECT * FROM Object'),
            query('SELECT * FROM Plant')
        ])
            .then(([cats, dogs, objects, plants]) => {
                res.status(200).json({ cats, dogs, objects, plants });
            })
            .catch((error) => {
                res.status(500).json({ error: 'Internal Server Error2' });
            })
            .finally(() => {
                connection.release();
            });
    });
}
