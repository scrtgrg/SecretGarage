import logo from './logo.svg';
import React from "react";
import './App.css';
import UsersList from './Components/UsersList';
import CreateDetailForm from './Components/CreateDetail';
import DetailsList from './Components/DetailsList';
import CreateDetailModal from './Components/CreateDetailModal';
import { Button } from 'react-bootstrap';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const countPerPage = 10;
  const [details, setDetails] = React.useState(null);
  const [totalDetails, setTotalDetailsCount] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);

  const [users, setUsers] = React.useState(null);
  
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  React.useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then((users) => setUsers(users));

      getDetails();
  }, []);

  function deleteDetail(id) {
    fetch('/details?' +  + new URLSearchParams({
      id: id
    }), { method: 'DELETE' })
        .then(() => {
          let filtered = details.find(x => x.id != id);
          setDetails(filtered);
        });
  }

  function getDetails(page = 1) {
    setCurrentPage(page);
    const skip = countPerPage * (page - 1);
    
    fetch("/details?" + new URLSearchParams({
        take: countPerPage,
        skip: skip,
    })).then((res) => res.json())
        .then((response) => {
          setDetails(response.details);
          setTotalDetailsCount(response.total);
        });
  }

  return (
    <div className="App col-md">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>{!users ? "No users" : users.length}</p> */}
        <h2>SecretGarage sklad</h2>
      </header>
      <div className="container-fluid col-md-10">
        <div className="react-bs-table-tool-bar">
          <div className="row">
            <div className="col-md-9">
              <CreateDetailModal show={show} close={handleClose} callback={getDetails}></CreateDetailModal>
            </div>
            <div className="col-md-3 pad-5">
              <Button onClick={handleShow}>Create new Detail</Button>
            </div>
          </div>
        </div>
        <div>
          <DetailsList details={details} updatePage={getDetails}
            total={totalDetails} currentPage={currentPage} countPerPage={countPerPage}
            deleteDetail={deleteDetail}></DetailsList>
        </div>
      </div>
      {/* <div>
        <UsersList users={users}></UsersList>
      </div> */}
    </div>
  );
}


export default App;
