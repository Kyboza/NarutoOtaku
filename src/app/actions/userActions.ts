"use server";
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path'
import { revalidatePath } from 'next/cache';
import { connectToDatabase } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import { cookies } from "next/headers";
import Character from '../models/Character';
import Forum from '../models/Forum';
import SpecificForum from '../models/SpecificForum';
import Comment from '../models/Comment';
import Item from '../models/Item';
import Order from '../models/Order';
import { handleError } from '../utils/errorHandler';
import { ObjectId } from 'mongoose';
import { ITopCharacters } from '../../../types';
import { IItemCart } from '../../../types';
import Stripe from 'stripe';


dotenv.config();

interface IReply {
    _id: string; // Konverterat till en sträng
    commentContent: string;
    commentUsername: string;
    commentImg: string;
}

const ACCESS_SECRET = process.env.ACCESS_SECRET ?? '';
const REFRESH_SECRET = process.env.REFRESH_SECRET ?? ''
const stripe = new Stripe(process.env.STRIPE_SECRET ?? '');

if (!ACCESS_SECRET || !REFRESH_SECRET || !stripe) {
  throw new Error("ACCESS_SECRET, REFRESH_SECRET or STRIPE_SECRET is not set in environment variables");
}
//Hämta User Page Info
export async function getUserFromParams(name: string) {
    if(!name) throw new Error('Did not get a name from client')

    const storedCookies = cookies();
    
    const accessToken = (await storedCookies).get('accessToken')?.value;
    let visitingUser = null;

    if (accessToken){
        let decoded;
        try {
            decoded = jwt.verify(accessToken, ACCESS_SECRET);

            if (typeof decoded !== 'object' || decoded === null || !('userId' in decoded)) {
                throw new Error('Invalid accessToken or no id connected to it');
            }
    
            visitingUser = await User.findById(decoded.userId)
            if(!visitingUser) throw new Error('No error with that id matching from Database');
        } catch (error) {
            handleError(error)
        }
    
    } else {
        console.log('No AccessToken Active')
    }
    
    const connection = await connectToDatabase();
    if (!connection.success) throw new Error(connection.message);

    let user = null
    try {
        user = await User.findOne({username: name})
        if (!user) throw new Error('Could not find user in database');
        return {visitingUser, user}
    } catch (error) {
        handleError(error)
    }
}




//Edit
export async function updateUserInfo(updatedData: {gender: string; fighting: string; age: string; weight: string; about: string, imageFile: File, imagePath: string}) {
    if(!updatedData) throw new Error('Did not recieve all information needed to update')
    const {gender, fighting, age, weight, about, imageFile, imagePath} = updatedData;

    const storedCookies = cookies()

    const accessToken = (await storedCookies).get('accessToken')?.value;
    if(!accessToken) throw new Error('No accessToken active');

    let decoded;
    try{
        decoded = jwt.verify(accessToken, ACCESS_SECRET)
    } catch(error){
        handleError(error)
    }

    if(typeof decoded !== 'object' || decoded === null || !('userId' in decoded)){
        throw new Error('Invalid accessToken or no id connected to it');
    }

    const connection = await connectToDatabase()
    if(!connection.success) throw new Error(connection.message);

    try {
        const user = await User.findById(decoded.userId)
        if(!user) throw new Error('Could not find user in database');

        const uploadDir = path.join(process.cwd(), 'public/images/profilepic');
        const filePath = path.join(uploadDir, imageFile.name);
        const fileBuffer = await imageFile.arrayBuffer()
        await fs.writeFile(filePath, Buffer.from(fileBuffer))

        user.imgPath = imagePath;
        user.gender = gender;
        user.style = fighting;
        user.weight = weight;
        user.age = age;
        user.about = about;
        await user.save()
        const data = user.username
        return data
    } catch (error) {
        handleError(error)
    }
}





//Character Layers
export async function fetchCharacters(){
    const connection = await connectToDatabase()
    if(!connection.success) throw new Error(connection.message);

    try {
        const characters = await Character.find()
        if(!characters || characters.length === 0) throw new Error('Could not find any characters in db');
        return characters
    } catch(error){
        handleError(error)
    }
}





//Forum Layers
export async function fetchFrontForum(){
    const connection = await connectToDatabase()
    if(!connection.success) throw new Error(connection.message);
    try{
        const forum = await Forum.find()
        if(!forum || forum.length === 0) throw new Error('No forum sections found in database');
         await Promise.all(forum.map(async (forumSection) => {
            // Hitta alla specifika forum som har categoryId som matchar forumSection._id
            const specificForumPosts = await SpecificForum.find({$and: [
                { categoryId: forumSection._id },
                { createdAt: {$exists: true}}
            ]});

            // Räkna antalet specifika inlägg (posts) för forumSection
            const postCount = specificForumPosts.length;

            //Skapar datum som visas upp senaste postens datum
            const createdAtArray = specificForumPosts.map(post => post.createdAt).filter(date => date !== undefined)
            const latestPost = createdAtArray.sort((a, b) => b.createdAt - a.createdAt)[0]

            //Räknar antalet posts inom 24 timmar
            const todaysDate = new Date()
            const postsToday = createdAtArray.filter(postDate => {
                const postDateObj = new Date(postDate);
                const timeDiff = Number(todaysDate) - Number(postDateObj);
                const hourDiff = timeDiff / (1000 * 60 * 60)
                return hourDiff <= 24
            })
            const postCountIn24 = postsToday.length


            // Lägg till postCount och latestPost till forumSection
            forumSection.amount = postCount;
            forumSection.latest = latestPost;
            forumSection.perday = postCountIn24
            // Spara tillbaka den uppdaterade forumsektionen (valfritt, beroende på behov)
            await forumSection.save();
        }));

        return forum;
    } catch(error){
        handleError(error)
    }
}

