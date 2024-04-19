import React from 'react'

const Send_work = () => {
  return (
    <>
        <main className='flex'>
          <h1></h1>
          <form action="" className='flex flex-col'>
            <label htmlFor="fio_student">Фамилия Имя Отчество</label>
            <input type="text" name="fio_student" id="fio_student" />

            <label htmlFor="place_work_performers">Место работы исполнителей</label>
            <input type="text" name="place_work_performers" id="place_work_performers" />
            
            <label htmlFor="name_publication">Фамилия Имя Отчество</label>
            <input type="text" name="name_publication" id="name_publication" />

            <label htmlFor="abstract_publication_rus">Аннотация отчета/ публикации на руском языке</label>
            <input type="text" className='abstract_publication_rus'/>

            <label htmlFor="abstract_publication_eng">Аннотация отчета/ публикации на английском языке: (если имеется)</label>
            <input type="text" className='abstract_publication_eng'/>

            <label htmlFor="lang_publication">Язык Публикации</label>
            <input type="text" className='lang_publication'/>

            <label htmlFor="type_publication">Тип отчета/ публикации</label>
            <select name="type_publication" id='type_publication' size="1" className='border-none rounded-md focus:outline-none'>
              <option selected value="s1">Отчет</option>
              <option value="s2">Тезис</option>
              <option value="s3">Статья</option>
              <option value="s4">Монография</option>
            </select>

            <label htmlFor="keywords">Ключевые слова</label>
            <input type="text" className='keywords'/>

            <label htmlFor="volume_publication">Обьем отчета/ публикации</label>
            <input type="text" className='volume_publication'/>

            <label htmlFor="output_data">Выходные данные, если имеются</label>
            <input type="text" className='output_data'/>
            
            <label htmlFor="attach_publication"></label>
            <input type="file" name="attach_publication" id="attach_publication" />

            <input type="submit" value="Сохранить" />
            
            
            
          </form>
        </main>
    </>
  )
}

export default Send_work