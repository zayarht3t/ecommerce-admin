import { Category } from "@/models/Category";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function(req, res, next) {
    const {method} = req;
    await isAdminRequest(req,res);
    if(method === 'POST'){
        const {name,parentCategory,properties} = req.body;
        
        const categoryDoc = await Category.create({
            name: name,
            parent: parentCategory || undefined ,
            properties
        })
        res.status(200).json(categoryDoc)
    }

    if(method === 'GET'){
        res.status(200).json(await Category.find().populate('parent'));
    }

    if(method === 'PUT'){
        const {name,parentCategory,id,properties} = req.body;
        const updateCategoryDoc = await Category.updateOne(
            {_id: id},{
                name,
                parent :parentCategory || undefined,
                properties: properties 
            }
        )
        res.status(200).json(updateCategoryDoc);
    }

    if(method === 'DELETE'){
        const {_id} = req.query;
        await Category.deleteOne({_id})
        res.status(200).json('deleted')
    }
}