import conf from "../conf/conf.js";

import { Client, Databases, ID,Storage,Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title , slug , content , featuredImage , userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteCollectionId,
                conf.appwriteDatabaseId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId

                }

            )
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error",error);
        }
    }

   async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

     async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

}


const service = new Service()

export default service 