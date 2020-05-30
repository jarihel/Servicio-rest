//========================================
//      PUERTOS
//========================================


process.env.PORT = process.env.PORT || 3000


//========================================
//      Entorno
//========================================
/* esta en una variable que setea heroku */
process.env.NODE_ENV =  process.env.NODE_ENV || 'dev';



//========================================
//      base de datos
//========================================
let urlDB;
/*
if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/DBCafeBar';
}else{*/
urlDB= process.env.MONGO_URI;
//}

process.env.URLDB = urlDB;
/*uri para usar las variables de entorno de heroku */
/*urlDB= process.env.MONGO_URI; */