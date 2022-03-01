const db = require('../models');
const Task = db.tasks;
const Op = db.sequelize.Op;
const validators = require('../helpers/validators');
const map = require('../helpers/mappers');

async function findParent(data, res){
    await Task.findByPk(data.taskId).then((parent) => {
        map.mappers.mapperOne(parent).then((result) =>{
            let item = {
                id: data.id,
                title: data.title,
                description: data.description,
                status: data.status,
                requester: data.requester,
                owners: data.owners,
                due_date: data.due_date,
                taskId: data.taskId,
                parent: result                          
            }; 
            res.send(item);
        });                
    }).catch(err => {
        throw new Error(err.message || "Error retrieving childrens Task with id=" + data.taskId);                    
    });
};

async function findChildrens(data, res){
    await Task.findAll({ where: { taskId: data.id } }).then((childrens) =>{
        
        map.mappers.mapperAny(childrens).then((result) => {
            let item = {
                id: data.id,
                title: data.title,
                description: data.description,
                status: data.status,
                requester: data.requester,
                owners: data.owners,
                due_date: data.due_date,
                taskId: data.taskId,
                children: result                            
            }; 
            res.send(item);
        });                
    }).catch(err => {
        throw new Error(err.message || "Error retrieving parent Task with id=" + data.id);                    
    });
};


exports.create = (req, res) => {    
    let children =  req.body.children;
    
    validators.input(req, res);
    validators.childrens(req, res);

    const task = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        requester: req.body.requester,
        owners: req.body.owners,
        due_date: req.body.due_date
    };

    Task.create(task).then(data => {
        children.forEach(item => {
            let childrenTask = {
                title: item.title,
                description: item.description,
                status: item.status,
                requester: item.requester,
                owners: item.owners,
                due_date: item.due_date,
                taskId: data.id
            }
            Task.create(childrenTask)
        });
        map.mappers.mapperOne(data).then((result) =>{
            let item = {
                message: 'Task successfully added!',
                id: data.id,
                title: data.title,
                description: data.description,
                status: data.status,
                requester: data.requester,
                owners: data.owners,
                due_date: data.due_date,
                taskId: data.taskId,
                children: result                            
            }; 
            res.send(item);
        });        
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Tutorial."
        });
    });    
};

exports.findById = (req, res) =>{
    const id = req.params.id;
    let task = {};
    try{
        Task.findByPk(id).then(data => {            
            if(data){
                if(data.taskId == null) {
                    findChildrens(data, res);
                } else if(data.taskId != null){
                    findParent(data, res);
                }
                //res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Task with id=${id}.`
                });
            }
        }).catch(err => {
            throw new Error(err);
        });           
    }catch(error){
        res.status(500).send({
            message: error.message ||" Error retrieving Task with id=" + id
        });
    }
};



exports.findAll = (req, res) =>{    
    const limit = !req.query.limit ? 0 : req.query.limit;    
    
    Task.findAll({ limit: limit, order: [['due_date', 'DESC']] }).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving tasks."
        });
    });
};

exports.update = (req, res) =>{
    const id = req.params.id;
    Task.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Task was updated successfully."
            });
        } else {
            res.send({
                message: 'Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!'
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error updating Task with id=" + id
        });
    });
};