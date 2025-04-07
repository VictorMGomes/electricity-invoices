import * as pdfjsLib from 'pdfjs-dist';

// Configura o worker do PDF
pdfjsLib.GlobalWorkerOptions.workerSrc = '../assets/pdf.worker.mjs';

export const parsePDF = async (file) => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = async function () {
      if (this.result instanceof ArrayBuffer) {
        const typedarray = new Uint8Array(this.result);
        try {
          const pdf = await pdfjsLib.getDocument(typedarray).promise;
          let fullText = '';
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const strings = content.items
              .filter((item) => 'str' in item)
              .map((item) => item.str);
            fullText += strings.join(' ') + '\n';
          }
          resolve(fullText);
        } catch (error) {
          reject(error);
        }
      } else {
        reject('File read result is not an ArrayBuffer.');
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};
