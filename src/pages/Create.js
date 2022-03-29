import React , { useState } from 'react'
import { styled } from '@mui/material/styles';

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import TextField from '@mui/material/TextField'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'



const CustomizedTextField = styled(TextField)`
    margin-top: 20px;
    margin-bottom: 20px;
    display: block;

`
const CustomizedFormControl = styled(FormControl)`
    margin-top: 20px;
    margin-bottom: 20px;
    display: block;

`

export default function Create() {
    const [title, setTitle] = useState('')
    const [details, setDetails] = useState('')
    const [titleError, setTitleError] = useState(false)
    const [detailsError, setDetailsError] = useState(false)
    const [category, setCategory] = useState('money')
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setTitleError(false)
        setDetailsError(false)
    
        if (title === '') {
          setTitleError(true)
        }
        if (details === '') {
          setDetailsError(true)
        }
        if (title && details) {
          console.log(title, details, category)
        } 
      }



    return (
        <Container size="sm">
        <Typography
          variant="h6" 
          color="textSecondary"
          component="h2"
          gutterBottom
        >
          Create a New Note
        </Typography>
        
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <CustomizedTextField
            onChange={(e) => setTitle(e.target.value)}
            label="Note Title" 
            variant="outlined" 
            color="secondary" 
            fullWidth
            required
            error={titleError}
          />
          <CustomizedTextField
            onChange={(e) => setDetails(e.target.value)}
            label="Details"
            variant="outlined"
            color="secondary"
            multiline
            rows={4}
            fullWidth
            required
            error={detailsError}
          />
  
          {/* <Radio value="hello" />
          <Radio value="goodbye" /> */}
  
          <CustomizedFormControl>
            <FormLabel>Note Category</FormLabel>
            <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
              <FormControlLabel value="money" control={<Radio />} label="Money" />
              <FormControlLabel value="todos" control={<Radio />} label="Todos" />
              <FormControlLabel value="reminders" control={<Radio />} label="Reminders" />
              <FormControlLabel value="work" control={<Radio />} label="Work" />
            </RadioGroup>
          </CustomizedFormControl>
  
          <Button
            type="submit" 
            color="secondary" 
            variant="contained"
            endIcon={<KeyboardArrowRightIcon />}>
            Submit
          </Button>
        </form>
  
        
      </Container>
    )
}