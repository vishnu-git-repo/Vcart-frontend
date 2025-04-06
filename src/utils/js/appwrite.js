
import { Client, Storage, ID} from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67f105c00032a907bf27');

const storage = new Storage(client);

async function uploadFile(file) {
    const upload = await storage.createFile('67f10606002ef878f16a', ID.unique(), file);
    const fileView = await storage.getFileView('67f10606002ef878f16a', upload.$id);
    console.log("File uploaded successfully:", fileView);
    return fileView;
}

export {uploadFile}
