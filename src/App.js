import React, { Component } from 'react'
import axios from 'axios'
export default class App extends Component {
  constructor(){
    super()
    this.state={
      stu:[],
      branches:[],
      years:[],
      id:'',
      name:'',
      age:'',
      branch:'',
      year:'',
      roll:'',
      mess:'',
      isUpdateable:'hidden'
    };
  }
  componentDidMount(){
    axios.get('http://localhost:8000/')
    .then(res=>{
      this.setState({stu:res.data.user})
      let branch=res.data.user.map(obj=>obj.branch)
      branch=[...new Set(branch)]
      let year=res.data.user.map(obj=>obj.year)
      year=[...new Set(year)]
      this.setState({branches:branch})
      this.setState({years:year})
    })
    .catch(err=>console.log(err))

    
  }
  add=(e)=>{
    e.preventDefault()
   const newData={
      name:this.state.name,
      roll:this.state.roll*1,
      age:parseInt(this.state.age),
      branch:this.state.branch,
      year:this.state.year*1,
    }
    axios.post('http://localhost:8000/add',{newData})
    .then(res=>{this.setState({mess:res.data.mess});this.componentDidMount();this.cl()})
    .catch(err=>console.log(err))
  }
  cl=()=>{
    this.setState({
      id:'',
      name:'',
      age:'',
      branch:'',
      year:'',
      roll:'',
      mess:''
    })
  }
  remove=(roll)=>{
    axios.get('http://localhost:8000/delete/'+roll)
    .then(res=>{this.setState({mess:res.data.mess});this.componentDidMount()})
    .catch(err=>console.log(err))


  }
  fil=(branch)=>{
    axios.get('http://localhost:8000/filter/'+branch)
    .then(res=>{this.setState({stu:res.data});})
    .catch(err=>console.log(err))
  }
  edit=(id)=>{
    axios.get('http://localhost:8000/updateshow/'+id)
    .then(res=>{this.setState({
        name:res.data.name,
        age:res.data.age,
        branch:res.data.branch,
        year:res.data.year,
        roll:res.data.roll,
        isUpdateable:'visible'
  })})
    .catch(err=>console.log(err)) 
   }

   update=(id)=>{
    // const newData={
    //    name:this.state.name,
    //    roll:this.state.roll*1,
    //    age:parseInt(this.state.age),
    //    branch:this.state.branch,
    //    year:this.state.year*1,
    //  }
    //  axios.post('http://localhost:8000/update',{newData})
    //  .then(res=>{this.setState({mess:res.data.mess});this.componentDidMount();this.cl()})
    //  .catch(err=>console.log(err))
   }
  render() {
    return (
      <div className='container'>
        <center><h1>Student Records</h1></center>
        {!this.state.mess ? <div></div>:    <div className="alert alert-success alert-dismissible fade show" role="alert">
    <strong>{this.state.mess}</strong>
    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
             </div>}
        <div className='row'>
        <div className='col-md-5 m-auto form-group'>
            <label>Roll Number</label>
            <input type="text" name="" className='form-control' value={this.state.roll} onChange={(e)=>this.setState({roll:e.target.value})} />
          </div>
          <div className='col-md-5 m-auto form-group'>
            <input type="hidden" name="" className='form-control' value={this.state.id} />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-5 m-auto form-group'>
            <label>Name</label>
            <input type="text" name="" className='form-control' value={this.state.name} onChange={(e)=>this.setState({name:e.target.value})} />
          </div>
          <div className='col-md-5 m-auto form-group'>
            <label>Age</label>
            <input type="text" name="" value={this.state.age} className='form-control' onChange={(e)=>this.setState({age:e.target.value})} />
          </div>
        </div>
        <div className='row'>
         
          <div className='col-md-5 m-auto form-group'>
            <label>Branch</label>
            <input type="text" name="" value={this.state.branch} className='form-control' onChange={(e)=>this.setState({branch:e.target.value})} />
          </div>
          <div className='col-md-5 m-auto form-group'>
            <label>Date Of joining</label>
            <input type="text" name="" value={this.state.year} className='form-control' onChange={(e)=>this.setState({year:e.target.value})} />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-4 m-auto p-5'>
            <button type="button" className='btn btn-outline-primary' onClick={this.add} style={{width:"100%"}}>Add Record</button>
          </div>
          <div className='col-md-4 m-auto p-5'>
          <button type="button" className='btn btn-outline-success' onClick={this.update} style={{width:"100%",visibility:this.state.isUpdateable}}>Update</button>
            
          </div>
          <div className='col-md-4 m-auto p-5'>
          <button type="button" className='btn btn-outline-danger' onClick={this.cl} style={{width:"100%"}}>Clear</button>
            
          </div>

        </div>
        <div className='row mt-5 mb-5'>
        <div className='col-md-1'><button type="button" onClick={()=>this.fil('all')} className='btn btn-danger'>All</button></div>
          {this.state.branches.map(obj=>{
          return <div key={obj} className='col-md-1'><button type="button" onClick={()=>this.fil(obj)} className='btn btn-danger'>{obj}</button></div>
          })}
        </div>
        <div className='row'>
        <table className='table text-center'>
          <thead>
            <tr>
              <th>Roll No.</th>
              <th>Name</th>
              <th>Age</th>
              <th>Branch</th>
              <th>Date Of Joining</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.stu.map((obj,index)=>{
              return <tr key={index}>
                <td>{obj.roll}</td>
                <td>{obj.name}</td>
                <td>{obj.age}</td>
                <td>{obj.branch}</td>
                <td>{obj.year}</td>
                <td><button type="button" className='btn btn-primary' onClick={()=>this.edit(obj._id)}><i className="fa fa-edit" aria-hidden="true"></i></button></td>
                <td><button type="button" className='btn btn-danger' onClick={()=>this.remove(obj.roll)}><i className="fa fa-trash" aria-hidden="true"></i></button></td>
              </tr>
            })}
          </tbody>
        </table>
        </div>
      </div>
    )
  }
}
