import dayjs from 'dayjs';
const BASEURL = '/api';

async function getAllTasks(filter){
    try{
        const tasks = await fetch('/api/tasks/'+filter);
        const data = await tasks.json();
        data.forEach((e, i, v) => {
            v[i].deadline = v[i].deadline?dayjs(v[i].deadline):null;
            v[i].private = v[i].private?true:false;
        });
        return data;
    }catch(err){
        console.log(err);
        return [];
    }
}

async function addTaskDb(task){
    try{
        const resp = await fetch('api/tasks',
        {
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(task)
        });
        if(!resp.ok){
            console.log(resp.statusText);
        }
    }catch(err){
        console.log(err);
    }
}

async function deleteTaskDb(id){
    try{
        const resp = await fetch('api/tasks/'+id, {
            method:"DELETE"
        });
        if(!resp.ok){
            console.log(resp.statusText);
        }
    }catch(err){
        console.log(err);
    }
}
async function updateTaskDb(task){
    try{
        const resp = await fetch('api/tasks/'+task.id, {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(task)
        });

        if(!resp.ok){
            console.log(resp.statusText);
        }
    }catch(err){
        console.log(err);
    }
}

async function mark(id){
    try{
        const resp = await fetch('api/tasks/'+id+'/mark', {
            method:"PUT"
        });
        if(!resp.ok){
            console.log(resp.statusText);
        }
    }catch(err){
        console.log(err);
    }
}

async function logIn(credentials) {
    let response = await fetch('/api/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    if(response.ok) {
      const user = await response.json();
      return user.name;
    }
    else {
      try {
        const errDetail = await response.json();
        throw errDetail.message;
      }
      catch(err) {
        throw err;
      }
    }
  }
  
async function logOut() {
    await fetch('/api/sessions/current', { method: 'DELETE' });
  }
  
async function getUserInfo() {
    const response = await fetch(BASEURL + '/sessions/current');
    const userInfo = await response.json();
    if (response.ok) {
      return userInfo;
    } else {
      throw userInfo;  // an object with the error coming from the server
    }
  }

const API = { getAllTasks, addTaskDb, deleteTaskDb, updateTaskDb, mark, logOut, logIn, getUserInfo};
export default API;
export { getAllTasks, addTaskDb, deleteTaskDb, updateTaskDb, mark, logOut, logIn, getUserInfo};