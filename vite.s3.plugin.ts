import { Plugin, ConfigEnv, UserConfig, ResolvedConfig } from 'vite';
import fs from 'fs';
import path from 'path';
import mimeTypes from 'mime-types';
import readDir from 'recursive-readdir';
import { DeleteObjectCommand, ListObjectsCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

/* eslint-disable no-console */
const S3_PATH_SEP = '/';
const PATH_SEP: string = path.sep;
const UPLOAD_IGNORES: string[] = ['.DS_Store', 'index.html'];

function translatePathFromFiles(dir: string, files: string[]) {
    return files.map((file: string) => ({
        path: file,
        name: file
            .replace(dir, '')
            .split(PATH_SEP)
            .join(S3_PATH_SEP),
    }));
}

function getDirectoryFilesRecursive(dir: string, ignores: ReadonlyArray<string> = []): Promise<{
    path: string
    name: string
}[]> {
    return new Promise((resolve, reject) => {
        readDir(dir, ignores, (error: Error, files: string[]) => {
            if (error)
                reject(error);

            else
                resolve(translatePathFromFiles(dir, files));
        });
    });
}

async function clearBucket(s3Client: S3Client, bucket: string) {
    const listObjectsCommand = new ListObjectsCommand({ Bucket: bucket });
    const { Contents } = await s3Client.send(listObjectsCommand);

    const deleteObjectCommands = Contents.map(({ Key }) => {
        return new DeleteObjectCommand({ Bucket: bucket, Key });
    });

    await Promise.all(deleteObjectCommands.map(command => s3Client.send(command)));
    console.log('\x1b[90m' + `Bucket ${bucket} was cleaned before uploading` + '\x1b[0m');
}

export function viteUploadToS3(options: {
    enabled: boolean,
    bucket: string,
    region: string,
    endpoint: string,
    accessKey: string,
    secretKey: string
}): Plugin {
    let vite: ResolvedConfig;

    return {
        name: 'vite-plugin-s3',
        enforce: 'post',
        apply(config: UserConfig, { command }: ConfigEnv) {
            return command === 'build' && options.enabled;
        },
        configResolved(config: ResolvedConfig) {
            vite = config;
        },
        closeBundle: {
            async handler() {
                if (!vite.build.ssr && options.enabled) {
                    const allFiles = await getDirectoryFilesRecursive('dist');
                    const s3Client = new S3Client({
                        credentials: {
                            accessKeyId: options.accessKey,
                            secretAccessKey: options.secretKey
                        },
                        region: options.region,
                        endpoint: options.endpoint,
                        forcePathStyle: true
                    });

                    await clearBucket(s3Client, options.bucket);

                    for (const file of allFiles) {
                        if (UPLOAD_IGNORES.some(ignore => new RegExp(ignore).test(file.name))) {
                            continue;
                        }

                        const fileContent = fs.readFileSync(file.path);
                        const contentType = mimeTypes.lookup(file.name);
                        const contentDisposition = `inline; filename="${file.name}"`;

                        if (!contentType) {
                            throw new Error(`contentType unknown for file ${file}`);
                        }

                        const command = new PutObjectCommand({
                            Bucket: options.bucket,
                            Key: file.name,
                            Body: fileContent,
                            ContentType: contentType,
                            ContentDisposition: contentDisposition
                        });

                        await s3Client.send(command);
                        console.log('\x1b[90m' + `${file.name} uploaded` + '\x1b[0m');
                    }

                    console.log('\x1b[32m' + `✓ dist folder was uploaded to s3 bucket ${options.bucket}` + '\x1b[0m');
                }
            },
        },
    };
}