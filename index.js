import express from "express";
import dotenv from "dotenv";
import { MongoClient , ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import { auth } from "./User/auth.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors())
// const port = 9000;

const MONGO_URL = process.env.MONGO_URL;

async function createConnection(){
    try{
        const client = new MongoClient(MONGO_URL);
        await client.connect();
        console.log("MONGO CONNECTED");
        return client;
    }
    catch(err){
        console.error("Server not connected:", err);
        throw new Error("Database connection failed");
    }
}

const client = await createConnection().catch(err => {
    console.error(err.message,"Server not connected")
    process.exit(1);
});

app.post("/signup",async (req,res)=>{
    const {name, mail, phone, password, usertype, secretkey} = req.body;

    if(usertype !== "seller" && usertype !== "user"){
        res.send({status: 401, msg: "Invalid user type"});
        return;
    }

    if (usertype === "seller") {
        const findSeller = await client
        .db("artcraft")
        .collection("seller")
        .findOne({mail: mail});

        if (findSeller) {
            res.status(400).send({status: "401", msg: "Seller already exists"});
            return;
        }
        if ((usertype === "seller") && (secretkey !== process.env.user_key)) {
            res.send({status: 401, msg: "Invalid Seller secret key"});
            return;
        }
    }
    else if(usertype === "user"){

        // Check if the user or seller already exists
        const findUser = await client
        .db("artcraft")
        .collection("user")
        .findOne({mail: mail});
    
        if (findUser) {
            res.status(400).send({status: "401", msg: "User already exists"});
            return;
        }
    }

    const hashedPassword = await genPassword(password);
    const user = await client
        .db("artcraft")
        .collection(usertype === "seller" ? "seller" : "user")
        .insertOne({name: name, mail: mail, phone: phone, password: hashedPassword, userType: usertype});
    
    res.send({status: "200", msg: "Successfully registered", user, name});
})

async function genPassword(password){
    const salt = await bcrypt.genSalt(5);
    // console.log("salt",salt)
    const hashedPassword = await bcrypt.hash(password,salt)
    // console.log("hashedPass",hashedPassword)
    return hashedPassword;
}

app.post("/login",async (req,res)=>{
    const {mail,password,userType} = req.body;
    // console.log(mail,password)

    const findUser = await client
        .db("artcraft")
        .collection(userType === "seller" ? "seller" : "user")
        .findOne({mail:mail})

    if(!findUser){
        res.status(401).send({status:"401",msg:"User not found, Please signup."})
        return
    }
    const storedPassword = findUser.password;
    const passwordMatch = await bcrypt.compare(password,storedPassword);

    if(passwordMatch){
        const token = jwt.sign({id:findUser._id},process.env.SECRET_KEY)
        res.send({status:"200",msg:"Successfully login",token:token,userType:findUser.userType,name:findUser.name,id:findUser._id});
        return
    }
    else{
        res.status(401).send({status:"401",msg:"Invalid Credential, Please try again"})
        return
    }
}) 

app.post("/seller/add/product/:sellerId",auth,async (req,res)=>{

    const productData = req.body; // product is a single product object  

    try {

        if(!req.params.sellerId){
            return res.status(400).json({message:"sellerId is required"})
        }

        let Obj_id = new ObjectId(req.params.sellerId);

        const seller = await client
        .db("artcraft")
        .collection("seller")
        .findOne({_id: Obj_id});
    
        if (!seller) {
        return res.status(404).json({ message: 'Seller not found' });
        }
    
        if (!seller.products) {
            seller.products = [];
        }
        const productWithId = { ...productData, id: new ObjectId() }; // Generate a unique ID for the product
        seller.products.push(productWithId);
        await client.db("artcraft").collection("seller").updateOne({_id: Obj_id}, {$set: {products: seller.products}});
    
        res.status(200).json({ message: 'Product added successfully', seller });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error });
    } 
})

