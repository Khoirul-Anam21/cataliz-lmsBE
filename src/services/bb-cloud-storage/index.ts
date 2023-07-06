
import B2 from 'backblaze-b2';
import { v4 as uuidv4 } from 'uuid';


export default class BackBlazeService {

    private bb: B2;

    constructor() {
        const b2 = new B2({
            applicationKeyId: '4fe2f55bf2b2', // or accountId: 'accountId'
            applicationKey: '00509d2f63f310789921cfdbe41942641cebdb9699' // or masterApplicationKey
        });
        this.bb = b2;
    }

    public async authorize(): Promise<string> {
        const result = await this.bb.authorize();
        return result.data.authorizationToken;
    } 

    public async getUploadUrl(bucketId: string): Promise<string> {
        const result = await this.bb.getUploadUrl({ bucketId });
        return result.data.uploadUrl;
    }

    public async createBucket(name: string): Promise<string> {
        try {
            const result = await this.bb.createBucket({ bucketName: name, bucketType: 'allPublic' });
            return 'success create bucket ' + result.data;
        } catch (error) {
            throw error;
        } 
    }

    public async upload(fileName: any, data: Buffer, uploadUrl: string, uploadAuthToken: string) {
        try {
            
            const result = await this.bb.uploadFile({ fileName, data, uploadUrl, uploadAuthToken });
            return result.data;
        } catch (error) {
            throw error;
        }
    }
    // public delete(){}
    // public read(){}
    // public update(){}
}
