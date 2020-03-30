const request = require('supertest');
const app = require('../../src/app');
const conn = require('../../src/database/dbconfig');


describe('ong',()=>{
    beforeEach(async ()=>{
        await conn.migrate.rollback();
        await conn.migrate.latest();

    });

    afterAll(async ()=>{
        await conn.destroy();
    })
    
    it('should be able to create a new ONG',async ()=>{
        const response = await request(app).post('/ongs').send({
                name: "Doing some tests",
                email: "iagovieirachaves@gmail.com",
                whatsapp: "81988337057",
                city: "Recife",
                uf: "PE"
        })
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});