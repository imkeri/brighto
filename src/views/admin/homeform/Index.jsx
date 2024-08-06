import React from 'react'
import Table from 'react-bootstrap/Table';

const Index = () => {
    return (
        <div className='bg-white shadow p-3 rounded-lg'>
            <Table striped>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone No.</th>
                        <th>Business Email</th>
                        <th>Organization</th>
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

export default Index