app.get("/seller/products/:sellerId",auth,async (req,res)=>{
    try {
        const sellerId = req.params.sellerId;
        const seller = await client.db("artcraft").collection("seller").findOne({_id: new ObjectId(sellerId)});
        res.send(seller.products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
})

app.get("/all/products",async (req,res)=>{
    try {
        const products = await client.db("artcraft").collection("seller").aggregate([
            { $unwind: "$products" },
            { $project: {
                _id: 0,
                description: "$products.description",
                image: "$products.image",
                name: "$products.name",
                price: "$products.price",
                id: "$products.id",
                seller_id: "$_id",
                sellCount: "$products.sellCount",
                category: "$products.category"
            }}
        ]).toArray();

        res.send(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
})

app.post("/checkout/:userId",auth,async (req,res)=>{
    try {
        if (!req.params.userId) {
            return res.status(400).json({ message: "userId is required" });
        }

        const userId = req.params.userId;

        if (!req.body.cartItems || !Array.isArray(req.body.cartItems)) {
            return res.status(400).json({ message: "cartItems is required" });
        }

        for (const item of req.body.cartItems) {
            const { seller_id, id, quantity } = item; // Extract sellerId and product id from each item
            // Update user's purchase count
            const user = await client.db("artcraft").collection("user").findOne({ _id: new ObjectId(userId) });

            if(user){
                const totalPurchases = (user?.purchaseCount || 0) + quantity; // Increment purchase count
                await client.db("artcraft").collection("user").updateOne(
                    { _id: new ObjectId(userId) },
                    { $set: { purchaseCount: totalPurchases } }
                );
            }

            // Update seller's sell count
            const seller = await client.db("artcraft").collection("seller").findOne({ _id: new ObjectId(seller_id) });
            if(seller){ 
                const totalSells = (seller?.sellCount || 0) + quantity; // Increment sell count
                await client.db("artcraft").collection("seller").updateOne(
                    { _id: new ObjectId(seller_id) },
                    { $set: { sellCount: totalSells } }
                );
            }

            // Update individual product sell count
            if (seller?.products) {
                const productIndex = seller.products.findIndex(product => product?.id?.toString() === id);
                const product = seller.products.find(product => product?.id?.toString() === id);

                if (productIndex !== -1) {
                    const product = seller.products[productIndex];
                    const productSellCount = (product?.sellCount || 0) + quantity; // Increment product sell count
                    await client.db("artcraft").collection("seller").updateOne(
                        { _id: new ObjectId(seller_id), "products.id": product.id },
                        { $set: { [`products.${productIndex}.sellCount`]: productSellCount } }
                    );
                }
            }
        }

        res.send({ message: 'Checkout successful' });
    } catch (error) {
        console.log(error)
        console.log(error.message)
        res.status(500).json({ message: 'Error processing checkout', error });
    }
})

app.post("/best/seller/products",async (req,res)=>{
    try {
        const sellers = await client.db("artcraft").collection("seller").find({}).toArray();
        if(sellers){    
            const allProducts = sellers?.flatMap(seller => 
                seller?.products?.map(product => ({ ...product, seller_id: seller._id })) // Add sellerId to each product
            ).filter(product => product?.sellCount !== undefined);
            const sortedProducts = allProducts.sort((a, b) => (b.sellCount || 0) - (a.sellCount || 0));
            const topProducts = sortedProducts.slice(0, 50);
            res.send(topProducts);
        }
        else{
            res.status(404).json({ message: 'No sellers found' });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error fetching best seller product', error });
    }
})

app.post("/seller/add/banner/:sellerId",auth,async (req,res)=>{
    try {
        const sellerId = req.params.sellerId;
        const bannerData = req.body;

        const seller = await client.db("artcraft").collection("seller").findOne({_id: new ObjectId(sellerId)});

        if (seller) {
            await client.db("artcraft").collection("banner").insertOne({ sellerId: sellerId, sellerName: seller.name, ...bannerData });
            res.send({message:"Banner added successfully"});
        }
        else{
            res.status(404).json({ message: 'Seller not found' });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error adding banner', error });
    }
})

app.get("/seller/get/banner",async (req,res)=>{
    try {
        const banner = await client.db("artcraft").collection("banner").find({}, { projection: { _id: 0 } }).toArray();
        res.send(banner);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching banner', error });
    }
})

app.delete("/seller/delete/product/:sellerId/:productId",auth,async (req,res)=>{
    try {
        const productId = req.params.productId;
        const sellerId = req.params.sellerId;

        const seller = await client.db("artcraft").collection("seller").findOne({ _id: new ObjectId(sellerId) });
        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        const productIndex = seller.products.findIndex(product => product?.id?.toString() === productId);
        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found' });
        }

        seller.products.splice(productIndex, 1);

        await client.db("artcraft").collection("seller").updateOne({ _id: new ObjectId(sellerId) }, { $set: { products: seller.products } });

        res.send({ message: 'Product deleted successfully' });

    } catch (error) {
        console.log(error)
        console.log(error.message)
        res.status(500).json({ message: 'Error deleting product', error });
    }
})

app.get("/seller/banner/:sellerId",async (req,res)=>{
    try {
        const banners = await client.db("artcraft").collection("banner").find({ sellerId: req.params.sellerId }).toArray();
        res.send(banners);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching banner', error });
    }
})

app.delete("/seller/delete/banner/:sellerId/:bannerId",auth,async (req,res)=>{
    try {
        const bannerId = req.params.bannerId;
        const sellerId = req.params.sellerId;

        const seller = await client.db("artcraft").collection("seller").findOne({ _id: new ObjectId(sellerId) });
        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        const banner = await client.db("artcraft").collection("banner").findOne({ _id: new ObjectId(bannerId) });
        if (!banner) {
            return res.status(404).json({ message: 'Banner not found' });
        }

        await client.db("artcraft").collection("banner").deleteOne({ _id: new ObjectId(bannerId) });

        res.send({ message: 'Banner deleted successfully' });

    } catch (error) {
        console.log(error)
        console.log(error.message)
        res.status(500).json({ message: 'Error deleting banner', error });
    }
})

const port = process.env.PORT ?? 5000;

app.listen(port,()=>{
    console.log(port,"server connected successfully");
})