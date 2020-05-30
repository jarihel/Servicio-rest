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
urlDB= 'mongodb+srv://Javier:jc050691@cluster0-eclpr.gcp.mongodb.net/test?retryWrites=true&w=majority';
//}

process.env.URLDB = urlDB;