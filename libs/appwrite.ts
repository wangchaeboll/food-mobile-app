import {Account, Avatars, Client, Databases, ID, Query, Storage} from "react-native-appwrite";
import {CreateUserParams, GetMenuParams, SignInParams} from "@/type";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    platform: "com.jsm.foodordering",
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    bucketId: "687874f4000a1b01edeb",
    databaseId: "687727aa0006b7b6a5e5",
    userCollectionId: "687727b0002a6d0db55e",
    categoryCollectionId: "68786b530031e18e90cd",
    menuCollectionId: "68786c19001073dccbc6",
    customizationCollectionId: "68786da10009bc5c87df",
    // 68786e1d000210000000
    menuCustomizationCollectionId: "68786ebd00156eae2312"
}

export const client = new Client()

client.setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId).setPlatform(appwriteConfig.platform)

export const account = new Account(client)
export const databases = new Databases(client)
const avatars = new Avatars(client)
export const storage = new Storage(client)

export const createUser = async ({ name, email, password }: CreateUserParams) => {
    try {
        const newAccount = await account.create( ID.unique(), email, password, name)
        if(!newAccount) {
            throw Error
        }

        const avatarUrl = avatars.getInitialsURL(name)

        await signIn({ email,password })

        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email, name, avatar : avatarUrl
            }
        )
    } catch (e) {
        throw new Error(e as string)
    }
}

export const signIn = async ( {email, password}: SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)
    } catch (e) {
        throw new Error(e as string)
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()
        if(!currentAccount) throw new Error("No user found")

        const currentUser =  await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
           [Query.equal('accountId', currentAccount.$id)],
        )

        if(!currentUser) throw new Error("No user found")

        return currentUser.documents[0]
    } catch (e) {
        throw new Error(e as string)
    }
}

export const getMenu = async ( { category, query}: GetMenuParams) => {
    try {
        const queries: string[] = []

        if (category) queries.push(Query.equal('categories', category))
        if (query) queries.push(Query.search('name', query))

        const menus = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            queries
        )

        return menus.documents;
    } catch (e) {
        throw new Error(e as string)
    }
}

export const getCategories = async () => {
    try {
        const categories = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.categoryCollectionId
        )
    } catch (e) {
        throw new Error(e as string)
    }
}