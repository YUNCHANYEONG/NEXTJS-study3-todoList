'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Add(props){
    const router = useRouter();

    function updateStatus(id, status){
        if(status == 'N'){
            status = 'Y'
        }else{
            status = 'N'
        }

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({status})
        }
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/listitem/${id}`, options)
        .then(res => res.json())
        .then(result => {
            router.refresh();
            router.push(`/`);

        })
    }

    function deleteList(id){
        const options = {method: 'DELETE'}
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/listitem/${id}`, options)
        .then(resp=>resp.json())
        .then(result=>{
            router.push('/');
            router.refresh();
        })
    }

    return(
        <>
            <span className="listStatus" 
                onClick={()=>updateStatus(props.list.id, props.list.status)}>
                    {props.list.status == "Y" ? "Done" : "Undone"}
            </span>
            <span className='listDelete' onClick={()=>deleteList(props.list.id)}>X</span>
        </>
    )
}