import db from './conn'


const BookModel = {
    
    checkBook(isbnCode) {
        return new Promise(async (resolve, reject)=>{
          const text  = `SELECT * FROM books WHERE isbnCode = ?`;
          await db.query(text,[isbnCode],(err, result)=>{
            if(err)reject(err);
            resolve(result);
          });
        });
      },
      addBook(inputData) {
        return new Promise(async (resolve, reject)=>{
    
          const text = `INSERT INTO books SET ?` 
          const values = {
            name:inputData.name,
            authorId:inputData.authorId,
            type:inputData.type,
            isbnCode:inputData.isbnCode,
            numberInStock: inputData.numberInStock
          }
    
          await db.query(text,values,(err,result)=>{
            if(err)reject(err);
            resolve(result);
          });
    
        });
      },
      getAllBooks(){
        return new Promise(async (resolve,reject)=>{
          const text = 'SELECT * FROM books'
          await db.query(text, (err,result)=>{
            if(err)return reject(err);
            return resolve(result);
          })
        })
    
      },
    
      removeBook(id){
        return new Promise( async (resolve, reject) =>{
          const text = `DELETE FROM books WHERE id =?`;
          await db.query(text,[id], (err, result)=>{
            if(err)reject(err);
            resolve(result);
          })
        });
      },
      getSpecificBook(id){
        return new Promise(async (resolve,reject)=>{
          const text = `SELECT * FROM books WHERE id = ?`;
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

}


export default BookModel