
import './App.css';
import React, { useState, useEffect } from 'react';
import { List, Input, Container, Header, Segment, Button, Form, Item, Label, TextArea} from 'semantic-ui-react'
import Axios from 'axios';
import 'semantic-ui-css/semantic.min.css';


const localaddress = "https://shreyosiendow-obscure-broccoli-9q95j75r67v3pjvp-4000.preview.app.github.dev"
function App() {
  const [isEditing, setIsEditing] = useState(false);
  // const [name, setName] = useState("")
  const [story_label, setStoryLabel] = useState("Provide a descriptive label")
  const [interpretations, setInterpretations] = useState("Provide sensor interpretations")
  const [ontological_relations, setOntologicalRelations] = useState("Provide ontological relations")
  const [audience, setAudience] = useState("Provide target audience")
  const [style, setStyle] = useState("Provide writing style")
  const [word_count, setWordCount] = useState(200)
  const [character, setCharacter] = useState("John")
  const [prompt, setPrompt] = useState("")
  const [promptHeader, setPromptHeader] = useState("")
  const [reply, setReply] = useState("")
 
  const handleEdit = () => {
    setIsEditing(!isEditing);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setPrompt(e.target.value)
      const updated_prompt = e.target.value
      let data = {story_label, updated_prompt}
      console.log(data)
      Axios.post(`${localaddress}/insert`, {formatprompt:data})
      .then((resp) => setReply(resp.data.text))
      // Axios.post(`${localaddress}/openai`, {data:result}, {headers: "Access-Control-Allow-Origin"})
      setIsEditing(false);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const result = "This story refers to " + character + "\'s " + "soldering session. Soldering here refers to making solder joints to affix through-hole components on a printed circuit board. This information is gathered from an IMU sensor. The information contains events during the session and how to interpret the sensor data. " + interpretations + ontological_relations + " Given these information, write a story about " + character + "\'s" + " soldering session. Specifically the number of solder joints created, the pace at which the solder joints are created, the order in which things occur. The language should be " + style + " and the target audience is " +  audience + ". The length of the story is " + word_count + "."
    setPrompt(result)
    setPromptHeader(story_label)
    let data = {story_label, interpretations, ontological_relations, audience, style, character, word_count}
    console.log(data)
    Axios.post(`${localaddress}/insert`, {data:data})
    //look into text areas
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
        <Label> Character </Label>
          <input
          type="text" 
          placeholder=""
          onChange={(e) => {setCharacter(e.target.value)}}
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
    <Segment>
      {prompt && (
      <div>
        <Header as='h2'>{promptHeader}</Header>
        <p>{prompt}</p>
      </div>
    )}

  </Segment>
  <Segment>
      {isEditing ? (
          <Input fluid
            className='Editbox'
            type = "textarea"
            defaultValue={prompt}
            onKeyDown={handleKeyDown}
            style={{ minHeight: 100 }}
            rows={10}
          />
        ) : (
          <p>{prompt}</p>
        )}
        <Button  primary large onClick={handleEdit}>{isEditing ? 'Cancel' : 'Edit'}</Button>
  </Segment>
  <Segment>
      {reply && (
      <div>
        <Header as='h2'>"OPEN AI RESPONSE"</Header>
        <p>{reply}</p>
      </div>
    )}
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