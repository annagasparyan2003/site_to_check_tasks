import "./paje_pub.css"

export default function PublicationItem({ params }) {
    return (
      <>
        {/* <div>My Post: {params.publicationid}</div> */}
        <main className="flex items-center justify-center flex-col py-2 m-2 for_items"> 
          <div>
            <span className="item_title">Фамилия Имя Отчество - </span>
            <span id="item_fill">Манжелеевский Владислав Александрович</span>
          </div>
          <div>
            <span className="item_title"> Место работы - </span>
            <span id="item_fill"></span>
          </div>
          <div>
            <span className="item_title"> Аннотация отчета/ публикации на руском языке - </span>
            <span id="item_fill"></span>
          </div>
          <div>
            <span className="item_title"> Аннотация отчета/ публикации на английском языке - </span>
            <span id="item_fill"></span>
          </div>
          <div>
            <span className="item_title"> Язык Публикации - </span>
            <span id="item_fill"></span>
          </div>
          <div>
            <span className="item_title"> Тип отчета/ публикации - </span>
            <span id="item_fill"></span>
          </div>
          <div>
            <span className="item_title"> Ключевые слова - </span>
            <span id="item_fill"></span>
          </div>
          <div>
            <span className="item_title"> Обьем отчета/публикации - </span>
            <span id="item_fill"></span>
          </div>
          <div>
            <span className="item_title"> Выходные данные - </span>
            <span id="item_fill"></span>
          </div>
          <div>
            <span className="item_title"></span>
            <span id="item_fill"></span>
          </div>
          <div>
            <span className="item_title"></span>
            <span id="item_fill"></span>
          </div>  

          <div className="for_pdf">

          </div>                                                                                                                     
        </main>
      </>
    ) 
    
  }