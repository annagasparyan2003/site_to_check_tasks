'use client'
import { useCallback, useState } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { Button } from "@/components/ui/button";
// import * as pdfjsLib from "pdfjs-dist";

import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    // 'pdfjs-dist/build/pdf.worker.min.mjs',
    'pdfjs-dist/build/pdf.worker.min.mjs',
    // 'pdfjs-dist/legacy/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
};

const resizeObserverOptions = {};

const maxWidth = 800;

export const Showpreviewfile = ({ file_url }) => {
    const [openDocument, setopenDocument] = useState(false);
    const [openDocumentPdf, setopenDocumentPdf] = useState(false);
    const [openDocumentDocx, setopenDocumentDocx] = useState(false);
    const file = '/uploads/' + file_url;
    const [numPages, setNumPages] = useState();
    const [containerRef, setContainerRef] = useState(null);
    const [containerWidth, setContainerWidth] = useState();

    const onResize = useCallback((entries) => {
        const [entry] = entries;

        if (entry) {
            setContainerWidth(entry.contentRect.width);
        }
    }, []);

    useResizeObserver(containerRef, resizeObserverOptions, onResize);


    function onDocumentLoadSuccess({ numPages: nextNumPages }) {
        setNumPages(nextNumPages);
    }
    const handleClick = () => {
        if (!openDocument) {
            if (file_url) {
                if (file_url.slice(file_url.lastIndexOf('.')) === '.pdf') {
                    setopenDocumentPdf(true)
                } else if (file_url.slice(file_url.lastIndexOf('.')) === '.docx') {
                    setopenDocumentDocx(true)
                    try {
                        fetch(file).then(async (data) => {
                            if (!data.ok)
                                throw new Error('Сетевой ответ не в порядке');

                            data.blob().then((fileBlob) => {
                                // Используем Google Docs Viewer для отображения файла docx
                                const previewElement = document.getElementById('docxfile_preview');
                                // previewElement.innerHTML = `<iframe src="https://docs.google.com/gview?url=${process.env.NEXT_PUBLIC_APP_URL+file}&embedded=true"></iframe>`;
                            });

                        });
                    } catch (error) {
                        console.error('Ошибка извлечения файл:', error);
                    }
                }
            }
        } else {
            setopenDocumentPdf(false)
            setopenDocumentDocx(false)
        }
        setopenDocument(!openDocument)

    }



    return (
        <>
            {file_url.slice(file_url.lastIndexOf('.')) != '.docx' &&
                <Button type="submit" onClick={handleClick} className="w-full mb-4 bg-white text-xl shadow-lg hover:bg-sky-400">
                    {"Посмотреть файл"}
                </Button>
            }

            {openDocumentPdf && <div className="preview_file w-1/2 mx-auto" ref={setContainerRef}>
                <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
                    {Array.from(new Array(numPages), (el, index) => (
                        <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                            width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
                        />
                    ))}
                </Document>
            </div>}
            {openDocumentDocx && <div id='docxfile_preview' className="preview_file w-1/2 mx-auto" ref={setContainerRef}>
            </div>}

        </>



    )
}


