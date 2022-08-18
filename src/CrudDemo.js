import React, {  useState, useEffect, Component } from "react";
import { useNavigate } from 'react-router-dom';
import Person from './Components/Person';
import axios from 'axios';
import { getDefaultNormalizer } from "@testing-library/react";

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
    
    const [person, setPerson] = useState(dataPerson);
    const webDBAdress='https://localhost:44342/People';
    const [showDetails, setShowDetails] = useState(false);
    
    const FindById = (id) => 
    {
        axios.get('webDBAdress${id}').then((response) =>
        {
            setPerson(response.data);
        })
    }

    

    const Read = () =>{
        console.log("Hej 6")
        useEffect(() => {
            axios.get(webDBAdress).then((response) =>
            {
                console.log(response.data);
                setPersons(response.data);
            }
            )
        }, [])
    }
        
    
    
    const Create =() =>{
        axios.post(webDBAdress,{
            person
        }
        ).then(() => {
            Read();
        })
    }

    const Update = (id) =>{
        axios.put(webDBAdress+'${id}', {
            person
            
        }).then(() => {useNavigate.pushState('/read')})
    }

    const Delete = (id) =>{
        axios.delete(webDBAdress+'${id}')
        .then(() => {
            Read();
        })
    }

    const TableHeader = () =>{
        
        return (
            
                
        <thead>
          <tr>
            <th>Id</th>
            <th>Firstname</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Title</th>
            <th>Action</th>
          </tr>

        </thead>
    

        );
    };

    const TableRow = () => {
        return (
            <tbody>
                {
                    persons.map((person, index) => {
                        const {id, firstName, lastName, email, titel} = person
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
            setPerson(person);
        };
        return <button type="button" className="btn btn-primary" onClick={display} >Details</button>
    }

    // functionconponent 
    const ShowStudentDetails = () => {
       
        return (
            <>
                {showDetails &&
                    <div className="card" style={{ width: '400px' }} >
                        <div className="card-header bg-info text-white">
                            Person information
                        </div>
                        <div className="card-body" class="row">
                            
                            <p className="card-text">ID: {person.id}</p>
                            <p className="card-text">Name: {person.firstName} {dataPerson.lastName}</p>
                            <p className="card-text">Email: {person.email}</p>
                            <p className="card-text">Email: {person.title}</p>
                        </div>
                        <div className="card-footer">
                            <button type="button" className="btn btn-info" onClick={() => { setShowDetails(false); setPerson(dataPerson); }}>Hide info</button>
                        </div>
                    </div >
                }
            </>
        )
    }

    const Table = ({ children }) => <table className="table table-striped">{children}</table>

    //const PersonsList = () => {
        
        return (
            <div className="container">
                <h3>Persons</h3>
                <Read />
                <Table>
                    <TableHeader />
                    
                    
                    <TableRow />
                </Table>
                <br />
                
            <ShowStudentDetails/>
            </div>
        )
    //}


}

