import { getType } from "@src/utils/material-type.js"

describe("Test the type of material file", () => {
    test("should return 'reading' if the file type is pdf", (done) => {
        const type = getType("application/pdf");
        expect(type).toEqual("reading")
        done()
    })

    test("should return 'video' if the file type is a video", (done) => {
        const type = getType("video/mp4");
        expect(type).toEqual("video");
        done()
    })
    test("should return invalid type if the file type neither video nor pdf", (done) => {
        try {
            getType("image/jpg");
        } catch (error: any) {
            // console.log(JSON.stringify(error));
            expect(error.toString()).toEqual("Invalid File Type")
            done()
        }
    })
})