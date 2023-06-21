import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Books = () => {
    const [books, setBooks] = useState([])

    useEffect(()=>{
        const FetchAllBooks = async ()=> {
            try{
                const res = await axios.get("http://localhost:8800/books")
                setBooks(res.data);
            }catch(err){
                console.log(err)
            }
        }
        FetchAllBooks()
    },[])


    const handleDelete = async (id) => {
        try{
            await axios.delete("http://localhost:8800/books/" + id)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div>
            <h1>테스트</h1>
            <div className='books'>
                {books.map(book=>(
                    <div className='book' key={book.id}>
                        {book.cover && <img src={book.cover} alt="" />}
                        <h2>{book.title}</h2>
                        <p>{book.desc}</p>
                        <span>{book.price}</span>
                        <button className='delete' onClick={()=> handleDelete(book.id)}>삭제</button>
                        <button className='update'><Link to={`/update/${book.id}`}>수정</Link></button>
                    </div>
                ))}
            </div>
            <button>
                <Link to ="/add">새 책 추가</Link>
            </button>
        </div>
    )
}

export default Books