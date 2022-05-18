import React, { useEffect } from 'react'
import { useState } from 'react'
import Select from 'react-select';
import "./Create.css"
import { useCollection } from '../../Hooks/useCollection';
import { timestamp } from '../../Firebase/config';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { useFirestore } from '../../Hooks/useFirestore';
import { useHistory } from 'react-router-dom';

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
]

function Create() {
  const history =useHistory()
  const {addDocument,response}=useFirestore("projects");
  const {user}=useAuthContext();
  const { documents } = useCollection("profile");
  const [users, setUsers] = useState([])
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("")
  const [category, setCategory] = useState("")
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formErr, setFormErr] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault()
    setFormErr(null)
    if (!category) {
      setFormErr("Plase fill category")
      return
    }
    if (assignedUsers.length < 1) {
      setFormErr("Please fill assigned users at least one user")
      return
    }
    const createdBy={
      displayName:user.displayName,
      photoURL:user.photoURL,
      id:user.uid
    }
    const assignedUsersList=assignedUsers.map(u=>{
      return {
        displayName:u.value.displayName,
        photoURL:u.value.photoURL,
        id:u.value.id
      }
    });
    const project = {
      name,
      details,
      category: category.value,
      dueDate:timestamp.fromDate(new Date(dueDate)),
      comments:[],
      createdBy,
      assignedUsersList
    }
    addDocument(project);
   
    if(!response.error){
       history.push("/");
    }

  }

  useEffect(() => {
    if (documents) {
      const options = documents.map(user => {
        return { value: user, label: user.displayName }
      })
      setUsers(options)
    }

  }, [documents])
  return (
    <div className='create-form'>
      <h2 className='page-title'>Create a project</h2>
      <form onSubmit={handleSubmit} >
        <label>
          <span>Project name :</span>
          <input
            required
            type='text'
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Description :</span>
          <textarea
            required
            type='text'
            onChange={(e) => setDetails(e.target.value)}
            value={details}></textarea>
        </label>
        <label>
          <span>set due date :</span>
          <input
            required
            type='date'
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Project category</span>
          <Select
            onChange={(option) => { setCategory(option);  }}
            options={categories}

          />
        </label>
        <label>
          <span>Assign to</span>
          <Select
            onChange={(option) => { setAssignedUsers(option); }}
            options={users}
            isMulti
          />
        </label>
        {formErr && <div className='error' >{formErr}</div>}
        <button className="btn">Add project</button>
      </form>
    </div>
  );
}

export default Create