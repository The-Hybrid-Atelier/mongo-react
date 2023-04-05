
import './App.css';
import React, { useState, useEffect } from 'react';
import { List, Container, Header, Segment, Button, Form, Item, Label} from 'semantic-ui-react'
import Axios from 'axios';
import 'semantic-ui-css/semantic.min.css';

const localaddress = "https://cearto-fictional-space-bassoon-gxrgqxp456fvvpq-4000.preview.app.github.dev"
function App() {

  // const [name, setName] = useState("")
  const [wordcount, setWordCount] = useState(200)
  const [prompt, setPrompt] = useState("Tell me a story")
  // const [, setWordCount] = useState(200)
  // const [ontological_relations, setOntologicalRelations] = useState("")
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${localaddress}/insert`)
    // Axios.post(`${localaddress}/insert`, {
    //   firstName: name,
    //   companyRole:role
    // })
    let data = {prompt, wordcount}
    console.log(data)
  }

  return (
    <Container>
      <Segment>  
          <Form onSubmit={handleSubmit}>
                <Label> Prompt </Label>
                  <input
                  type="text" 
                  placeholder=""
                  onChange={(e) => {setPrompt(e.target.value)}}
                  />
                <Label> Word Count </Label>
                  <input
                  type="number" 
                  placeholder="200"
                  onChange={(e) => {setWordCount(e.target.value)}}
                  />

                  <Button type="submit" primary large>Submit</Button>
              </Form>
        </Segment>
    </Container>
      
  );
}

const DocViewer = ()=>{

  const [docs, setDocs] = useState([{name: "Test", role: "Potato"}])
  
  useEffect(()=>{
    console.log("URL", `${localaddress}/`)
    fetch(`${localaddress}/`)
      .then((resp)=> resp.json())
      // .then(console.log)
      .then((json)=> setDocs(json.documents))
  }, [])

  return (
    <Container>
      <Segment>
        <Header as="h1"> Hello</Header>
        <Item.Group>
        {
            docs.map((el, i)=>
              <Item key={i}>
                <Item.Content>
                  <Item.Header>{el.prompt}</Item.Header>
                  <Item.Description>
                    {el.response}
                  </Item.Description>
                </Item.Content>
              </Item>
            )
        }
        </Item.Group>

      </Segment>
    </Container>
  )
}

export default App;
