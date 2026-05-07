import * as UserModel from '../models/user.js';
import { generateToken } from '../middleware/auth.js';
import bcrypt from 'bcryptjs';
export async function register (req,res ){
    const{email, username,password ,role} =req.body;
    const emailexiste= await UserModel.findByEmail(email);
    if(emailexiste){
        return res.status(400).json({
            error:'emeail est deja utilise'
        })
    }
    const user = await UserModel.createUser({email,username,password,role});
    return res.status(201).json(user);
}
export async function login(req, res){
    const{email,password}=req.body;
    const user =await UserModel.findRawByEmail(email);
    if(!user){
        return res .status(401).json({error:'email ou mot de passe incorrect'});
    }
    const isValid =await bcrypt.compare(password,user.password);
    if(!isValid){
        return res .status(401).json({error:'email ou mot de passe incorrect'});
    }
    const token =generateToken(user);
    return res.status(200).json({token});
}
export async function getUsers(req,res){
    const users= await UserModel.findAll();
  
         return res.status(200).json(users);
}  
export async function getUser(req,res){
    const{id}=req.params;
    const user= await UserModel.findById(id);
        if (!user){
            return res.status(404).json({error:'utilisateur introuvable'})
        }
         return res.status(200).json(user);
}                
export async function updateUser(req,res){
    const{id}=req.params;
    const user= await UserModel.findById(id);
        if (!user){
            return res.status(404).json({error:'utilisateur introuvable'})
        }
    if(req.user.id !== id && req.user.role !=='admin') {
        return res.status(403).json({error : 'Accés refusé'});
    }
    const updated=await UserModel.updateUser(id,req.body);  
    return res.status(200).json(updated);  
}      
export async function deleteUser(req,res){
    const{id}=req.params;
    const user= await UserModel.findById(id);
        if (!user){
            return res.status(404).json({error:'utilisateur introuvable'})
        }
    if(req.user.id !== id && req.user.role !=='admin') {
        return res.status(403).json({error : 'Accés refusé'});
    }
    const deleted=await UserModel.deleteUser(id);  
    return res.status(200).json({message:'utilsateur is deleted'});  
}      



