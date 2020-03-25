const conn = require('../database/dbconfig');

module.exports = {
    async create(req,res){
        const {title,description,value} = req.body;

        const ongs_id = req.headers.authorization;

        const result = await conn('incidents').insert({
            title,
            description,
            value,
            ongs_id
        });
        return res.json({id: result[0]});
    },
    async select(req,res){
        const {page = 1} = req.query;

        const [count] = await conn('incidents').count();

        const incidents = await conn('incidents')
        .join('ongs','ongs.id','=','incidents.ongs_id')
        .limit(5)
        .offset((page-1)*5)
        .select(['incidents.*','ongs.name','ongs.email','ongs.whatsapp','ongs.city','ongs.uf']);

        res.header('X-Count-Total',count['count(*)']);

        return res.json(incidents);
    },
    async remove(req,res){
        const {id} = req.params;
        const ongs_id = req.headers.authorization;

        const incident = await conn('incidents').where('id',id).select('ongs_id').first();

        if(incident.ongs_id !== ongs_id){
            return res.status(401).json({error: 'Operation not permitted!'});
        }
        await conn('incidents').where('id',id).delete();

        return res.status(204).send();
    }
}