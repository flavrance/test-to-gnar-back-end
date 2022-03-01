process.env.NODE_ENV = 'test';

const db = require('../models');
const Task = db.tasks;
const Op = db.sequelize.Op;


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


chai.use(chaiHttp);
describe('Tasks', () => {
    beforeEach((done) => {
        Task.destroy({
            where: {},
            truncate: false
        }).then(nums => {
            done();
        }).catch(err => {
            done();
        })
    });    
    describe('/GET Tasks', () => {
        it('it should GET all the tasks?limit=N', (done) => {
            chai.request(server)
                .get('/api/tasks?limit=4')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });
    describe('/POST Tasks', () => {        
        it('it should POST a task ', (done) => {            
            let task = {
                title: "Task 1",
                description: "Test Task 1",
                status: "to_do",
                requester: "Flavio R.",
                owners: "Flavio R.",
                due_date: "2022-03-30",
                children: [
                    {
                        title: "Task 1.1",
                        description: "Test Task 1.1",
                        status: "to_do",
                        requester: "Flavio R.",
                        owners: "Flavio R.",
                        due_date: "2022-03-10" 
                    },
                    {
                        title: "Task 1.2",
                        description: "Test Task 1.2",
                        status: "to_do",
                        requester: "Flavio R.",
                        owners: "Flavio R.",
                        due_date: "2022-03-15" 
                    },
                    {
                        title: "Task 1.3",
                        description: "Test Task 1.3",
                        status: "to_do",
                        requester: "Flavio R.",
                        owners: "Flavio R.",
                        due_date: "2022-03-30" 
                    }
                ]                
            };
            chai.request(server)
                .post('/api/tasks')
                .send(task)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Task successfully added!');
                    res.body.should.have.property('title');                    
                    res.body.should.have.property('status');
                    res.body.should.have.property('requester');
                    res.body.should.have.property('owners');
                    res.body.should.have.property('due_date');
                    done();
                });
        });
    });
});