const express = require("express")
const app = express()
require("dotenv").config()
const PORT =process.env.PORT || 9090
const {getBooks,getBooksID,postBook,putBook,deletetBook} =require("./src/controllers/books.js")
app.use(express.json())

app.get("/books", getBooks)
app.get("/books/:id/", getBooksID)
app.post("/books",postBook)
app.put("/books/:id", putBook)
app.delete("/books/:id",deletetBook)

app.listen(PORT , ()=>{
    console.log(`server running ${PORT}`);
}) 