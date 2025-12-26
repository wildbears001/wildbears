// // import userModel from "../models/userModel.js";
// // import validator from 'validator';
// // import bcrypt from "bcrypt";
// // import jwt from "jsonwebtoken"

// // const createToken = (id)=>{
// //     return jwt.sign({id},process.env.JWT_SECRET);
// // }
// // // route for user login
// // const loginUser = async (req, res) => {

// //     try {
// //         const {email,password} = req.body;

// //         const user = await userModel.findOne({email});
        
// //         if(!user){
// //             return res.json({success:false,message:'User Doesnt exists'})
// //         }
// //         const isMatch = await bcrypt.compare(password,user.password);

// //         if(isMatch){
// //             const token = createToken(user._id)
// //             res.json({success:true,token})
// //         }
// //         else{
// //             res.json({success:false,message:'Invalid Passowrd!'})
// //         }

// //     } catch (error) {
// //         console.log(error);
// //         res.json({success:false,message:error.message})

        
// //     }

// // }


// // // route for user registration
// // const registerUser = async (req, res) => {
// //     try {
// //         const { name, email, password } = req.body;
// //         // checking user Already exist or not
// //         const exists = await userModel.findOne({email});
// //         if(exists){
// //             return res.json({success:false,message:'User Already Exists'})
// //         }

// //         // validating email and strong password 
// //         if (!validator.isEmail(email)) {
// //             return res.json({success:false,message:'Please enter a valid email'})
// //         }
// //         if (password.length < 8 ) {
// //             return res.json({success:false,message:'Please enter Strong Password and Lenght must be 8 Characters...!'})
// //         }

// //         // hasing user password 
// //         const salt = await bcrypt.genSalt(10)

// //         const hashedPassword = await bcrypt.hash(password,salt)

// //         const newUser = new userModel({
// //             name,
// //             email,
// //             password:hashedPassword,
// //         })

// //         const user = await newUser.save()

// //         const token = createToken(user._id)

// //         res.json({success:true,token})


// //     } catch (error) {
// //             console.log(error);
// //             res.json({success:false,message:error.message})
// //     }
// // }

// // // route for Admin login
// // const adminLogin = async (req, res) => {

// //     try {
// //         const {email,password} = req.body
// //         if(email === process.env.ADMIN_EMAIL && password ===process.env.ADMIN_PASSWORD){
// //                 const token = jwt.sign(email+password,process.env.JWT_SECRET);
// //                 res.json({success:true,token})
// //         }
// //         else{
// //             res.json({success:false,message:'Invalid Credentials'})
// //         }
// //     } catch (error) {
// //         console.log(error);
// //             res.json({success:false,message:error.message})
        
// //     }

// // }


// // // 🔻 NEW: Get user profile
// // const getUserProfile = async (req, res) => {
// //     try {
// //         const user = await userModel.findById(req.body.userId).select('-password');
// //         if (!user) {
// //             return res.status(404).json({ success: false, message: "User not found" });
// //         }
// //         res.json({ success: true, user });
// //     } catch (error) {
// //         console.log(error);
// //         res.status(500).json({ success: false, message: error.message });
// //     }
// // };

// // // export all
// // export { loginUser, registerUser, adminLogin, getUserProfile };

// // // export { loginUser, registerUser, adminLogin } 



// import userModel from "../models/userModel.js";
// import walletTransactionModel from "../models/walletTransactionModel.js";
// import validator from 'validator';
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken"

// const WELCOME_COINS = 50;
// const WELCOME_FREE_CASH = 100;

// const createToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET);
// }

// // route for user login
// const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const user = await userModel.findOne({ email });
//         if (!user) {
//             return res.json({ success: false, message: 'User Doesnt exists' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (isMatch) {
//             const token = createToken(user._id)
//             res.json({ success: true, token })
//         } else {
//             res.json({ success: false, message: 'Invalid Password!' })
//         }

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message })
//     }
// }

// // route for user registration
// const registerUser = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         const exists = await userModel.findOne({ email });
//         if (exists) return res.json({ success: false, message: 'User Already Exists' });

//         if (!validator.isEmail(email)) return res.json({ success: false, message: 'Please enter a valid email' });
//         if (password.length < 8) return res.json({ success: false, message: 'Password must be at least 8 characters!' });

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // 🔹 Create user with welcome rewards
//         const newUser = new userModel({
//             name,
//             email,
//             password: hashedPassword,
//             coins_balance: WELCOME_COINS,
//             wallet_balance: WELCOME_FREE_CASH
//         });

//         const user = await newUser.save();

//         // 🔹 Log welcome rewards
//         await walletTransactionModel.create([
//             {
//                 user_id: user._id,
//                 type: "HevenCoins",
//                 amount: WELCOME_COINS,
//                 balance_after: WELCOME_COINS,
//                 reason: "Welcome Bonus",
//                 source: "System"
//             },
//             {
//                 user_id: user._id,
//                 type: "HevenFreeCash",
//                 amount: WELCOME_FREE_CASH,
//                 balance_after: WELCOME_FREE_CASH,
//                 reason: "Welcome Bonus",
//                 source: "System"
//             }
//         ]);

//         const token = createToken(user._id);
//         res.json({ success: true, token, message: `Welcome! You received ${WELCOME_COINS} Heven Coins & ₹${WELCOME_FREE_CASH} Free Cash.` });

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message })
//     }
// }

// // route for Admin login
// const adminLogin = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
//             const token = jwt.sign(email + password, process.env.JWT_SECRET);
//             res.json({ success: true, token })
//         } else {
//             res.json({ success: false, message: 'Invalid Credentials' })
//         }
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message })
//     }
// }

