"use client"
import React from 'react'
import "./send_work.css"

const filetxtTypes = [
  ".pdf",
  ".doc",
  ".docx",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword"
];

function returnFileSize(number) {
  if (number < 1024) {
      return `${number} bytes`;
  } else if (number >= 1024 && number < 1048576) {
      return `${(number / 1024).toFixed(1)} KB`;
  } else if (number >= 1048576) {
      return `${(number / 1048576).toFixed(1)} MB`;
  }
}

function validtxtFileType(file) {
  console.log(file.type)
  return filetxtTypes.includes(file.type);
}

const Send_work = () => {
  
  const changeFile = (e) => {
    const text_input = e.currentTarget;
    console.log(text_input)
    const text_preview = document.querySelector(".text_preview")
    while (text_preview.firstChild) {
      text_preview.removeChild(text_preview.firstChild);
    }
    const curFiles = text_input.files;
    if (curFiles.length === 0) {
      const para = document.createElement("p");
      para.textContent = "Нет выбранных файлов для загрузки";
      text_preview.appendChild(para);
  } else {
      const list = document.createElement("ol");
      text_preview.appendChild(list);

      for (const file of curFiles) {
          const listItem = document.createElement("li");
          const para = document.createElement("p");
          if (validtxtFileType(file)) {
              para.innerHTML = ` Имя файла -  ${file.name}, \n Размер файла - ${returnFileSize(
                  file.size,
              )}.`;
              para.className = "whitespace-pre-wrap" 
              listItem.appendChild(para);
          } else {
              para.textContent = `Имя файла ${file.name}: Недопустимый тип файла. Замените файл.`;
              listItem.appendChild(para);
          }

          list.appendChild(listItem);
      }
    }
  }
  return (
    <>
        <main className='main_form'>
          <h1></h1>
          <form action="" className='forms_send_work'>
            <label htmlFor="fio_student"> <p> Фамилия Имя Отчество </p> </label>
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
            <select name="type_publication" id='type_publication' size="1" defaultValue={"s1"} className='choose border-none rounded-md focus:outline-none'>
              <option value="s1">Отчет</option>
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
            
            <div className='file_input'>
            <label htmlFor="attach_publication">Выберите файл для загрузки (PDF, DOC, DOCX)</label>
            <input className='hidden' type="file" onChange={changeFile} name="attach_publication" id="attach_publication"
                accept=".doc,.docx,.pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document">
                  </input>
        </div>
        <div className="text_preview">
            <p>Нет файлов, выбранных в настоящий момент</p>
        </div>
            <input type="submit" defaultValue="Сохранить" />
            
            
            
          </form>
        </main>
    </>
  )
}

export default Send_work