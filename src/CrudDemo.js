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
            person
        }
        ).then(() => {
            getRead();
        })
    }

    const Update = (id) =>{
        axios.put(webDBAdress+'${id}', {
            person
            
        }).then(() => {getRead();})
    }

    const Delete = (id) =>{
        axios.delete(webDBAdress+'${id}')
        .then(() => {
            getRead();
        })
    }

    const TableHeader = () =>{
        
        return ( showPeopleList &&
            
              
        <thead>
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
            <formgroup className="create-form">
                <form>
                    <label>First Name</label>
                    <input placeholder='First Name' onChange={(e) => setPerson.firstName(e.target.value)}/>
                </form>
                <form>
                    <label>Last Name</label>
                    <input placeholder='Last Name' onChange={(e) => setPerson.lastName(e.target.value)}/>
                </form>
                <form>
                <label>Email</label>
                    <input placeholder='Last Name' onChange={(e) => setPerson.email(e.target.value)}/>
                </form>
                <form>
                <label>Title</label>
                    <input placeholder='Last Name' onChange={(e) => setPerson.title(e.target.value)}/>
                </form>
                <button onClick={() => {Create(); setShowPeopleCreate(false); }} type='submit'>Submit</button>
            </formgroup>
        </div>
        )
    }

    const Table = ({ children }) => <table className="table table-striped">{children}</table>

    //const PersonsList = () => {
        
        return (
            
            <div className="container">
                <h3>Persons</h3>
                
                <getRead />
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

