import {v4 as uuidv4} from 'uuid';
import bcrypt from 'bcryptjs';
const users = [];
export async function createUser({email,username,password ,role ='user'}){
    const encryptedPassword =await bcrypt.hash(password,10);
    const user = {
        id:uuidv4(),
        email:email.toLowerCase(),
        username,
        password : encryptedPassword,
        role
    };
    users.push(user);
    return user;
}
export async function findAll(){
 return users.map(({password,...reset})=>reset);
}
export async function findById(id){
    const user=users.find(user => user.id === id);
    if(!user)return null;
    const{password,...reset}=user;
    return reset;
}
export async function findByEmail(email){
    const user=users.find(user => user.email === email);
    if(!user)return null;
    const{password,...reset}=user;
    return reset;
}
export async function updateUser(id,updates){
const index=users.findIndex(user => user.id === id);
    if(index===-1)return null;
    users[index]={...users[index],...updates}
    const{password,...reset}=users[index];
    return reset;
}
export async function deleteUser(id){
const index=users.findIndex(user => user.id === id);
    if(index===-1)return null;
    users.splice(index,1);
    return true;
}
export async function findRawByEmail(email){
  return users.find(user => user.email === email) || null;
}
