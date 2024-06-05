import { FileType } from "@prisma/client";

export const fileConfig = {
    maxSize: 5 * 1024 * 1024, // 5mb,
    minSize: 100,
    mimes: new Set(["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]),
    mimeTypeMap: {
        "application/pdf": "PDF" as FileType,
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "DOCX" as FileType,
    },
};
