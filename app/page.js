import Link from 'next/link'
import Add from './Add'
import ItemBtn from './ItemBtn'

export default async function List() {
  const resp = await fetch(process.env.NEXT_PUBLIC_API_URL+'/listitem', { cache: 'no-store' });
  const listsData = await resp.json();

  return (
    <>
      <div className='lists'>
              {
                  listsData.map((list, i)=>{
                      return(
                        
                          <div 
                            className={`list list${i} ${list.status == "Y" ? "Done":"Undone"}`} 
                            key={i}>
                              <p>
                                <Link href={`/${list.id}`}>
                                  <span className='listSubject'>{i+1}. {list.subject}</span>
                                </Link>
                                <ItemBtn list={list}/>
                              </p>
                          </div>
                        
                      )
                  })
              }
      </div>
      <Add />
    </>
  )
}
