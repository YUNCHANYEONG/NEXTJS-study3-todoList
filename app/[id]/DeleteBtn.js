'use client'
import { useRouter } from "next/navigation";

export default function Add(props){
    const router = useRouter();

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
            <p className='btn' onClick={()=>deleteList(props.list.id)}>X</p>
        </>
    )
}