export async function fetchSpecificForum(categoryId: string){
    if(!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) throw new Error('Did not recieve an id for category or its not a valid objectid');
    
    const connection = await connectToDatabase()
    if(!connection.success) throw new Error(connection.message);

    try {
        const response = await SpecificForum.find({categoryId: categoryId});
        if(!response || response.length === 0) throw new Error('Could not find specific forum in database');
        return response;
    } catch(error){
        handleError(error)
    }
}

export async function fetchSpecificPost(postId: string){
    if(!postId || !mongoose.Types.ObjectId.isValid(postId)) throw new Error('Did not recieve an id for post or its not a valid id');
    
    const connection = await connectToDatabase()
    if(!connection.success) throw new Error(connection.message);

    try {
        const actualPost = await SpecificForum.findById(postId)
        .populate({
            path: 'userId',
            select: 'username imgPath'
        });
        if(!actualPost) throw new Error('Post with that id not found');
        return actualPost;
    } catch(error){
        handleError(error)
    }
}


export async function loadReplies(postId: string) {
    const connection = await connectToDatabase()
    if(!connection.success) throw new Error(connection.message);

    try{
        const postItself = await SpecificForum.findById(postId);
        if (!postItself) throw new Error('Could not find post in database');
        const replies = await Comment.find({postId: postItself._id}).populate({
            path: 'userId',
            select: 'username imgPath'
          }).lean()

        if(replies.length === 0) throw new Error('No replies found for this post');

        const filteredReplies = replies.filter(reply => reply.userId && reply.userId.username && reply.userId.imgPath);
        
        if (filteredReplies.length === 0) {
            throw new Error('Replies without valid user data');
        }

        const formattedReplies: IReply[] = replies.map((reply) => ({
            _id: (reply._id as ObjectId).toString(),
            commentContent: reply.commentContent,
            commentUsername: reply.userId.username,
            commentImg: reply.userId.imgPath || '/path/to/default/image.jpg', // Använd ett standardbild om ingen finns
          }));

        return formattedReplies
    } catch(error){
        handleError(error)
    }
}

export async function submitReply(postId: string, replyContent: string) {
    try {
      if (!postId || !mongoose.Types.ObjectId.isValid(postId) || !replyContent) {
        throw new Error("Missing ID, reply, or invalid ID");
      }
  
      const storedCookies = cookies();
      const accessToken = (await storedCookies).get("accessToken")?.value;
      if (!accessToken) throw new Error("No accessToken active");
  
      const decoded = jwt.verify(accessToken, ACCESS_SECRET);
      if (typeof decoded !== "object" || !decoded.userId) {
        throw new Error("Invalid accessToken");
      }
  
      const connection = await connectToDatabase();
      if(!connection.success) throw new Error('Could not connect to database')

      const postItself = await SpecificForum.findById(postId);
      if (!postItself) throw new Error("Post not found");
  
      const user = await User.findById(decoded.userId);
      if (!user) throw new Error("User not found");
  
      const newComment = new Comment({
        commentContent: replyContent,
        userId: user._id,
        postId: postItself._id,
      });
  
      await newComment.save();
      postItself.comments.push(newComment._id);
      postItself.repliesAmount += 1;
      await postItself.save();
  
      user.comments.push({
        commentId: newComment._id,
        content: replyContent,
      });
      await user.save();
  
    console.log('Reply created successfully');
    } catch (error) {
      handleError(error)
    }
  }


  export async function favorite(){
    try{
        const connection = await connectToDatabase();
        if(!connection.success) throw new Error('Could not connect to database');

        const topCharacters = await Character.find({}, 'name image _id likes').sort({likes: -1}).limit(3);
        if(!Array.isArray(topCharacters) || topCharacters.length === 0) throw new Error('Could not get characters from Database');
        const returnObj: ITopCharacters[] = topCharacters.map(character => ({
            name: character.name,
            likes: character.likes,
            image: character.image,
            _id: (character._id as ObjectId).toString()
        }))
        return returnObj
        
    } catch(error){
        handleError(error)
        return null
    }
  }


export async function revalidate(value: string){
    try {
        if(!value) throw new Error('Did not recieve info on what path to revalidate')
        revalidatePath(value)
        console.log('Successfully revalidated path')
    } catch(error){
        handleError(error)
    }
}


//Shop Related
export async function loadShopItems(){
    try {
        const connection = await connectToDatabase();
        if(!connection.success) throw new Error('Could not connect to database');

        const items = await Item.find();
        if(!Array.isArray(items) || items.length === 0) throw new Error('Could not get shop items from Database');

        const returnObject: IItemCart[] = items.map((item) => ({
            _id: (item._id as ObjectId).toString(),
            name: item.name,
            image: item.image,
            price: item.price,
            bgimage: item.bgimage,
            amount: item.amount,
            storage: item.storage
        }))
        return returnObject

    } catch(error){
        handleError(error)
    }
}



//Completed Purchase Get Name (Last Step)
export async function getCustomerName(session_id: string) {
    try {
        if(!session_id) throw new Error('Did not recieve an id from client');

        const session = await stripe.checkout.sessions.retrieve(session_id);

        if(!session.metadata || !session.metadata.orderId) throw new Error('Order ID is missing in Stripe session metadata');

        const orderId = session.metadata.orderId;

        const connection = await connectToDatabase();
        if(!connection.success) throw new Error('Could not connect to database');

        const order = await Order.findById(orderId);
        if(!order) throw new Error('Could not Order with that id in database');

        const firstname = order.shipping.firstname;
        console.log(firstname)
        if(!firstname) throw new Error('Could not find name property on order');
      

        return firstname
    } catch(error){
        handleError(error)
        return null
    }
}
