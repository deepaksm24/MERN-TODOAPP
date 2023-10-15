const router = require("express").Router();
const User = require("../model/userModel");
const Task = require("../model/taskModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

//register

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      return res.send({
        success: false,
        message: "User already exists",
      });
    }
    //pwd encrypt

    // const salt = await bcrypt.getSalt(10);
    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      success: true,
      message: "User Created Successfully",
    });
  } catch (error) {
    //console.log(error);
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//login

router.post("/login", async (req, res) => {
  try {
    const userlogin = await User.findOne({ email: req.body.email });

    if (!userlogin) {
      return res.send({
        success: false,
        message: "User does not exists",
      });
    }
    //pwd decrypt
    const validPassword = await bcrypt.compare(
      req.body.password,
      userlogin.password
    );
    if (!validPassword) {
      return res.send({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ _id: userlogin._id }, process.env.jwt_secret, {
      expiresIn: "1d",
    });

    res.send({
      success: true,
      message: "user logged in successfully",
      data: token,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// protected route
router.get("/get-current-user", authMiddleware, async (req, res) => {
  
  // console.log(req.body.userID);

  try {
    const user = await User.findById(req.body.userId).select("-password");
   
    res.send({
      success: true,
      message: "user details fetched successfully",
      data: user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//  add task
router.post("/add-task",authMiddleware, async (req, res) => {
 
 
  try {
  
    const newtask = new Task(req.body);
    await newtask.save();
    res.send({
      success: true,
      message: "Task Added Successfully",
    });
    
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
   
  }
});
// get all task

router.get("/get-all-tasks",authMiddleware, async (req, res) => {
  try {

    const tasks =  await Task.find({ user: req.body.userId });
    
    res.send({
      success: true,
      message: "Tasks fetched Successfully",
      data: tasks
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});


//edit task
router.post("/update-task", authMiddleware, async (req, res) => {
  try {
   

    await Task.findByIdAndUpdate(req.body.taskId,req.body);
    
    res.send({
      success: true,
      message: "Task Edited Successfully",
    });


  } catch (error) {
    
    res.send({
      success: false,
      message: error.message,
    });
  }
});


// delete a task
router.post("/delete-task", authMiddleware, async (req, res) => {
  try {
   
    
    await Task.findByIdAndDelete(req.body.taskId);
    
    res.send({
      success: true,
      message: "Task Deleted Successfully",
    });


  } catch (error) {
    
    res.send({
      success: false,
      message: error.message,
    });
  }
});










module.exports = router;
