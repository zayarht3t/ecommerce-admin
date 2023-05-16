
import { storage } from '@/lib/firebase';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import multiparty from 'multiparty';
import fs from 'fs';
import { isAdminRequest } from './auth/[...nextauth]';

export const config = {
    api: {bodyParser: false}
}
export default async function handle(req,res){
    await isAdminRequest(req,res);
    const form =new multiparty.Form();
    let links = [];
    let filename;
    await new Promise((resolve,reject)=>{
        form.parse(req,async (err,fields,files)=>{
            if(err) reject(err);
            if(files){
                for (const file of files.file){
                    const storageRef = ref(storage,`images/${file.originalFilename}`)
                    const uploadTask =await uploadBytesResumable(storageRef,fs.readFileSync(file.path))
                    await getDownloadURL(ref(storage,`images/${file.originalFilename}`))
                    .then((url)=>{
                        links.push(url);
                    })
                    .catch((err)=>console.log(err))
                }
                // filename = files.file[0].originalFilename;
                // const file = files.file[0];

                
                
            }
            
            resolve(fields,files);
        })
    })
    
    res.status(200).json(links);

}

