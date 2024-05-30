import Link from 'next/link'
import React from 'react'
import "./publications.css"

const publications = () => {
  const item = {
    id: 1,
  }
  return (
    <main>
      <h1 className='list_title'> Список публикаций </h1>
      <div className='line_title'> </div>
      <section className='list_items_sq'>

        <Link href={"/publications/publication_"+item.id} className='pub_item'>
        <span className="item_t"> Название:  </span>
        <span id="item_f"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint impedit, vero laboriosam quos autem assumenda harum incidunt inventore!</span>
        <span className="item_t"> Дата публикации:  </span>
        <span id="item_f"> 26.05.2024 </span>
        <span className="item_t"> Автор:  </span>
        <span id="item_f"> Манжелеевский Владислав Александрович </span>
        </Link>

        <Link href={"/publications/publication_"+item.id} className='pub_item'>
        <span className="item_t"> Название:  </span>
        <span id="item_f"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint impedit, vero laboriosam quos autem assumenda harum incidunt inventore!</span>
        <span className="item_t"> Дата публикации:  </span>
        <span id="item_f"> 26.05.2024 </span>
        <span className="item_t"> Автор:  </span>
        <span id="item_f"> Манжелеевский Владислав Александрович </span>
        </Link>

        <Link href={"/publications/publication_"+item.id} className='pub_item'>
        <span className="item_t"> Название:  </span>
        <span id="item_f"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint impedit, vero laboriosam quos autem assumenda harum incidunt inventore!</span>
        <span className="item_t"> Дата публикации:  </span>
        <span id="item_f"> 26.05.2024 </span>
        <span className="item_t"> Автор:  </span>
        <span id="item_f"> Манжелеевский Владислав Александрович </span>
        </Link>

        <Link href={"/publications/publication_"+item.id} className='pub_item'>
        <span className="item_t"> Название:  </span>
        <span id="item_f"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint impedit, vero laboriosam quos autem assumenda harum incidunt inventore!</span>
        <span className="item_t"> Дата публикации:  </span>
        <span id="item_f"> 26.05.2024 </span>
        <span className="item_t"> Автор:  </span>
        <span id="item_f"> Манжелеевский Владислав Александрович </span>
        </Link>

        <Link href={"/publications/publication_"+item.id} className='pub_item'>
        <span className="item_t"> Название:  </span>
        <span id="item_f"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint impedit, vero laboriosam quos autem assumenda harum incidunt inventore!</span>
        <span className="item_t"> Дата публикации:  </span>
        <span id="item_f"> 26.05.2024 </span>
        <span className="item_t"> Автор:  </span>
        <span id="item_f"> Манжелеевский Владислав Александрович </span>
        </Link>

        <Link href={"/publications/publication_"+item.id} className='pub_item'>
        <span className="item_t"> Название:  </span>
        <span id="item_f"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint impedit, vero laboriosam quos autem assumenda harum incidunt inventore!</span>
        <span className="item_t"> Дата публикации:  </span>
        <span id="item_f"> 26.05.2024 </span>
        <span className="item_t"> Автор:  </span>
        <span id="item_f"> Манжелеевский Владислав Александрович </span>
        </Link>

        <Link href={"/publications/publication_"+item.id} className='pub_item'>
        <span className="item_t"> Название:  </span>
        <span id="item_f"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint impedit, vero laboriosam quos autem assumenda harum incidunt inventore!</span>
        <span className="item_t"> Дата публикации:  </span>
        <span id="item_f"> 26.05.2024 </span>
        <span className="item_t"> Автор:  </span>
        <span id="item_f"> Манжелеевский Владислав Александрович </span>
        </Link>
      </section>
    </main>
  )
}

export default publications
