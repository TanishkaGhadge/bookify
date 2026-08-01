import * as pdfjsLib from 'pdfjs-dist';
import ePub from 'epubjs';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString();

export async function parsePDF(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    const chapters = [];
    
    // For simplicity, we chunk every N pages into a "chapter"
    // In a real app, you might try to parse table of contents or outline
    let currentChapterText = '';
    let chapterIndex = 1;

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      
      currentChapterText += pageText + '\n\n';
      
      // Group every 10 pages into a chapter for better TTS processing
      if (i % 10 === 0 || i === pdf.numPages) {
        chapters.push({
          id: `chapter-${chapterIndex}`,
          title: `Part ${chapterIndex}`,
          text: currentChapterText
        });
        currentChapterText = '';
        chapterIndex++;
      }
    }

    return {
      title: file.name.replace('.pdf', ''),
      chapters,
      format: 'PDF'
    };
  } catch (error) {
    console.error("Error parsing PDF:", error);
    throw error;
  }
}

export async function parseEPUB(file) {
  return new Promise((resolve, reject) => {
    try {
      const arrayBuffer = file.arrayBuffer();
      // ePub requires an ArrayBuffer
      arrayBuffer.then(buffer => {
        const book = ePub(buffer);
        
        book.ready.then(() => {
          // Extract spine (chapters)
          const spine = book.spine;
          const chapters = [];
          
          let promises = [];
          spine.each((item) => {
            // Load each spine item's text
            const p = item.load(book.load.bind(book)).then((content) => {
              // Extract raw text from the DOM node
              const text = content.textContent || content.innerText || '';
              if (text.trim().length > 100) {
                chapters.push({
                  id: item.idref,
                  title: `Chapter ${chapters.length + 1}`,
                  text: text.trim()
                });
              }
            });
            promises.push(p);
          });
          
          Promise.all(promises).then(() => {
            resolve({
              title: file.name.replace('.epub', ''),
              chapters,
              format: 'EPUB'
            });
          }).catch(reject);
        }).catch(reject);
      }).catch(reject);
    } catch (error) {
      console.error("Error parsing EPUB:", error);
      reject(error);
    }
  });
}
