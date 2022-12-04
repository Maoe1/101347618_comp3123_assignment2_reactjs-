function App() {

    const [id, setId] = useState('');
  
    const [formData, setFormData] = useState({
      first_name:'',
      last_name:'',
      gender:'not selected',
      salary:'',
      user_name: '',
      email: '',
      password: '',
    })
  
    const genders = ['male', 'female']
    const onValueChanged = (event) => {
      setFormData({...formData , [event.target.name]:event.target.value})
  }
    const onSubmitForm = async (event, endpoint) => {
      event.preventDefault()
      console.log("Form Submitted : " +  JSON.stringify(formData))
     
          const base = 'https://assignment1-101347618.herokuapp.com/api'
          const url = `${base}/${endpoint}`
          const res = await axios({
            method: 'post',
            url,
            data: formData,
          }).then(function (response) {
            //handle success
            console.log(response);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
          });
    
    }
  
    const updateEmployee = async (event, endpoint) => {
      event.preventDefault()
      console.log("Form Submitted : " +  JSON.stringify(formData))
     
          const base = 'https://assignment1-101347618.herokuapp.com/api'
          const url = `${base}/${endpoint}`
          const res = await axios({
            method: 'put',
            url,
            data: formData,
          }).then(function (response) {
            //handle success
            console.log(response);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
          });
    
    }
  
    const deleteEmployee = async (event, endpoint) => {
      event.preventDefault()
    
     
          const base = 'https://assignment1-101347618.herokuapp.com/api'
          const url = `${base}/${endpoint}?eid=${id}`
          const res = await axios({
            method: 'delete',
            url,
            data: formData,
          }).then(function (response) {
            //handle success
            console.log(response);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
          });
    
    }
    const displayEmployees = async (event, endpoint) => {
  
      event.preventDefault()
      const base = 'https://assignment1-101347618.herokuapp.com/api'
      const url = `${base}/${endpoint}/`
      const res = await axios({
        method: 'get',
        url
      }).then(function (response) {
        //handle success
        console.log(response);
    })
    .catch(function (response) {
        //handle error
        console.log(response);
      });
  
    }
  
  
    const displayEmployeeById = async (event, endpoint) => {
  
      event.preventDefault()
      const base = 'https://assignment1-101347618.herokuapp.com/api'
      const url = `${base}/${endpoint}/${id}`
      const res = await axios({
        method: 'get',
        url
      }).then(function (response) {
        //handle success
        console.log(response);
    })
    .catch(function (response) {
        //handle error
        console.log(response);
      });
  
    }
    return (
     <>
     <form  onSubmit={(e) => onSubmitForm(e, 'user/signup')}>
      <h4> User Sign Up </h4>
     <input type="text"
          value={formData.user_name}
          onChange={(e) => setFormData({...formData, user_name: e.target.value})}
          placeholder="Enter user name"/>
        <input type="text"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          placeholder="Enter email"/>
        <input
          type="text"
           value={formData.password}
           onChange={(e) => setFormData({...formData, password: e.target.value})}
           placeholder="Enter password"/>
        <button type="submit">Signup</button>
     </form>
      <br />
      <form onSubmit={(e) => onSubmitForm(e, 'user/login')}>
        <h4> User Login </h4>
        <input type="text"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          placeholder="Enter email"/>
        <input type="text"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          placeholder="Enter password"/>
          <button type="submit">Login</button>
        </form>
        <br />
        <div>
          <h4> Employees </h4>
          <button type="submit"  onClick={(e) => displayEmployees(e, 'emp/employees')}>Display all Employees</button>
          </div>
          <br/>
          <form onSubmit={(e) => onSubmitForm(e, 'emp/employees')}>
          <h4> Add Employee </h4>
     <input type="text"
          value={formData.first_name}
          onChange={(e) => setFormData({...formData, first_name: e.target.value})}
          placeholder="Enter first name"/>
        <input type="text"
          value={formData.last_name}
          onChange={(e) => setFormData({...formData, last_name: e.target.value})}
          placeholder="Enter last name"/>
          <input type="text"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          placeholder="Enter email"/>
        <input
          type="number"
           value={formData.salary}
           onChange={(e) => setFormData({...formData, salary: e.target.value})}
           placeholder="Enter salary"/>
        <select name='gender' onChange={(e) => onValueChanged(e)}>
                  {
                      genders.map((gender) => (
                              <option key={gender} value={gender}>{gender}</option>
                      ))
                  }
              </select>
              <button type="submit">Add</button>
            </form>
            <br/>
            <form onSubmit={(e) => displayEmployeeById(e, 'emp/employees')}>
              <h4> Find Employee by specified Id </h4>
              <input type="text"
               value={id}
                onChange={(e) => setId(e.target.value)} />
              <button type="submit">Display Employee</button>
            </form>
            <br/>
            <form onSubmit={(e) => updateEmployee(e, 'emp/employees/63887ee88f60122e10c0e63d')}>
              <h4> Update Employee (Given Id)</h4>
              <input type="text"
          value={formData.first_name}
          onChange={(e) => setFormData({...formData, first_name: e.target.value})}
          placeholder="Enter first name"/>
        <input type="text"
          value={formData.last_name}
          onChange={(e) => setFormData({...formData, last_name: e.target.value})}
          placeholder="Enter last name"/>
          <input type="text"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          placeholder="Enter email"/>
        <input
          type="number"
           value={formData.salary}
           onChange={(e) => setFormData({...formData, salary: e.target.value})}
           placeholder="Enter salary"/>
        <select name='gender' onChange={(e) => onValueChanged(e)}>
                  {
                      genders.map((gender) => (
                              <option key={gender} value={gender}>{gender}</option>
                      ))
                  }
              </select>
              <button type="submit">Update</button>
            </form>
            <br/>
            <form onSubmit={(e) => deleteEmployee(e, 'emp/employees')}>
              <h4> Delete Employee by specified Id </h4>
              <input type="text"
               value={id}
                onChange={(e) => setId(e.target.value)} />
              <button type="submit">Delete</button>
            </form>
            <br/>
  
  
     </>
    );
  }
  
  export default App;
  