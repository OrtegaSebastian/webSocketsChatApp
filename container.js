const fs = require('fs');
// Class container
class Contenedor {

    constructor(path) {
        this.file = path;
    }

    // Metodo Save(Object)
    // save(Object): Number - Recibe un objeto, lo guarda en el file, devuelve el id asignado.
    async save(objProduct) {
        const data = await fs.promises.readFile(`${this.file}`, "utf-8")
        if (data) {
            const products = JSON.parse(data);
            const id = products.length + 1;
            objProduct.id = id;
            products.push(objProduct);
            const productsString = JSON.stringify(products);
            await fs.promises.writeFile(`${this.file}`, productsString);
            return products;
        }
        else {
            objProduct.id = 1;
            this.product.push(objProduct);
            const productsString = JSON.stringify(this.product);
            await fs.promises.writeFile(`${this.file}`, productsString);
        }
    }

    // Metodo getById(Number)
    async getById(id) {
        if (fs.existsSync(this.file)) {
            const data = fs.readFileSync(`${this.file}`, 'utf-8');
            const dataParseada = JSON.parse(data);
            const objeto = dataParseada.filter((objeto) => objeto.id === id);
            return objeto;
        }
    }

    // Metodo getAll()
    async getAll() {
        if (fs.existsSync(this.file)) {
            const data = fs.readFileSync(`${this.file}`, 'utf-8');
            if (data) {
                //despues de leer la data que vienen en un formato .txt se debe parsear
                let dataFile = JSON.parse(data);
                return dataFile;
            } else {
                return 'Not data Found';
            }
        }
        return 'File not Found';
    }

    // Metodo deleteById(Number)
    async deleteById(id) {
        const data = fs.readFileSync(this.file, "utf-8");
        const dataParseada = JSON.parse(data);
        const dataFiltrada = dataParseada.filter((objeto) => objeto.id !== id);
        const dataString = JSON.stringify(dataFiltrada);
        fs.writeFileSync(this.file, dataString);
        return dataFiltrada;
    }

    // Metodo deleteAll(Number)

    async deleteAll() {
        fs.writeFileSync(this.archivo, "[]");
        return "[]";
    }

    // Metodo updateById(id, prodcut)

    async updateById(id, productNew) {
        const data = fs.readFileSync(this.file, "utf-8");
        console.log(productNew);
        let dataParseada = JSON.parse(data);
        let productToUpdate = dataParseada.find((objeto) => objeto.id === id);
        if (productToUpdate === undefined) {
            throw { msg: "404 Not found" };
        }
        let productFiltered = dataParseada.filter((objeto) => objeto.id !== id);
        productToUpdate = { id, ...productNew };
        productFiltered.push(productToUpdate);
        const dataString = JSON.stringify(productFiltered);
        console.log(productFiltered);
        fs.writeFileSync(this.file, dataString);
        return "Product updated";
    }
}

module.exports = Contenedor;