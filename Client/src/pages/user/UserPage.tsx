import axios from 'axios';
import Swal from 'sweetalert2';
import Button from "../../components/Button";
import customConfirm from "../../utils/CustomConfirm";
import {userDTO} from "../../auth/auth.models";
import EntityPage from "../../utils/EntityPage";
import React from "react";
import {urlAccount} from "../../endpoints";

const UsersPage = () => {

    async function makeAdmin(id: string) {
        await doAdmin(`${urlAccount}/makeAdmin`, id);
    }

    async function removeAdmin(id: string) {
        await doAdmin(`${urlAccount}/removeAdmin`, id);
    }

    async function doAdmin(url: string, id: string){
        await axios.post(url, JSON.stringify(id), {
            headers: {"Content-Type": "application/json"}
        });

        Swal.fire({
            title: "Success",
            text: "Operation finished correctly",
            icon: "success"
        });
    }

    return (
        <div className="grid gap-10">
            <EntityPage<userDTO>
                title="Users"
                url={`${urlAccount}/listUsers`}
                entityName="Users"
            >
                {
                    users =>
                        <>
                            <div className="grid grid-cols-[1fr_1fr] border-b-2">
                                <div className="px-4 py-5 text-md font-bold text-gray-700">Email</div>
                                <div className="px-4 py-5 text-md font-bold text-gray-700">Actions</div>
                            </div>
                            {users?.map(user =>
                                <div key={user.id} className="grid grid-cols-[1fr_1fr] border-b-2 hover:bg-gray-50">
                                    <div className="px-4 py-2 text-sm text-gray-600 grid items-center">{user.email}</div>
                                    <div className="px-4 py-2">
                                        <Button className="mr-2"
                                                color="success"
                                                onClick={() => customConfirm(() =>
                                                    makeAdmin(user.id), `Do you wish to make ${user.email} an admin?`, "Do it")}>
                                            Make Admin
                                        </Button>
                                        <Button color="danger"
                                                onClick={() => customConfirm(() => removeAdmin(user.id),
                                            `Do you wish to remove ${user.email} as an admin?`,
                                            "Do it")}>
                                            Remove Admin
                                        </Button>
                                    </div>
                                </div>)
                            }
                        </>
                }
            </EntityPage>
    </div>
    )
}

export default UsersPage;