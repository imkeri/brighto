import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// handle toast message
export function toastifyMessage(message, type) {
    if (type === "success") return toast.success(message, { className: "font-14" });
    if (type === "error") return toast.error(message, { className: "font-14" });
    if (type === "warn") return toast.warn(message, { className: "font-14" });
}

// this function decode tokne
export function decodeToken() {
    let my_token = localStorage.getItem("token");
    var decoded = my_token ? jwtDecode(my_token) : "";
    return decoded;
}

// common function for copy response
export const handleCopyClick = (textToCopy) => {


    const { status, data } = textToCopy;
    const partialData = { status, data };
    navigator.clipboard.writeText(JSON.stringify(partialData, null, 2))
        .then(() => {
            toastifyMessage("Copied to Clipboard", "success")
        })
        .catch(error => {
            console.error('Error copying text:', error);
        });
};

// common function for download pdf
export const downloadPDF = (service_name,setSpin) => {
    setSpin(true);
    const input = document.getElementById('table-to-pdf');
    html2canvas(input, { scale: 2 }).then((canvas) => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        const ratio = pdfWidth / imgWidth;
        const scaledHeight = imgHeight * ratio;

        let y = 0;
        while (y < imgHeight) {
            // Calculate the height remaining for the current page
            const remainingHeight = Math.min(scaledHeight, pdfHeight);
            const remainingCanvasHeight = remainingHeight / ratio;

            // Create a new canvas for the current page's portion
            const pageCanvas = document.createElement('canvas');
            pageCanvas.width = canvas.width;
            pageCanvas.height = remainingCanvasHeight;

            const pageCtx = pageCanvas.getContext('2d');
            pageCtx.drawImage(canvas, 0, y, imgWidth, remainingCanvasHeight, 0, 0, imgWidth, remainingCanvasHeight);

            const pageImgData = pageCanvas.toDataURL('image/png');
            pdf.addImage(pageImgData, 'PNG', 0, 0, pdfWidth, remainingHeight);

            y += remainingCanvasHeight;

            if (y < imgHeight) {
                pdf.addPage();
            }
        }

        pdf.save(`${service_name}.pdf`);
        setSpin(false);
    }).catch((error) => {
        console.log("error::", error);
        setSpin(false);
    });
};

