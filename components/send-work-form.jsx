"use client"
import { useState, useTransition } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendWorkSchema } from "@/schemas";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";

import { useCurrentUser } from "@/hooks/use-current-user";

import "./send_work.css";
import { useRouter } from 'next/navigation';

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
  return filetxtTypes.includes(file.type);
}
const SendWorkForm = ({options_Type_Publication}) => {
    const router = useRouter();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isPending, startTransition] = useTransition();
    const user = useCurrentUser();
  

    const form = useForm({
      resolver: zodResolver(sendWorkSchema),
      defaultValues: {
        fio_student: "",
        place_work_performers: "",
        name_publication: "",
        abstract_publication_rus: "",
        abstract_publication_eng: "",
        lang_publication: "",
        type_publication: "s1",
        keywords: "",
        volume_publication: "",
        output_data: "",
        attach_publication: null,
      },
    });
  
    const onSubmit = (values) => {
  
  
      startTransition(() => {
        try {
          values.user_email = user.email;
          const formData = new FormData();
          Object.keys(values).forEach((key) => {
            if(key == 'attach_publication')
              formData.append(key, (values[key])?.[0]);
            else
              formData.append(key, values[key]);
          });
          fetch("/api/send_work", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.error) {
                setError(data.error);
              } else {
                setSuccess(data.success);
                form.reset();
                router.push('/publications/'+data.post.id)
              }
            })
            .catch((err) => {
              setError(`Что-то пошло не так! Ошибка: ${err}`);
            })
            .finally(() => {
              setSuccess("");
              setError("");
            });
    }
        catch (err) {
      setError(`Что-то пошло не так! Ошибка:${err}`);
    }
    finally {
      setSuccess("");
      setError("");
    }
  });
    };
  
  const changeFile = (e, onChange) => {
    const text_input = e.currentTarget;
    const text_preview = document.querySelector(".text_preview");
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
    onChange(curFiles);
  };
  
  return (
    <>
      <main className='main_form'>
        <h1></h1>
  
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="forms_send_work space-y-6">
            <div className="space-y-4">
              <FormField control={form.control} name="fio_student" render={({ field }) => (<FormItem>
                <FormLabel size="normal">Фамилия Имя Отчество</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} type="text" placeholder="Введите ваше ФИО" />
                </FormControl>
                <FormMessage />
              </FormItem>)} />
  
              <FormField control={form.control} name="place_work_performers" render={({ field }) => (<FormItem>
                <FormLabel size="normal">Место работы исполнителей</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} type="text" placeholder="Введите ваше место работы/учебы" />
                </FormControl>
                <FormMessage />
              </FormItem>)} />
  
              <FormField control={form.control} name="name_publication" render={({ field }) => (<FormItem>
                <FormLabel size="normal">Название публикации/отчета</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} type="text" placeholder="Введите название публикации/отчета" />
                </FormControl>
                <FormMessage />
              </FormItem>)} />
  
              <FormField control={form.control} name="abstract_publication_rus" render={({ field }) => (<FormItem>
                <FormLabel size="normal">Аннотация отчета/ публикации на руском языке</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} type="text" placeholder="Введите аннотацию публикации на русском" />
                </FormControl>
                <FormMessage />
              </FormItem>)} />
  
              <FormField control={form.control} name="abstract_publication_eng" render={({ field }) => (<FormItem>
                <FormLabel size="normal">Аннотация отчета/ публикации на английском языке: (если имеется)</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} type="text" placeholder="Введите аннотацию публикации на английском" />
                </FormControl>
                <FormMessage />
              </FormItem>)} />
  
              <FormField control={form.control} name="lang_publication" render={({ field }) => (<FormItem>
                <FormLabel size="normal">Язык Публикации</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} type="text" placeholder="Введите язык публикации" />
                </FormControl>
                <FormMessage />
              </FormItem>)} />
  
              <FormField control={form.control} name="type_publication" render={({ field }) => (<FormItem>
                <FormLabel size="normal">Тип отчета/ публикации</FormLabel>
                <FormControl>
                  <select {...field} disabled={isPending} size="1" className='choose border-none rounded-md focus:outline-none'>
                    {options_Type_Publication && options_Type_Publication.map( item  => {
                      return (
                        <option key={item.id} value={"s"+item.id}>{item.name}</option>
                      )
                    })}

                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>)} />
  
              <FormField control={form.control} name="keywords" render={({ field }) => (<FormItem>
                <FormLabel size="normal">Ключевые слова</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} type="text" placeholder="Введите ключевые слова" />
                </FormControl>
                <FormMessage />
              </FormItem>)} />
  
              <FormField control={form.control} name="volume_publication" render={({ field }) => (<FormItem>
                <FormLabel size="normal">Обьем отчета/ публикации</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} type="text" placeholder="Введите объем публикации" />
                </FormControl>
                <FormMessage />
              </FormItem>)} />
  
              <FormField control={form.control} name="output_data" render={({ field }) => (<FormItem>
                <FormLabel size="normal">Выходные данные, если имеются</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} type="text" placeholder="Введите выходные данные" />
                </FormControl>
                <FormMessage />
              </FormItem>)} />
  
              <FormField control={form.control} name="attach_publication" render={({ field }) => (
                <FormItem className="file_input">
                  <FormLabel size="normal">Выберите файл для загрузки (PDF, DOC, DOCX)</FormLabel>
                  <FormControl>
                    <input
                      disabled={isPending}
                      type="file"
                      multiple
                      className='hidden'
                      accept=".doc,.docx,.pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={(e) => {
                        changeFile(e, field.onChange);
                      }}
                    />
                  </FormControl>
  
                  <div className="text_preview">
                    <p>Нет файлов, выбранных в настоящий момент</p>
                  </div>
                  <FormMessage />
                </FormItem>
              )} />
  
            </div>
            {error && <FormError message={error} />}
            {success && <FormSuccess message={success} />}
            <Button type="submit" disabled={isPending} className="w-full bg-white text-xl shadow-lg hover:bg-sky-400">
              {"Сохранить"}
            </Button>
          </form>
        </Form>
      </main>
    </>
  );
  }

export default SendWorkForm