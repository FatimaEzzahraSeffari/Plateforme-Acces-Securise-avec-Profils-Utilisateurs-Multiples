const express = require("express"); 
const app = express()

app.use(express.static("public/css")); 
app.use(express.static("public/img"));

const oracledb = require('oracledb');
const bodyParser = require('body-parser');
const Table = require('cli-table');


app.use(bodyParser.urlencoded({ extended: true }))

 
app.set('view engine', 'ejs');
//admin
async function connect() {
    try {
      const connection = await oracledb.getConnection({
        user: 'C##SEFFARI_ADMIN',
        password: 'fati123',
        connectString: 'localhost/orcl'
      });
      console.log('Connected to OracleDB');
      
      return connection;
    } catch (err) {
      console.error(err);
    }
  }
 
  async function login(username, password) {
    try {
      const connection = await connect();
      const result = await connection.execute(
        `select *from admins WHERE username = :username AND password = :password`,
                        [username, password],
        { outFormat: oracledb.OBJECT }
      );
      await connection.close();
      return result.rows;
    } catch (err) {
      console.error(err);
    }
  }
app.get('/', function(req, res) {
    res.render("index.ejs")
    });
   
    app.post('/', async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const rows = await login(username, password);
        if (rows.length === 0) {
          return res.status(401).send('Invalid username or password');
        }
        // Log the user in
        console.log('Login successful');
        res.redirect('/data');
      });    
      
    
async function getData(req, res) {
  // establish a connection to the Oracle database
  let connection;
  try {
    connection = await oracledb.getConnection({
        user: 'C##SEFFARI_ADMIN',
        password: 'fati123',
        connectString: 'localhost/orcl'
    });
    console.log('Connection was successful!');

    // execute the SELECT statement
    const result = await connection.execute(
      
      `SELECT * FROM admins`

    );
  
    console.log(result.rows);

    // render the template
    res.render('table1', { data: result.rows });

  } catch (err) {
    console.error(err);
    res.send('Error: ' + err.message);
  } finally {
    // close the database connection
    if (connection) {
      try {
        await connection.close();
        console.log('Connection was closed!');
      } catch (err) {
        console.error(err);
      }
    }
  }
}



  app.get('/data', getData);




  async function getData1(req, res) {
   // establish a connection to the Oracle database
   let connection;
   try {
     connection = await oracledb.getConnection({
         user: 'C##SEFFARI_ADMIN',
         password: 'fati123',
         connectString: 'localhost/orcl'
     });
     console.log('Connection was successful!');
 
     // execute the SELECT statement
     const result = await connection.execute(
       
       `SELECT * FROM clubstudent`
 
     );
   
     console.log(result.rows);
 
     // render the template
     res.render('table2', { data: result.rows });
 
   } catch (err) {
     console.error(err);
     res.send('Error: ' + err.message);
   } finally {
     // close the database connection
     if (connection) {
       try {
         await connection.close();
         console.log('Connection was closed!');
       } catch (err) {
         console.error(err);
       }
     }
   }
 }
 
 
 
   app.get('/data1', getData1);



   async function getData2(req, res) {
      // establish a connection to the Oracle database
      let connection;
      try {
        connection = await oracledb.getConnection({
            user: 'C##SEFFARI_ADMIN',
            password: 'fati123',
            connectString: 'localhost/orcl'
        });
        console.log('Connection was successful!');
    
        // execute the SELECT statement
        const result = await connection.execute(
          
          `SELECT * FROM club`
    
        );
      
        console.log(result.rows);
    
        // render the template
        res.render('table3', { data: result.rows });
    
      } catch (err) {
        console.error(err);
        res.send('Error: ' + err.message);
      } finally {
        // close the database connection
        if (connection) {
          try {
            await connection.close();
            console.log('Connection was closed!');
          } catch (err) {
            console.error(err);
          }
        }
      }
    }
    
    
    
      app.get('/data2', getData2);

//normal user
async function login1(username, password) {
   try {
     const connection = await connect();
     const result = await connection.execute(
       `select *from C##SEFFARI_ADMIN.users WHERE username = :username AND password = :password`,
                       [username, password],
       { outFormat: oracledb.OBJECT }
     );
     await connection.close();
     return result.rows;
   } catch (err) {
     console.error(err);
   }
 }
app.get('/index1', function(req, res) {
   res.render("index1.ejs")
   });
   app.post('/index1', async (req, res) => {
      const username = req.body.username;
      const password = req.body.password;
      const rows = await login1(username, password);
      if (rows.length === 0) {
        return res.status(401).send('Invalid username or password');
      }
      // Log the user in
      console.log('Login successful');
      res.redirect('/data3');
    });    
    

      async function getData3(req, res) {
         // establish a connection to the Oracle database
         let connection;
         try {
           connection = await oracledb.getConnection({
               user: 'c##seffari_user_normal',
               password: 'user123',
               connectString: 'localhost/orcl'
           });
           console.log('Connection was successful!');
       
           // execute the SELECT statement
           const result = await connection.execute(
             
             `select * from c##seffari_admin.club`
       
           );
         
           console.log(result.rows);
       
           // render the template
           res.render('table4', { data: result.rows });
       
         } catch (err) {
           console.error(err);
           res.send('Error: ' + err.message);
         } finally {
           // close the database connection
           if (connection) {
             try {
               await connection.close();
               console.log('Connection was closed!');
             } catch (err) {
               console.error(err);
             }
           }
         }
       }
app.get('/data3', getData3);
                


 app.listen(3000, () => { 
    console.log("Server is Running") })