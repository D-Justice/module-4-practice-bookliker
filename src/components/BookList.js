import React from 'react'
import {
    Container,
    Header,
    Menu,
    Button,
    List,
    Image
  } from "semantic-ui-react";

export default class BookList extends React.Component {
constructor(props) {
    super(props)
}

    render() {
        return (
            <div>
            <Menu.Item as={"a"} onClick={e => this.props.updateSelectedBook(this.props.book.id)}>{this.props.book.title}
          </Menu.Item>
            </div>
        )
    }
}