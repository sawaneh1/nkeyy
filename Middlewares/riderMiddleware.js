import jwt from "jsonwebtoken";

const riderAuth = async (req, res, next) => {
  console.log("req", req.headers);
  if (req.headers.authorization) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      console.log("toekn ", token);

      let decodedData;

      if (token) {
        decodedData = jwt.verify(token, process.env.JWT_SECRET);
        // if(!decodedData){
        //  return res.json('you are not authorize to access this route')
        // }
        console.log("this decoded data", decodedData);
        if (decodedData.riderId === undefined)
          return res
            .status(401)
            .json("you are not authorize to access this route");
        req.riderId = decodedData?.riderId;
        console.log("cuid", decodedData.riderId);
      }
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  } else {
    console.log("you are unathorixe");
    res.status(401).json("you need to login to access this route");
    next();
  }
};

export default riderAuth;
