import { connectToDatabase } from "../../dbconfig/dbconfig";
import Admin from "../../models/adminmodels";
import Job from "../../models/jobmodels";
import { NextResponse } from "next/server";

await connectToDatabase();

// export async function POST(request) {
//   try {
//     const reqBody = await request.json();
//     const { email, password } = reqBody;
//     console.log(reqBody);


//  //check if user already exists
//         const user = await Admin.findOne({email})

//         if(user){
//             return NextResponse.json({error: "User already exists"}, {status: 400})
//         }

//         //hash password
//         const salt = await bcryptjs.genSalt(10)
//         const hashedPassword = await bcryptjs.hash(password, salt)

//         const newUser = new Admin({
//             email,
//             password: hashedPassword
//         })

//         const savedUser = await newUser.save()
//         console.log(savedUser);

//         //send verification email

//     //    await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

//         return NextResponse.json({
//             message: "User created successfully",
//             success: true,
//             savedUser
//         })
        
        

//     } catch (error) {
//         return NextResponse.json({error: error.message},{status:500})
//     }
// }

// 

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const {
      title,
      department,
      location,
      type,
      experience,
      description,
      requirements,
    } = reqBody;
    console.log(reqBody);


 
        const newUser = new Job({
            title,
            department,
            location,
            type,
            experience,
            description,
            requirements,
            })

        const savedUser = await newUser.save()
        console.log(savedUser);

        //send verification email

    //    await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json({
            message: "job created successfully",
            success: true,
            savedUser
        })
        
        

    } catch (error) {
        return NextResponse.json({error: error.message},{status:500})
    }
}