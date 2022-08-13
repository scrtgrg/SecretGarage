import React from "react";
import { Table, Button } from 'react-bootstrap';
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

function DetailsList(props) {
    function deleteOne(id) {
        fetch('/details?id=' + id, { method: 'DELETE' })
              .then(() => {
                props.updatePage();
              }).catch((error) => {
                  console.log(error);
              });
    }

    let content = 
        <div>
            List is empty.
        </div>
    if (props.details) {
        content = 
            <div>
                <Table striped bordered hover responsive size="sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Car</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {props.details.map((detail, key) => {
                        return (
                            <tr key={key}>
                                <td>{detail.name}</td>
                                <td>{detail.car}</td>
                                <td>{detail.price}</td>
                                <td><Button onClick={event => deleteOne(detail._id)}>Delete</Button></td>
                            </tr>
                    )
                    })}
                    </tbody>
                </Table>
                <Pagination
                    pageSize={props.countPerPage}
                    onChange={props.updatePage}
                    current={props.currentPage}
                    total={props.total}
                />
            </div>
    }
    return (
        <div className="col-md-12 center">
            {content}
        </div>
    );
}

export default DetailsList;