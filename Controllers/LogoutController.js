const logoutController = async (req, res) => {
  req.session.destroy((err) => {
    if (err)
      return res.send({
        status: 400,
        message: "Logout Unsuccessfull",
      });
    return res.send({
      status: 200,
      message: "Logout Success",
    });
  });

//   res.send("Logout ho gya laddar");
};

module.exports = logoutController;
