import db from './conn';

const CustomerModel = {
  checkCustomer(email) {
    return new Promise(async (resolve, reject)=>{
      const text  = `SELECT * FROM customers WHERE email = ?`;
      await db.query(text,[email],(err, result)=>{
        if(err)reject(err);
        resolve(result);
      });
    });
  },
  addCustomer(inputData) {
    return new Promise(async (resolve, reject)=>{

      const text = `INSERT INTO customers(firstName, lastName,location,email,password,contact,creditCard)
      VALUES(
      "${inputData.firstName}",
      "${inputData.lastName}",
      "${inputData.location}",
      "${inputData.email}",
      "${inputData.password}",
      "${inputData.contact}",
      "${inputData.creditCard}"
      )`;

      await db.query(text, (err, rows, result)=>{
        if(err)reject(err);
        resolve(rows);
      });

    });
  },
  loginCustomer(email, password){
    return new Promise(async (resolve, reject)=>{
      const text = `SELECT * FROM customers WHERE email = ? AND password = ?`;
      await db.query(text,[email, password], (err,result)=>{
        if(result.length>0){
          return resolve(result);
        }
        if(result.length ===0 ){
          return reject(err);
        }
      });
    });
  
  },
  getAllCustomers(){
    return new Promise(async (resolve,reject)=>{
      const text = 'SELECT * FROM customers';
      await db.query(text, (err,result)=>{
        if(err)return reject(err);
        return resolve(result);
      })
    })

  },

  removeCustomer(id){
    return new Promise( async (resolve, reject) =>{
      const text = `DELETE FROM customers WHERE id =?`;
      await db.query(text,[id], (err, result)=>{
        if(err)reject(err);
        resolve(result);
      })
    });
  },
  getSpecificCustomer(id){
    return new Promise(async (resolve,reject)=>{
      const text = `SELECT * FROM customers WHERE id = ?`;
      await db.query(text,[id], (err, result)=>{
        if(result)
          return resolve(result);
        if(err)
          return reject(err);
      })

    })
  },
  updateCustomer(contact, creditCard,id){
    return new Promise(async (resolve,reject)=>{
    const text = `UPDATE customers SET contact = ?, creditCard = ? WHERE id = ?`
    await db.query(text,[contact,creditCard,id], (err, result)=>{
      if(err)
        return reject(err);
      return resolve(result);
    })

    })
  }
};
export default CustomerModel;