const STATUS = ['to_do', 'doing', 'done'];
let parentStatus = '';
let parentDueDate = '';
input = (req, res) => {
    let messages = [];

    (!req.body.title) ?? messages.push("Content title can not be empty!");
    (!req.body.status) ?? messages.push("Content status can not be empty!"); 
    (!STATUS[req.body.status]) ?? messages.push("Content status can not be different of to_do, doing, done!"); 
    (!req.body.requester) ?? messages.push("Content requester can not be empty!"); 
    (!req.body.owners) ?? messages.push("Content owners can not be empty!"); 
    (!req.body.due_date) ?? messages.push("Content due_date can not be empty!"); 

    if(messages.length > 0) {
        res.status(400).send({
            message: messages.join(',')
        });
        return;
    }
};

isTheSameStatus = (element, index, array) =>{
    return element.status === parentStatus;
};
biggestDueDate = (childrens, parentDueDate) => {

    return childrens.find(element => parentDueDate >= element.due_date);
};

childrens = (req, res) =>{

    parentStatus = req.body.status;
    parentDueDate = req.body.due_date;
    let children = req.body.children;   
    if(!children && children != null && children.length > 0) {

        if(!children.every(isTheSameStatus)) {
            res.status(400).send({
                message: "The children doesn't has the same status!"
            });
            return;
        }

        if(!biggestDueDate(children, parentDueDate)){
            res.status(400).send({
                message: "The parent doesn't has the biggest due date!"
            });
            return;
        }
    }
};

module.exports = {
    input: input,
    childrens: childrens
};