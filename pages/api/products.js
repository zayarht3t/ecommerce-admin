import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { isAdminRequest } from "./auth/[...nextauth]";


export default async function handler(req, res) {
    const {method} = req;
    await mongooseConnect();
    await isAdminRequest(req, res);
    if(method === 'POST') {
        const {title,description,price,images,selectedCategory,productProperties} = req.body;
        const productDoc = await Product.create({
            title,
            description,
            price,
            img: images,
            category: selectedCategory,
            properties: productProperties
        })
        res.json(productDoc);
    }
    
    if(method === 'GET'){
        if(req.query?.id){
             res.json(await Product.findOne({_id: req.query.id}));
        }else{
            res.json(await Product.find());
        }
        
    }

    if(method === 'PUT'){
        const {title,description,price,_id,productProperties} = req.body;
       await Product.updateOne({_id},{title,description,price,properties: productProperties})
       res.json('true');
    }
    

  }
  