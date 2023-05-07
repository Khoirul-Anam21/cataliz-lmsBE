import { getType } from "@src/utils/material-type.js"

describe("Test the type of material file", () => {
    test("should return 'reading' if the file type is pdf", (done) => {
        const type = getType("application/pdf");
        console.log(type);
        if(type === "pdf") done()
    })

    test("should return 'video' if the file type is a video", (done) => {
        const type = getType("video/mp4");
        if (type === "video") done()
    })
    test("should return invalid type if the file type neither video nor pdf", (done) => {
        const type = getType("image/jpg");
        expect(type).toThrowError()
        done()
    })
})