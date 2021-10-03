import React, {useState, useEffect} from "react";
import {
  Container,
  Header,
  Menu,
  Button,
  List,
  Image
} from "semantic-ui-react";
import BookList from "./components/BookList";

function App() {
  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState([{title: '', users: []}])
  const fetchBooks = () => {
    fetch(`http://localhost:4000/books`)
    .then(resp => resp.json())
    .then(data => setBooks(data))
  }
  useEffect(() => {
    fetchBooks()
  }, [])
  const likeBook = (id) => {
    let book = books.filter(each => each.id === id)
    
    if (!!book[0].users.find(each => each.username === 'pouros')) {
      let usersLiked = book[0].users.filter(each => each.username !== 'pouros')
      
      book[0].users = usersLiked
      
      fetch(`http://localhost:4000/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book[0])
    })
    .then(resp => resp.json())
    .then(data => {
      setSelectedBook(book)
      fetchBooks()})
    }
      
  else {
    console.log(book)
    fetch(`http://localhost:4000/books/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        users: [...book[0].users,{
          id: 1,
          username: 'pouros',
          }]
        
      })
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      setSelectedBook([data])
      fetchBooks()})
  }
  }
  const updateSelectedBook = (id) => {
    let book = books.filter(each => each.id === id)
    setSelectedBook(book)
    console.log(selectedBook[0])
  }
  return (
    <div>
      <Menu inverted>
        <Menu.Item header>Bookliker</Menu.Item>
      </Menu>
      <main>
        <Menu vertical inverted>
          
            {books.map((each, index) => <BookList updateSelectedBook={updateSelectedBook}book={each}/>)}
          
        </Menu>
        <Container text>
          <Header>{selectedBook[0].title}</Header>
          <Image
            src={selectedBook[0].img_url}
            size="small"
          />
          <p>{selectedBook[0].description}</p>
          <Button
            color="red"
            content="Like"
            icon="heart"
            onClick={() => likeBook(selectedBook[0].id)}
            label={{
              basic: true,
              color: "red",
              pointing: "left",
              content: "2,048"
            }}
          />
          <Header>Liked by</Header>
          <List>
            {selectedBook[0].users.map((each, index) => <List.Item icon="user" content={each.username} />)}
          </List>
        </Container>
      </main>
    </div>
  );
}

export default App;
