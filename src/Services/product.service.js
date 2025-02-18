const product = require('../Models/product')

const create =(data)=>{
    return new Promise(async(resolve, rejects)=>{
        try{
            const newProduct = await product.create(data);
            if(newProduct){
                resolve({
                    status: "Created",
                    data: newProduct,
                    message: "Created new product"
                })
            }
        }catch(err){
            rejects(err)
        }
    })
}

const getAll =()=>{
    return new Promise(async(resolve,rejects)=>{
        try{
            const allProduct = await product.find();
            if(allProduct){
                resolve({
                    status: "Get all",
                    data: allProduct,
                    message: "Get all product"
                })
            }
        }catch(err){
            rejects(err)
        }
    })
}

const getOne=(id)=>{
    return new Promise(async(resolve, rejects)=>{
        try{
            if (id.length !== 24) {
                resolve({
                  status: "Error",
                  message: "category not found",
                });
                return;
              }
            const productFind = await product.findById(id);
            if(productFind){
                resolve({
                    status: "Found product",
                    data: productFind,
                    message: "Found product"
                })
            }
        }catch(err){
            rejects(err)
        }
    })
}

const update=(id, data)=>{
    return new Promise(async(resolve, rejects)=>{
        try{
            if (id.length !== 24) {
                resolve({
                  status: "Error",
                  message: "product not found",
                });
                return;
              }
            const currentProduct = await product.findById(id);
            if(!currentProduct){
                resolve({
                    status: "Error",
                    message: "product not found"
                })
                return;
            }
            const updateProduct = await product.findByIdAndUpdate(id, data, {new: true});
            if(updateProduct){
                resolve({
                    status: "Updated",
                    data: updateProduct,
                    message: "Updated product"
                })
            }
        }catch(err){
            rejects(err)
        }
    })
}

const deleteProduct=(id)=>{
    return new Promise(async(resolve, rejects)=>{
        try{
            if (id.length !== 24) {
                resolve({
                  status: "Error",
                  message: "product not found",
                });
                return;
              }
            const productDelete = await product.findByIdAndDelete(id);
            if(productDelete){
                resolve({
                    status: "Deleted",
                    message: "Deleted product"
                })
            }
        }catch(err){
            rejects(err)
        }
    })
}

module.exports ={
    create,
    getAll,
    getOne,
    update,
    deleteProduct
}