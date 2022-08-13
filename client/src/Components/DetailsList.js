import { Table } from 'react-bootstrap';
// import Pagination from "rc-pagination";

function DetailsList(props) {
    let content = 
        <div>
            List is empty.
        </div>
    if (props.details) {
        content = 

            <Table striped bordered hover responsive size="sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Car</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                {props.details.map((detail, key) => {
                    return (
                        <tr key={key}>
                            <td>{detail.name}</td>
                            <td>{detail.car}</td>
                            <td>{detail.price ? detail.price.$numberDecimal : detail.price}</td>
                        </tr>
                )
                })}
                </tbody>
            </Table>
    }
    return (
        <div className="col-md-12 center">
            {content}
        </div>
    );
}

export default DetailsList;