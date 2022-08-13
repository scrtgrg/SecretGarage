function UsersList(props) {
    let content = 
        <div>
            List is empty.
        </div>
    if (props.users) {
        content = props.users.map((user) =>
            <div key={user.name}>
                <h3>{user.name}</h3>
                <p>{user.age}</p>
            </div>
        );
    }
    return (
        <div>
            {content}    
        </div>
    );
}

export default UsersList;