'use client'
import { useRouter } from "next/navigation";

export default function Add(){
    const router = useRouter();

    function addList(e){
        e.preventDefault();
        const subject = e.target.subject.value;
        const content = e.target.content.value;
        const status = 'N'

        if(subject == ''){
            alert(`제목을 적어주세요.`);
            return;
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({subject, content, status})
        }
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/listitem`, options)
        .then(res => res.json())
        .then(result => {
            router.refresh();
            router.push(`/`);
        })
    }

    return(
        <div className='bottom-area'>
            <form onSubmit={(e) => addList(e)}>
                <div className="form-area">
                    <input type="text" name="subject" className='subject' placeholder="subject" />
                    <textarea name="content" className='content' placeholder="content" />
                </div>
                <button className='add-btn btn' type="submit">+</button>
            </form>
        </div>
    )
}