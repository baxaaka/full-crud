const Io = require("../utils/Io.js");
const db = new Io("./db/books.json");

const getBooks = async (req, res) => {
    try {
    const {price ,start ,end ,author ,year} =req.query
    const books = await db.read()
   

    const filterBooks = books.filter((el)=>el.price == price
    ||el.price >=start && el.price <=end
    ||el.author== author
    ||el.author== author && el.year == year)

    if (filterBooks.length ==0) {
       return res.send({
            status:200,
            message:"success",
            data:books
        })
    }

    if (filterBooks) {
        return res.send(filterBooks)
    }
    
    } catch (error) {
        res.send({
            status:404,
            message:error.message,
            data:null
        })
    }
};

const getBooksID = async (req, res) => {
try {
const {id} = req.params
const books = await db.read()
const book = books.filter((el)=>el.id==id)

if (book) {

 return res.send(book)
    
}

} catch (error) {
    res.send({
        status:404,
        message:error.message,
        data:null
    })
}


};

const postBook = async (req, res) => {
   try {
    
    const {name , price ,genre ,author ,year } = req.body
    const books = await db.read()
    
    check(name , price ,genre ,author ,year )
 
    const id = (books[books.length - 1]?.id || 0) + 1;
    books.push({id,name , price ,genre ,author ,year})
    db.write(books)
        res.send({
            status:200,
            message:"success",
            data:books
        })
   } catch (error) {
    res.send({
        status:404,
        message:error.message,
        data:null
    })
   }
    


};

const putBook = async (req, res) => {
    try {
        const {name , price ,genre ,author ,year } = req.body
        const {id} = req.params
        const books = await db.read()
        const book = books[id-1]
        const allBooks = books.map(el=>{
            if(el.id ==book.id){
                book.name = name  ? name : book.name;
                book.price= price ? price : book.price;
                book.genre =genre ? genre : book.genre;
                book.author =author?author: book.author;
                book.year = year ? year : book.year ;
            }
            return el
        })
       db.write(allBooks)
       res.send({
        status:200,
        message:"success",
        data:books[id-1]
    })
    } catch (error) {
        res.send({
            status:404,
            message:error.message,
            data:null
        })
    }
    


};


const deletetBook = async (req, res) => {

try {
    const {id} = req.params
    const books = await db.read()
    const filterBooks =books.filter((el)=>el.id !==+id)
    db.write(filterBooks)

   res.send({
     status:200,
     message:"success",
     data:books
   })
} catch (error) {
    res.send({
        status:404,
        message:error.message,
        data:null
    })
}

};

 function  check(name , price ,genre ,author ,year ){

    if(!name || !price || !genre || !author||!year) throw new Error("Invalid data")

    if(name.length<3 || name.length>20 ||!isNaN(name)) throw new Error("Invalid name")

    if(author.length<3 || author.length>20|| !isNaN(author))throw new Error("Invalid author")

    // Hozirgi yil bilan taqqoslaydi kitob yilini
    const dyear =new Date().getFullYear()
    if(year >dyear)throw new Error("Invalid author")
}

module.exports={getBooks ,getBooksID ,postBook ,putBook ,deletetBook}