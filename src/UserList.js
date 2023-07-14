import React, {useState, useEffect} from 'react' 
import axios from 'axios'

const UserList = (props) => {
    const[users, setUsers] = useState([])
    const[search, setSearch] = useState('')

    useEffect(() => {
        (async function(){
            try{
                const userResponse = await axios.get('https://reqres.in/api/users?page=2')
                setUsers(userResponse.data.data)
            } catch(err){
                console.log(err)
            }
        })()
    },[])

    function handleSearch(e){
        setSearch(e.target.value)
    }

    const result = users.filter(function(ele){
            return ele.first_name.toLowerCase().includes(search.toLowerCase())
    })
     
    return(
        <div>
            <h1>UsersList - {users.length} </h1>

                <input  
                        type="text" 
                        value={search} 
                        placeholder="search by first name" 
                        onChange={handleSearch} 
                />
               
            {result.map(function(ele){
                return (
                    <div key={ele.id}>
                        <p className="fs-4">ID: {ele.id}</p>
                        <img className="img-fluid img-thumbnail" src={ele.avatar} alt={ele.first_name} /><br/>
                        <p className="badge bg-primary text-wrap" >Name: {ele.first_name}</p>
                    </div>
                )
            })}            
        </div>
    )
}

export default UserList