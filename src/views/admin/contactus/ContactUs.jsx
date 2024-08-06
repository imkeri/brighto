import React from 'react'
import Table from 'react-bootstrap/Table';

const ContactUs = () => {
    return (
        <div className='bg-white shadow p-3 rounded-lg'>
            <Table striped>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone No.</th>
                        <th>Email</th>
                        <th>Project Name</th>
                        <th>Service</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </Table>
        </div>
    )
}

export default ContactUs