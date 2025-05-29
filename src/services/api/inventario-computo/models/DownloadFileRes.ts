export interface DownloadFileRes {
    blockBlob: BlockBlob;
    sharedPolicy: string;
}

export interface BlockBlob {
    uri: string;
    name: string;
    blobType: string;
}
