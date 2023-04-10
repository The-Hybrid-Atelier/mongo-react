
import './App.css';
import React, { useState, useEffect } from 'react';
import { List, Container, Header, Segment, Button, Form, Item, Label} from 'semantic-ui-react'
import Axios from 'axios';
import 'semantic-ui-css/semantic.min.css';

const localaddress = "https://shreyosiendow-obscure-broccoli-9q95j75r67v3pjvp-4000.preview.app.github.dev"
function App() {

  // const [name, setName] = useState("")
  const [story_label, setStoryLabel] = useState("Provide a descriptive label")
  const [interpretations, setInterpretations] = useState("Provide sensor interpretations")
  const [ontological_relations, setOntologicalRelations] = useState("Provide ontological relations")
  const [audience, setAudience] = useState("Provide target audience")
  const [style, setStyle] = useState("Provide writing style")
  const [word_count, setWordCount] = useState(200)
  const [prompt, setPrompt] = useState("")
 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${localaddress}/insert`)
    
    let data = {story_label, interpretations, ontological_relations, audience, style, word_count}
    console.log(data)
    Axios.post(`${localaddress}/insert`, {data:data}, {headers: "Access-Control-Allow-Origin"})
  }

  return (
    <Container>
      <Segment>  
      <Form onSubmit={handleSubmit}>
        <Label> Descriptive Story Label </Label>
          <input
          type="text" 
          placeholder=""
          onChange={(e) => {setStoryLabel(e.target.value)}}
          />

        <Label> Sensor Interpretations </Label>
          <input
          type="text" 
          placeholder=""
          onChange={(e) => {setInterpretations(e.target.value)}}
          />
        <Label> Ontological Relations </Label>
          <input
          type="text" 
          placeholder=""
          onChange={(e) => {setOntologicalRelations(e.target.value)}}
          />
        <Label> Target Audience </Label>
          <input
          type="text" 
          placeholder=""
          onChange={(e) => {setAudience(e.target.value)}}
          />
        <Label> Writing Style </Label>
          <input
          type="text" 
          placeholder=""
          onChange={(e) => {setStyle(e.target.value)}}
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