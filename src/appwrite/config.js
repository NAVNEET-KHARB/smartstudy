


import conf from "../conf/conf"
import { Client, Databases, Storage, Query, ID } from "appwrite";


export class Service {
    client = new Client()
    databases;
    bucket;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async getPost(postId) {
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, postId);
        } catch (error) {
            console.log("Appwrite service :: getPost() :: ", error);
            return false;
        }
    }
    
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries);
        } catch (error) {
            console.log("Appwrite service :: getPosts() :: ", error);
            return false;
        }
    }
    
    async createPost({ title, content, featuredImage, status, userId, category }) {
        try {
            const postId = ID.unique(); // Generate a unique postId
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                postId, // Use postId as the document ID
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                    category,
                    postId // Store postId in the document
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost() :: ", error);
            return false;
        }
    }
    
    async updatePost(postId, { title, content, featuredImage, status, category }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                postId, // Use postId as the document ID
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    category
                }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost() :: ", error);
            return false;
        }
    }
    
    async deletePost(postId) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                postId // Use postId as the document ID
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost() :: ", error);
            return false;
        }
    }

    // storage service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile() :: ", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
                
            )
        } catch (error) {
            console.log("Appwrite service :: deleteFile() :: ", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        ).href
    }
}


const service = new Service()
export default service;

