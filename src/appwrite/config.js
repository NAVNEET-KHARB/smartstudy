import conf from "../conf/conf";
import { Client, Databases, Storage, ID } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // Fetch a post by its postId
  async getPost(postId) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        postId
      );
    } catch (error) {
      console.log("Appwrite service :: getPost() :: ", error);
      return false;
    }
  }

  // Fetch all active posts
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts() :: ", error);
      return false;
    }
  }

  // Create a new post with sections
  async createPost({
    title,
    content,
    featuredImage,
    status,
    userId,
    category,
    sections, // Add sections to parameters
  }) {
    try {
      const postId = ID.unique(); // Generate a unique postId
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        postId,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
          category,
          postId, // Store postId in the document
          totalRating: 0, // Initial total rating
          numberOfRatings: 0, // Initial number of ratings
          sections, // Store sections in the document
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost() :: ", error);
      return false;
    }
  }

  // Update a post with rating data
  async ratePost(postId, rating) {
    try {
      const post = await this.getPost(postId);
      if (post) {
        const updatedTotalRating = post.totalRating + rating;
        const updatedNumberOfRatings = post.numberOfRatings + 1;
        return await this.databases.updateDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          postId,
          {
            totalRating: updatedTotalRating,
            numberOfRatings: updatedNumberOfRatings,
          }
        );
      }
      return false;
    } catch (error) {
      console.log("Appwrite service :: ratePost() :: ", error);
      return false;
    }
  }

  // Update post details
  async updatePost(postId, { title, content, featuredImage, status, category, sections }) {
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
          category,
          sections // Add sections to the document
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost() :: ", error);
      return false;
    }
  }
  

  // Delete a post
  async deletePost(postId) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        postId
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost() :: ", error);
      return false;
    }
  }

  // Storage service
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile() :: ", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite service :: deleteFile() :: ", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId).href;
  }
}

const service = new Service();
export default service;
