export const getRiders = async (req, res, next) => {
  try {
    console.log("rider");
    res.json("getting riders");
  } catch (error) {
    console.log("err");
  }
};
