const fs = require('fs');
const path = require('path');
const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
const getProductFromFile = (callBack) => {

    fs.readFile(p, (err, fileContent) => {

        if (err) {
            return callBack([]);
        } else {
            callBack(JSON.parse(fileContent));
        }

    });
};

module.exports = class {
    constructor(title) {
        this.title = title;
    }

    save() {
        getProductFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(callBack) {
        getProductFromFile(callBack);
    }

};
