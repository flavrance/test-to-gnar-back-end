mapperOne = async (data) => {
    return item = {
        id: data.id,
        title: data.title
    };
};

mapperAny = async (childrens) => {

    let items = [];

    childrens.forEach(children => {
        mapperOne(children).then((result) => {
            items.push(result);
        });
    });

    return await items;
};

exports.mappers ={
    mapperOne: mapperOne,
    mapperAny: mapperAny
};
