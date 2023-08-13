import Link from 'next/link'
import DeleteBtn from './DeleteBtn'

export default async function ListDetail(props) {
    const id = props.params.id;
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listitem/${id}`, { cache: 'no-store' });
    const listData = await resp.json();

    return (
        <>
            <div className='lists'>
                <div className={`list list0 ${listData.status == "Y" ? "Done":"Undone"}`}>
                    <h3>{listData.subject}</h3>
                    <p>{listData.content}</p>
                </div>
            </div>
            <div className='bottom-area'>
                <Link href={`/`}><p className='back-btn btn'>{`<`}</p></Link>
                <DeleteBtn list={listData}/>
                <Link href={`/update/${id}`}><p className='update-btn btn'>U</p></Link>
            </div>
        </>
    )
}
