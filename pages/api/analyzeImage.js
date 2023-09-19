// pages/api/analyzeImage.js
import mysql from 'mysql';

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    connectionLimit: 10,
});

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const labelInfo = req.body.labelInfo; // 从请求体中获取标签信息

    // 从数据库获取所有对象名称
    let dbNames = [];
    pool.query('SELECT name, objdes FROM Object', (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Database error' });
        }

        dbNames = results;

        // 筛选出与数据库中名称匹配的标签
        const matchedLabels = labelInfo.filter((label) =>
            dbNames.some((dbObj) => dbObj.name.toLowerCase() === label.description.toLowerCase())
        );

        // 添加数据库中对应的 objdes
        const enrichedLabels = matchedLabels.map((label) => {

            const dbObj = dbNames.find((dbObj) => dbObj.name === label.description);
            // if (label.description === 'Wood') {
            //     label.description = 'Wood - Mould';
            // } else
            if (label.description === 'Shower') {
                label.description = 'Shower - Mould';
            } else if (label.description === 'Sinks') {
                label.description = 'Sinks - Mould';
            }

            return {
                name: label.description,
                score: label.score,
                objdes: dbObj ? dbObj.objdes : '',
            };
        });

        res.status(200).json(enrichedLabels);
    });
};
