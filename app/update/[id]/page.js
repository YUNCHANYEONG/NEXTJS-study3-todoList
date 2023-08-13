'use client'

import Link from 'next/link'
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Add(){
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');

    useEffect(()=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/listitem/${id}`)
        .then(resp=>resp.json())
        .then(result=>{
            setSubject(result.subject);
            setContent(result.content);
        });
    },[]);

    
    function updateList(e){
        e.preventDefault();
        const subject = e.target.subject.value;
        const content = e.target.content.value;

        if(subject == ''){
            alert(`제목을 적어주세요.`);
            return;
        }

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({subject, content})
        }
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/listitem/${id}`, options)
        .then(res => res.json())
        .then(result => {
            router.push(`/${result.id}`);
            router.refresh();
        })
    }

    return(
        <div className='bottom-area'>
            <form onSubmit={(e) => updateList(e)}>
                <div className="form-area">
                    <input 
                        type="text" 
                        name="subject" 
                        className='subject' 
                        placeholder="subject"
                        value={subject}
                        onChange={(e)=>setSubject(e.target.value)}
                    />
                    <textarea 
                        name="content" 
                        className='content' 
                        placeholder="content" 
                        value={content}
                        onChange={(e)=>setContent(e.target.value)}
                    />
                </div>
                <Link href={`/${id}`}><p className='back-btn btn'>{`<`}</p></Link>
                <button className='add-btn btn' type="submit">U</button>
            </form>
        </div>
    )
}