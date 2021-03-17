import * as React from "react"
import { useQuery, gql } from '@apollo/client';

const ALL_DATA = gql`
  query GetAllNoteAndTodos {
    notes {
      id
      title
    }
    todos {
      id
      title
    }
  }
`;

// markup
const IndexPage = () => {
  const { loading, error, data } = useQuery(ALL_DATA);


  if (loading) {
    <h1>Loading</h1>
  }

  if (error) {
    <h1>Error :(</h1>
  }
  return (
    <div>
      <h1>List Of Note</h1>
      <div>
        {data?.notes.map(note => <div style={{width: "80%", border: "1px solid black", margin: "8px", padding: "8px"}}>
          <h2>{note.title}</h2>
        </div>)}
      </div>
      <h1>List Of Todo</h1>
      <div>
        {data?.todos.map(todo => <div style={{width: "80%", border: "1px solid black", margin: "8px", padding: "8px"}}>
          <h2>{todo.title}</h2>
        </div>)}
      </div>
    </div>
  )
}

export default IndexPage
