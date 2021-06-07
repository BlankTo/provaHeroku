const sqlite = require('sqlite3');
const dayjs = require('dayjs');

const db = new sqlite.Database('tasks.db', (err)=>{
    if(err) throw err;
});


const filtersDic = {'All' : (t) =>  true, 'Today' : (t) => dayjs().format('YYYY/MM/DD') === t.deadline.format('YYYY/MM/DD'), 'Next 7 days' : (t) =>  t.deadline.isAfter(dayjs().add('-1', 'day')) && t.deadline.isBefore(dayjs().add('7', 'day')) , 'Private' : (t) => t.private, 'Important' : (t) => t.important};
exports.listTasks = (id_client) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM tasks WHERE user=?;';
      db.all(sql, [id_client], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        const tasks = rows.map((e) => ({ id: e.id, description: e.description, important: e.important, private: e.private, deadline: e.deadline, completed: e.completed, user: e.user }));
        resolve(tasks);
      });
    });
  }; 

  exports.getTask = (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM tasks WHERE id=? AND user = ?';
      db.get(sql, [id, id_client], (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        if (row == undefined) {
          resolve({error: 'Task not found.'});
        } else {
          const task = { id: row.id, description: row.description, important: row.important, private: row.private, deadline: row.deadline, completed: row.completed, user: row.user };
          resolve(task);
        }
      });
    });
  };

  exports.filterTasks = (filter) =>{
     return new Promise((resolve, reject)=>{ 
        const sql = 'SELECT * FROM tasks WHERE user = ?';
        db.all(sql, [id_client], (err, rows)=>{
            if(err){
                reject(err);
                return;
            }
            const tasks = rows.map((e) => ({ id: e.id, description: e.description, important: e.important, private: e.private, deadline: dayjs(e.deadline), completed: e.completed, user: e.user }));
            resolve(tasks.filter(filtersDic[filter]));
        })
    });
  }

  exports.createTask = (task) => {
    return new Promise((resolve, reject) => {
      newId = -1;
      db.get('SELECT MAX(id) FROM tasks', [], function (err, val) {
          if (err) {
            reject(err);
            return;
          }
          newId = val?val['MAX(id)']+1:1;
          const sql = 'INSERT INTO tasks(id, description, important, private, deadline, completed, user) VALUES(?, ?, ?, ?, ?, ?, ?)';
          db.run(sql, [newId, task.description, task.important, task.private, task.deadline, task.completed?task.completed:0, task.user], function (err) {
            if (err) {
              reject(err);
              return;
            }
            resolve(this.lastID);
      });
    });
      
    });
  };

  exports.updateTask = (task)=>{
      return new Promise((resolve, reject)=>{
        const sql = 'UPDATE tasks SET description = ?, important = ?, private = ?, deadline = ?, completed= ? where id = ? and user = ?';
        db.run(sql, [task.description, task.important, task.private, task.deadline, task.completed?task.completed:0, task.id, task.user], function (err) {
          if (err) {
            reject(err);
            return;
          }
          resolve(this.lastID);
    });
      })
  }

  exports.deleteTask = (id, id_client) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM tasks WHERE id = ? and user = ?';
      db.run(sql, [id, id_client], (err) => {
        if (err) {
          reject(err);
          return;
        } else
          resolve(null);
      });
    });
  }

  exports.toggleCompleted = (id, id_client) =>{
      return new Promise((resolve, reject) =>{
          this.getTask(id)
            .then((task) =>{
                task.completed = (task.completed + 1)%2;
                const sql = 'UPDATE tasks SET  completed= ? where id = ? and user = ?';
                db.run(sql, [task.completed, id, id_client], function (err) {
                  if (err) {
                    reject(err);
                    return;
                  }
                  resolve(this.lastID);
            });  
            })
      })
  }