// // 🔻 Get user profile (include wallet balances)
// // const getUserProfile = async (req, res) => {
// //     try {
// //         const user = await userModel.findById(req.body.userId).select('-password');
// //         if (!user) return res.status(404).json({ success: false, message: "User not found" });

// //         // Optionally, get transaction history
// //         // const transactions = await walletTransactionModel.find({ user_id: user._id }).sort({ created_at: -1 });

// //         res.json({ success: true, user }); // , transactions });
// //     } catch (error) {
// //         console.log(error);
// //         res.status(500).json({ success: false, message: error.message });
// //     }
// // };
// // const getUserProfile = async (req, res) => {
// //     try {
// //         const user = await userModel.findById(req.body.userId).select('-password');
// //         if (!user) return res.status(404).json({ success: false, message: "User not found" });

// //         res.json({
// //             success: true,
// //             user: {
// //                 id: user._id,
// //                 name: user.name,
// //                 email: user.email,
// //                 coins: user.coins_balance || 0,
// //                 freeCash: user.wallet_balance || 0
// //             }
// //         });
// //     } catch (error) {
// //         console.log(error);
// //         res.status(500).json({ success: false, message: error.message });
// //     }
// // };
// const getUserProfile = async (req, res) => {
//     try {
//         const user = await userModel.findById(req.userId).select("-password");

//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         res.json({ 
//             success: true, 
//             user: {
//                 coins: user.coins_balance,     // your coins field
//                 freeCash: user.wallet_balance, // your wallet field
//                 name: user.name,
//                 email: user.email
//             }
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // PUT /api/user/profile/update
// const updateProfile = async (req, res) => {
//   try {
//     const { name, email, phone } = req.body;
//     const user = await userModel.findByIdAndUpdate(req.userId, { name, email, phone }, { new: true }).select("-password");
//     res.json({ success: true, user });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // GET /api/user/transactions
// const getTransactions = async (req, res) => {
//   try {
//     const coinTx = await walletTransactionModel.find({ user_id: req.userId, type: "HevenCoins" }).sort({ createdAt: -1 });
//     const cashTx = await walletTransactionModel.find({ user_id: req.userId, type: "HevenFreeCash" }).sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       coins: coinTx,
//       freeCash: cashTx
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


// export { loginUser, registerUser, adminLogin, getUserProfile ,updateProfile , getTransactions };



import userModel from "../models/userModel.js";
import walletTransactionModel from "../models/walletTransactionModel.js";
import orderModel from "../models/orderModel.js"; // ✅ NEW
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";


/* ================= CONSTANTS ================= */
const WELCOME_COINS = 50;
const WELCOME_FREE_CASH = 100;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

/* ================= USER LOGIN ================= */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User Doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Password!" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

/* ================= USER REGISTER ================= */
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User Already Exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      coins_balance: WELCOME_COINS,
      wallet_balance: WELCOME_FREE_CASH,
    });

    const user = await newUser.save();

    // 🔹 Log welcome rewards
    await walletTransactionModel.create([
      {
        user_id: user._id,
        type: "HevenCoins",
        amount: WELCOME_COINS,
        balance_after: WELCOME_COINS,
        reason: "Welcome Bonus",
        source: "System",
      },
      {
        user_id: user._id,
        type: "HevenFreeCash",
        amount: WELCOME_FREE_CASH,
        balance_after: WELCOME_FREE_CASH,
        reason: "Welcome Bonus",
        source: "System",
      },
    ]);

    const token = createToken(user._id);

    res.json({
      success: true,
      token,
      message: `Welcome! You received ${WELCOME_COINS} Heven Coins & ₹${WELCOME_FREE_CASH} Free Cash.`,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

/* ================= ADMIN LOGIN ================= */
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

/* ================= GET USER PROFILE ================= */
const getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        coins: user.coins_balance || 0,
        freeCash: user.wallet_balance || 0,
        cartData: user.cartData || {},
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= UPDATE PROFILE ================= */
const updateProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const user = await userModel
      .findByIdAndUpdate(
        req.userId,
        { name, email, phone },
        { new: true }
      )
      .select("-password");

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= TRANSACTIONS ================= */
const getTransactions = async (req, res) => {
  try {
    const coinTx = await walletTransactionModel
      .find({ user_id: req.userId, type: "HevenCoins" })
      .sort({ createdAt: -1 });

    const cashTx = await walletTransactionModel
      .find({ user_id: req.userId, type: "HevenFreeCash" })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      coins: coinTx,
      freeCash: cashTx,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= PROFILE STATS (NEW) ================= */
const getProfileStats = async (req, res) => {
  try {
    const userId = req.userId;

    /* ---------- CART COUNT (TOTAL QUANTITY) ---------- */
    const user = await userModel.findById(userId).select("cartData");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartCount = 0;
    const cartData = user.cartData || {};

    Object.values(cartData).forEach((sizes) => {
      Object.values(sizes).forEach((qty) => {
        cartCount += qty;
      });
    });

    /* ---------- PAID ORDERS COUNT ---------- */
    const ordersCount = await orderModel.countDocuments({
      userId,
      payment: true,
    });

    res.json({
      success: true,
      cartCount,
      ordersCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    const uploadRes = await cloudinary.uploader.upload(req.file.path, {
      folder: "wildbears/profile",
      width: 400,
      height: 400,
      crop: "fill",
    });

    const user = await userModel.findByIdAndUpdate(
      req.userId,
      { profileImage: uploadRes.secure_url },
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      message: "Profile image updated",
      image: uploadRes.secure_url,
      user
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= EXPORTS ================= */
export {
  loginUser,
  registerUser,
  adminLogin,
  getUserProfile,
  updateProfile,
  getTransactions,
  getProfileStats, // ✅ NEW
};
