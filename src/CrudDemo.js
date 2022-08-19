import React, {  useState, useEffect, Component } from "react";
import { useNavigate } from 'react-router-dom';
import Person from './Components/Person';
import axios from 'axios';
import { getDefaultNormalizer } from "@testing-library/react";
import "bootstrap/dist/css/bootstrap.min.css";



export default function CrudDemo  ()
{

    const dataPerson =
    {   id:0,
        firstName:'',
        lastName:'',
        email:'',
        title:''
    }
    
    const [persons, setPersons] = useState([]);
    const [reload, setReload] = useState([]);
    const [person, setPerson] = useState(dataPerson);
    const webDBAdress='https://localhost:44342/People';
    const [showDetails, setShowDetails] = useState(false);
    const [showPeopleList, setShowPeopleList] = useState(true);
    const [showPeopleCreate, setShowPeopleCreate] = useState(false);
    const [showPeopleUpdate, setShowPeopleUpdate] = useState(false);

    const FindById = (id) => 
    {
         axios.get('webDBAdress${id}').then((response) =>
        {
            setPerson(response.data);
        })
    }

    
    
    
       
        useEffect(() => {
            console.log(+ "Hej 8");
            getRead();
            
            
        },[null]);
        
   

    async function getRead() { 
        const response = await axios.get(webDBAdress);
        setPersons(response.data);

    }
        
    
    
    const Create =() =>{
        
        axios.post(webDBAdress,{
            "id": 0,
            "firstName": person.firstName, 
            "lastName": person.lastName,
            "email": person.email,
            "title": person.title 
        }
        ).then(() => {
            getRead();
        })
    }

    const Update = (id) =>{
        axios.put(webDBAdress+'/${id}', {
            "id": id,
            "firstName": person.firstName, 
            "lastName": person.lastName,
            "email": person.email,
            "title": person.title 
        }).then(() => {getRead();})
    }

    

    const Delete = (id) =>{
        console.log(id + 'Hej du gamle man');
        axios.delete(webDBAdress+'/'+id)
        
        .then(() => {
            getRead();
        })
    }

    const TableHeader = () =>{
        
        return ( showPeopleList &&
            
              
        <thead>
            <ButtonCreateClicked />
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            
            <th>Action</th>
          </tr>

        </thead>
    

        );
    };


    const TableRow = () => {
        
        return (
            <tbody>
                

                {showPeopleList &&
                    persons.map((person, index) => {
                        const {id, firstName, lastName, email} = person
                        console.log(index+ " Hej 7" + " " + person.firstName)
                        
                            return (
                            <tr key={person.id}>
                                <td className="table-Light">{id}</td>
                                <td className="table-Light">{firstName}</td>
                                <td className="table-Light">{lastName}</td>
                                <td className="table-Light">{email}</td>
                            
                                <td className="table-Light"><ButtonClicked person={person} /></td>
                                <td className="table-Light"><ButtonUpdateClicked person={person} /></td>
                                <td className="table-Light"><button type="button" className="btn btn-danger" onClick={() => Delete(id)}>Delete</button></td>
                            </tr>
                           
                        )
                    })
                }
            </tbody>
        )
    }


    const ButtonClicked = ({person}) =>{
        const display = () =>{
            setShowDetails(true);
            setShowPeopleList(false);
            setPerson(person);
        };
        return <button type="button" className="btn btn-primary" onClick={display} >Details</button>
    }

    const ButtonCreateClicked = () =>{
        const display = () =>{
            setShowPeopleCreate(true);
            setShowPeopleList(false);
            
        };
        return <button type="button" className="btn btn-primary" onClick={display} >Create Person</button>
    }

    const ButtonUpdateClicked = ({person}) =>{
        const display = () =>{
            setShowPeopleUpdate(true);
            setShowPeopleList(false);
            setPerson(person);
        };
        return <button type="button" className="btn btn-primary" onClick={display} >Update Person</button>
    }

    

    // functionconponent 
    const ShowPeopleDetails = () => {
        const {id, firstName, lastName, email, title} = person
        return (
            <>
                {showDetails &&
                    <div className="card" style={{ width: '400px' }} >
                        <div className="card-header bg-info text-white">
                            Person information
                        </div>
                        <div className="card-body row">
                            
                            <p className="card-text">ID: {id}</p>
                            <p className="card-text">Name: {firstName} {lastName}</p>
                            <p className="card-text">Email: {email}</p>
                            <p className="card-text">Email: {title}</p>
                        </div>
                        <div className="card-footer">
                            <button type="button" className="btn btn-info" onClick={() => { setShowDetails(false); setPerson(dataPerson); setShowPeopleList(true) }}>Hide info</button>
                        </div>
                    </div >
                }
            </>
        )
    }

    const CreatePerson = () => {
        return ( showPeopleCreate &&
            
            <div>
            <form className="create-form">
                <div>
                    <label>First Name:</label>
                    <input placeholder='First Name: ' onChange={(e) => person.firstName = e.target.value}/>
                </div>
                <div>
                    <label>Last Name:</label>
                    <input placeholder='Last Name: ' onChange={(e) => person.lastName = e.target.value}/>
                </div>
                <div>
                <label>Email:</label>
                    <input placeholder='Email: ' onChange={(e) => person.email = e.target.value}/>
                </div>
                <div>
                <label>Title:</label>
                    <input placeholder='Title: ' onChange={(e) => person.title = e.target.value}/>
                </div>

                <button onClick={() => {Create(); setShowPeopleCreate(false); setShowPeopleList(true) }} type='submit'>Submit</button>
            </form>
        </div>
        )
    }

    const UpdatePerson = () => {
        console.log('hej på dig ' + person.firstName + ' ' + person.id);
        return ( showPeopleUpdate &&
            

            <div>
            <form className="create-form">
                <div>
                    <label>First Name:</label>
                    <input  defaultValue={person.firstName} onChange={(e) => person.firstName = e.target.value}/>
                </div>
                <div>
                    <label>Last Name:</label>
                    <input  defaultValue={person.lastName} onChange={(e) => person.lastName = e.target.value}/>
                </div>
                <div>
                <label>Email:</label>
                    <input defaultValue={person.email} onChange={(e) => person.email = e.target.value}/>
                </div>
                <div>
                <label>Title:</label>
                    <input defaultValue={person.title} onChange={(e) => person.title = e.target.value}/>
                </div>

                <button onClick={() => {Update(); setShowPeopleUpdate(false); setShowPeopleList(true) }} type='submit'>Submit</button>
            </form>
        </div>
        )
    }

    const Table = ({ children }) => <table className="table table-striped">{children}</table>

    //const PersonsList = () => {
        
        return (
            
            <div className="container">
                <h3>Persons</h3>
                
                <getRead />
                <CreatePerson />
                <UpdatePerson />
                <Table>
                    <TableHeader />
                    
                    
                    <TableRow />
                </Table>
                <br />
                
            <ShowPeopleDetails/>
            
            </div>
        )
    //}


}

