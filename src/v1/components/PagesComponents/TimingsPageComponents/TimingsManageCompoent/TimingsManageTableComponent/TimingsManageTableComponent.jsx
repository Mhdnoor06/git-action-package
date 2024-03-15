import React, { Fragment,useState } from 'react';
import EditableRow from '../EditTableRow/EditTableRow';
import ReadOnlyRow from '../ReadOnlyRow/ReadOnlyRow';
import './TimingsManageTableComponent.css';

const TimingsManageTableComponent = ({TodaysTimings}) => {
    const [contacts, setContacts] = useState(TodaysTimings);
    const [addFormData, setAddFormData] = useState({
      fullName: "",
      address: "",
      phoneNumber: "",
      email: "",
    });
  
    const [editFormData, setEditFormData] = useState({
      fullName: "",
      address: "",
      phoneNumber: "",
      email: "",
    });
  
    const [editContactId, setEditContactId] = useState(null);

    const handleAddFormChange = (event) => {
        event.preventDefault();
    
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
    
        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;
    
        setAddFormData(newFormData);
      };
    
      const handleEditFormChange = (event) => {
        event.preventDefault();
    
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
    
        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;
    
        setEditFormData(newFormData);
      };
    
      const handleAddFormSubmit = (event) => {
        event.preventDefault();
    
        const newContact = {
        //   id: nanoid(),
          fullName: addFormData.fullName,
          address: addFormData.address,
          phoneNumber: addFormData.phoneNumber,
          email: addFormData.email,
        };
    
        const newContacts = [...contacts, newContact];
        setContacts(newContacts);
      };
    
      const handleEditFormSubmit = (event) => {
        event.preventDefault();
    
        const editedContact = {
          id: editContactId,
          fullName: editFormData.fullName,
          address: editFormData.address,
          phoneNumber: editFormData.phoneNumber,
          email: editFormData.email,
        };
    
        const newContacts = [...contacts];
    
        const index = contacts.findIndex((contact) => contact.id === editContactId);
    
        newContacts[index] = editedContact;
    
        setContacts(newContacts);
        setEditContactId(null);
      };
    
      const handleEditClick = (event, namaz) => {
        event.preventDefault();
        setEditContactId(namaz._id);
    
        const formValues = {
          namaazName: namaz.namazName,
          azaanTime: namaz.azaanTime,
          jamaatTime: namaz.jamaatTime,
        };
       
        setEditFormData(formValues);
      };
    
      const handleCancelClick = () => {
        setEditContactId(null);
      };
    
      const handleDeleteClick = (contactId) => {
        const newContacts = [...contacts];
    
        const index = contacts.findIndex((contact) => contact.id === contactId);
    
        newContacts.splice(index, 1);
    
        setContacts(newContacts);
      };
    
  return (
   <>
      <table>
          <thead>
            <tr className='ManageTimingsHeaderName'>
              <th className='ManageTimingsHeaderNameContent'>Prayer Name</th>
              <th className='ManageTimingsHeaderNameContent'>Azaan Time</th>
              <th className='ManageTimingsHeaderNameContent'>Jamaat Time</th>
              <th className='ManageTimingsHeaderNameContent'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {TodaysTimings.map((namaz) => (

              <Fragment>
                {editContactId === namaz._id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    Namaz={namaz}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
   </>
  )
}

export default TimingsManageTableComponent
