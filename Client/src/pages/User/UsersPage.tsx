import axios from 'axios';
import Swal from 'sweetalert2';
import Button from "../../utils/Button";
import customConfirm from "../../utils/customConfirm";
import {userDTO} from "../../auth/auth.models";
import EntityPage from "../../utils/EntityPage";
import React from "react";

const UsersPage: React.FC = () => {

    async function makeAdmin(id: string) {
        await doAdmin("/api/accounts/makeAdmin", id);
    }

    async function removeAdmin(id: string) {
        await doAdmin("/api/accounts/removeAdmin", id);
    }

    async function doAdmin(url: string, id: string){
        await axios.post(url, JSON.stringify(id), {
            headers: {'Content-Type': 'application/json'}
        });

        Swal.fire({
            title: 'Success',
            text: 'Operation finished correctly',
            icon: 'success'
        });
    }

    return (
        <EntityPage<userDTO> title="Users" url={"/api/accounts/listUsers"}>
            {users => <>
                <thead>
                    <tr>
                        <th></th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                {users?.map(user => <tr key={user.id}>
                    <td>
                        <Button
                            onClick={() => customConfirm(() => makeAdmin(user.id),
                                `Do you wish to make ${user.email} an admin?`, 'Do it')}
                        >Make Admin</Button>

                        <Button
                            className="btn btn-danger ms-2"
                            onClick={() => customConfirm(() => removeAdmin(user.id),
                                `Do you wish to remove ${user.email} as an admin?`,
                                'Do it')}
                        >Remove Admin</Button>
                    </td>
                    <td>
                        {user.email}
                    </td>
                </tr>)}
                </tbody>
            </>}
        </EntityPage>
    )
}

export default UsersPage;