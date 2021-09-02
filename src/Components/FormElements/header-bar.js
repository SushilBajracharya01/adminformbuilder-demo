import React from 'react'

function HeaderBar(props) {

    const handleEdit = () => {
        props.editModeOn('hello');
    }
    const handleDelete = () =>{
        props.deleteElement();
    }
    return (
        <div>
            <div>
                <button onClick={handleEdit}>edit</button>
                <button onClick={handleDelete}>delete</button>
            </div>
        </div>
    )
}

export default HeaderBar
