import Link from 'next/link'
import { LoadAllPosts } from "@/data/posts"


import "./publications.css"


const publications = async () => {
  const item = {
    id: 1,
  }
  const items = await LoadAllPosts();
  return (
    <main>
      <h1 className='list_title'> Список публикаций </h1>
      <div className='line_title'> </div>
      <section className='list_items_sq'>
        {items && items.map(item => {
          return (
            <Link key={item.id} href={"/publications/publication_" + item.id} className='pub_item'>
              <span className="item_t"> Название: </span>
              <span id="item_f">{item.name_publication}</span>
              <span className="item_t"> Дата публикации:  </span>
              <span id="item_f"> {String(item.createdAt.getDate()).padStart(2, '0') + "." + String(item.createdAt.getMonth() + 1).padStart(2, '0') + "." +  item.createdAt.getFullYear()} </span>
              <span className="item_t"> Автор:  </span>
              <span id="item_f"> {item.fio_author} </span>
            </Link>
          )
        })}
      </section>
    </main>
  )
}

export default publications
