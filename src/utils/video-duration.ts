
import ffmpeg from 'ffmpeg';

export const getVideoDuration = async (videoObj: Express.Multer.File): Promise<number> => {
    const extension = videoObj.originalname.split(".")[1];
    console.log(extension);
    const process = new ffmpeg(videoObj.path+ ".avi");
    let duration: number | undefined = 0
    process.then( function(video){
        const durationInSecond = video.metadata.duration?.seconds;
        duration = durationInSecond;
    })
    return duration;
}