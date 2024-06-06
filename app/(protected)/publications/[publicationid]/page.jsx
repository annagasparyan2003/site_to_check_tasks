import "./paje_pub.css"
import { LoadPostsById } from "@/data/posts"

import { Showpreviewfile } from "@/components/show-preview-file";
export default async function PublicationItem({ params }) {
    const item = await LoadPostsById(Number(params.publicationid.replace('publication_', '')));

    return (
      <>
        {/* <div>My Post: {params.publicationid}</div> */}
        <main className="flex items-center justify-center flex-col py-2 m-2 for_items"> 
          <div>
            <span className="item_title">Фамилия Имя Отчество - </span>
            <span id="item_fill">{item.fio_author}</span>
          </div>
          <div>
            <span className="item_title"> Место работы - </span>
            <span id="item_fill">{item.place_work_performers}</span>
          </div>
          <div>
            <span className="item_title"> Аннотация отчета/ публикации на руском языке - </span>
            <span id="item_fill">{item.abstract_publication_rus}</span>
          </div>
          <div>
            <span className="item_title"> Аннотация отчета/ публикации на английском языке - </span>
            <span id="item_fill">{item.abstract_publication_eng}</span>
          </div>
          <div>
            <span className="item_title"> Язык Публикации - </span>
            <span id="item_fill">{item.lang_publication}</span>
          </div>
          <div>
            <span className="item_title"> Тип отчета/ публикации - </span>
            <span id="item_fill">{item.type_publication[0].name}</span>
          </div>
          <div>
            <span className="item_title"> Ключевые слова - </span>
            <span id="item_fill">{item.keywords}</span>
          </div>
          <div>
            <span className="item_title"> Обьем отчета/публикации - </span>
            <span id="item_fill">{item.volume_publication}</span>
          </div>
          <div>
            <span className="item_title"> Выходные данные - </span>
            <span id="item_fill">{item.output_data}</span>
          </div>
          <div>
            <span className="item_title">Прикрепленный файл - </span>
            <span id="item_fill">{item.attach_publication['0']}</span>
          </div>
          <div>
            <span className="item_title"></span>
            <span id="item_fill"></span>
          </div>  

          <div className="for_pdf w-1/2">
            <Showpreviewfile file_url={item.attach_publication['0']}/>
          </div>                                                                                                                     
        </main>
      </>
    ) 
    
  }