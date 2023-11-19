import React from 'react'
import { CreatePassword } from './CreatePassword'

export function Dashboard() {

    console.log(sessionStorage.getItem("username"))
    return (
        <>
            <CreatePassword />
        </>
    )
}